"use client";
import OrderSummary from "./OrderSummary";
import ShippingForm from "./ShippingForm";
import DeliveryMethod from "./DeliveryMethod";
import SavedShippingAddressList, {
  ShippingAddress,
} from "./SavedShippingAddressList";
import { useState } from "react";
import { deliveryMethods } from "@/lib/shippingFee";

const Shipping = () => {
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<ShippingAddress>();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods.STANDARD,
  );

  const handleChangeShippingAddress = (address: ShippingAddress) => {
    setSelectedShippingAddress(address);
  };

  const handleChangeDeliveryMethod = (method: DeliveryMethod) => {
    setSelectedDeliveryMethod(method);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-12">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight mb-6">
            Shipping Information
          </h2>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Saved Address
          </h3>
          <div className="flex flex-col gap-6 divide-y divide-gray-200/80">
            <SavedShippingAddressList
              selectedAddress={selectedShippingAddress}
              onChangeShippingAddress={handleChangeShippingAddress}
            />
            <div className="w-full min-w-[40rem] mt-4 pt-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                Add New Address
              </h3>
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
      </div>
      <div className="relative">
        <div className="lg:sticky lg:top-24 bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-900/20">
          <h4 className="text-xl font-bold mb-8">Order Summary</h4>
          <div className="mt-4">
            <OrderSummary
              deliveryMethod={selectedDeliveryMethod}
              shippingAddress={selectedShippingAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
