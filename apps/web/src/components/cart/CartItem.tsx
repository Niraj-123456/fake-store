import { deleteCartItem } from "@/app/api/cart";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "ui/lib/components/ui/button";
import { Input } from "ui/lib/components/ui/input";
import { toast } from "sonner";
import useCartContext from "@/context/CartContext";
import { imageFormatter } from "@/lib/imageFormatter";

const CartItem = ({ cartId, product }: { cartId: string; product: any }) => {
  const { handleUpdateCartItemCount } = useCartContext();
  const queryClient = useQueryClient();

  console.log("product", product);

  const mutation = useMutation(
    ({ cartId, productId }: { cartId: string; productId: string }) =>
      deleteCartItem(cartId, productId),
  );

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
      <div className="flex gap-8">
        <div className="w-40 h-40 relative rounded-3xl overflow-hidden bg-slate-100 shrink-0">
          <Image
            src={imageFormatter(product?.image)}
            alt={product?.name}
            fill
            sizes="100%*100%"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div>
            <div
              className="line-clamp-2 min-w-40 text-xl font-medium text-slate-900"
              title={product?.name}
            >
              {product?.name}
            </div>
            <div className="text-2xl font-semibold text-slate-900 mt-4">
              ${product?.price}
            </div>
          </div>

          <div className="flex-1 mt-auto flex items-end">
            <Button
              size={"sm"}
              variant={"ghost"}
              className="text-red-700 hover:bg-red-50 hover:text-red-800 rounded-lg uppercase tracking-widest"
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
                        "Something went wrong while removing cart item. Please try again",
                      );
                    },
                  },
                )
              }
            >
              <Trash2 className="mr-1 w-4 h-4" />
              Remove Item
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 ml-auto rounded-full p-1 flex items-center border border-slate-200">
        <Button
          className="h-9 rounded-full bg-gray-50 text-gray-600 shadow-none hover:bg-gray-200"
          onClick={() => {}}
        >
          -
        </Button>
        <Input
          value={product?.quantity}
          onChange={() => {}}
          className="w-12 pl-5 border-none shadow-none"
        />
        <Button className="h-9 rounded-full bg-gray-50 text-gray-600 shadow-none hover:bg-gray-200">
          +
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
