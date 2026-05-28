import Image from "next/image";
import React from "react";

const CartItemSummary = ({ product }: { product: any }) => {
  return (
    <>
      <div className="flex gap-4 mb-8">
        <div className="relative w-16 h-16 aspect-square overflow-hidden bg-gray-200 col-span-2 rounded-2xl">
          <Image
            src={product?.image}
            alt={product?.name}
            fill
            sizes="100%*100%"
            className="w-full h-full object-contain object-center"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold leading-tight" title={product?.name}>
            {product?.name}
          </p>
          <p className="text-xs text-slate-400 mt-1">Qty: {product.quantity}</p>
        </div>
        <span className="font-bold text-sm">${product?.price}</span>
      </div>
    </>
  );
};

export default CartItemSummary;
