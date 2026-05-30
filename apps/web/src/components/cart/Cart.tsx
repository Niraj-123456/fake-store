"use client";
import { Skeleton } from "ui/lib/components/ui/skeleton";
import OrderSummary from "./OrderSummary";
import useCartContext from "@/context/CartContext";
import CartItem from "./CartItem";
import { ShoppingCart } from "lucide-react";

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
        <div className="text-center max-w-md">
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-blue-100/50 scale-150 blur-3xl rounded-full -z-10"></div>

            <div className="w-32 h-32 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200 flex items-center justify-center mx-auto border border-slate-100">
              <ShoppingCart className="w-16 h-16 text-slate-300" />
            </div>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">
            Your cart is lonely.
          </h1>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">
            Looks like you haven't added anything to your shopping bag yet.
            Explore our latest collections to find something special.
          </p>

          <a
            href="/"
            className="inline-block bg-slate-900 text-white px-10 py-5 rounded-3xl font-extrabold shadow-2xl shadow-slate-900/20 hover:scale-105 transition-all active:scale-95"
          >
            Start Shopping
          </a>
        </div>

        <div className="mt-24 w-full max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Popular Categories
            </span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="#"
              className="group p-6 bg-white border border-slate-100 rounded-3xl text-center hover:shadow-lg transition-all"
            >
              <span className="block text-2xl mb-2 group-hover:scale-125 transition-transform">
                👟
              </span>
              <span className="text-xs font-bold text-slate-600">Footwear</span>
            </a>
            <a
              href="#"
              className="group p-6 bg-white border border-slate-100 rounded-3xl text-center hover:shadow-lg transition-all"
            >
              <span className="block text-2xl mb-2 group-hover:scale-125 transition-transform">
                🎧
              </span>
              <span className="text-xs font-bold text-slate-600">Audio</span>
            </a>
            <a
              href="#"
              className="group p-6 bg-white border border-slate-100 rounded-3xl text-center hover:shadow-lg transition-all"
            >
              <span className="block text-2xl mb-2 group-hover:scale-125 transition-transform">
                ⌚
              </span>
              <span className="text-xs font-bold text-slate-600">Watches</span>
            </a>
            <a
              href="#"
              className="group p-6 bg-white border border-slate-100 rounded-3xl text-center hover:shadow-lg transition-all"
            >
              <span className="block text-2xl mb-2 group-hover:scale-125 transition-transform">
                👜
              </span>
              <span className="text-xs font-bold text-slate-600">Bags</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
        <h4 className="text-3xl font-bold tracking-tight">
          Your Cart{" "}
          <span className="text-slate-400 font-medium">
            ({count} {count > 1 ? "Items" : "Item"})
          </span>
        </h4>
        <div className="flex flex-col gap-8 divide-y w-full max-w-6xl [&>:not(:first-child)]:pt-4">
          {cartItem?.products?.map((product: any) => (
            <CartItem
              key={product?.productId}
              cartId={cartItem?._id}
              product={product}
            />
          ))}
        </div>
      </div>

      <div className="relative">
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
