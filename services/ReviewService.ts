import api from "@/api";
import axios from "axios";
import { Review } from "@/types";

export const getAllReviews = async (): Promise<
    Review[] | { error: string }
> => {
    try {
        const response = await api.get("api/review/routes.php");
        console.log("Backend Response:", response.data);
        const res: Review[] = response.data.data.map((review: any) => {
            return {
                reviewId: review.reviewId,
                productId: review.productId,
                reviewer: review.reviewer,
                rating: Number(review.rating),
                comment: review.content,
                date: review.createdAt,
                userId: review.userId,
            };
        });
        return res;
    } catch (error) {
        console.log("Error fetching reviews:", error);
        return { error: "Error fetching reviews" };
    }
};

export const getReviewsByProductId = async (
    slug: string
): Promise<Review[] | { error: string }> => {
    try {
        const response = await api.get(
            `api/review/routes.php?productId=${slug}`
        );
        let res: Review[] = [];
        console.log("Backend Response:", response.data);
        if (response.data.status == "success") {
            res = response.data.data.map((review: any) => {
                return {
                    reviewId: review.reviewId,
                    productId: review.productId,
                    reviewer: review.reviewer,
                    rating: Number(review.rating),
                    comment: review.content,
                    date: review.createdAt,
                    userId: review.userId,
                };
            });
        } else {
            res = [];
        }
        return res;
    } catch (error) {
        console.log("Error fetching reviews:", error);
        return { error: "Error fetching reviews" };
    }
};

export type ReviewCreate = Omit<Review, "reviewId" | "date"> & {
    userId: string;
};
export const createReview = async (
    data: ReviewCreate
): Promise<{ message: string } | { error: string }> => {
    try {
        console.log("Data:", data);
        const response = await api.post(`api/review/routes.php`, data);
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error creating review:", error);
        return { error: "Error creating review" };
    }
};

type ReviewUpdate = Omit<ReviewCreate, "productId" | "reviewer">;
export const updateReview = async (
    reviewId: string,
    data: ReviewUpdate
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.put(`api/review/routes.php`, {
            reviewId,
            data,
        });
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error updating review:", error);
        return { error: "Error updating review" };
    }
};

export const deleteReview = async (
    reviewId: string
): Promise<{ message: string } | { error: string }> => {
    try {
        const response = await api.delete(
            `api/review/routes.php?reviewId=${reviewId}`
        );
        console.log("Backend Response:", response.data);
        return { message: response.data.message };
    } catch (error) {
        console.log("Error deleting review:", error);
        return { error: "Error deleting review" };
    }
};
