"use client";
import { useState, useEffect } from "react";
import { Review } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewCard } from "./ReviewCard";
import { ProductDetail } from "@/types";
import Image from "next/image";
import { ImageDetail } from "@/types";
import { set } from "zod";
const ReviewOverallCard = ({
    reviews,
    products,
    admin = false,
}: {
    reviews: Review[];
    products: ProductDetail[];
    admin?: boolean;
}) => {
    const [pReviews, setPReviews] = useState<Review[]>(reviews);

    useEffect(() => {
        setPReviews(reviews);
    });

    return (
        <div className="w-full flex flex-col space-y-4">
            {pReviews.map((review, index) => (
                <ReviewCard
                    key={review.reviewId}
                    {...review}
                    view
                    admin={admin}
                />
            ))}
        </div>
    );
};

export default ReviewOverallCard;
