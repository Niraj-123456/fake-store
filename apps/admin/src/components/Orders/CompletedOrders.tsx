import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/ui/table";

const orders = [
  {
    id: "INV001",
    customer: "John Doe",
    date: "2024-03-11",
    items: 5,
    address: "New York",
    status: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV002",
    customer: "John Doe",
    date: "2024-03-11",
    items: 5,
    address: "New York",
    status: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    id: "INV003",
    customer: "John Doe",
    date: "2024-03-11",
    items: 5,
    address: "New York",
    status: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV004",
    customer: "John Doe",
    date: "2024-03-11",
    items: 5,
    address: "New York",
    status: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV005",
    customer: "John Doe",
    date: "2024-03-11",
    items: 5,
    address: "New York",
    status: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    id: "INV006",
    customer: "John Doe",
    date: "2024-03-11",
    items: 5,
    address: "New York",
    status: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV007",
    customer: "John Doe",
    date: "2024-03-11",
    items: 5,
    address: "New York",
    status: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const CompletedOrders = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order?.id}>
              <TableCell>{order?.id}</TableCell>
              <TableCell>{order?.customer}</TableCell>
              <TableCell>{order?.date}</TableCell>
              <TableCell>{order?.status}</TableCell>
              <TableCell>{order?.address}</TableCell>
              <TableCell>{order?.items}</TableCell>
              <TableCell>{order?.totalAmount}</TableCell>
              <TableCell>{order?.paymentMethod}</TableCell>
              <TableCell>
                <a href="#" className="text-blue-500 hover:text-blue-600">
                  View
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompletedOrders;
