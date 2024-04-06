import React from "react";
import { Skeleton } from "ui/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div className="grid grid-cols-10 gap-4 mt-3">
      {Array.from({ length: 10 }, (_, idx) => idx).map((number) => (
        <Skeleton key={number} className="w-[144px] h-[186px]" />
      ))}
    </div>
  );
};

export default LoadingPage;
