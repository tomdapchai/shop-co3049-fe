"use client";

import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { ReviewCard } from "./card/ReviewCard";
import { Review } from "@/types";

interface ReviewSectionProps {
    reviews: Review[];
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 3;
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="w-full space-y-6">
            <div className="text-muted-foreground w-full flex flex-col justify-start items-start space-y-4">
                {currentReviews.map((review) => (
                    <ReviewCard
                        key={review.reviewId}
                        reviewer={review.reviewer}
                        comment={review.comment}
                        rating={review.rating}
                        date={review.date}
                    />
                ))}
            </div>

            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) paginate(currentPage - 1);
                            }}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i + 1}>
                            <PaginationLink
                                href="#"
                                className={`${
                                    currentPage === i + 1
                                        ? "bg-sub hover:bg-[#b88e2f]/90 text-primary-foreground"
                                        : "bg-background hover:bg-accent hover:text-accent-foreground"
                                }`}
                                isActive={currentPage === i + 1}
                                onClick={(e) => {
                                    e.preventDefault();
                                    paginate(i + 1);
                                }}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages)
                                    paginate(currentPage + 1);
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
