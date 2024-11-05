"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { useEffect, useState } from "react";
import { createPaymentIntent } from "@/app/api/payment";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

const Payment = () => {
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;
  const params = useSearchParams();
  const orderId = params.get("oId") ?? "";

  const { data } = useQuery(
    "stripe-payment",
    () => createPaymentIntent(orderId!, userId!),
    {
      enabled: !!userId,
    }
  );

  console.log("data", data);

  const clientSecret = data?.data?.client_secret;

  const appearance = {
    theme: "stripe",
  };

  const options = {
    appearance,
    clientSecret,
  } as StripeElementsOptions;

  return (
    <div>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <StripeCheckoutForm orderId={orderId} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
