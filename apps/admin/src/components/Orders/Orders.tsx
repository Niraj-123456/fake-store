"use client";
import {
  Tabs,
  TabsTrigger,
  TabsContent,
  TabsList,
} from "ui/components/ui/tabs";
import CompletedOrders from "./CompletedOrders";

const Orders = () => {
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

      <div className="mt-4 w-full">
        <Tabs defaultValue="orders" className="w-full">
          <TabsList>
            <TabsTrigger value="orders">All Orders</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            <TabsTrigger value="refunded">Refunded</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <p>This is all orders tab</p>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <CompletedOrders />
          </TabsContent>
          <TabsContent value="pending">
            <p>This is pending orders tab</p>
          </TabsContent>
          <TabsContent value="cancelled">
            <p>This is cancelled orders tab</p>
          </TabsContent>
          <TabsContent value="refunded">
            <p>This is refunded orders tab</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;
