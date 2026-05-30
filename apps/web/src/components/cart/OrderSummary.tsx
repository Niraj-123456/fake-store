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
    <div className="lg:sticky lg:top-32 bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl shadow-slate-900/20">
      <h2 className="text-xl font-bold mb-8">Order Summary</h2>
      <div className="space-y-4 text-sm font-medium">
        <div className="flex justify-between opacity-60">
          <span>Subtotal ({itemsCount} items)</span>
          <span>${totalAmount}</span>
        </div>

        <div className="flex justify-between opacity-60">
          <span>Shipping Fee</span>
          <span>${shippingFee}</span>
        </div>
        {/* <div className="flex justify-between p-2">
          <div className="text-gray-600">Tax</div>
          <div>$13</div>
        </div> */}
        <div className="pt-6 mt-6 border-t border-slate-800 flex justify-between items-center">
          <span className="text-lg opacity-80">Total</span>
          <span className="text-3xl font-extrabold tracking-tighter">
            ${finalAmount}
          </span>
        </div>
      </div>

      <Link
        href={"/shipping"}
        className="w-full mt-10 bg-blue-600 justify-center flex hover:bg-blue-700 whitespace-nowrap active:scale-[0.98] transition-all text-white py-5 rounded-2xl font-bold shadow-lg shadow-blue-600/20"
      >
        Proceed to Checkout
      </Link>

      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">
            VISA
          </div>
          <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">
            MC
          </div>
          <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">
            PAY
          </div>
        </div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          Secure Checkout
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
