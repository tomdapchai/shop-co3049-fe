"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import TagInput from "@/components/form/TagInput";
import ImageUploader from "@/components/form/ImageUploader";
import BlogPreview from "@/components/dialog/Preview";
import { UploadedImage } from "../../blogs/create/page";
import { uploadToCDN } from "@/lib/utils";
import { convertToReact } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { CheckboxGroup } from "@/components/input/CheckBoxGroup";
import { ColorMapping } from "@/components/decoration/ColorMaping";
import { createProduct, ProductCreate } from "@/services/ProductService";
import { createProductImage } from "@/services/ImageService";
import { productSchema } from "@/lib/validation";
import { sizeOptions, colorOptions } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Image from "next/image";
type ProductFormValues = z.infer<typeof productSchema>;

export default function CreateProductPage() {
    const [tags, setTags] = useState<string[]>([]);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [descriptionImages, setDescriptionImages] = useState<UploadedImage[]>(
        []
    );
    const [previewContent, setPreviewContent] = useState<string>("");
    const [isCreating, setIsCreating] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<ProductFormValues>({
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

    const handleImageUpload = (file: File) => {
        const blobUrl = URL.createObjectURL(file);
        const alt = file.name.split(".").slice(0, -1).join(".");
        setUploadedImages((prev) => [...prev, { alt, src: blobUrl, file }]);
    };

    const deleteImageUpload = (srcToDelete: string) => {
        setUploadedImages((prev) => {
            const updatedImages = prev.filter(
                (image) => image.src !== srcToDelete
            );
            URL.revokeObjectURL(srcToDelete);
            return updatedImages;
        });
    };

    const updateImageAlt = (oldAlt: string, newAlt: string) => {
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
        setDescriptionImages((prev) => {
            const updatedImages = prev.filter(
                (image) => image.src !== srcToDelete
            );
            URL.revokeObjectURL(srcToDelete);
            return updatedImages;
        });
    };

    const updateDescriptionImageAlt = (oldAlt: string, newAlt: string) => {
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

    const onSubmit = async (values: z.infer<typeof productSchema>) => {
        try {
            setIsCreating(true);
            if (uploadedImages.length === 0) {
                toast({
                    title: "Error",
                    description: "Please upload at least one product image",
                    variant: "destructive",
                });
                setIsCreating(false);
                return;
            }

            const uploadProductImages = await Promise.all(
                uploadedImages.map(async (image) => {
                    try {
                        console.log(`Starting upload for image: ${image.alt}`);
                        const url = await uploadToCDN(image.file!);
                        if (typeof url === "string") {
                            console.log(
                                `Successfully uploaded image: ${image.alt}`
                            );
                            return { alt: image.alt, src: url };
                        } else {
                            console.log("Error uploading image:", image.alt);
                            toast({
                                title: "Error",
                                description: `Error uploading image: ${image.alt}`,
                                variant: "destructive",
                            });
                            setIsCreating(false);
                            return null;
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
                        setIsCreating(false);
                        return null;
                    }
                })
            );

            const finalUploadedImages = uploadProductImages.filter(
                (image) => image !== null
            );

            if (finalUploadedImages.length !== uploadedImages.length) {
                toast({
                    title: "Error",
                    description: "Failed to upload all images",
                    variant: "destructive",
                });
                setIsCreating(false);
                return;
            }

            const uploadDescriptionImages = await Promise.all(
                descriptionImages.map(async (image) => {
                    try {
                        console.log(`Starting upload for image: ${image.alt}`);
                        const url = await uploadToCDN(image.file!);
                        if (typeof url === "string") {
                            console.log(
                                `Successfully uploaded image: ${image.alt}`
                            );
                            return { alt: image.alt, src: url };
                        } else {
                            console.log("Error uploading image:", image.alt);
                            toast({
                                title: "Error",
                                description: `Error uploading image: ${image.alt}`,
                                variant: "destructive",
                            });
                            setIsCreating(false);
                            return null;
                        }
                    } catch (error) {
                        console.error(
                            `Error uploading image "${image.alt}":`,
                            error
                        );
                        toast({
                            title: "Error",
                            description: `Failed to upload image "${image.alt}"`,
                            variant: "destructive",
                        });
                        setIsCreating(false);
                        return null;
                    }
                })
            );

            const finalDescriptionImages = uploadDescriptionImages.filter(
                (image) => image !== null
            );

            if (finalDescriptionImages.length !== descriptionImages.length) {
                toast({
                    title: "Error",
                    description: "Failed to upload all images",
                    variant: "destructive",
                });
                setIsCreating(false);
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

            console.log({
                ...values,
                images: finalUploadedImages,
                fullDescription: convertedDescription,
            });
            console.log("Uploaded Images:", finalUploadedImages);
            console.log("Description Images:", finalDescriptionImages);

            const { productId, shortDescription, fullDescription, ...rest } =
                values;

            console.log("Product Data:", { ...rest });
            await createProduct({
                ...rest,
                slug: productId,
                overview: shortDescription,
                description: convertedDescription,
                descriptionOriginal: values.fullDescription,
            })
                .then((res) => {
                    if ("error" in res) {
                        toast({
                            title: "Error",
                            description: "Failed to create product",
                            variant: "destructive",
                        });
                        setIsCreating(false);
                        return;
                    } else {
                        toast({
                            title: "Success",
                            description: "Product created successfully",
                            variant: "default",
                        });
                    }
                })
                .then(() => {
                    // create product images
                    finalUploadedImages.forEach(async (image) => {
                        await createProductImage(values.productId, {
                            src: image.src,
                            imageId: image.alt,
                            type: "product",
                        }).then((res) => {
                            if ("error" in res) {
                                toast({
                                    title: "Error",
                                    description:
                                        "Failed to create product image",
                                    variant: "destructive",
                                });
                                setIsCreating(false);
                                return;
                            }
                        });
                    });

                    // create description images
                    finalDescriptionImages.forEach(async (image) => {
                        await createProductImage(values.productId, {
                            src: image.src,
                            imageId: image.alt,
                            type: "description",
                        }).then((res) => {
                            if ("error" in res) {
                                toast({
                                    title: "Error",
                                    description:
                                        "Failed to create description image",
                                    variant: "destructive",
                                });
                                setIsCreating(false);
                                return;
                            }
                        });
                    });
                })
                .finally(() => {
                    router.push("/admin/products");
                    setIsCreating(false);
                });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to create product",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Create New Product</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
                    <div className=" w-full flex max-md:flex-col justify-between space-x-10 items-start">
                        <div className="flex w-full flex-grow flex-col justify-start items-start space-y-6">
                            <FormField
                                control={form.control}
                                name="productId"
                                render={({ field }) => (
                                    <FormItem className="w-full flex-1">
                                        <FormLabel>Product ID</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
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
                                            <Input {...field} />
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
                                            isEditing={true}
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
                                        <CheckboxGroup
                                            name="color"
                                            items={colorOptions}
                                            control={form.control}
                                            isEditing={true}
                                        />
                                        <FormDescription>
                                            Select available colors for the
                                            product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <ColorMapping />
                            <FormField
                                control={form.control}
                                name="shortDescription"
                                render={({ field }) => (
                                    <FormItem className="w-full flex-1">
                                        <FormLabel>Short Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
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
                                isEditing={true}
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
                                                        Image Description
                                                        guideline Guideline
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
                                    isEditing={true}
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
                                        isEditing={true}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Add tags to categorize the product.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className={`${
                            isCreating
                                ? "bg-[#030391]/20 cursor-not-allowed hover:bg-[#030391]/20 active:bg-[#030391]/20"
                                : "bg-sub hover:bg-main/90 active:bg-main/95"
                        } w-full relative`}>
                        {isCreating ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-3 w-3 border-b border-gray-900" />
                            </div>
                        ) : (
                            "Create Product"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
