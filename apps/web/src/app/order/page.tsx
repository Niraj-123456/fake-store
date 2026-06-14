import OrderHistory from "@/components/order/OrderHistory";
import React, { Suspense } from "react";

const OrderPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderHistory />
    </Suspense>
  );
};

export default OrderPage;
