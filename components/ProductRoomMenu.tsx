"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { room } from "@/types";
import { Button } from "./ui/button";
import { set } from "date-fns";

// Sample rooms data - replace with your actual data

interface Props {
    rooms: room[];
}

export default function ProductRoomsMenu({ rooms }: Props) {
    const [isClicked, setIsClicked] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Handle click outside to close the menu
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsClicked(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle Products link click
    const handleProductsClick = () => {
        if (isClicked) {
            // If already open, navigate to /shop
            setIsClicked(false);
            router.push("/shop");
        } else {
            // If closed, open the rooms menu
            setIsClicked(true);
        }
    };

    // Handle category click
    const handleCategoryClick = (roomId: string) => {
        router.push(`/shop?query=${roomId}`);
        setIsClicked(false);
    };

    // Handle horizontal scrolling with mouse wheel
    const handleWheel = (event: WheelEvent) => {
        if (scrollContainerRef.current) {
            event.preventDefault();
            scrollContainerRef.current.scrollLeft += event.deltaY;
        }
    };

    // Add event listener for wheel events
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener(
                "wheel",
                handleWheel as EventListener,
                { passive: false }
            );
            return () => {
                scrollContainer.removeEventListener(
                    "wheel",
                    handleWheel as EventListener
                );
            };
        }
    }, [handleWheel]);

    return (
        <div ref={menuRef}>
            {/* Products navigation link */}
            <Button
                variant="link"
                onClick={handleProductsClick}
                className={`font-bold rounded-none ${
                    isClicked ? "border-b-2 border-amber-500" : ""
                }`}>
                Rooms
            </Button>

            {/* Categories dropdown */}
            {isClicked && (
                <div className="absolute left-0 w-screen bg-white shadow-lg z-50 border-t border-gray-200">
                    <div className="w-full flex flex-col justify-start items-start px-4 ">
                        <p className="font-bold text-base">Rooms</p>
                        <div
                            className="overflow-x-auto pb-4 no-scrollbar"
                            ref={scrollContainerRef}>
                            <div className="flex space-x-6 min-w-max">
                                {rooms.map((room) => (
                                    <div
                                        key={room.roomId}
                                        className="flex flex-col items-center cursor-pointer w-fit space-y-2"
                                        onClick={() =>
                                            handleCategoryClick(room.roomId)
                                        }>
                                        <div className="w-[100px] h-[60px] relative">
                                            <Image
                                                src={room.image}
                                                alt={room.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="text-center text-sm no-wrap">
                                            {room.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
