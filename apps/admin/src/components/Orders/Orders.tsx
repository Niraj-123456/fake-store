"use client";
import userOrders from "@next/hooks/orders/useOrders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/lib/components/ui/table";
import CircularLoading from "ui/lib/components/loading/circular-loading/circular-loading";
import { cn } from "ui/lib/utils";
import { orderStatusButtonStyles } from "ui/lib/order";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/lib/components/ui/select";

const Orders = () => {
  const { fetching, orders } = userOrders();
  return (
    <div className="mt-2">
      <div className="flex items-center gap-4">
        <div className="w-64 shadow-md rounded-md p-4 flex flex-col">
          <div className="text-gray-500">Total Orders</div>
          <div className="text-2xl font-bold mt-1">250</div>

          <div className="flex text-xs gap-2 items-center mt-0.5">
            <div className="w-max rounded-full px-1 border border-green-600 text-green-600">
              200 +
            </div>
            <span className="text-gray-400">From Last Month</span>
          </div>
        </div>
        <div className="w-64 shadow-md rounded-md p-4 flex flex-col">
          <div className="text-gray-500">New Orders</div>
          <div className="text-2xl font-bold mt-1">100</div>

          <div className="flex text-xs gap-2 items-center mt-0.5">
            <div className="w-max rounded-full px-1 border border-red-500 text-red-500">
              50 -
            </div>
            <span className="text-gray-400">From Last Month</span>
          </div>
        </div>
      </div>

      <div className="mt-8 w-full">
        <div className="flex flex-col gap-0.5">
          <div className="text-xs text-gray-500">Status</div>
          <Select defaultValue="ALL">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="border mt-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>OrderId</TableHead>
                <TableHead>Ordered Date</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Shipping Address</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Delivery Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fetching ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    <div className="w-full flex justify-center">
                      <CircularLoading thickness={4} />
                    </div>
                  </TableCell>
                </TableRow>
              ) : orders?.length > 0 ? (
                orders?.map((order: any) => {
                  const { bgColor, color, border } = orderStatusButtonStyles(
                    order?.status
                  );
                  return (
                    <TableRow
                      key={order?._id}
                      className="*:py-2 *:px-4 *:text-gray-600"
                    >
                      <TableCell>{order?._id}</TableCell>
                      <TableCell>
                        {new Date(order?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell className="uppercase">
                        {order?.currency}
                      </TableCell>
                      <TableCell>
                        {order?.finalAmount ? `$${order?.finalAmount}` : "-"}
                      </TableCell>
                      <TableCell>
                        {order?.shippingAddress?.city},{" "}
                        {order?.shippingAddress?.country}
                      </TableCell>
                      <TableCell>{order?.paymentMethod?.type || "-"}</TableCell>
                      <TableCell>{order?.deliveryMethod}</TableCell>
                      <TableCell>
                        <div
                          className={cn(
                            bgColor,
                            color,
                            border,
                            "px-2 py-0.5 rounded-full text-center w-24 uppercase text-xs"
                          )}
                        >
                          {order?.status}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>No Orders Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
