// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import { CreateBlog, UpdateBlog, DeleteBlog } from "@/services/BlogService";
import {
    createBlogImage,
    deleteImage,
    updateImageId,
} from "@/services/ImageService";
import { Blog } from "@/types";
import { blogSchema } from "@/lib/validation";
import { UploadedImage } from "../create/page";
import { GetBlogById } from "@/services/BlogService";
import { getImagesFromBlog } from "@/services/ImageService";
import { useRouter } from "next/navigation";
const page = () => {
    const params = useParams();
    const { blogId } = params;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [uploadedThumbnail, setUploadedThumbnail] = useState<UploadedImage>();
    const [previewContent, setPreviewContent] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            blogId: "",
            content: "",
            overview: "",
            tags: [],
            thumbnail: "/images/banner.jpg",
        },
    });

    useEffect(() => {
        GetBlogById(blogId as string).then((data) => {
            if ("error" in data) {
                console.error(data.error);
                return;
            } else {
                setBlog(data);
                form.reset({
                    title: data.title,
                    content: data.contentOriginal,
                    tags: data.tags,
                    blogId: data.blogId,
                    overview: data.overview || "",
                });
            }
        });

        getImagesFromBlog(blogId as string).then((data) => {
            if ("error" in data) {
                console.log(data.error);
                return;
            } else {
                setUploadedImages(
                    data
                        .filter((img) => img.isThumbnail == false)
                        .map((img) => ({
                            alt: img.imageId,
                            src: img.src,
                            file: null,
                        }))
                );

                setUploadedThumbnail(
                    data
                        .filter((img) => img.isThumbnail == true)
                        .map((img) => ({
                            alt: img.imageId,
                            src: img.src,
                            file: null,
                        }))[0]
                );
            }
        });
    }, []);

    if (!blog) {
        return <div>Loading blog...</div>;
    }

    const handleDeleteBlog = async () => {
        await DeleteBlog(blogId as string).then((res) => {
            if ("error" in res) {
                console.log(res.error);
                toast({
                    title: "Error",
                    description: "Error deleting blog",
                    variant: "destructive",
                });
                return;
            } else {
                toast({
                    title: "Success",
                    description: "Blog deleted successfully",
                    variant: "default",
                });
            }
        });
        router.push("/admin/blogs");
    };

    const handleImageUpload = (file: File) => {
        const blobURL = URL.createObjectURL(file);
        // take the file name and remove the extension, there would be file with . in the middle so to be saft, split at the last dot
        const alt = file.name.split(".").slice(0, -1).join(".");
        setUploadedImages((prev) => [...prev, { alt, src: blobURL, file }]);
    };

    const deleteUploadedImage = async (srcToDelete: string) => {
        if (!srcToDelete.startsWith("blob")) {
            console.log("Deleting image:", srcToDelete);
            const imageToDelete = uploadedImages.filter(
                (img) => img.src === srcToDelete
            );
            console.log("Deleting image:", imageToDelete);
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
        const image = uploadedImages.filter((img) => img.alt === oldAlt);
        if (image[0].alt === oldAlt) {
            await updateImageId({ imageId: oldAlt, newId: newAlt });
        }

        setUploadedImages((prev) =>
            prev.map((img) =>
                img.alt === oldAlt ? { ...img, alt: newAlt } : img
            )
        );
    };

    const handleThumbnailUpload = (file: File) => {
        const blobURL = URL.createObjectURL(file);
        const alt = file.name.split(".").slice(0, -1).join(".");
        setUploadedThumbnail({
            alt,
            src: blobURL,
            file,
        });
    };

    const deleteThumbnail = async () => {
        if (uploadedThumbnail && !uploadedThumbnail.src.startsWith("blob")) {
            await deleteImage(uploadedThumbnail.alt);
        }
        setUploadedThumbnail(undefined);
    };

    const updateThumbnailAlt = async (oldAlt: string, newAlt: string) => {
        if (!uploadedThumbnail!.src.startsWith("blob")) {
            await updateImageId({ imageId: oldAlt, newId: newAlt });
        }
        setUploadedThumbnail((prev) => ({ ...prev, alt: newAlt }));
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

    const handleSave = async (data: z.infer<typeof blogSchema>) => {
        try {
            setIsSaving(true);
            if (uploadedImages.length === 0) {
                toast({
                    title: "Error",
                    description: "Please upload at least one image",
                    variant: "destructive",
                });
                setIsSaving(false);
                return;
            }

            if (!uploadedThumbnail) {
                toast({
                    title: "Error",
                    description: "Please upload a thumbnail",
                    variant: "destructive",
                });
                setIsSaving(false);
                return;
            }

            const neededUploadImages = uploadedImages.filter((img) =>
                img.src.startsWith("blob")
            );

            const successUploadImages = await Promise.all(
                uploadedImages.map(async (img) => {
                    try {
                        if (img.src.startsWith("blob")) {
                            const url = await uploadToCDN(img.file!);
                            if (typeof url === "string") {
                                neededUploadImages.forEach((image) => {
                                    if (img.alt === image.alt) {
                                        image.src = url;
                                    }
                                });
                                return { alt: img.alt, src: url };
                            } else {
                                console.log("Error uploading image:", img.alt);
                                toast({
                                    title: "Error",
                                    description: `Error uploading image ${img.alt}`,
                                    variant: "destructive",
                                });
                                setIsSaving(false);
                                return null;
                            }
                        } else {
                            return { alt: img.alt, src: img.src };
                        }
                    } catch (error) {
                        console.log("Error saving image:", error);
                        toast({
                            title: "Error",
                            description: "Error saving image",
                            variant: "destructive",
                        });
                        return null;
                    }
                })
            );

            const finalUploadedImages = successUploadImages.filter(
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

            // do the same but uploadThumbnail is one image only

            var tmpThumbSrc = ""

            const neededUploadThumbnail = uploadedThumbnail.src.startsWith(
                "blob"
            )
                ? uploadedThumbnail
                : null;

            if (neededUploadThumbnail) {
                const url = await uploadToCDN(neededUploadThumbnail.file!);
                if (typeof url === "string") {
                    tmpThumbSrc = url
                    setUploadedThumbnail({
                        src: url,
                        alt: uploadedThumbnail.alt,
                        file: uploadedThumbnail.file,
                    });
                    neededUploadThumbnail.src = url;
                } else {
                    console.log(
                        "Error uploading thumbnail:",
                        uploadedThumbnail.alt
                    );
                    toast({
                        title: "Error",
                        description: `Error uploading thumbnail ${uploadedThumbnail.alt}`,
                        variant: "destructive",
                    });
                    setIsSaving(false);
                    return;
                }
            }

            let proccesedContent = data.content;
            const imgRegex = /IMG<([^,]+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/g;
            proccesedContent = proccesedContent.replace(
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

            const convertedContent = convertToReact(proccesedContent);

            const { title, tags, content } = data;

            await UpdateBlog(blogId as string, {
                title,
                tags,
                content: convertedContent,
                contentOriginal: data.content,
                overview: data.overview,
                thumbnail: tmpThumbSrc !== "" ? tmpThumbSrc : uploadedThumbnail.src,
            })
                .then((res) => {
                    if ("error" in res) {
                        console.log(res.error);
                        toast({
                            title: "Error",
                            description: "Error saving blog",
                            variant: "destructive",
                        });
                        setIsSaving(false);
                        return;
                    } else {
                        toast({
                            title: "Success",
                            description: "Blog saved successfully",
                            variant: "default",
                        });
                    }
                })
                .then(async () => {
                    neededUploadImages.forEach(async (image) => {
                        await createBlogImage(blogId as string, {
                            imageId: image.alt,
                            src: image.src,
                            isThumbnail: false,
                        }).then((res) => {
                            if ("error" in res) {
                                console.log(res.error);
                                toast({
                                    title: "Error",
                                    description: "Error saving image",
                                    variant: "destructive",
                                });
                                setIsSaving(false);
                                return;
                            }
                        });
                    });

                    if (neededUploadThumbnail) {
                        await createBlogImage(blogId as string, {
                            imageId: neededUploadThumbnail.alt,
                            src: neededUploadThumbnail.src,
                            isThumbnail: true,
                        }).then((res) => {
                            if ("error" in res) {
                                console.log(res.error);
                                toast({
                                    title: "Error",
                                    description: "Error saving thumbnail",
                                    variant: "destructive",
                                });
                                setIsSaving(false);
                                return;
                            }
                        });
                    }
                })
                .finally(() => {
                    setIsSaving(false);
                    router.push("/admin/blogs");
                });
        } catch (error) {
            console.log("Error saving blog:", error);
            toast({
                title: "Error",
                description: "Error saving blog",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="w-full ">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
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
                                                    disabled={!isEditing}
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
                                                    disabled
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
                                                placeholder="Enter blog overview"
                                                {...field}
                                                disabled={!isEditing}
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
                                        <FormLabel className="w-full flex justify-between items-center">
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
                                                disabled={!isEditing}
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
                                onDelete={deleteUploadedImage}
                                onUpdateAlt={updateImageAlt}
                                isEditing={isEditing}
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
                                onUpload={handleThumbnailUpload}
                                onDelete={deleteThumbnail}
                                onUpdateAlt={updateThumbnailAlt}
                                isMultiple={false}
                                isEditing={isEditing}
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
                                                isEditing={isEditing}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-start items-center space-x-2">
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
                                            setIsEditing(true);
                                        }}>
                                        Edit Blog
                                    </Button>
                                )}
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDeleteBlog();
                                    }}
                                    className="bg-red-500 hover:bg-red-500/90">
                                    Delete Blog
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
                <Toaster />
            </Form>
        </div>
    );
};

export default page;
