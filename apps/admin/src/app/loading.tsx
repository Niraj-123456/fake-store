import React from "react";
import { Skeleton } from "ui/components/ui/skeleton";

const RootLoading = () => {
  return (
    <div className="mt-4 flex items-center gap-4">
      <Skeleton className="w-48 h-20" />
      <Skeleton className="w-52 h-20" />
    </div>
  );
};

export default RootLoading;
