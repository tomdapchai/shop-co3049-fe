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
import { categorySchema } from "@/lib/validation";
import { category } from "@/types";
import { UploadedImage } from "../blogs/create/page";
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from "@/services/CategoryService";

export default function CategoryManagement() {
    const { toast } = useToast();
    const [categories, setCategories] = useState<category[]>([]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<category | null>(
        null
    );

    useEffect(() => {
        getAllCategories().then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error fetching categories",
                    description: res.error,
                    variant: "destructive",
                });
                return;
            }
            setCategories(res);
        });
    }, []);

    const handleAddCategory = async (newCategory: category) => {
        await createCategory(newCategory)
            .then((res) => {
                if ("error" in res) {
                    toast({
                        title: "Error creating category",
                        description: res.error,
                        variant: "destructive",
                    });
                    return;
                }
                setCategories([...categories, newCategory]);
            })
            .finally(() => {
                setIsDialogOpen(false);
                toast({
                    title: "category added",
                    description: `${newCategory.name} has been added successfully.`,
                });
            });
    };

    const handleEditCategory = async (updatedCategory: category) => {
        await updateCategory(updatedCategory)
            .then((res) => {
                if ("error" in res) {
                    toast({
                        title: "Error updating category",
                        description: res.error,
                        variant: "destructive",
                    });
                    return;
                }
                setCategories(
                    categories.map((cat) =>
                        cat.categoryId === updatedCategory.categoryId
                            ? updatedCategory
                            : cat
                    )
                );
            })
            .finally(() => {
                setIsDialogOpen(false);
                setEditingCategory(null);
                toast({
                    title: "category updated",
                    description: `${updatedCategory.name} has been updated successfully.`,
                });
            });
    };

    const handleDeleteCategory = async (categoryId: string) => {
        await deleteCategory(categoryId)
            .then((res) => {
                if ("error" in res) {
                    toast({
                        title: "Error deleting category",
                        description: res.error,
                        variant: "destructive",
                    });
                    return;
                }
                setCategories(
                    categories.filter((cat) => cat.categoryId !== categoryId)
                );
            })
            .finally(() => {
                toast({
                    title: "category deleted",
                    description: "The category has been deleted successfully.",
                    variant: "destructive",
                });
            });
    };

    const openEditDialog = (category: category) => {
        setEditingCategory(category);
        setIsDialogOpen(true);
    };

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Category Management</CardTitle>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => setEditingCategory(null)}
                                className="flex items-center gap-1">
                                <Plus className="h-4 w-4" /> Add category
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingCategory
                                        ? "Edit category"
                                        : "Add New category"}
                                </DialogTitle>
                            </DialogHeader>
                            <CategoryForm
                                onSubmit={
                                    editingCategory
                                        ? handleEditCategory
                                        : handleAddCategory
                                }
                                initialData={editingCategory}
                            />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent className="overflow-x-auto no-scrollbar">
                    <Table className="no-scrollbar">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>category ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="no-scrollbar">
                            {categories.map((category) => (
                                <TableRow key={category.categoryId}>
                                    <TableCell>
                                        <img
                                            src={
                                                category.image ||
                                                "/placeholder.svg"
                                            }
                                            alt={category.name}
                                            className="h-10 w-10 rounded-md object-cover"
                                        />
                                    </TableCell>
                                    <TableCell>{category.categoryId}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    openEditDialog(category)
                                                }>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() =>
                                                    handleDeleteCategory(
                                                        category.categoryId
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
}

interface CategoryFormProps {
    onSubmit: (data: category) => void;
    initialData: category | null;
}

function CategoryForm({ onSubmit, initialData }: CategoryFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: initialData || {
            categoryId: "",
            name: "",
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
                <Label htmlFor="categoryId">category ID</Label>
                <Input
                    id="categoryId"
                    {...register("categoryId")}
                    disabled={!!initialData}
                />
                {errors.categoryId && (
                    <p className="text-sm text-destructive">
                        {errors.categoryId.message}
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
                <Label>category Image</Label>
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
                        ? "Update category"
                        : "Add category"}
                </Button>
            </div>
        </form>
    );
}
