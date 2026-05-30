"use client";
import { imageFormatter } from "@/lib/imageFormatter";
import { getUserOrder } from "@/app/api/order";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import { Button } from "ui/lib/components/ui/button";
import { Skeleton } from "ui/lib/components/ui/skeleton";
import { cn } from "ui/lib/utils";

type OrderHistory = {
  itemsCount: number;
  totalAmount: number;
  shippingFee: number;
  finalAmount: number;
};

type OrderStatus = "completed" | "pending";

const OrderHistory = () => {
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;

  const {
    data: orders,
    isFetching,
    isError,
  } = useQuery("custormerOrder", () => getUserOrder(userId), {
    enabled: !!userId,
  });

  console.log("orders", orders);

  const orderStatusButtonStyles = (status: OrderStatus) => {
    const styles: Record<
      OrderStatus,
      { bgColor: string; color: string; border: string }
    > = {
      completed: {
        bgColor: "bg-green-300",
        color: "text-green-800",
        border: "border-green-400",
      },
      pending: {
        bgColor: "bg-yellow-300",
        color: "text-yellow-800",
        border: "border-yellow-400",
      },
    };

    return (
      styles[status] || {
        bgColor: "bg-background",
        color: "text-gray-800",
        border: "border-gray-400",
      }
    );
  };

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="w-full h-full p-4 mt-5 max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Order History
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Manage and track your recent purchases.
          </p>
        </div>

        <div className="flex gap-2 bg-slate-200/50 p-1 rounded-xl">
          <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-xs font-bold">
            All
          </button>
          <button className="px-4 py-1.5 text-slate-500 hover:text-slate-900 text-xs font-bold transition-all">
            Pending
          </button>
          <button className="px-4 py-1.5 text-slate-500 hover:text-slate-900 text-xs font-bold transition-all">
            Completed
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-8">
        {isFetching ? (
          <>
            {Array.from({ length: 7 }).map((_, idx) => (
              <Skeleton key={idx} className="w-full h-32" />
            ))}
          </>
        ) : (
          orders?.data?.map((order: any) => {
            const { bgColor, color, border } = orderStatusButtonStyles(
              order?.status,
            );
            return (
              <div
                key={order?._id}
                className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 overflow-hidden"
              >
                <div className="bg-slate-50/80 px-8 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100">
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Order Id
                      </p>
                      <p className="text-xs font-mono font-bold text-slate-600 py-1">
                        {order?._id}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Date Placed
                      </p>
                      <p className="text-xs font-bold text-slate-600 px-3 py-1">
                        {new Date(order?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Delivery Option
                      </p>
                      <div
                        className={cn(
                          "inline-block px-3  py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter",
                        )}
                      >
                        {order?.deliveryMethod}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Status
                      </p>
                      <div
                        className={cn(
                          "inline-block px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter",
                          bgColor,
                          color,
                          border,
                        )}
                      >
                        {order?.status}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      className="px-5 py-2 bg-gray-50 border border-slate-200 rounded-xl text-xs font-bold hover:bg-white"
                    >
                      View Order
                    </Button>
                    {order?.status === "pending" ? (
                      <Link
                        href={`/payment?cId=${order?.userId}&oId=${order?._id}`}
                        className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                      >
                        Checkout
                      </Link>
                    ) : (
                      <Button
                        size={"sm"}
                        variant={"outline"}
                        className="px-5 py-2 bg-gray-50 border border-slate-200 rounded-xl text-xs font-bold hover:bg-white"
                      >
                        View Invoice
                      </Button>
                    )}
                  </div>
                </div>

                <div className="p-8">
                  {order?.products?.map((product: any) => (
                    <div
                      key={product?.productId}
                      className="flex items-center gap-6"
                    >
                      <div className="relative w-20 h-20 rounded-sm overflow-hidden">
                        <Image
                          src={imageFormatter(product?.image)}
                          alt=""
                          fill
                          sizes="100%*100%"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-lg">
                          {product?.name}
                        </h4>
                        <p className="text-sm text-slate-500 font-medium">
                          Quantity: {product?.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-extrabold text-slate-900">
                          ${product?.price}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                          Total: ${product?.finalAmount} (Including Delivery
                          Charges)
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
