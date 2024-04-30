import { Skeleton } from "ui/components/ui/skeleton";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[256px] w-[310px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[310px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
