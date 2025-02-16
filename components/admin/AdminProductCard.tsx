"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
    slug: string;
    name: string;
    overview: string;
    price: number;
    image: string;
    rating: number;
}

export default function AdminProductCard({
    name,
    overview,
    price,
    image,
    slug,
    rating,
}: ProductCardProps) {
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 968);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <Card className="group relative overflow-hidden rounded-lg border w-[300px] h-[500px]">
            <div className="flex flex-col h-full">
                <div className="relative h-[300px]">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="300px"
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-sm text-muted-foreground flex-grow">
                        {overview}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                        <p className="font-semibold">
                            {formatPrice(Number(price))}
                        </p>
                        <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{rating.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Link
                    href={`/admin/products/${slug}`}
                    className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200">
                    View Details
                </Link>
            </div>
        </Card>
    );
}
