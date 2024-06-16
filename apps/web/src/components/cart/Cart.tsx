"use client";
import Image from "next/image";
import { Input } from "ui/components/ui/input";
import { Trash2 } from "lucide-react";
import { Button } from "ui/components/ui/button";
import {
  useMutation,
  useQuery,
  useQueryClient
} from "react-query";
import { deleteCartItem, fetchCartItems } from "@/app/api/cart";
import { useSession } from "next-auth/react";
import { Skeleton } from "ui/components/ui/skeleton";
import { toast } from "sonner";

const Cart = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const user: any = session?.user;

  const { data: cart, isFetching } = useQuery(
    "cartItems",
    () => fetchCartItems(user?.id),
    {
      enabled: !!user?.id,
    }
  );

  const mutation = useMutation(
    ({ cartId, productId }: { cartId: string; productId: string }) =>
      deleteCartItem(cartId, productId)
  );

  if (isFetching) {
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

  return (
    <div className="max-w-6xl mx-auto p-8 mt-8">
      <h4 className="text-2xl text-bold">Your Cart (2 Items)</h4>
      <div className="flex gap-40 mt-10">
        <div className="flex flex-col gap-8 divide-y-2 w-full max-w-3xl">
          {cart?.data?.products?.length > 0 ? (
            cart?.data?.products?.map((product: any) => (
              <div
                key={product?.productId}
                className="grid grid-cols-12 pt-8 gap-8 place-items-start"
              >
                <div className="relative w-24 h-28 overflow-hidden bg-gray-200 col-span-2">
                  <Image
                    src={product?.image}
                    alt="phone1"
                    fill
                    sizes="100%*100%"
                    className="w-full h-full object-contain object-center mix-blend-darken"
                  />
                </div>

                <div className="col-span-8 ml-4">
                  <div>
                    <div>{product?.name}</div>
                    <div className="text-sm pt-1 text-gray-600">
                      ${product?.price}
                    </div>
                  </div>
                  <div className="mt-7">
                    <Button
                      size={"sm"}
                      variant={"link"}
                      className="text-red-700 px-0"
                      onClick={() =>
                        mutation.mutate(
                          {
                            cartId: cart.data._id,
                            productId: product.productId,
                          },
                          {
                            onSuccess: (data) => {
                              toast.success("Cart item removed successfully");
                              queryClient.setQueryData("cartItems", data);
                            },
                            onError: () => {
                              toast.error(
                                "Something went wrong while removing cart item. Please try again"
                              );
                            },
                          }
                        )
                      }
                    >
                      <Trash2 className="mr-1 w-5 h-5" />
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-1 col-span-2">
                  <Button className="h-9">-</Button>
                  <Input
                    value={product?.quantity}
                    onChange={() => {}}
                    className="w-12"
                  />
                  <Button className="h-9">+</Button>
                </div>
              </div>
            ))
          ) : (
            <div>Cart is empty</div>
          )}
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
