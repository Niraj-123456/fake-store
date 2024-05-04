import React from "react";

type ProductCard = {
  image: React.ReactNode;
  info: React.ReactNode;
  action?: React.ReactNode;
};

const ProductCard = ({ image, info, action }: ProductCard) => {
  return (
    <div className="border border-gray-300 rounded-md w-full overflow-hidden flex flex-col h-full shadow-sm transition-all duration-300 hover:cursor-pointer hover:bg-gray-200 hover:bg-opacity-40">
      <div className="relative w-full h-64 -z-10 bg-white overflow-hidden grid place-items-center">
        {image}
      </div>
      {info}
      {action}
    </div>
  );
};

export default ProductCard;
