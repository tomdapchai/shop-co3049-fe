"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const reviewSchema = z.object({
    rating: z.number().min(1).max(5),
    comment: z
        .string()
        .min(10, {
            message: "Comment must be at least 10 characters.",
        })
        .optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
    onSubmit: (data: ReviewFormValues) => void;
}

const StarRating = ({
    rating,
    onRatingChange,
}: {
    rating: number;
    onRatingChange: (rating: number) => void;
}) => {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onRatingChange(star)}
                    className="focus:outline-none">
                    <Star
                        className={cn(
                            "w-6 h-6",
                            star <= rating
                                ? "fill-[#b88e2f] text-sub"
                                : "text-muted stroke-[#b88e2f]"
                        )}
                    />
                </button>
            ))}
        </div>
    );
};

export function ReviewForm({ onSubmit }: ReviewFormProps) {
    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: 0,
            comment: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <StarRating
                                    rating={field.value}
                                    onRatingChange={(rating) =>
                                        field.onChange(rating)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comment</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Your review (optional)"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Minimum 10 characters if provided.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-sub hover:bg-[#b88e2f]/90">
                    Submit Review
                </Button>
            </form>
        </Form>
    );
}
