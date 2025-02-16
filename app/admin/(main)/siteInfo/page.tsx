"use client";

import { useState, useEffect } from "react";
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
import { getSiteInfo, updateSiteInfo } from "@/services/SiteInfoService";
import { siteInfo } from "@/types";
import { siteInfoSchema } from "@/lib/validation";
import { createAboutImage, getAllImages } from "@/services/ImageService";
export type UploadedImage = {
    alt: string;
    src: string;
    file: File | null;
};

export default function SiteInfo() {
    const [siteInfo, setSiteInfo] = useState<siteInfo>();
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [previewContent, setPreviewContent] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof siteInfoSchema>>({
        resolver: zodResolver(siteInfoSchema),
        defaultValues: {
            about: "",
            address: "",
            email: "",
            phoneNumber: "",
        },
    });

    useEffect(() => {
        getSiteInfo().then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error",
                    description: "Failed to fetch site info",
                    variant: "destructive",
                });
            } else {
                setSiteInfo(res);
                form.reset({
                    about: res.aboutOriginal,
                    address: res.address,
                    email: res.email,
                    phoneNumber: res.phoneNumber,
                });
            }
        });

        getAllImages().then((res) => {
            if ("error" in res) {
                toast({
                    title: "Error",
                    description: "Failed to fetch images",
                    variant: "destructive",
                });
            } else {
                setUploadedImages(
                    res
                        .filter((image) => image.imageId.startsWith("about"))
                        .map((image) => ({
                            alt: image.imageId,
                            src: image.src,
                            file: null,
                        }))
                );
            }
        });
    }, []);

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
        let processedContent = form.getValues("about");
        const imgRegex = /IMG<([^,]+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/g;

        processedContent = processedContent!.replace(
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

    const onSubmit = async (values: z.infer<typeof siteInfoSchema>) => {
        try {
            setIsSubmitting(true);
            // Wait for all images to be uploaded
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
                return;
            }

            console.log("uploaded", finalUploadedImages);

            let processedAbout = values.about;
            const imgRegex = /IMG<([^,]+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/g;
            processedAbout = processedAbout!.replace(
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

            const convertedAbout = convertToReact(processedAbout);
            await updateSiteInfo({
                about: convertedAbout,
                aboutOriginal: values.about,
                address: values.address,
                email: values.email,
                phoneNumber: values.phoneNumber,
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
                    neededUploadImages.forEach(async (image) => {
                        await createAboutImage({
                            src: image.src,
                            imageId: image.alt,
                        }).then((res) => {
                            if ("error" in res) {
                                toast({
                                    title: "Error",
                                    description:
                                        "Something went wrong while creating the about images.",
                                    variant: "destructive",
                                });
                            }
                        });
                    });
                })
                .finally(() => {
                    setIsSubmitting(false);
                });
        } catch (error) {
            console.error("Error in onSubmit:", error);
            toast({
                title: "Error",
                description: "Something went wrong while updating site info.",
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
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter company address"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter company email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Phone number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter company phone number"
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
                                name="about"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>About</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write your company introduction here"
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
                                Choose images for about
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
                                    "Update site info"
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
