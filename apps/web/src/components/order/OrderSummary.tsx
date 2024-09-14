import React from "react";
import { Button } from "ui/components/ui/button";

const OrderSummary = () => {
  return (
    <div className="bg-gray-100 rounded-md p-4 max-w-xs w-full h-full">
      <h4 className="p-2 font-semibold">Order Summary</h4>
      <div className="flex flex-col gap-2 divide-y-2 mt-4">
        <div className="flex justify-between p-2">
          <div className="text-gray-600">Subtotal (3 items)</div>
          <div>$1024</div>
        </div>

        <div className="flex justify-between p-2">
          <div className="text-gray-600">Shipping Fee</div>
          <div>$10</div>
        </div>
        <div className="flex justify-between p-2">
          <div className="text-gray-600">Tax</div>
          <div>$13</div>
        </div>
        <div className="flex justify-between p-2 font-semibold">
          <div>Total</div>
          <div>$1300</div>
        </div>
      </div>
      <div className="pt-4 pb-2">
        <Button className="w-full">Checkout $1300</Button>
      </div>
    </div>
  );
};

export default OrderSummary;
