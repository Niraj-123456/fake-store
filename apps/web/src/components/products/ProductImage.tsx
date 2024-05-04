import { imageFormatter } from "@/lib/imageFormatter";
import { cn } from "ui/lib/utils";
import Image from "next/image";
import React from "react";

type ProductImage = {
  image: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

const ProductImage = ({ image, alt, className, priority }: ProductImage) => {
  return (
    <Image
      src={imageFormatter(image)}
      alt={alt}
      fill
      priority={priority}
      sizes="100%"
      className={cn("object-cover object-center", className)}
    />
  );
};

export default ProductImage;
