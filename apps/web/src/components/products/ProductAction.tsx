import React from "react";
import { Button } from "ui/components/ui/button";

const ProductAction = () => {
  return (
    <div className="p-2 flex flex-col gap-2 flex-1 justify-end">
      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-500 hover:border-blue-700 rounded">
        Add to Cart
      </Button>
      <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-500 hover:border-green-700 rounded">
        Buy Now
      </Button>
    </div>
  );
};

export default ProductAction;
