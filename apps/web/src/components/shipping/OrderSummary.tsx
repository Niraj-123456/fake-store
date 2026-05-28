import { useState } from "react";
import CartItem from "@/components/cart/CartItem";
import Link from "next/link";
import DeliveryMethod from "./DeliveryMethod";
import { ShippingAddress } from "./SavedShippingAddressList";
import useCartContext from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { createUserOrder } from "@/app/api/order";
import { toast } from "sonner";
import { Button } from "ui/lib/components/ui/button";
import CircularLoading from "ui/lib/components/loading/circular-loading/circular-loading";
import { useRouter } from "next/navigation";
import CartItemSummary from "./CartItemSummary";

const OrderSummary = ({
  deliveryMethod,
  shippingAddress,
}: {
  deliveryMethod: DeliveryMethod;
  shippingAddress: ShippingAddress | undefined;
}) => {
  const router = useRouter();
  const { count, cartItem, fetching } = useCartContext();
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;

  const [creating, setCreating] = useState(false);
  if (fetching) {
    return <div>Loading...</div>;
  }

  if (!cartItem) {
    return null;
  }

  const { totalPrice, finalPrice } = cartItem;

  const handleCreateOrder = async () => {
    setCreating(true);

    try {
      const res = await createUserOrder({
        userId,
        cartId: cartItem?._id,
        products: cartItem?.products,
        shippingAddress,
        status: "pending",
        deliveryMethod: deliveryMethod?.value,
      });
      if (res.status === 201) {
        toast.success("Order created successfully");
        router.replace(`/payment?uId=${userId}&oId=${res?.data?._id}`);
      } else {
        toast.error("Error while creating order. Please try again later.");
      }
    } catch (ex) {
      console.log("error", ex);
      toast.error("Something went wrong.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="py-4 rounded-md w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 divide-y [&>:not(:first-child)]:pt-4">
          {cartItem?.products?.map((item: any) => (
            <CartItemSummary key={item?.productId} product={item} />
          ))}
        </div>
        <div className="pt-4 flex flex-col space-y-4 border-t border-slate-800 gap-4 px-4">
          <div className="flex items-center justify-between">
            <span className="flex justify-between opacity-60">
              Subtotal ({count} items)
            </span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex justify-between opacity-60">
              Shipping Fee
            </span>
            <span>${deliveryMethod.price}</span>
          </div>
          <div className="flex items-center justify-between font-semibold border-t border-slate-800 pt-2">
            <span className="text-lg opacity-80">Total</span>
            <span className="text-3xl font-bold tracking-tighter">
              ${finalPrice}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 px-4">
        <Button
          onClick={handleCreateOrder}
          className="w-full mt-10 bg-blue-600 h-14 hover:bg-blue-700 active:scale-[0.98] py-5 rounded-2xl font-bold shadow-lg shadow-blue-600/20"
          disabled={creating}
        >
          Proceed to Payment (${finalPrice})
          {creating && (
            <CircularLoading
              width={"1.5rem"}
              color="#fff"
              thickness={4}
              style={{ marginLeft: "10px" }}
            />
          )}
        </Button>
        <p className="text-[10px] text-slate-500 text-center mt-6 uppercase tracking-widest font-bold">
          🔒 Secure Encrypted Checkout
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
