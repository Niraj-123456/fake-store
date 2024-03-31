import React from "react";

type ProductCard = {
  image: React.ReactNode;
  info: React.ReactNode;
  action: React.ReactNode;
};

const ProductCard = ({ image, info, action }: ProductCard) => {
  return (
    <div className="border border-gray-300 rounded-md w-80 overflow-hidden flex flex-col h-[510px] shadow-sm hover:cursor-pointer ">
      <div className="relative w-full h-64 bg-white overflow-hidden grid place-items-center">
        {image}
      </div>
      {info}
      {action}
    </div>
  );
};

export default ProductCard;
