"use client";
import { imageFormatter } from "@/lib/imageFormatter";
import { getOrderById } from "@/app/api/order";
import { mapShippingEnumToObj } from "@/lib/shippingFee";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";

const OrderConfirmation = () => {
  const params = useSearchParams();
  const orderId = params.get("oId") ?? "";

  const { data, isFetching, isError } = useQuery("order", () =>
    getOrderById(orderId),
  );

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const order = data?.data;
  const shippingAddress = order?.shippingAddress;
  const orderedItems = order?.products;
  const paymentMethod = order?.paymentMethod;
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-6">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Order Confirmed!
        </h1>
        <p className="text-slate-500 font-medium">
          Order #{order?._id} has been successfully placed.
        </p>
        <p className="text-slate-400 text-sm mt-1">
          A confirmation email is on its way to{" "}
          <span className="text-slate-600 font-semibold">lama@gmail.com</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="flex-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Expected Delivery
              </span>
              <h2 className="text-2xl font-extrabold mt-1">Wed, 25 October</h2>
              <p className="text-slate-500 text-sm mt-1">
                Standard Shipping (3-5 Business Days)
              </p>
            </div>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
              Track Order
            </button>
          </div>

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
              <div className="flex items-center gap-3 mb-2">
                <svg
                  height="24px"
                  version="1.1"
                  viewBox="0 0 512 512"
                  width="24px"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g id="形状_1_3_">
                    <g id="形状_1">
                      <g>
                        <path d="M211.328,184.445l-23.465,144.208h37.542l23.468-144.208 H211.328z M156.276,184.445l-35.794,99.185l-4.234-21.358l0.003,0.007l-0.933-4.787c-4.332-9.336-14.365-27.08-33.31-42.223     c-5.601-4.476-11.247-8.296-16.705-11.559l32.531,124.943h39.116l59.733-144.208H156.276z M302.797,224.48     c0-16.304,36.563-14.209,52.629-5.356l5.357-30.972c0,0-16.534-6.288-33.768-6.288c-18.632,0-62.875,8.148-62.875,47.739     c0,37.26,51.928,37.723,51.928,57.285c0,19.562-46.574,16.066-61.944,3.726l-5.586,32.373c0,0,16.763,8.148,42.382,8.148     c25.616,0,64.272-13.271,64.272-49.37C355.192,244.272,302.797,240.78,302.797,224.48z M455.997,184.445h-30.185     c-13.938,0-17.332,10.747-17.332,10.747l-55.988,133.461h39.131l7.828-21.419h47.728l4.403,21.419h34.472L455.997,184.445z      M410.27,277.641l19.728-53.966l11.098,53.966H410.27z" />
                      </g>
                    </g>
                  </g>
                  <g id="形状_1_2_">
                    <g id="形状_1_1_">
                      <g>
                        <path d="M104.132,198.022c0,0-1.554-13.015-18.144-13.015H25.715 l-0.706,2.446c0,0,28.972,5.906,56.767,28.033c26.562,21.148,35.227,47.51,35.227,47.51L104.132,198.022z" />
                      </g>
                    </g>
                  </g>
                </svg>
                <span>{paymentMethod?.type} **** **** **** </span>
                <span>{paymentMethod?.card?.last4}</span>
              </div>
              <p className="text-sm text-slate-400 font-medium">
                Expires {paymentMethod?.card?.exp_month}/
                {paymentMethod?.card?.exp_year}
              </p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
              Order Items ({orderedItems?.length})
            </h3>
            <div className="space-y-6">
              {orderedItems?.map((item: any) => (
                <div key={item?.productId} className="flex items-center gap-6">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100">
                    <Image
                      src={imageFormatter(item?.image)}
                      alt={item?.name}
                      fill
                      sizes="100%*100%"
                      className="w-full h-full object-cover "
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">{item?.name}</h4>
                    <p className="text-sm text-slate-500">
                      Qty: {item?.quantity ?? 1}
                    </p>
                  </div>
                  <span className="font-bold text-lg">${item?.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-8">Order Summary</h3>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex justify-between opacity-70">
                <span>Subtotal</span>
                <span>${order?.totalAmount}</span>
              </div>
              <div className="flex justify-between opacity-70">
                <span>Shipping</span>
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
            <p className="text-[10px] text-slate-500 text-center mt-6">
              Inclusive of all local taxes and VAT
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print Invoice
            </button>
            <button className="w-full bg-blue-50 text-blue-700 py-4 rounded-2xl font-bold hover:bg-blue-100 transition-all">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
