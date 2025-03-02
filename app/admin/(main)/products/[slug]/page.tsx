"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductDetail } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/form/ImageUploader";
import TagInput from "@/components/form/TagInput";
import { Review } from "@/types";
import { getProductBySlug, updateProduct } from "@/services/ProductService";
import { UploadedImage } from "../../blogs/create/page";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import BlogPreview from "@/components/dialog/Preview";
import { uploadToCDN } from "@/lib/utils";
import { convertToReact } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { CheckboxGroup } from "@/components/input/CheckBoxGroup";
import { ColorMapping } from "@/components/decoration/ColorMaping";
import { createProduct, ProductCreate } from "@/services/ProductService";
import {
    createProductImage,
    deleteImage,
    updateImageId,
} from "@/services/ImageService";
import { productSchema } from "@/lib/validation";
import { sizeOptions, colorOptions } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { getReviewsByProductId } from "@/services/ReviewService";
import { ReviewSection } from "@/components/ReviewSection";
import Image from "next/image";
import { ColorPickerGroup } from "@/components/input/ColorPickerGroup";

export default function ProductDetailPage() {
    const params = useParams();
    const { slug } = params;
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [descriptionImages, setDescriptionImages] = useState<UploadedImage[]>(
        []
    );
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();
    const [previewContent, setPreviewContent] = useState<string>("");
    const [reviews, setReviews] = useState([]);
    const router = useRouter();

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            productId: "",
            name: "",
            price: 0,
            size: [],
            color: [],
            shortDescription: "",
            fullDescription: "",
            tags: [],
        },
    });

    useEffect(() => {
        getProductBySlug(slug as string).then((data) => {
            if ("error" in data) {
                console.log(data.error);
                return;
            } else {
                // now set the form values
                setProduct(data);

                form.reset({
                    productId: data.slug,
                    name: data.name,
                    price: data.price,
                    size: data.size,
                    color: data.color,
                    shortDescription: data.overview,
                    fullDescription: data.descriptionOriginal,
                    tags: data.tags,
                });

                // now set images
                const prodImages = data.images
                    .filter((img) => img.type == "product")
                    .map((img) => {
                        return {
                            alt: img.imageId,
                            src: img.src,
                            file: null,
                        };
                    });
                setUploadedImages(prodImages);

                // now set description images
                const descImages = data.images
                    .filter((img) => img.type == "description")
                    .map((img) => {
                        return {
                            alt: img.imageId,
                            src: img.src,
                            file: null,
                        };
                    });

                setDescriptionImages(descImages);

                setTags(data.tags);
            }
        });
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleImageUpload = (file: File) => {
        const blobUrl = URL.createObjectURL(file);
        const alt = file.name.split(".").slice(0, -1).join(".");
        setUploadedImages((prev) => [...prev, { alt, src: blobUrl, file }]);
    };

    const deleteImageUpload = async (srcToDelete: string) => {
        if (!srcToDelete.startsWith("blob")) {
            const imageToDelete = uploadedImages.filter(
                (img) => img.src === srcToDelete
            );
            await deleteImage(imageToDelete[0].alt);
        }
        setUploadedImages((prev) => {
            const updatedImages = prev.filter(
                (image) => image.src !== srcToDelete
            );
            URL.revokeObjectURL(srcToDelete);
            return updatedImages;
        });
    };

    const updateImageAlt = async (oldAlt: string, newAlt: string) => {
        const image = uploadedImages.filter((img) => img.alt == oldAlt);
        console.log("editing", image);
        if (!image[0].src.startsWith("blob")) {
            console.log(image);
            await updateImageId({
                imageId: oldAlt,
                newId: newAlt,
            });
        }
        setUploadedImages((prev) =>
            prev.map((img) =>
                img.alt === oldAlt ? { ...img, alt: newAlt } : img
            )
        );
    };

    const handleDescriptionImageUpload = (file: File) => {
        const blobUrl = URL.createObjectURL(file);
        const alt = file.name.split(".").slice(0, -1).join(".");
        setDescriptionImages((prev) => [...prev, { alt, src: blobUrl, file }]);
    };

    const deleteImageDescription = (srcToDelete: string) => {
        if (!srcToDelete.startsWith("blob")) {
            const imageToDelete = descriptionImages.filter(
                (img) => img.src === srcToDelete
            );
            deleteImage(imageToDelete[0].alt);
        }
        setDescriptionImages((prev) => {
            const updatedImages = prev.filter(
                (image) => image.src !== srcToDelete
            );
            URL.revokeObjectURL(srcToDelete);
            return updatedImages;
        });
    };

    const updateDescriptionImageAlt = (oldAlt: string, newAlt: string) => {
        const image = descriptionImages.filter((img) => img.alt == oldAlt);
        if (!image[0].src.startsWith("blob")) {
            updateImageId({
                imageId: oldAlt,
                newId: newAlt,
            });
        }
        setDescriptionImages((prev) =>
            prev.map((img) =>
                img.alt === oldAlt ? { ...img, alt: newAlt } : img
            )
        );
    };

    const handlePreview = () => {
        let processedDescription = form.getValues("fullDescription");
        const imgRegex = /IMG<([^,]+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/g;

        processedDescription = processedDescription.replace(
            imgRegex,
            (match, alt, width, height) => {
                const image = descriptionImages.find((img) => img.alt === alt);
                if (!image) {
                    toast({
                        title: "Error",
                        description: `Image with alt "${alt}" not found`,
                        variant: "destructive",
                    });
                    return match;
                }
                return `IMG<${alt},${image.src}${width ? `,${width}` : ""}${
                    height ? `,${height}` : ""
                }>`;
            }
        );

        setPreviewContent(convertToReact(processedDescription));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async (values: z.infer<typeof productSchema>) => {
        console.log("Saving product:", values);
        try {
            setIsSaving(true);
            if (uploadedImages.length === 0) {
                toast({
                    title: "Error",
                    description: "Please upload at least one product image",
                    variant: "destructive",
                });
                setIsSaving(false);
                return;
            }

            const neededUploadProductImages = uploadedImages.filter((img) =>
                img.src.startsWith("blob")
            );

            const uploadProductImages = await Promise.all(
                uploadedImages.map(async (image) => {
                    try {
                        if (image.src.startsWith("blob")) {
                            const url = await uploadToCDN(image.file!);
                            if (typeof url === "string") {
                                // store the new url back to according images in neededUploadProductImages
                                neededUploadProductImages.forEach((img) => {
                                    if (img.alt === image.alt) {
                                        img.src = url;
                                    }
                                });
                                return { alt: image.alt, src: url };
                            } else {
                                console.log(
                                    "Error uploading image:",
                                    image.alt
                                );
                                toast({
                                    title: "Error",
                                    description: `Error uploading image: ${image.alt}`,
                                    variant: "destructive",
                                });
                                setIsSaving(false);
                                return null;
                            }
                        } else {
                            return { alt: image.alt, src: image.src };
                        }
                    } catch (error) {
                        console.log(
                            `Error uploading image "${image.alt}":`,
                            error
                        );
                        toast({
                            title: "Error",
                            description: `Failed to upload image "${image.alt}"`,
                            variant: "destructive",
                        });
                        setIsSaving(false);
                        return null;
                    }
                })
            );

            const finalUploadedImages = uploadProductImages.filter(
                (img) => img !== null
            );

            if (finalUploadedImages.length !== uploadedImages.length) {
                toast({
                    title: "Error",
                    description: "Failed to upload all images",
                    variant: "destructive",
                });
                setIsSaving(false);
                return;
            }

            const neededUploadDescriptionImages = descriptionImages.filter(
                (img) => img.src.startsWith("blob")
            );

            const uploadDescriptionImages = await Promise.all(
                descriptionImages.map(async (image) => {
                    try {
                        if (image.src.startsWith("blob")) {
                            console.log("Uploading", image.alt);
                            const url = await uploadToCDN(image.file!);
                            if (typeof url === "string") {
                                neededUploadDescriptionImages.forEach((img) => {
                                    if (img.alt === image.alt) {
                                        img.src = url;
                                    }
                                });
                                return { alt: image.alt, src: url };
                            } else {
                                console.log(
                                    "Error uploading image:",
                                    image.alt
                                );
                                toast({
                                    title: "Error",
                                    description: `Error uploading image: ${image.alt}`,
                                    variant: "destructive",
                                });
                                setIsSaving(false);
                                return null;
                            }
                        } else {
                            return { alt: image.alt, src: image.src };
                        }
                    } catch (error) {
                        console.log(
                            `Error uploading image "${image.alt}":`,
                            error
                        );
                        toast({
                            title: "Error",
                            description: `Failed to upload image "${image.alt}"`,
                            variant: "destructive",
                        });
                        setIsSaving(false);
                        return null;
                    }
                })
            );

            const finalDescriptionImages = uploadDescriptionImages.filter(
                (img) => img !== null
            );

            if (finalDescriptionImages.length !== descriptionImages.length) {
                toast({
                    title: "Error",
                    description: "Failed to upload all images",
                    variant: "destructive",
                });
                setIsSaving(false);
                return;
            }

            let processedDescription = values.fullDescription;
            const imgRegex = /IMG<([^,]+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/g;
            processedDescription = processedDescription.replace(
                imgRegex,
                (match, alt, width, height) => {
                    const image = finalDescriptionImages.find(
                        (img) => img.alt === alt
                    );
                    if (!image) {
                        toast({
                            title: "Error",
                            description: `Image with alt "${alt}" not found`,
                            variant: "destructive",
                        });
                        return match;
                    }
                    return `IMG<${alt},${image.src}${width ? `,${width}` : ""}${
                        height ? `,${height}` : ""
                    }>`;
                }
            );

            const convertedDescription = convertToReact(processedDescription);

            const { productId, shortDescription, fullDescription, ...rest } =
                values;

            await updateProduct(productId, {
                ...rest,
                overview: shortDescription,
                description: convertedDescription,
                descriptionOriginal: values.fullDescription,
            })
                .then((res) => {
                    if ("error" in res) {
                        toast({
                            title: "Error",
                            description: "Failed to update product",
                            variant: "destructive",
                        });
                        setIsSaving(false);
                        return;
                    } else {
                        toast({
                            title: "Success",
                            description: "Product updated successfully",
                            variant: "default",
                        });
                    }
                })
                .then(() => {
                    neededUploadProductImages.forEach(async (image) => {
                        await createProductImage(productId, {
                            imageId: image.alt,
                            src: image.src,
                            type: "product",
                        }).then((res) => {
                            if ("error" in res) {
                                toast({
                                    title: "Error",
                                    description:
                                        "Failed to create product image",
                                    variant: "destructive",
                                });
                                setIsSaving(false);
                                return;
                            }
                        });
                    });

                    neededUploadDescriptionImages.forEach(async (image) => {
                        console.log("Creating description image:", image);
                        await createProductImage(productId, {
                            imageId: image.alt,
                            src: image.src,
                            type: "description",
                        }).then((res) => {
                            if ("error" in res) {
                                toast({
                                    title: "Error",
                                    description:
                                        "Failed to create description image",
                                    variant: "destructive",
                                });
                                setIsSaving(false);
                                return;
                            }
                        });
                    });
                })
                .finally(() => {
                    setIsSaving(false);
                    router.push("/admin/products");
                });
        } catch (error) {
            console.error("Error saving product:", error);
            setIsSaving(false);
        }
    };

    return (
        <div className="container mx-auto py-8 space-y-8">
            <h1 className="text-3xl font-bold">Product Detail</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSave)}>
                    <div className=" w-full flex max-md:flex-col justify-between space-x-10 items-start">
                        <div className="flex w-full flex-grow flex-col justify-start items-start space-y-6">
                            <FormField
                                control={form.control}
                                name="productId"
                                render={({ field }) => (
                                    <FormItem className="w-full flex-1">
                                        <FormLabel>Product ID</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled />
                                        </FormControl>
                                        <FormDescription>
                                            Enter a unique identifier for the
                                            product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="w-full flex-1">
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={!isEditing}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the name of the product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="w-full flex-1">
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseFloat(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                                disabled={!isEditing}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the price of the product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="size"
                                render={({ field }) => (
                                    <FormItem className="w-full flex-1">
                                        <FormLabel>Sizes</FormLabel>
                                        <CheckboxGroup
                                            name="size"
                                            items={sizeOptions}
                                            control={form.control}
                                            isEditing={isEditing}
                                        />
                                        <FormDescription>
                                            Select available sizes for the
                                            product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                    <FormItem className="w-full flex-1">
                                        <FormLabel>Colors</FormLabel>
                                        {/* <CheckboxGroup
                                            name="color"
                                            items={colorOptions}
                                            control={form.control}
                                            isEditing={isEditing}
                                        /> */}
                                        <ColorPickerGroup
                                            name="color"
                                            value={field.value}
                                            onChange={field.onChange}
                                            isEditing={isEditing}
                                        />
                                        <FormDescription>
                                            Select available colors for the
                                            product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="shortDescription"
                                render={({ field }) => (
                                    <FormItem className="w-full flex-1">
                                        <FormLabel>Short Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                disabled={!isEditing}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Enter a brief description of the
                                            product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="lg:w-[500px]">
                            <h3 className="text-lg font-semibold mb-2">
                                Product Images
                            </h3>
                            <ImageUploader
                                uploadedImages={uploadedImages}
                                onUpload={handleImageUpload}
                                onDelete={deleteImageUpload}
                                onUpdateAlt={updateImageAlt}
                                isEditing={isEditing}
                            />
                        </div>
                    </div>

                    <div className="flex w-full justify-between space-x-10 items-start">
                        <FormField
                            control={form.control}
                            name="fullDescription"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="w-full flex justify-between items-center">
                                        <p>Full description</p>
                                        <Dialog>
                                            <DialogTrigger>
                                                <p className="hover:underline">
                                                    Help
                                                </p>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-4xl max-h-[80vh]">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Blog Content Guideline
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <Image
                                                    src={"/images/guidline.png"}
                                                    alt="guidline"
                                                    width={800}
                                                    height={600}
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            disabled={!isEditing}
                                            className="min-h-[300px]"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a detailed description of the
                                        product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col justify-start items-start space-y-6 lg:w-[500px]">
                            <div className="w-full">
                                <h3 className="text-lg font-semibold mb-2">
                                    Description Images
                                </h3>
                                <ImageUploader
                                    uploadedImages={descriptionImages}
                                    onUpload={handleDescriptionImageUpload}
                                    onDelete={deleteImageDescription}
                                    onUpdateAlt={updateDescriptionImageAlt}
                                    isEditing={isEditing}
                                />
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={handlePreview}
                                        className="w-full">
                                        Preview
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[80vh]">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Product Description Preview
                                        </DialogTitle>
                                    </DialogHeader>
                                    <ScrollArea className="h-full max-h-[calc(80vh-4rem)]">
                                        <BlogPreview content={previewContent} />
                                    </ScrollArea>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <TagInput
                                        tags={tags}
                                        setTags={(newTags) => {
                                            setTags(newTags);
                                            field.onChange(newTags);
                                        }}
                                        isEditing={isEditing}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Add tags to categorize the product.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {isEditing ? (
                        <div className="flex justify-start items-start space-x-4 w-fit">
                            <Button
                                type="submit"
                                className={`${
                                    isSaving
                                        ? "bg-[#030391]/20 cursor-not-allowed hover:bg-[#030391]/20 active:bg-[#030391]/20"
                                        : "bg-sub hover:bg-main/90 active:bg-main/95"
                                } w-full relative`}>
                                {isSaving ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-3 w-3 border-b border-gray-900" />
                                    </div>
                                ) : (
                                    "Save changes"
                                )}
                            </Button>
                            {!isSaving && (
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsEditing(false);
                                    }}>
                                    Cancel{" "}
                                </Button>
                            )}
                        </div>
                    ) : (
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                handleEdit();
                            }}>
                            Edit Product
                        </Button>
                    )}
                </form>
            </Form>
            <div className="flex flex-col justify-start items-start space-y-6">
                <p className="font-bold text-xl">Review sections</p>
                {product.reviews.length > 0 ? (
                    <ReviewSection reviews={product.reviews} />
                ) : (
                    <div className="w-full flex justify-center items-center">
                        <p className="text-xl font-bold text-sub">
                            No review yet
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
