"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { useEffect, useState } from "react";
import { createPaymentIntent } from "@/app/api/payment";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import CircularLoading from "ui/lib/components/loading/circular-loading/circular-loading";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

const Payment = () => {
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;
  const params = useSearchParams();
  const orderId = params.get("oId") ?? "";

  const { data, isFetching } = useQuery(
    "stripe-payment",
    () => createPaymentIntent(orderId!, userId!),
    {
      enabled: !!userId,
    }
  );

  const clientSecret = data?.data?.client_secret;

  const appearance = {
    theme: "stripe",
  };

  const options = {
    appearance,
    clientSecret,
  } as StripeElementsOptions;

  return (
    <div className="flex justify-center items-center h-full">
      {isFetching ? (
        <div>
          <CircularLoading width={"5rem"} thickness={4} />
        </div>
      ) : (
        stripePromise &&
        clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <StripeCheckoutForm orderId={orderId} />
          </Elements>
        )
      )}
    </div>
  );
};

export default Payment;
