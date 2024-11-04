"use client";
import OrderSummary from "./OrderSummary";
import ShippingForm from "./ShippingForm";
import DeliveryMethod, { deliveryMethods } from "./DeliveryMethod";
import SavedShippingAddressList, {
  ShippingAddress,
} from "./SavedShippingAddressList";
import { useState } from "react";

const Shipping = () => {
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<ShippingAddress>();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );

  const handleChangeShippingAddress = (address: ShippingAddress) => {
    setSelectedShippingAddress(address);
  };

  const handleChangeDeliveryMethod = (method: DeliveryMethod) => {
    setSelectedDeliveryMethod(method);
  };

  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-4 w-full">
        <h4 className="text-2xl font-medium">Shipping Information</h4>
        <div className="flex flex-col gap-6 divide-y">
          <SavedShippingAddressList
            selectedAddress={selectedShippingAddress}
            onChangeShippingAddress={handleChangeShippingAddress}
          />
          <div className="w-full min-w-[40rem] mt-2 pt-4">
            <h4 className="text-gray-700 text-lg font-medium">
              New Shipping Address
            </h4>
            <div className="mt-4">
              <ShippingForm />
            </div>
          </div>
          <div className="mt-6 pt-4">
            <DeliveryMethod
              selectedMethod={selectedDeliveryMethod}
              onChangeDeliveryMethod={handleChangeDeliveryMethod}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <h4 className="text-2xl font-medium">Order Summary</h4>
        <div className="mt-4">
          <OrderSummary
            deliveryMethod={selectedDeliveryMethod}
            shippingAddress={selectedShippingAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default Shipping;
