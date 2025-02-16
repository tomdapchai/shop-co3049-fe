"use client";
import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const Slideshow = () => {
    return (
        <div className="flex flex-col w-full items-center space-y-4">
            <Carousel
                plugins={[Autoplay({ delay: 2000 })]}
                className="w-full items-center">
                <CarouselContent className="items-center w-full">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/3 lg:basis-1/4 ">
                            <Image
                                src={`/images/carousel/${index + 10}.jpg`}
                                alt={`img ${index + 10}`}
                                width={500}
                                height={500}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <Carousel
                plugins={[Autoplay({ delay: 2000 })]}
                className="w-full items-center">
                <CarouselContent className="items-center w-full">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/3 lg:basis-1/5 ">
                            <Image
                                src={`/images/carousel/${index + 1}.jpg`}
                                alt={`img ${index + 1}`}
                                width={400}
                                height={400}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default Slideshow;
