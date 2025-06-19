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
    <div className="border border-gray-200 px-4 py-6 max-w-sm rounded-md">
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
  );
};

export default StripeCheckoutForm;
