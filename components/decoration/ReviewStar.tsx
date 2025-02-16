import { Star } from "lucide-react";

export function ReviewStar({ rating }: { rating: number }) {
    // Round the rating to the nearest whole number
    // .5 and above will round up, below .5 will round down
    const roundedRating = Math.round(rating);

    // Ensure the rating is between 0 and 5
    const clampedRating = Math.max(0, Math.min(5, roundedRating));

    return (
        <div
            className="flex"
            aria-label={`Rating: ${Number(rating).toFixed(1)} out of 5 stars`}>
            {[...Array(5)].map((_, index) => (
                <Star
                    key={index}
                    className={`w-5 h-5 ${
                        index < clampedRating
                            ? "text-sub fill-[#b88e2f] text-sub"
                            : "text-muted-foreground"
                    }`}
                />
            ))}
        </div>
    );
}
