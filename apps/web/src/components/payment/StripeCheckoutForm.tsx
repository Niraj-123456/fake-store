import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { ChangeEvent, useState } from "react";
import { Button } from "ui/lib/components/ui/button";

const StripeCheckoutForm = ({ orderId }: { orderId: string }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/payment/verification?oId=${orderId}`,
      },
      // redirect: "if_required",
    });

    console.log("result", result);

    if (result.error) {
      setErrorMessage(result.error.message);
    } else {
      console.log("payment success");
      // payment success
    }
    setIsProcessing(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pt-8 grid grid-cols-1 lg:grid-cols-3 gap-10 pb-24">
      <div className="lg:col-span-2 space-y-10">
        <section>
          <h2 className="text-2xl font-extrabold tracking-tight mb-6">
            Payment Method
          </h2>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
              Credit Card Details
            </h3>

            <form onSubmit={handleSubmit}>
              <PaymentElement />

              <div>
                <Button
                  type="submit"
                  disabled={!stripe || !elements || isProcessing}
                  className="w-full mt-5 disabled:bg-gray-400"
                >
                  {isProcessing ? "Processing..." : "Pay"}
                </Button>
              </div>
              {errorMessage && (
                <div className="mt-2 text-sm text-red-600">{errorMessage}</div>
              )}
            </form>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Delivery Speed
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative p-5 rounded-2xl border-2 border-blue-600 bg-blue-50 cursor-pointer transition-all">
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-900">
                  Standard Shipping
                </span>
                <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="block w-1.5 h-1.5 bg-white rounded-full"></span>
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">3-5 business days</p>
              <span className="block mt-4 text-lg font-extrabold text-blue-700">
                $4.00
              </span>
            </div>

            <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition-all">
              <span className="font-bold text-slate-900">Express Delivery</span>
              <p className="text-sm text-slate-500 mt-1">1-2 business days</p>
              <span className="block mt-4 text-lg font-extrabold text-slate-900">
                $10.00
              </span>
            </div>
          </div>
        </section>
      </div>

      <div className="relative">
        <div className="lg:sticky lg:top-8 bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
          <h2 className="text-xl font-bold mb-8">Order Summary</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between opacity-70">
              <span>Subtotal (1 item)</span>
              <span>$43.00</span>
            </div>
            <div className="flex justify-between opacity-70">
              <span>Shipping Fee</span>
              <span>$4.00</span>
            </div>
            <div className="flex justify-between opacity-70">
              <span>Estimated Tax</span>
              <span>$2.50</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 flex justify-between items-center">
            <span className="text-lg font-medium opacity-80">Total</span>
            <span className="text-3xl font-extrabold tracking-tighter">
              $49.50
            </span>
          </div>

          <button className="w-full mt-10 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all text-white py-5 rounded-2xl font-bold shadow-lg shadow-blue-500/20">
            Complete Purchase
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
            Encrypted & Secure Payment
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeCheckoutForm;
