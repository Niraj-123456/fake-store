import { useState } from "react";
import CartItem from "@/components/cart/CartItem";
import Link from "next/link";
import DeliveryMethod from "./DeliveryMethod";
import { ShippingAddress } from "./SavedShippingAddressList";
import useCartContext from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { createUserOrder } from "@/app/api/order";
import { toast } from "sonner";
import { Button } from "ui/components/ui/button";
import CircularLoading from "ui/components/loading/circular-loading/circular-loading";
import { useRouter } from "next/navigation";

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

  const { totalPrice, shippingFee, finalPrice } = cartItem;

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
      console.log("res", res);
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
    <div className="border py-4 rounded-md w-full">
      <div className="flex flex-col divide-y gap-4">
        <div className="flex flex-col gap-4 divide-y [&>:not(:first-child)]:pt-4">
          {cartItem?.products?.map((item: any) => (
            <CartItem
              key={item?.productId}
              cartId={cartItem?._id}
              product={item}
            />
          ))}
        </div>
        <div className="pt-4 flex flex-col gap-4 px-4">
          <div className="flex items-center justify-between">
            <span>Subtotal ({count} items)</span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping Fee</span>
            <span>${shippingFee}</span>
          </div>
          <div className="flex items-center justify-between font-semibold border-t border-gray-200 pt-2">
            <span>Total</span>
            <span>${finalPrice}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 px-4">
        <Button
          onClick={handleCreateOrder}
          className="w-full"
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
      </div>
    </div>
  );
};

export default OrderSummary;
