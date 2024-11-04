"use client";
import { getUserOrder } from "@/app/api/order";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import { Button } from "ui/components/ui/button";
import { cn } from "ui/lib/utils";

type Order = {
  itemsCount: number;
  totalAmount: number;
  shippingFee: number;
  finalAmount: number;
};

type OrderStatus = "completed" | "pending";

const Order = () => {
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;

  const {
    data: orders,
    isFetching,
    isError,
  } = useQuery("userOrder", () => getUserOrder(userId), {
    enabled: !!userId,
  });

  const orderStatusButtonStyles = (status: OrderStatus) => {
    console.log("status", status);
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

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="w-full h-full p-4 rounded-md">
      <h4 className="font-semibold">Order history</h4>
      <div>
        {orders?.data?.map((order: any) => {
          const { bgColor, color, border } = orderStatusButtonStyles(
            order?.status
          );
          return (
            <div
              key={order?._id}
              className="flex flex-col gap-2 mt-4 divide-y-2 border rounded-md *:p-4"
            >
              <div className="flex gap-8 justify-between">
                <div>
                  <p className="font-semibold">Order Id</p>
                  <p className="text-gray-400 text-sm pt-1">{order?._id}</p>
                </div>
                <div>
                  <p className="font-semibold">Date Placed</p>
                  <p className="text-gray-400 text-sm pt-1">
                    {new Date(order?.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Total amount</p>
                  <p className="pt-1 text-sm">${order?.amount}</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Status</p>
                  <div
                    className={cn(
                      "mt-1 py-0.5 px-2 text-xs border uppercase rounded-full",
                      bgColor,
                      color,
                      border
                    )}
                  >
                    {order?.status}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button size={"sm"} variant={"outline"}>
                    View Order
                  </Button>
                  {order?.status === "pending" ? (
                    <Link
                      href={`/payment?cId=${order?.userId}&oId=${order?._id}`}
                      className="border h-9 px-3 rounded-sm text-sm flex items-center justify-center font-medium bg-background hover:bg-accent hover:text-accent-foreground"
                    >
                      Checkout
                    </Link>
                  ) : (
                    <Button size={"sm"} variant={"outline"}>
                      View Invoice
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 divide-y [&>:not(:first-child)]:pt-4">
                {order?.products?.map((product: any) => (
                  <div
                    key={product?.productId}
                    className="flex justify-between items-center"
                  >
                    <div className="relative w-20 h-20 rounded-sm overflow-hidden">
                      <Image
                        src={product?.image}
                        alt=""
                        fill
                        sizes="100%*100%"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>{product?.name}</div>
                    <div>${product?.price}</div>
                    <div>Qty: {product?.quantity}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
