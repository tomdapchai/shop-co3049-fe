"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploader from "@/components/form/ImageUploader";
import { uploadToCDN } from "@/lib/utils";
import { advertisementSchema } from "@/lib/validation";
import { UploadedImage } from "../blogs/create/page";
import { advertisement } from "@/types";
import Image from "next/image";
import { getAdvertisement, updateAdvertisement } from "@/services/AdService";
import { Switch } from "@/components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const page = () => {
    const { toast } = useToast();
    const [ad, setAd] = useState<advertisement>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState<advertisement>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        // Fetch ad data.
        setIsLoading(true);
        getAdvertisement().then((data) => {
            if ("error" in data) {
                console.error(data.error);
            } else {
                setAd(data);
            }
            setIsLoading(false);
        });
    }, []);

    const handleEditAd = async (data: advertisement) => {
        console.log("Updating ad:", data);
        await updateAdvertisement(data).then((res) => {
            setAd(data);
            setIsDialogOpen(false);
        });
    };

    const openEditAd = (data: advertisement) => {
        setAd(data);
        setIsDialogOpen(true);
    };

    if (isLoading || !ad) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto py-10">
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl">
                        Advertisment Banner Management
                    </CardTitle>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {"Edit Advertisement"}
                                </DialogTitle>
                            </DialogHeader>
                            <AdForm onSubmit={handleEditAd} initialData={ad} />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-[1fr_auto]">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold leading-none tracking-tight">
                                        {ad.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">
                                            Active
                                        </span>
                                        <Switch
                                            checked={ad.enable}
                                            onCheckedChange={async () => {
                                                await handleEditAd({
                                                    ...ad,
                                                    enable: !ad.enable,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center text-sm text-muted-foreground">
                                    <a
                                        href={ad.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center hover:underline">
                                        {ad.link
                                            ? ad.link.length > 40
                                                ? `${ad.link.substring(
                                                      0,
                                                      40
                                                  )}...`
                                                : ad.link
                                            : "No link"}
                                    </a>
                                </div>
                            </div>

                            <div className="relative aspect-video w-[800px] overflow-hidden rounded-md">
                                <Image
                                    src={ad.image || "/placeholder.svg"}
                                    alt={ad.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex justify-end">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                onClick={() => openEditAd(ad)}
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center gap-1">
                                                <Pencil className="h-4 w-4" />{" "}
                                                Edit Advertisement
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Edit advertisement details</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;

interface AdvertisementFormProps {
    onSubmit: (data: advertisement) => void;
    initialData: advertisement | null;
}

function AdForm({ onSubmit, initialData }: AdvertisementFormProps) {
    console.log(initialData);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<z.infer<typeof advertisementSchema>>({
        resolver: zodResolver(advertisementSchema),
        defaultValues: initialData || {
            title: "",
            image: "",
            link: "",
            enable: true,
        },
    });

    console.log(watch());

    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(
        initialData?.image
            ? [{ alt: "ad", src: initialData.image, file: null }]
            : []
    );
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (file: File) => {
        setIsUploading(true);
        try {
            const result = await uploadToCDN(file);

            if (typeof result === "string") {
                const newImage = {
                    alt: file.name,
                    src: result,
                    file: file,
                };
                setUploadedImages([newImage]);
                setValue("image", result);
            } else {
                console.error("Upload failed:", result.error);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageDelete = (src: string) => {
        setUploadedImages([]);
        setValue("image", "");
    };

    const handleUpdateAlt = (oldAlt: string, newAlt: string) => {
        setUploadedImages(
            uploadedImages.map((img) =>
                img.alt === oldAlt ? { ...img, alt: newAlt } : img
            )
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} />
                {errors.title && (
                    <p className="text-sm text-destructive">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="link">Link to product/blog</Label>
                <Input id="link" {...register("link")} />
                {errors.link && (
                    <p className="text-sm text-destructive">
                        {errors.link.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label>Advertisement Banner</Label>
                <ImageUploader
                    uploadedImages={uploadedImages}
                    onUpload={handleImageUpload}
                    onDelete={handleImageDelete}
                    onUpdateAlt={handleUpdateAlt}
                    isMultiple={false}
                    isEditing={true}
                />
                <input type="hidden" {...register("image")} />
                {errors.image && (
                    <p className="text-sm text-destructive">
                        {errors.image.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="submit" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Update ad banner"}
                </Button>
            </div>
        </form>
    );
}
