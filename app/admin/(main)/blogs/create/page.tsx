// @ts-nocheck
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageUploader from "@/components/form/ImageUploader";
import BlogPreview from "@/components/dialog/Preview";
import TagInput from "@/components/form/TagInput";
import { convertToReact } from "@/lib/utils";
import Image from "next/image";
import { uploadToCDN } from "@/lib/utils";
import { CreateBlog, DeleteBlog } from "@/services/BlogService";
import { createBlogImage } from "@/services/ImageService";
import { Blog } from "@/types";
import { blogSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
export type UploadedImage = {
    alt: string;
    src: string;
    file: File | null;
};

export default function BlogCreator() {
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [uploadedThumbnail, setUploadedThumbnail] = useState<UploadedImage>();
    const [previewContent, setPreviewContent] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            blogId: "",
            content: "",
            overview: "",
            tags: [],
            thumbnail: "/image/banner.jpg",
        },
    });
    const router = useRouter();

    const handleImageUpload = (file: File) => {
        const blobURL = URL.createObjectURL(file);
        // take the file name and remove the extension, there would be file with . in the middle so to be saft, split at the last dot
        const alt = file.name.split(".").slice(0, -1).join(".");
        setUploadedImages((prev) => [...prev, { alt, src: blobURL, file }]);
    };

    const deleteImage = (srcToDelete: string) => {
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

    const handlePreview = () => {
        let processedContent = form.getValues("content");
        const imgRegex = /IMG<([^,]+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/g;

        processedContent = processedContent.replace(
            imgRegex,
            (match, alt, width, height) => {
                const image = uploadedImages.find((img) => img.alt === alt);
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

        setPreviewContent(convertToReact(processedContent));
    };

    const onSubmit = async (values: z.infer<typeof blogSchema>) => {
        try {
            setIsSubmitting(true);
            if (uploadedThumbnail === undefined) {
                toast({
                    title: "Error",
                    description: "Thumbnail is required",
                    variant: "destructive",
                });
                setIsSubmitting(false);
                return;
            }
            // Wait for all images to be uploaded
            const successfulUploads = await Promise.all(
                uploadedImages.map(async (image) => {
                    try {
                        console.log(`Starting upload for image: ${image.alt}`);
                        const uploadedImage = await uploadToCDN(image.file!);
                        if (typeof uploadedImage === "string") {
                            console.log(
                                `Successfully uploaded image: ${image.alt}`
                            );
                            return { alt: image.alt, src: uploadedImage };
                        } else {
                            console.error(
                                `Failed to upload image: ${image.alt}`,
                                uploadedImage
                            );
                            toast({
                                title: "Error",
                                description: `Failed to upload image "${image.alt}"`,
                                variant: "destructive",
                            });
                            setIsSubmitting(false);
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
                        setIsSubmitting(false);
                        return null;
                    }
                })
            );

            const finalUploadedImages = successfulUploads.filter(
                (image) => image !== null
            );

            if (finalUploadedImages.length !== uploadedImages.length) {
                setIsSubmitting(false);
                return;
            }

            console.log("uploaded", finalUploadedImages);

            let processedContent = values.content;
            const imgRegex = /IMG<([^,]+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/g;
            processedContent = processedContent.replace(
                imgRegex,
                (match, alt, width, height) => {
                    const image = finalUploadedImages.find(
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

            const thumbnail = await uploadToCDN(uploadedThumbnail.file!);
            if (typeof thumbnail === "string") {
            } else {
                console.error("Failed to upload thumbnail:", thumbnail);
                toast({
                    title: "Error",
                    description: "Failed to upload thumbnail",
                    variant: "destructive",
                });
                setIsSubmitting(false);
                return;
            }

            const convertedContent = convertToReact(processedContent);
            console.log({
                ...values,
                finalUploadedImages,
                convertedContent,
            });

            console.log({
                blogId: values.blogId,
                title: values.title,
                content: convertedContent,
                tags: values.tags,
            });

            await CreateBlog({
                blogId: values.blogId,
                title: values.title,
                overview: values.overview,
                content: convertedContent,
                tags: values.tags,
                contentOriginal: values.content,
                thumbnail: thumbnail,
            })
                .then((res) => {
                    if ("error" in res) {
                        toast({
                            title: "Error",
                            description:
                                "Something went wrong while creating the blog.",
                            variant: "destructive",
                        });
                        setIsSubmitting(false);
                        return;
                    } else {
                        toast({
                            title: "Blog Created",
                            description:
                                "Your blog has been successfully created!",
                        });
                    }
                })
                .then(() => {
                    // create blog images
                    finalUploadedImages.forEach(async (image) => {
                        await createBlogImage(values.blogId, {
                            src: image.src,
                            imageId: image.alt,
                            isThumbnail: false,
                        }).then((res) => {
                            if ("error" in res) {
                                toast({
                                    title: "Error",
                                    description:
                                        "Something went wrong while creating the blog images.",
                                    variant: "destructive",
                                });
                                DeleteBlog(values.blogId).then((res) => {
                                    if ("error" in res) {
                                        toast({
                                            title: "Error",
                                            description:
                                                "Something went wrong while deleting the blog.",
                                            variant: "destructive",
                                        });
                                    }
                                });
                            }
                        });
                    });

                    createBlogImage(values.blogId, {
                        src: thumbnail,
                        imageId: uploadedThumbnail.alt,
                        isThumbnail: true,
                    }).then((res) => {
                        if ("error" in res) {
                            toast({
                                title: "Error",
                                description:
                                    "Something went wrong while creating the blog thumbnail.",
                                variant: "destructive",
                            });
                            DeleteBlog(values.blogId).then((res) => {
                                if ("error" in res) {
                                    toast({
                                        title: "Error",
                                        description:
                                            "Something went wrong while deleting the blog.",
                                        variant: "destructive",
                                    });
                                }
                            });
                        }
                    });
                })
                .finally(() => {
                    setIsSubmitting(false);
                    router.push("/admin/blogs");
                });
        } catch (error) {
            console.error("Error in onSubmit:", error);
            toast({
                title: "Error",
                description: "Something went wrong while creating the blog.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="w-full ">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 p-4">
                    <div className="flex space-x-10">
                        <div className="w-3/4 space-y-4">
                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Blog Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter blog name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="blogId"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Blog ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter blog ID"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="overview"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Overview</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write your blog overview here..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex w-full justify-between items-center">
                                            <p>Content</p>
                                            <Dialog>
                                                <DialogTrigger>
                                                    <p className="hover:underline">
                                                        Help
                                                    </p>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl max-h-[80vh]">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Blog Content
                                                            Guideline
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    <Image
                                                        src={
                                                            "/images/guidline.png"
                                                        }
                                                        alt="guidline"
                                                        width={800}
                                                        height={600}
                                                    />
                                                </DialogContent>
                                            </Dialog>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write your blog content here..."
                                                className="min-h-[300px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-1/4 space-y-4">
                            <p className="text-lg font-bold">
                                Choose images for content
                            </p>
                            <ImageUploader
                                uploadedImages={uploadedImages}
                                onUpload={handleImageUpload}
                                onDelete={deleteImage}
                                onUpdateAlt={updateImageAlt}
                                isEditing
                            />
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
                                        <DialogTitle>Blog Preview</DialogTitle>
                                    </DialogHeader>
                                    <ScrollArea className="h-full max-h-[calc(80vh-4rem)]">
                                        <BlogPreview content={previewContent} />
                                    </ScrollArea>
                                </DialogContent>
                            </Dialog>
                            <p className="text-lg font-bold">
                                Choose thumbnail
                            </p>
                            <ImageUploader
                                uploadedImages={
                                    uploadedThumbnail ? [uploadedThumbnail] : []
                                }
                                onUpload={(file) => {
                                    const blobURL = URL.createObjectURL(file);
                                    const alt = file.name
                                        .split(".")
                                        .slice(0, -1)
                                        .join(".");
                                    setUploadedThumbnail({
                                        alt,
                                        src: blobURL,
                                        file,
                                    });
                                }}
                                onDelete={() => setUploadedThumbnail(undefined)}
                                onUpdateAlt={(oldAlt, newAlt) => {
                                    setUploadedThumbnail((prev) => ({
                                        ...prev,
                                        alt: newAlt,
                                    }));
                                }}
                                isMultiple={false}
                                isEditing
                            />
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <TagInput
                                                tags={field.value}
                                                setTags={field.onChange}
                                                isEditing
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className={`${
                                    isSubmitting
                                        ? "bg-[#030391]/20 cursor-not-allowed hover:bg-[#030391]/20 active:bg-[#030391]/20"
                                        : "bg-sub hover:bg-main/90 active:bg-main/95"
                                } w-full relative`}>
                                {isSubmitting ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-3 w-3 border-b border-gray-900" />
                                    </div>
                                ) : (
                                    "Create Blog"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
                <Toaster />
            </Form>
        </div>
    );
}
