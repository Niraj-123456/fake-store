import Image from "next/image";
import React from "react";
import { Input } from "ui/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "ui/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { Button } from "ui/components/ui/button";

const cartItems = [
  {
    id: 1,
    name: "Samsung Galaxy S20",
    image: "/images/products/product1.webp",
    price: 1024,
    quantity: 1,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    image: "/images/products/product2.jpg",
    price: 1224,
    quantity: 1,
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    image: "/images/products/product3.jpg",
    price: 1999,
    quantity: 1,
  },
];

const CustomTooltip = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const Cart = () => {
  return (
    <div className="max-w-6xl m-auto p-8">
      <div className="flex gap-40">
        <div className="flex flex-col gap-8 divide-y-2 w-full max-w-3xl">
          {cartItems.map((cartItem) => (
            <div
              key={cartItem?.id}
              className="flex justify-between items-start pt-8"
            >
              <div className="relative w-24 h-28 overflow-hidden bg-gray-200">
                <Image
                  src={cartItem?.image}
                  alt="phone1"
                  fill
                  sizes="100%*100%"
                  className="w-full h-full object-contain object-center mix-blend-darken"
                />
              </div>

              <div>
                <div>
                  <div>{cartItem?.name}</div>
                  <div className="text-sm pt-1 text-gray-600">
                    ${cartItem?.price}
                  </div>
                </div>
                <div className="mt-7">
                  <Button
                    size={"sm"}
                    variant={"link"}
                    className="text-red-700 px-0"
                  >
                    <Trash2 className="mr-1 w-5 h-5" />
                    Remove
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button className="h-9">+</Button>
                <Input value={cartItem?.quantity} className="w-12" />
                <Button className="h-9">-</Button>
              </div>

              {/* <CustomTooltip title="Remove">
                <X className="text-gray-400 w-5 h-5 cursor-pointer" />
              </CustomTooltip> */}
            </div>
          ))}
        </div>
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
      </div>
    </div>
  );
};

export default Cart;
