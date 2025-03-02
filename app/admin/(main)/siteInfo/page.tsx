"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { ColorPicker } from "antd";
import { Editor } from "@tinymce/tinymce-react";

export type UploadedImage = {
    alt: string;
    src: string;
    file: File | null;
};

const initialContent = `
<div id="template">
      <section>
        <main className="editable">
          <h1>Welcome</h1>
          <p>Welcome to our company! We are delighted to have you here and excited to share our journey with you.</p>
          <p>This is where you can introduce your company and make a strong first impression on your visitors.</p>
        </main>
        <footer>
          <p>
            <small>Confidential</small>
          </p>
        </footer>
      </section>

      <section>
        <main className="editable">
          <h1>Our Mission</h1>
          <p>Our company is dedicated to providing exceptional solutions that address the following key areas:</p>
          <ul>
            <li>Mission point 1</li>
            <li>Mission point 2</li>
            <li>Mission point 3</li>
          </ul>
          <p>
            We are committed to excellence in everything we do, ensuring that our clients receive the highest quality
            service and support.
          </p>
          <p>*{mission.statement}*</p>
        </main>
      </section>

      <section>
        <main className="editable">
          <h1>Our Story</h1>
          <p>
            Our journey began with a vision to create something meaningful that would make a difference by *
            {founding.date}*.
          </p>
          <p>We've grown from our humble beginnings to become a trusted name in our industry.</p>
          <p>Here's how our story unfolded:</p>

          <h2>Chapter 1: The Beginning</h2>
          <p>Our founders came together with a shared vision and determined:</p>
          <ul>
            <li>what problems needed solving; and</li>
            <li>how we could provide unique solutions.</li>
          </ul>
          <p>This led to the creation of our company and its core values.</p>

          <h2>Chapter 2: Growth and Development</h2>
          <p>As we expanded, we refined our approach and built a team of dedicated professionals.</p>
          <p>This allowed us to develop innovative solutions tailored to our clients' specific needs.</p>

          <h2>Chapter 3: Where We Are Today</h2>
          <p>Today, we continue to evolve and adapt to meet the changing demands of the market.</p>
          <p>Our commitment to quality and customer satisfaction remains at the heart of everything we do.</p>
        </main>
      </section>

      <section>
        <main className="editable">
          <h1>Our Product</h1>
          <p>Our flagship product is designed to solve real-world problems with innovative features including:</p>
          <ul>
            <li>Feature 1: Description of how this feature benefits users</li>
            <li>Feature 2: Explanation of what makes this feature unique</li>
            <li>Feature 3: Details about how this feature addresses specific needs</li>
          </ul>
          <p>We continuously improve our product based on customer feedback and emerging technologies.</p>
          <p>*{product.launch.date}*</p>
        </main>
      </section>

      <section className="end">
        <main className="editable">
          <p>
            <span style="font-size: 20px;">Example Text Section</span>
          </p>
          <p>&nbsp;</p>
          <p>
            <span style="font-size: 20px;">
              This is an example section where you can add your own content. Feel free to modify this text to suit your
              specific needs.
            </span>
          </p>
          <p>&nbsp;</p>
          <p>
            You can include information about your team, testimonials, or any other content that would be valuable to
            your audience.
          </p>
          <p>&nbsp;</p>
          <p>Contact Information:</p>
          <p>
            Name: [Your Name]
            <br />
            Phone: [Your Phone Number]
            <br />
            <a href="mailto:example@example.com">example@example.com</a>
          </p>
          <p>&nbsp;</p>
          <p>Additional Contact:</p>
          <p>
            Name: [Another Name]
            <br />
            Phone: [Another Phone Number]
            <br />
            <a href="mailto:another@example.com">another@example.com</a>
          </p>
        </main>
      </section>
    </div>
  `;

const content_style = `
    body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    line-height: 1.4;
    margin: 0;
}
.editable {
    padding: 10px;
    margin: 10px 0;
}
section {
    margin-bottom: 30px;
    padding: 20px;
    position: relative;
}
section:not(:last-child)::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -15px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #6f6f6f;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: large;
    font-weight: 600;
    margin: 0;
}

`;

