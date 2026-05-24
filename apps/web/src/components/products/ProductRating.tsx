import { cn } from "ui/lib/utils";
import { Star } from "lucide-react";
import React from "react";

type Rating = {
  rating: {
    rate: number;
    count: number;
  };
};

const ProductRating = ({ rating }: Rating) => {
  return (
    <div className="ml-1 flex items-center">
      <h3 className="sr-only">Reviews</h3>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rate) => (
            <Star
              key={rate}
              className={cn(
                rating.rate > rate
                  ? "text-amber-400 fill-current"
                  : "text-gray-300",
                "h-4 w-4 flex-shrink-0",
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="sr-only">{rating.rate} out of 5 stars</p>
        <span className="text-slate-400 font-medium">(128 Reviews)</span>
      </div>
    </div>
  );
};

export default ProductRating;
