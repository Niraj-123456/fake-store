import { cn } from "ui/lib/utils";
import React from "react";

type ProductInfo = {
  children: React.ReactNode;
  className?: string;
};

const ProductInfo = ({ children, className }: ProductInfo) => {
  return <div className={cn("p-2", className)}>{children}</div>;
};

export default ProductInfo;