export default function SiteInfo() {
    const [siteInfo, setSiteInfo] = useState<siteInfo>();
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [uploadedLogo, setUploadedLogo] = useState<UploadedImage[]>([]);
    const [uploadedHomeBanner, setUploadedHomeBanner] = useState<
        UploadedImage[]
    >([]);

    const [previewContent, setPreviewContent] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const editorRef = useRef<any>(null);

    const logEditor = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const form = useForm<z.infer<typeof siteInfoSchema>>({
        resolver: zodResolver(siteInfoSchema),
        defaultValues: {
            about: "",
            address: "",
            email: "",
            phoneNumber: "",
            logo: "",
            homeBanner: "",
            themeColor: "#FFFFFF",
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
                    logo: res.logo,
                    homeBanner: res.homeBanner,
                    themeColor: res.themeColor,
                });
                setUploadedLogo([{ alt: "logo", src: res.logo, file: null }]);
                setUploadedHomeBanner([
                    {
                        alt: "homeBanner",
                        src: res.homeBanner,
                        file: null,
                    },
                ]);
            }
        });

        /* getAllImages().then((res) => {
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
        }); */
    }, []);

    const handleLogoUpload = async (file: File) => {
        const url = await uploadToCDN(file);
        if (typeof url === "string") {
            setUploadedLogo([{ alt: file.name, src: url, file }]);
            form.setValue("logo", url);
        } else {
            toast({
                title: "Error",
                description: "Failed to upload image",
                variant: "destructive",
            });
        }
    };

    const handleLogoDelete = (src: string) => {
        setUploadedLogo([]);
        form.setValue("logo", "");
    };

    const handleLogoUpdateAlt = (oldAlt: string, newAlt: string) => {
        setUploadedLogo((prev) =>
            prev.map((img) =>
                img.alt === oldAlt ? { ...img, alt: newAlt } : img
            )
        );
    };

    const handleHomeBannerUpload = async (file: File) => {
        const url = await uploadToCDN(file);
        if (typeof url === "string") {
            setUploadedHomeBanner([{ alt: file.name, src: url, file }]);
            form.setValue("homeBanner", url);
        } else {
            toast({
                title: "Error",
                description: "Failed to upload image",
                variant: "destructive",
            });
        }
    };

    const handleHomeBannerDelete = (src: string) => {
        setUploadedHomeBanner([]);
        form.setValue("homeBanner", "");
    };

    const handleHomeBannerUpdateAlt = (oldAlt: string, newAlt: string) => {
        setUploadedHomeBanner((prev) =>
            prev.map((img) =>
                img.alt === oldAlt ? { ...img, alt: newAlt } : img
            )
        );
    };

    const handleImageUpload = async (file: File) => {
        /* const blobURL = URL.createObjectURL(file);
        // take the file name and remove the extension, there would be file with . in the middle so to be saft, split at the last dot
        const alt = file.name.split(".").slice(0, -1).join(".");
        setUploadedImages((prev) => [...prev, { alt, src: blobURL, file }]); */
        // upload image to cdn
        const url = await uploadToCDN(file);
        if (typeof url === "string") {
            setUploadedImages((prev) => [
                ...prev,
                {
                    alt: file.name.split(".").slice(0, -1).join("."),
                    src: url,
                    file,
                },
            ]);
        } else {
            toast({
                title: "Error",
                description: "Failed to upload image",
                variant: "destructive",
            });
        }
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
            console.log("values", values);
            // Wait for all images to be uploaded
            /* const neededUploadImages = uploadedImages.filter((img) =>
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

            const convertedAbout = convertToReact(processedAbout); */
            console.log("value", values.about);
            await updateSiteInfo({
                about: values.about,
                aboutOriginal: values.about,
                address: values.address,
                email: values.email,
                phoneNumber: values.phoneNumber,
                logo: values.logo,
                homeBanner: values.homeBanner,
                themeColor: values.themeColor,
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
                /* .then(() => {
                    // create blog images
                    uploadedImages.forEach(async (image) => {
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
                }) */
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
                                            <Editor
                                                apiKey={
                                                    process.env
                                                        .NEXT_PUBLIC_TINYMCE_API_KEY
                                                }
                                                onInit={(
                                                    _evt: any,
                                                    editor: any
                                                ) =>
                                                    (editorRef.current = editor)
                                                }
                                                intialValue={field.value}
                                                value={field.value}
                                                init={{
                                                    height: 500,
                                                    menubar: true,
                                                    editable_root: true,
                                                    editable_class: "editable",
                                                    content_style,
                                                    elementpath: false,
                                                    plugins:
                                                        "preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                                                    toolbar:
                                                        "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | pagebreak anchor codesample | ltr rtl",
                                                }}
                                                onEditorChange={(
                                                    content: string
                                                ) => {
                                                    field.onChange(content);
                                                }}
                                                onBlur={field.onBlur}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-start gap-4">
                                <div className="space-y-2">
                                    <Label>Logo</Label>
                                    <ImageUploader
                                        uploadedImages={uploadedLogo}
                                        onUpload={handleLogoUpload}
                                        onDelete={handleLogoDelete}
                                        onUpdateAlt={handleLogoUpdateAlt}
                                        isMultiple={false}
                                        isEditing={true}
                                    />
                                    <input
                                        type="hidden"
                                        {...form.register("logo")}
                                    />
                                    {form.formState.errors.logo && (
                                        <p className="text-sm text-destructive">
                                            {form.formState.errors.logo.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Home Banner</Label>
                                    <ImageUploader
                                        uploadedImages={uploadedHomeBanner}
                                        onUpload={handleHomeBannerUpload}
                                        onDelete={handleHomeBannerDelete}
                                        onUpdateAlt={handleHomeBannerUpdateAlt}
                                        isMultiple={false}
                                        isEditing={true}
                                    />
                                    <input
                                        type="hidden"
                                        {...form.register("homeBanner")}
                                    />
                                    {form.formState.errors.homeBanner && (
                                        <p className="text-sm text-destructive">
                                            {
                                                form.formState.errors.homeBanner
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                <div className="space-x-2">
                                    <Label>Theme Color</Label>
                                    <ColorPicker
                                        defaultValue={form.getValues(
                                            "themeColor"
                                        )}
                                        onChange={(color) => {
                                            form.setValue(
                                                "themeColor",
                                                color.toHexString()
                                            );
                                        }}
                                    />
                                </div>
                            </div>
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
                                isCopied
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
