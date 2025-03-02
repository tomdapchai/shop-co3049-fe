"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { advertisement } from "@/types";
import { useProduct } from "@/context/ProductContext";
interface AdvertisementPopupProps {
    advertisement: advertisement;
}

export function AdvertisementPopup({ advertisement }: AdvertisementPopupProps) {
    const [isVisible, setIsVisible] = useState(false);
    const { setIsAdShown } = useProduct();
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative max-w-[90vw] overflow-hidden rounded-lg bg-white shadow-xl">
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setIsAdShown(true);
                    }}
                    className="absolute right-2 top-2 z-10 rounded-full bg-black/70 p-2 text-white transition-colors hover:bg-black focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Close advertisement">
                    <X className="h-6 w-6" />
                </button>

                <Link
                    href={advertisement?.link || "#"}
                    className="block"
                    onClick={() => setIsAdShown(true)}>
                    <div className="relative h-fit w-[800px]">
                        <Image
                            src={advertisement!.image || "/placeholder.svg"}
                            alt="Advertisement"
                            width={800}
                            height={400}
                            objectFit="contain"
                            priority
                        />
                    </div>
                </Link>
            </div>
        </div>
    );
}
