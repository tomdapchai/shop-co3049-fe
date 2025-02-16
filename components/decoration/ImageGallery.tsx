"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ImageDetail } from "@/types";
interface ImageGalleryProps {
    initialImages: ImageDetail[];
}
import { deleteImage } from "@/services/ImageService";

export default function ImageGallery({ initialImages }: ImageGalleryProps) {
    const [images, setImages] = useState<ImageDetail[]>(initialImages);

    const handleDelete = async (imageId: string) => {
        await deleteImage(imageId).then((res) => {
            if ("error" in res) {
                console.log(res.error);
                return;
            } else {
                setImages((prevImages) =>
                    prevImages.filter((image) => image.imageId !== imageId)
                );
            }
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                    <div
                        key={image.imageId}
                        className="relative group aspect-video">
                        <Image
                            src={image.src}
                            alt={image.imageId}
                            fill
                            className="object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100 rounded-lg">
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(image.imageId)}
                                className="flex items-center gap-2">
                                <Trash2 className="w-4 h-4" />
                                Delete Image
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
