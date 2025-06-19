"use client";
import { Skeleton } from "ui/lib/components/ui/skeleton";
import OrderSummary from "./OrderSummary";
import useCartContext from "@/context/CartContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { fetching, cartItem, count } = useCartContext();

  if (fetching) {
    return (
      <div className="max-w-6xl mx-auto p-8 mt-8">
        <div className="flex gap-24">
          <div className="flex flex-col gap-8 w-full">
            {[0, 1, 2].map((_, idx) => (
              <div
                key={idx}
                className="flex justify-between items-start pt-8 gap-4"
              >
                <Skeleton className="w-28 h-28" />
                <div className="flex flex-col w-full gap-4">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-3/4 h-4" />
                  <Skeleton className="w-1/2 h-4" />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full max-w-xl">
            <Skeleton className="w-80 h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (!cartItem?.products?.length) {
    return (
      <div className="mt-4 grid place-items-center">
        <div>Cart is empty</div>
        <a
          href="/"
          className="border bg-gray-900 text-white py-2 px-3 rounded-md transition-all duration-200 hover:bg-gray-700"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 mt-8">
      <h4 className="text-2xl text-bold">{`Your Cart (${count} Items)`}</h4>

      <div className="flex gap-40 mt-10">
        <div className="flex flex-col gap-8 divide-y w-full max-w-6xl [&>:not(:first-child)]:pt-4">
          {cartItem?.products?.map((product: any) => (
            <CartItem
              key={product?.productId}
              cartId={cartItem?._id}
              product={product}
            />
          ))}
        </div>
        <OrderSummary
          itemsCount={count}
          totalAmount={cartItem?.totalPrice}
          shippingFee={cartItem?.shippingFee}
          finalAmount={cartItem?.finalPrice}
        />
      </div>
    </div>
  );
};

export default Cart;
