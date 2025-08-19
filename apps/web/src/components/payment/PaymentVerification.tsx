"use client";
import { paymentVerification } from "@/app/api/payment";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import CircularLoading from "ui/lib/components/loading/circular-loading/circular-loading";

const PaymentVerification = () => {
  const router = useRouter();
  const params = useSearchParams();
  const paymentIntentId = params.get("payment_intent") ?? "";
  const orderId = params.get("oId") ?? "";

  const [countDown, setCountDown] = useState(10);

  const { data, isFetching, isError } = useQuery(
    "payment-verification",
    () => paymentVerification(paymentIntentId),
    {
      enabled: !!paymentIntentId,
      refetchInterval: (data: any) => {
        // keep polling if payment is still processing
        console.log("data", data);
        if (!data || data?.data?.status === "processing") {
          return 2000; // poll every 2s
        }
        return false;
      },
      refetchIntervalInBackground: true,
    }
  );

  console.log("is fetching", isFetching);

  const paymentStatus = data?.data?.status;

  console.log("payment status", paymentStatus);

  useEffect(() => {
    if (paymentStatus === "succeeded") {
      const timer = setInterval(() => {
        setCountDown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            console.log("redirected to confirmed order page");
            router.replace(`/order/success?oId=${orderId}`);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [paymentStatus]);

  return (
    <div className="border border-gray-200 rounded-sm py-4 px-8 text-center">
      <h4 className="text-3xl font-semibold">Payment Verification</h4>
      <div className="grid place-items-center p-4">
        {isFetching ||
          (paymentStatus === "processing" && (
            <div className="grid place-items-center">
              <CircularLoading width={"6rem"} thickness={3} />
              <p className="pt-2">Please wait...</p>
            </div>
          ))}
        {data?.data?.status === "succeeded" && (
          <div className="grid place-items-center">
            <CircleCheckBig className="h-24 w-24 stroke-green-600" />
            <p className="pt-2">Payment verification Successful.</p>
          </div>
        )}
        {data?.data?.status === "failed" && (
          <div className="grid place-items-center">
            <CircleX className="h-24 w-24 stroke-red-600" />
            <p className="pt-2">Payment verification failed.</p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p>Amount Paid</p>
        <p className="text-2xl font-semibold">$200</p>
      </div>

      {paymentStatus === "succeeded" && (
        <div className="mt-4">Redirecting in {countDown}s</div>
      )}
    </div>
  );
};

export default PaymentVerification;
