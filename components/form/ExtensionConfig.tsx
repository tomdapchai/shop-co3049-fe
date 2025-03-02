"use client";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { advertisement, extension } from "@/types";

import { IFile, fetchFiles, deleteFile } from "@/utils/file";
import FileUploader from "../chatbot/FileUploader";
import { Separator } from "@radix-ui/react-separator";
import { X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { advertisementSchema } from "@/lib/validation";
import ImageUploader from "@/components/form/ImageUploader";
import { uploadToCDN } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { getAdvertisement, updateAdvertisement } from "@/services/AdService";

// Interface for uploaded image
interface UploadedImage {
    alt: string;
    src: string;
    file: File | null;
}

interface ConfigDialogProps {
    isOpen: boolean;
    extension: extension | null;
    onClose: () => void;
}

export function ConfigDialog({
    isOpen,
    extension,
    onClose,
}: ConfigDialogProps) {
    const [files, setFiles] = useState<IFile[]>([]);
    const [adData, setAdData] = useState<advertisement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [initialAdData, setInitialAdData] = useState<advertisement | null>(
        null
    );

    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const onSaveFile = (file: IFile) => setFiles((v) => [file, ...v]);

    const handleDeleteFile = async (id: number | undefined) => {
        if (!id) return;

        try {
            setIsDeleting(id);
            await deleteFile(id);
            setFiles((prev) => prev.filter((file) => file.id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete file");
        } finally {
            setIsDeleting(null);
        }
    };

    useEffect(() => {
        if (extension?.id === "chatbot") {
            console.log("fetching files");
            (async () => {
                try {
                    const files = await fetchFiles();
                    setFiles(files);
                } catch (err) {
                    console.error(err);
                }
            })();
        }

        if (extension?.id === "advertisement") {
            setIsLoading(true);
            getAdvertisement().then((data) => {
                if ("error" in data) {
                    console.error(data.error);
                } else {
                    setAdData(data);
                    setInitialAdData(data);
                }
                setIsLoading(false);
            });
        }
    }, [extension]);

    const handleSave = async () => {
        if (extension?.id === "advertisement" && adData) {
            // Check if there are changes by comparing with initial data
            const hasChanges =
                JSON.stringify(adData) !== JSON.stringify(initialAdData);

            if (hasChanges) {
                try {
                    await updateAdvertisement(adData);
                    setInitialAdData(adData); // Update initial data after successful save
                } catch (error) {
                    console.error("Error updating advertisement:", error);
                    alert("Failed to update advertisement");
                }
            }
        }
        onClose();
    };

    if (!extension) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Configure {extension.name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {extension.id === "chatbot" && (
                        <div className="flex flex-col items-start w-full justify-start">
                            <FileUploader onSave={onSaveFile} />
                            <Separator />
                            <div className="w-full flex flex-col gap-2 mt-2">
                                <p className="font-bold">Uploaded Files:</p>
                                <div className="w-full flex flex-col gap-4">
                                    {files.map((file) => (
                                        <div
                                            key={file.id}
                                            className="flex items-center gap-4 w-full justify-between">
                                            <Label>{file.name}</Label>
                                            <Button
                                                className="bg-red-500 hover:bg-red-500/90"
                                                onClick={() =>
                                                    handleDeleteFile(file.id)
                                                }
                                                disabled={
                                                    isDeleting === file.id
                                                }>
                                                <X />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {extension.id === "products-for-you" && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="max-products"
                                className="text-right">
                                Max Products
                            </Label>
                            <Input
                                id="max-products"
                                type="number"
                                defaultValue="4"
                                className="col-span-3"
                            />
                        </div>
                    )}
                    {extension.id === "image-gallery" && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="layout" className="text-right">
                                Layout
                            </Label>
                            <select
                                id="layout"
                                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                defaultValue="grid">
                                <option value="grid">Grid</option>
                                <option value="carousel">Carousel</option>
                                <option value="masonry">Masonry</option>
                            </select>
                        </div>
                    )}
                    {extension.id === "price-comparison" && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="competitors" className="text-right">
                                Competitors
                            </Label>
                            <Textarea
                                id="competitors"
                                placeholder="Enter competitor URLs (one per line)"
                                className="col-span-3"
                            />
                        </div>
                    )}
                    {extension.id === "advertisement" && adData && (
                        <div className="space-y-4 mt-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="ad-enable">
                                    Enable Advertisement
                                </Label>
                                <Switch
                                    id="ad-enable"
                                    checked={adData.enable}
                                    onCheckedChange={(checked) => {
                                        setAdData((prev) =>
                                            prev
                                                ? { ...prev, enable: checked }
                                                : prev
                                        );
                                    }}
                                />
                            </div>
                            <Separator className="my-4" />
                            <AdForm
                                initialData={adData}
                                onSubmit={(data) => setAdData(data)}
                            />
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

interface AdvertisementFormProps {
    onSubmit: (data: advertisement) => void;
    initialData: advertisement;
}

function AdForm({ onSubmit, initialData }: AdvertisementFormProps) {
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

    const handleFormSubmit = (data: z.infer<typeof advertisementSchema>) => {
        // Pass enable state from parent component
        onSubmit({
            ...data,
            enable: initialData.enable,
        });
    };

    return (
        <form onChange={handleSubmit(handleFormSubmit)} className="space-y-4">
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
        </form>
    );
}
