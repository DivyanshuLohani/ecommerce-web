"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { addReview } from "@/lib/actions/reviews";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const StarRating = ({ productId }: { productId: number }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [state, dispatch] = useFormState(addReview, null);

  useEffect(() => {
    if (!state) return;
    if (!state.success) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Success", description: "Review added successfully" });
    setRating(0);
    setHoverRating(0);
    setFeedback("");
  }, [state]);

  return (
    <form action={dispatch} className="p-6 shadow-lg rounded-lg bg-card">
      <div className="flex flex-col space-y-2">
        <h3 className="text-2xl font-bold">Write a Review</h3>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={index}
                className={`cursor-pointer text-3xl ${
                  starValue <= (hoverRating || rating)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
              >
                &#9733;
              </span>
            );
          })}
        </div>

        <div className="flex flex-col">
          <label htmlFor="feedback" className="text-lg">
            Your Review
          </label>
          <Textarea
            id="feedback"
            name="review"
            rows={4}
            defaultValue={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here..."
          />
        </div>

        <input
          type="text"
          className="hidden"
          defaultValue={productId}
          name="productId"
        />
        <input
          type="text"
          className="hidden"
          defaultValue={rating}
          name="rating"
        />

        <Button type="submit" size="lg">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default StarRating;
