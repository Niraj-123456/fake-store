import React from "react";

type ProductCard = {
  image: React.ReactNode;
  info: React.ReactNode;
  action?: React.ReactNode;
};

const ProductCard = ({ image, info, action }: ProductCard) => {
  return (
    <div className="group bg-white rounded-[2.5rem] p-4 border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
      <div className="spect-square h-[16rem] rounded-[2rem] overflow-hidden bg-slate-50 mb-6 relative">
        {image}
      </div>
      {info}
      {action}
    </div>
  );
};

export default ProductCard;
