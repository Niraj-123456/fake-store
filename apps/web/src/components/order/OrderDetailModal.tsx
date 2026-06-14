"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "ui/lib/components/ui/dialog";
import { imageFormatter } from "@/lib/imageFormatter";
import Image from "next/image";
import { mapShippingEnumToObj } from "@/lib/shippingFee";

interface OrderDetailModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailModal = ({
  order,
  isOpen,
  onClose,
}: OrderDetailModalProps) => {
  if (!order) return null;

  const shippingAddress = order?.shippingAddress;
  const orderedItems = order?.products;
  const paymentMethod = order?.paymentMethod;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl bg-slate-50">
        <DialogHeader className="p-8 bg-white border-b border-slate-100 top-0 sticky rounded-t-3xl">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-2xl font-black text-slate-900">
                Order Details
              </DialogTitle>
              <p className="text-slate-500 font-medium text-sm mt-1">
                Order ID:{" "}
                <span className="font-mono text-slate-900">{order._id}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Date Placed
              </p>
              <p className="text-sm font-bold text-slate-600">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 text-slate-400 mb-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Shipping Address
                </span>
              </div>
              <div className="text-slate-800 font-semibold leading-relaxed">
                {shippingAddress?.firstName} {shippingAddress?.lastName}
                <br />
                {shippingAddress?.streetName}, {shippingAddress?.city}
                <br />
                {shippingAddress?.country}, {shippingAddress?.zipCode}
                <br />
                <span className="text-slate-400 font-medium text-sm">
                  {shippingAddress?.phoneNumber}
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 text-slate-400 mb-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Payment Method
                </span>
              </div>
              <div className="text-slate-800 font-semibold leading-relaxed">
                <p className="capitalize">{paymentMethod?.type || "N/A"}</p>
                {paymentMethod?.card && (
                  <p className="text-sm text-slate-500 font-medium">
                    **** **** **** {paymentMethod?.card?.last4}
                    <br />
                    Expires {paymentMethod?.card?.exp_month}/
                    {paymentMethod?.card?.exp_year}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
              Order Items ({orderedItems?.length})
            </h3>
            <div className="space-y-6">
              {orderedItems?.map((item: any) => (
                <div key={item?.productId} className="flex items-center gap-6">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image
                      src={imageFormatter(item?.image)}
                      alt={item?.name}
                      fill
                      sizes="100%*100%"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 truncate">
                      {item?.name}
                    </h4>
                    <p className="text-sm text-slate-500">
                      Qty: {item?.quantity ?? 1} x ${item?.price}
                    </p>
                  </div>
                  <span className="font-bold text-lg text-slate-900">
                    ${(item?.price * (item?.quantity ?? 1)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-8">Order Summary</h3>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex justify-between opacity-70">
                <span>Subtotal</span>
                <span>${order?.totalAmount}</span>
              </div>
              <div className="flex justify-between opacity-70">
                <span>Shipping ({order?.deliveryMethod})</span>
                <span>
                  ${mapShippingEnumToObj(order?.deliveryMethod).price}
                </span>
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-lg opacity-80">Order Total</span>
                <span className="text-3xl font-extrabold tracking-tighter">
                  ${order?.finalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
