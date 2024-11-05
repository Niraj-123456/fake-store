import { CircleCheck } from "lucide-react";
import { cn } from "ui/lib/utils";
import { deliveryMethods } from "@/lib/shippingFee";

type DeliveryMethod = {
  value: string;
  label: string;
  period: string;
  price: number;
};

const DeliveryMethod = ({
  selectedMethod,
  onChangeDeliveryMethod,
}: {
  selectedMethod: DeliveryMethod;
  onChangeDeliveryMethod: (method: DeliveryMethod) => void;
}) => {
  return (
    <div className="mt-2">
      <h4 className="text-xl font-medium">Delivery Method</h4>
      <div className="flex gap-4 items-center mt-4">
        {Object.values(deliveryMethods)?.map((deliveryMethod, idx) => (
          <div
            key={idx}
            onClick={() => onChangeDeliveryMethod(deliveryMethod)}
            className={cn(
              "rounded-lg p-4 w-full relative cursor-pointer border",
              selectedMethod?.value === deliveryMethod?.value
                ? "outline-2 outline-blue-600 outline"
                : ""
            )}
          >
            <p className="font-medium">{deliveryMethod?.label}</p>
            <p className="text-sm text-gray-500">
              {deliveryMethod?.period} business days
            </p>
            <p className="mt-4 font-medium">${deliveryMethod?.price}</p>

            <CircleCheck
              className={cn(
                "fill-blue-600 stroke-white absolute right-2 top-4 w-5 h-5 transition-opacity duration-200 ease-in-out",
                selectedMethod?.value === deliveryMethod?.value
                  ? "opacity-100"
                  : "opacity-0"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMethod;
