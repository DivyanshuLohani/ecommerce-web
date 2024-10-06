import type { ProductReview as IReview, User } from "@prisma/client";
import { StarIcon } from "lucide-react";
import React from "react";

interface Review extends IReview {
  user: User;
}

interface ProductReviewProps {
  review: Review;
}

export default function ProductReview({ review }: ProductReviewProps) {
  return (
    <div key={review.id} className="flex flex-col gap-2">
      <h3 className="font-semibold">{review.user.name}</h3>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[...Array(review.rating)].map((_, i) => (
            <StarIcon key={i} className="w-5 h-5 fill-primary stroke-primary" />
          ))}
          {[...Array(5 - review.rating)].map((_, i) => (
            <StarIcon key={i} className="w-5 h-5 stroke-muted-foreground" />
          ))}
        </div>
      </div>
      <p className="text-muted-foreground">{review.content}</p>
    </div>
  );
}
