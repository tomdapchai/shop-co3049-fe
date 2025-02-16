import { Star } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReviewStar } from "../decoration/ReviewStar";
import Link from "next/link";
import { Button } from "../ui/button";
import { deleteReview } from "@/services/ReviewService";
interface ReviewCardProps {
    reviewer: string;
    rating: number;
    comment: string;
    date: string;
    view?: boolean;
    productId?: string;
    admin?: boolean;
    reviewId?: string;
    userId?: string;
}

export function ReviewCard({
    reviewer,
    rating,
    comment,
    date,
    view = false,
    productId,
    admin = false,
    reviewId,
    userId,
}: ReviewCardProps) {
    const handleDelete = async () => {
        await deleteReview(reviewId as string);
    };

    console.log("hmm");

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center space-x-4 pb-4 bg-main">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                        {reviewer} {admin && "- "}
                        {admin && (
                            <Link
                                href={`/admin/users/${userId}`}
                                className="text-sm underline hover:text-slate-400 text-slate-500">
                                User ID: {userId}
                            </Link>
                        )}
                    </h3>
                    <div
                        className="flex items-center space-x-2"
                        aria-label={`Rating: ${rating} out of 5 stars`}>
                        <ReviewStar rating={rating} /> <p>({rating}/5)</p>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start space-y-2">
                    {view && productId && (
                        <Link
                            href={`/product/${productId}`}
                            className="underline hover:text-slate-400">
                            Product: {productId}
                        </Link>
                    )}
                    <p className="text-sm text-muted-foreground">{date}</p>
                </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
                <p className="text-sm leading-relaxed">{comment}</p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground flex flex-col space-y-2 justify-start items-start">
                <p>Was this review helpful?</p>
                {admin && reviewId && (
                    <Button
                        onClick={handleDelete}
                        className="bg-red-400 hover:bg-red-400/90">
                        Delete Review
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
