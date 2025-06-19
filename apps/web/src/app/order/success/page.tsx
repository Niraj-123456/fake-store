import OrderConfirmation from "@/components/order/OrderConfirmation";
import React, { Suspense } from "react";

const OrderSuccessPage = () => {
  return (
    <Suspense fallback={"Loading"}>
      <div>
        <OrderConfirmation />
      </div>
    </Suspense>
  );
};

export default OrderSuccessPage;
