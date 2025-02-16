"use client";
import { useState, useEffect } from "react";
import { getAllReviews } from "@/services/ReviewService";
import { Review } from "@/types";
import ReviewOverallCard from "@/components/card/ReviewOverallCard";
import { getAllProduct } from "@/services/ProductService";
import { ProductDetail } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
const MAX_REVIEW_PER_PAGE = 10;
const page = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [products, setProducts] = useState<ProductDetail[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [filterProduct, setFilterProduct] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        getAllReviews().then((data) => {
            if ("error" in data) {
                console.error(data.error);
            } else {
                console.log("Reviews:", data);
                setReviews(data);
            }
        });

        getAllProduct().then((data) => {
            if ("error" in data) {
                console.error(data.error);
            } else {
                setProducts(data);
            }
        });
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setTotalPages(Math.ceil(reviews.length / MAX_REVIEW_PER_PAGE));
    }, [reviews]);

    const filteredReviews = reviews
        .filter(
            (review) =>
                (review.comment + review.productId + review.reviewer).includes(
                    searchTerm
                ) && filterProduct === "all"
        )
        .sort((a, b) => {
            if (sortBy === "date")
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            if (sortBy === "rating") return b.rating - a.rating;
            return 0;
        });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const paginatedReviews = filteredReviews.slice(
        (currentPage - 1) * MAX_REVIEW_PER_PAGE,
        currentPage * MAX_REVIEW_PER_PAGE
    );

    return (
        <div className="w-full flex flex-col justify-start items-start">
            <p className="text-2xl font-bold">Reviews management</p>
            <div className="flex justify-between mb-4 w-full">
                <Input
                    placeholder="Search by Reviewer, User ID, product ID or Comment"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <div className="flex gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date">Created</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <ReviewOverallCard
                reviews={paginatedReviews}
                products={products}
                admin
            />
            <Pagination className="mt-4">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            isActive={!(currentPage === 1)}
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                onClick={() => setCurrentPage(i + 1)}
                                isActive={currentPage === i + 1}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            isActive={!(currentPage === totalPages)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default page;
