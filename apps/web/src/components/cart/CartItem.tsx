import { deleteCartItem } from "@/app/api/cart";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "ui/components/ui/button";
import { Input } from "ui/components/ui/input";
import { toast } from "sonner";
import useCartContext from "@/context/CartContext";

const CartItem = ({ cartId, product }: { cartId: string; product: any }) => {
  const { handleUpdateCartItemCount } = useCartContext();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ cartId, productId }: { cartId: string; productId: string }) =>
      deleteCartItem(cartId, productId)
  );

  return (
    <div className="flex justify-between items-start px-4 gap-2">
      <div className="flex gap-8">
        <div className="relative w-28 h-28 aspect-square overflow-hidden bg-gray-200 col-span-2 rounded-sm ">
          <Image
            src={product?.image}
            alt={product?.name}
            fill
            sizes="100%*100%"
            className="w-full h-full object-contain object-center"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div>
            <div className="line-clamp-2 min-w-40" title={product?.name}>
              {product?.name}
            </div>
            <div className="text-sm pt-1 text-gray-600">${product?.price}</div>
          </div>
          <div className="flex-1 mt-auto flex items-end">
            <Button
              size={"sm"}
              variant={"link"}
              className="text-red-700 p-0"
              onClick={() =>
                mutation.mutate(
                  {
                    cartId,
                    productId: product?.productId,
                  },
                  {
                    onSuccess: (data) => {
                      toast.success("Cart item removed successfully");
                      queryClient.setQueryData("cartItems", data);
                      handleUpdateCartItemCount(1, "DECREMENT");
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
              <Trash2 className="mr-1 w-4 h-4" />
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button className="h-9" onClick={() => {}}>
          -
        </Button>
        <Input value={product?.quantity} onChange={() => {}} className="w-12" />
        <Button className="h-9">+</Button>
      </div>
    </div>
  );
};

export default CartItem;
