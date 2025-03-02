"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploader from "@/components/form/ImageUploader";
import { uploadToCDN } from "@/lib/utils";
import { socialMedia } from "@/types";
import { socialSchema } from "@/lib/validation";
import { UploadedImage } from "../blogs/create/page";
import {
    getAllSocialMedia,
    getSocialMediaById,
    updateSocialMedia,
    createSocialMedia,
    deleteSocialMedia,
} from "@/services/SocialService";

const page = () => {
    const { toast } = useToast();
    const [socials, setSocials] = useState<socialMedia[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingSocial, setEditingSocial] = useState<socialMedia | null>(
        null
    );

    useEffect(() => {
        getAllSocialMedia().then((data) => {
            if ("error" in data) {
                console.error(data.error);
            } else {
                setSocials(data);
            }
        });
    }, []);

    const handleAddSocial = async (data: socialMedia) => {
        await createSocialMedia(data)
            .then((res) => {
                if ("error" in res) {
                    toast({
                        title: "Error creating social media",
                        description: res.error,
                        variant: "destructive",
                    });
                    return;
                }
                setSocials([...socials, data]);
            })
            .finally(() => {
                setIsDialogOpen(false);
                toast({
                    title: "category added",
                    description: `${data.name} has been added successfully.`,
                });
            });
    };

    const handleEditSocial = async (data: socialMedia) => {
        await updateSocialMedia(data).then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error updating social media",
                    description: res.error,
                    variant: "destructive",
                });
                return;
            }
            setSocials((prev) =>
                prev.map((social) => (social.id === data.id ? data : social))
            );
            setIsDialogOpen(false);
        });
    };

    const handleDeleteSocial = async (id: string) => {
        await deleteSocialMedia(id).then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error deleting social media",
                    description: res.error,
                    variant: "destructive",
                });
                return;
            }
            setSocials((prev) => prev.filter((social) => social.id !== id));
            toast({
                title: "Social media deleted",
                description: `Social media with ID ${id} has been deleted.`,
            });
        });
    };

    const openEditDialog = (social: socialMedia) => {
        setEditingSocial(social);
        setIsDialogOpen(true);
    };

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Social Media Management</CardTitle>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => setEditingSocial(null)}
                                className="flex items-center gap-1">
                                <Plus className="h-4 w-4" /> Add social media
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingSocial
                                        ? "Edit social"
                                        : "Add New social media"}
                                </DialogTitle>
                            </DialogHeader>
                            <SocialForm
                                onSubmit={
                                    editingSocial
                                        ? handleEditSocial
                                        : handleAddSocial
                                }
                                initialData={editingSocial}
                            />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent className="overflow-x-auto no-scrollbar">
                    <Table className="no-scrollbar">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Link</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="no-scrollbar">
                            {socials.map((social) => (
                                <TableRow key={social.id}>
                                    <TableCell>
                                        <img
                                            src={
                                                social.image ||
                                                "/placeholder.svg"
                                            }
                                            alt={social.name}
                                            className="h-10 w-10 rounded-md object-cover"
                                        />
                                    </TableCell>
                                    <TableCell>{social.id}</TableCell>
                                    <TableCell>{social.name}</TableCell>
                                    <TableCell>{social.info}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    openEditDialog(social)
                                                }>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() =>
                                                    handleDeleteSocial(
                                                        social.id
                                                    )
                                                }>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;

interface SocialFormProps {
    onSubmit: (data: socialMedia) => void;
    initialData: socialMedia | null;
}

function SocialForm({ onSubmit, initialData }: SocialFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<z.infer<typeof socialSchema>>({
        resolver: zodResolver(socialSchema),
        defaultValues: initialData || {
            id: "",
            name: "",
            info: "",
            image: "",
        },
    });

    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(
        initialData?.image
            ? [{ alt: initialData.name, src: initialData.image, file: null }]
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
                <Label htmlFor="id">Social ID</Label>
                <Input id="id" {...register("id")} disabled={!!initialData} />
                {errors.id && (
                    <p className="text-sm text-destructive">
                        {errors.id.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                    <p className="text-sm text-destructive">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="info">Link</Label>
                <Input id="info" {...register("info")} />
                {errors.info && (
                    <p className="text-sm text-destructive">
                        {errors.info.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label>Social Logo</Label>
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
                    {isUploading
                        ? "Uploading..."
                        : initialData
                        ? "Update social media"
                        : "Add social media"}
                </Button>
            </div>
        </form>
    );
}
