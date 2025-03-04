"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductDetail, Review } from "@/types";
import { ReviewStar } from "./ReviewStar";
import { useRouter } from "next/navigation";

type Image = {
    url: string;
    alt: string;
};

type ProductReviewCardProps = {
    product: ProductDetail;
    review: Review;
    isActive: boolean;
    position: "left" | "center" | "right" | "far-left" | "far-right";
    onClick: () => void;
};

const ProductReviewCard = ({
    product,
    review,
    isActive,
    position,
    onClick,
}: ProductReviewCardProps) => {
    const image =
        product.images && product.images.length > 0
            ? product.images[0]
            : {
                  src: `/placeholder.svg?height=400&width=600`,
                  alt: product.name + String(review.date),
              };

    const formattedDate = new Date(review.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    let transform = "";
    let zIndex = 0;
    let opacity = 1;

    switch (position) {
        case "center":
            transform = "translateX(0) scale(1)";
            zIndex = 50;
            opacity = 1;
            break;
        case "left":
            transform = "translateX(-75%) scale(0.85) rotateY(15deg)";
            zIndex = 40;
            opacity = 0.8;
            break;
        case "right":
            transform = "translateX(75%) scale(0.85) rotateY(-15deg)";
            zIndex = 40;
            opacity = 0.8;
            break;
        case "far-left":
            transform = "translateX(-125%) scale(0.7) rotateY(30deg)";
            zIndex = 30;
            opacity = 0.6;
            break;
        case "far-right":
            transform = "translateX(125%) scale(0.7) rotateY(-30deg)";
            zIndex = 30;
            opacity = 0.6;
            break;
    }

    return (
        <Card
            className={`absolute top-0 left-0 right-0 mx-auto w-full max-w-[600px] max-md:w-[300px] overflow-hidden transition-all duration-500 cursor-pointer `}
            style={{
                transform,
                zIndex,
                opacity,
                transformStyle: "preserve-3d",
                perspective: "1000px",
                boxShadow: isActive
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            onClick={onClick}>
            <div className="relative h-64 w-full">
                <Image
                    src={image.src || "/placeholder.svg"}
                    alt={String(product.slug) + String(review.date)}
                    fill
                    className="object-cover"
                    priority={isActive}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <div className="flex items-center mt-1">
                        {/* {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${
                                    i < review.rating
                                        ? "fill-primary text-primary"
                                        : "fill-muted text-muted-foreground"
                                }`}
                            />
                        ))} */}
                        <ReviewStar rating={review.rating} />
                    </div>
                </div>
            </div>
            <CardContent className="p-4 bg-card">
                <p className="text-sm line-clamp-3">{review.comment}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 bg-card border-t">
                <div className="text-xs text-muted-foreground">
                    <p className="font-medium">{review.reviewer}</p>
                    <p>{formattedDate}</p>
                </div>
                <Button size="sm" variant="secondary" asChild>
                    <Link href={`/product/${product.slug}`}>VIEW MORE</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

type ProductReviewCarouselProps = {
    products: ProductDetail[];
};

export default function ProductReviewCarousel({
    products,
}: ProductReviewCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [productsWithReviews, setProductsWithReviews] = useState<
        ProductDetail[]
    >([]);
    const carouselRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        setProductsWithReviews(
            products
                .filter((product) => product.reviews.length > 0)
                .sort((a, b) => {
                    const aRating =
                        a.reviews.reduce(
                            (acc, review) => acc + review.rating,
                            0
                        ) / a.reviews.length;
                    const bRating =
                        b.reviews.reduce(
                            (acc, review) => acc + review.rating,
                            0
                        ) / b.reviews.length;
                    return bRating - aRating;
                })
                .slice(0, 5)
        );
    }, [products]);

    const carouselItems = productsWithReviews.flatMap((product) =>
        product.reviews.map((review) => ({ product, review }))
    );

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) =>
            prev === 0 ? carouselItems.length - 1 : prev - 1
        );
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handleNext = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) =>
            prev === carouselItems.length - 1 ? 0 : prev + 1
        );
        setTimeout(() => setIsAnimating(false), 500);
    }, [carouselItems.length, isAnimating]);

    const handleCardClick = (index: number) => {
        if (index === activeIndex) {
            router.push(`/product/${carouselItems[index].product.slug}`);
        } else {
            setActiveIndex(index);
        }
    };

    // Auto-rotate carousel
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [handleNext]);

    // Determine position for each card
    const getPosition = (index: number) => {
        const diff =
            (index - activeIndex + carouselItems.length) % carouselItems.length;

        if (diff === 0) return "center";
        if (diff === 1 || diff === -carouselItems.length + 1) return "right";
        if (diff === carouselItems.length - 1 || diff === -1) return "left";
        if (diff === 2 || diff === -carouselItems.length + 2)
            return "far-right";
        return "far-left";
    };

    // If no products with reviews
    if (carouselItems.length === 0) {
        return (
            <div className="text-center py-12">
                <p>No product reviews available.</p>
            </div>
        );
    }

    return (
        <div className="select-none relative w-full py-16 overflow-hidden bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Customer Reviews
                </h1>

                <div ref={carouselRef} className="relative h-[400px]">
                    {carouselItems.map((item, index) => {
                        const position = getPosition(index);
                        const isVisible = [
                            "center",
                            "left",
                            "right",
                            "far-left",
                            "far-right",
                        ].includes(position);

                        if (!isVisible) return null;

                        return (
                            <ProductReviewCard
                                key={`${item.product.slug}-${item.review.reviewId}`}
                                product={item.product}
                                review={item.review}
                                isActive={index === activeIndex}
                                position={position as any}
                                onClick={() => handleCardClick(index)}
                            />
                        );
                    })}
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white w-[48px] h-[48px]"
                        onClick={handlePrev}>
                        <ChevronLeft className="h-6 w-6" />
                        <span className="sr-only">Previous</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white w-[48px] h-[48px]"
                        onClick={handleNext}>
                        <ChevronRight className="h-6 w-6" />
                        <span className="sr-only">Next</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
