import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Button } from "ui/lib/components/ui/button";
import useCartContext from "@/context/CartContext";
import CircularLoading from "ui/lib/components/loading/circular-loading/circular-loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "ui/lib/components/ui/dialog";
import { paymentVerification } from "@/app/api/payment";
import { CircleCheckBig, CircleX, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { mapShippingEnumToObj } from "@/lib/shippingFee";
import { DeliveryMethods } from "@/enums/deliveryMethod";

type Metadata = {
  totalAmount: number;
  finalAmount: number;
  deliveryMethod: DeliveryMethods;
  currency: string;
};

const StripeCheckoutForm = ({
  orderId,
  metadata,
}: {
  orderId: string;
  metadata: Metadata;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { cartItem, count } = useCartContext();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "verifying" | "succeeded" | "failed"
  >("idle");

  const handleCompletePurchase = async () => {
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    setIsProcessing(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/verification?oId=${orderId}`,
        },
        redirect: "if_required",
      });

      if (result.error) {
        setErrorMessage(result.error.message);
        setIsProcessing(false);
      } else if (result.paymentIntent) {
        // Payment succeeded or is processing without redirect
        handleVerifyPayment(result.paymentIntent.id);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  const handleVerifyPayment = async (paymentIntentId: string) => {
    setVerifying(true);
    setVerificationStatus("verifying");

    try {
      // Simple polling or single check
      let attempts = 0;
      const maxAttempts = 5;

      const verify = async () => {
        const res = await paymentVerification(paymentIntentId);
        if (res.data.status === "succeeded") {
          setVerificationStatus("succeeded");
          setTimeout(() => {
            router.replace(`/order/success?oId=${orderId}`);
          }, 2000);
        } else if (res.data.status === "failed") {
          setVerificationStatus("failed");
          setIsProcessing(false);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(verify, 2000);
        } else {
          setVerificationStatus("failed");
          setIsProcessing(false);
        }
      };

      await verify();
    } catch (err) {
      setVerificationStatus("failed");
      setIsProcessing(false);
    }
  };

  if (!cartItem) return null;

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

            <PaymentElement />
            {errorMessage && (
              <div className="mt-4 text-sm text-red-600 font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                {errorMessage}
              </div>
            )}
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

            <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition-all text-slate-400">
              <span className="font-bold">Express Delivery</span>
              <p className="text-sm mt-1">1-2 business days</p>
              <span className="block mt-4 text-lg font-extrabold">$10.00</span>
            </div>
          </div>
        </section>
      </div>

      <div className="relative">
        <div className="lg:sticky lg:top-8 bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
          <h2 className="text-xl font-bold mb-8">Order Summary</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between opacity-70">
              <span>Subtotal ({count} items)</span>
              <span>${metadata?.totalAmount}</span>
            </div>
            <div className="flex justify-between opacity-70">
              <span>Shipping Fee</span>
              <span>
                ${metadata?.deliveryMethod
                  ? mapShippingEnumToObj(metadata.deliveryMethod as any)?.price
                  : 0}
              </span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 flex justify-between items-center">
            <span className="text-lg font-medium opacity-80">Total</span>
            <span className="text-3xl font-extrabold tracking-tighter">
              ${metadata?.finalAmount}
            </span>
          </div>

          <Button
            onClick={handleCompletePurchase}
            disabled={!stripe || !elements || isProcessing}
            className="w-full mt-10 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all text-white py-8 rounded-2xl font-bold shadow-lg shadow-blue-500/20 text-lg h-14"
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <CircularLoading width="1.5rem" thickness={3} color="#fff" />
                Processing...
              </div>
            ) : (
              "Complete Purchase"
            )}
          </Button>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5" />
            Encrypted & Secure Payment
          </div>
        </div>
      </div>

      <Dialog open={verifying} onOpenChange={setVerifying}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              Payment Verification
            </DialogTitle>
            <DialogDescription className="text-center">
              Please wait while we verify your transaction.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            {verificationStatus === "verifying" && (
              <>
                <CircularLoading width="4rem" thickness={4} />
                <p className="mt-4 text-slate-600 font-medium">
                  Verifying with your bank...
                </p>
              </>
            )}
            {verificationStatus === "succeeded" && (
              <>
                <div className="bg-green-100 p-4 rounded-full">
                  <CircleCheckBig className="h-16 w-16 text-green-600" />
                </div>
                <p className="mt-4 text-green-700 font-bold text-xl">
                  Payment Successful!
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  Redirecting to order success page...
                </p>
              </>
            )}
            {verificationStatus === "failed" && (
              <>
                <div className="bg-red-100 p-4 rounded-full">
                  <CircleX className="h-16 w-16 text-red-600" />
                </div>
                <p className="mt-4 text-red-700 font-bold text-xl">
                  Verification Failed
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  Something went wrong. Please try again.
                </p>
                <Button
                  className="mt-6"
                  onClick={() => {
                    setVerifying(false);
                    setVerificationStatus("idle");
                  }}
                >
                  Close
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StripeCheckoutForm;
