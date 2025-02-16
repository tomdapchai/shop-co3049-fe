"use client";
import { useState, useEffect } from "react";
import { getAllImages } from "@/services/ImageService";
import { ImageDetail } from "@/types";
import ImageGallery from "@/components/decoration/ImageGallery";
const page = () => {
    const [images, setImages] = useState<ImageDetail[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getAllImages().then((data) => {
            if ("error" in data) {
                console.log(data.error);
                return;
            } else {
                setImages(data);
                setLoading(false);
            }
        });
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="w-full">
            <div className="flex flex-col justify-start items-start space-y-4 p-4">
                <h1 className="text-2xl font-semibold">All Images</h1>
                <p className="text-muted-foreground text-lg">
                    Showing {images.length} images
                </p>
            </div>

            <ImageGallery initialImages={images} />
        </div>
    );
};

export default page;
