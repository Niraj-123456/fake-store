import Payment from "@/components/payment/Payment";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <Payment />
    </Suspense>
  );
};

export default page;
