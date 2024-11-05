import Link from "next/link";

type OrderSummaryProps = {
  itemsCount: number;
  totalAmount: number;
  shippingFee: number;
  finalAmount: number;
};

const OrderSummary = ({
  itemsCount,
  totalAmount,
  shippingFee,
  finalAmount,
}: OrderSummaryProps) => {
  return (
    <div className="w-full h-full max-w-xs p-4 bg-gray-100 rounded-md">
      <h4 className="p-2 font-semibold">Order Summary</h4>
      <div className="flex flex-col gap-2 mt-4 divide-y-2">
        <div className="flex justify-between p-2">
          <div className="text-gray-600">Subtotal ({itemsCount} items)</div>
          <div>${totalAmount}</div>
        </div>

        <div className="flex justify-between p-2">
          <div className="text-gray-600">Shipping Fee</div>
          <div>${shippingFee}</div>
        </div>
        {/* <div className="flex justify-between p-2">
          <div className="text-gray-600">Tax</div>
          <div>$13</div>
        </div> */}
        <div className="flex justify-between p-2 font-semibold">
          <div>Total</div>
          <div>${finalAmount}</div>
        </div>
      </div>

      <Link
        href={"/shipping"}
        className="flex w-full px-4 py-2 mt-4 whitespace-nowrap text-white rounded-md justify-center cursor-pointer bg-gray-950 transition-all duration-150 hover:bg-opacity-80"
      >
        Proceed to Checkout ${finalAmount}
      </Link>
    </div>
  );
};

export default OrderSummary;
