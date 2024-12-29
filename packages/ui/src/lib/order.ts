import { OrderStatus } from "ui/types/common/order";

export const orderStatusButtonStyles = (status: OrderStatus) => {
  console.log("status", status);
  const styles: Record<
    OrderStatus,
    { bgColor: string; color: string; border: string }
  > = {
    completed: {
      bgColor: "bg-green-300",
      color: "text-green-800",
      border: "border-green-400",
    },
    pending: {
      bgColor: "bg-yellow-300",
      color: "text-yellow-800",
      border: "border-yellow-400",
    },
  };

  return (
    styles[status] || {
      bgColor: "bg-background",
      color: "text-gray-800",
      border: "border-gray-400",
    }
  );
};
