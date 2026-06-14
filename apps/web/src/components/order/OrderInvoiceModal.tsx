"use client";
import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "ui/lib/components/ui/dialog";
import { imageFormatter } from "@/lib/imageFormatter";
import { mapShippingEnumToObj } from "@/lib/shippingFee";
import { Button } from "ui/lib/components/ui/button";
import { Printer, Loader2 } from "lucide-react";
import { useQuery } from "react-query";
import { getOrderById } from "@/app/api/order";

interface OrderInvoiceModalProps {
  orderId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderInvoiceModal = ({ orderId, isOpen, onClose }: OrderInvoiceModalProps) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const { data: orderData, isLoading, isError } = useQuery(
    ["order", orderId],
    () => getOrderById(orderId!),
    {
      enabled: !!orderId && isOpen,
    }
  );

  const order = orderData?.data;

  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = invoiceRef.current;
    if (printContent && order) {
      const windowUrl = window.location.href;
      const uniqueName = new Date();
      const windowName = "Print" + uniqueName.getTime();
      const printWindow = window.open(windowUrl, windowName, 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
      
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Invoice - ${order._id}</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                @media print {
                  .no-print { display: none !important; }
                  body { padding: 0; margin: 0; }
                  .print-container { border: none !important; shadow: none !important; }
                }
              </style>
            </head>
            <body>
              <div class="p-8">
                ${printContent.innerHTML}
              </div>
              <script>
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 500);
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  const shippingAddress = order?.shippingAddress;
  const orderedItems = order?.products;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl bg-white">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <Loader2 className="w-10 h-10 text-slate-900 animate-spin" />
            <p className="text-slate-500 font-medium">Fetching verified invoice data...</p>
          </div>
        ) : isError ? (
          <div className="p-20 text-center">
            <p className="text-red-500 font-bold">Failed to load invoice details.</p>
            <Button onClick={onClose} variant="outline" className="mt-4">Close</Button>
          </div>
        ) : !order ? (
          <div className="p-20 text-center">
            <p className="text-slate-500 font-medium">No order data found.</p>
            <Button onClick={onClose} variant="outline" className="mt-4">Close</Button>
          </div>
        ) : (
          <>
            <div className="p-8 no-print flex justify-end border-b border-slate-100">
              <Button onClick={handlePrint} className="flex items-center gap-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                <Printer className="w-4 h-4" />
                Print Invoice
              </Button>
            </div>

            <div ref={invoiceRef} className="p-12 print-container">
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">FAKE STORE</h1>
                  <p className="text-slate-500 text-sm">123 Commerce St, Digital City</p>
                  <p className="text-slate-500 text-sm">contact@fakestore.com</p>
                </div>
                <div className="text-right">
                  <h2 className="text-4xl font-black text-slate-200 uppercase tracking-tighter mb-4">INVOICE</h2>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Invoice No</p>
                    <p className="text-sm font-mono font-bold text-slate-900">{order._id.substring(0, 8).toUpperCase()}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12 mb-12">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Bill To</p>
                  <div className="text-slate-800 font-bold leading-relaxed">
                    {shippingAddress?.firstName} {shippingAddress?.lastName}<br />
                    <span className="font-medium text-slate-600">
                      {shippingAddress?.streetName}, {shippingAddress?.city}<br />
                      {shippingAddress?.country}, {shippingAddress?.zipCode}<br />
                      {shippingAddress?.phoneNumber}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Invoice Date</p>
                  <p className="text-slate-800 font-bold">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </p>
                </div>
              </div>

              {/* Table */}
              <table className="w-full mb-12">
                <thead>
                  <tr className="border-b-2 border-slate-900">
                    <th className="text-left py-4 text-xs font-black text-slate-900 uppercase tracking-widest">Description</th>
                    <th className="text-center py-4 text-xs font-black text-slate-900 uppercase tracking-widest">Qty</th>
                    <th className="text-right py-4 text-xs font-black text-slate-900 uppercase tracking-widest">Price</th>
                    <th className="text-right py-4 text-xs font-black text-slate-900 uppercase tracking-widest">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orderedItems?.map((item: any) => (
                    <tr key={item?.productId}>
                      <td className="py-6">
                        <p className="font-bold text-slate-900">{item?.name}</p>
                        <p className="text-xs text-slate-400 mt-1">Product ID: {item?.productId.substring(0,8)}</p>
                      </td>
                      <td className="py-6 text-center font-bold text-slate-600">{item?.quantity ?? 1}</td>
                      <td className="py-6 text-right font-bold text-slate-600">${item?.price}</td>
                      <td className="py-6 text-right font-black text-slate-900">${(item?.price * (item?.quantity ?? 1)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-72 space-y-3">
                  <div className="flex justify-between text-sm font-bold text-slate-500">
                    <span>Subtotal</span>
                    <span>${order?.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-500">
                    <span>Shipping ({order?.deliveryMethod})</span>
                    <span>${mapShippingEnumToObj(order?.deliveryMethod).price}</span>
                  </div>
                  <div className="pt-4 border-t-2 border-slate-900 flex justify-between items-center">
                    <span className="text-lg font-black text-slate-900">Total</span>
                    <span className="text-3xl font-black text-slate-900">${order?.finalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="mt-24 pt-12 border-t border-slate-100">
                <p className="text-xs text-center text-slate-400 font-bold uppercase tracking-widest">Thank you for your business!</p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderInvoiceModal;
