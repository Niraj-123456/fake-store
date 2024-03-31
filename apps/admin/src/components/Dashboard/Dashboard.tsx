import React from "react";
import { ShoppingCart, HandCoins } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex gap-4">
        <div className="flex items-start gap-3 bg-[#C7F2FF] w-max px-3 py-5 rounded-md">
          <div className="flex gap-5 items-center">
            <div className="rounded-sm bg-white p-2">
              <ShoppingCart />
            </div>
            <div className="font-bold leading-tight">
              <p>23,798</p>
              <span className="text-xs">Orders</span>
            </div>
          </div>
          <div className="rounded-sm bg-[#42427D] text-[10px] text-white py-[2px] px-[10px]">
            +20
          </div>
        </div>
        <div className="flex items-start gap-5 bg-[#FFE5EE] w-max px-3 py-5 rounded-md">
          <div className="flex gap-5 items-center">
            <div className="bg-white p-2 rounded-sm">
              <HandCoins />
            </div>
            <div className="font-bold leading-tight">
              <p>$ 123,798</p>
              <span className="text-xs">Profit</span>
            </div>
          </div>
          <div className="rounded-sm bg-[#42427D] text-[10px] text-white py-[2px] px-[10px]">
            +$ 840.00
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
