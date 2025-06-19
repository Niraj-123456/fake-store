import PaymentVerification from "@/components/payment/PaymentVerification";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <div>
        <PaymentVerification />
      </div>
    </Suspense>
  );
};

export default page;
