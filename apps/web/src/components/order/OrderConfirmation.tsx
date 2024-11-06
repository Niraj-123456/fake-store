"use client";
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
    getOrderById(orderId)
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
    <div className="w-full max-w-5xl h-full flex flex-col mx-auto justify-center">
      <div className="flex justify-between">
        <div>
          <h4 className="text-2xl font-semibold">
            Thank you for your order #{order?._id}
          </h4>
          <p className="text-gray-500 pt-2">
            An email confirmation with tracking id has been sent to your email
            address.
          </p>
        </div>
        <div>
          <Link
            href={"/"}
            className="border rounded-md py-3 px-4 bg-primary text-white transition-all duration-200 ease-in-out hover:bg-primary/80"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="w-full grid grid-cols-2 gap-8 border p-4 rounded-md">
          <div>
            <h4 className="font-semibold">Shipping Address</h4>
            <div className="mt-1">
              <div>
                {shippingAddress?.firstName} {shippingAddress?.lastName}
              </div>
              <div>{shippingAddress?.streetName}</div>
              <div>
                {shippingAddress?.city}, {shippingAddress?.zipCode},{" "}
                {shippingAddress?.country}
              </div>
              <div>{shippingAddress?.phoneNumber}</div>
              <div>{shippingAddress?.email}</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Payment Method</h4>
            <div className="mt-1">
              <div className="flex gap-2 text-gray-700">
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
              <div className="text-sm text-gray-700">
                Exp: {paymentMethod?.card?.exp_month}/
                {paymentMethod?.card?.exp_year}
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Shipping Method</h4>
            <div className="mt-1">
              {mapShippingEnumToObj(order?.deliveryMethod).period} business days
              ({mapShippingEnumToObj(order?.deliveryMethod).label})
            </div>
          </div>
        </div>
        <div className="border p-4 rounded-md min-w-80 flex flex-col gap-4 divide-y">
          <div>
            <h4 className="font-semibold">Order Summary</h4>
            <div className="flex flex-col gap-2 mt-1 divide-y [&>:not(:first-child)]:pt-2 [&>:last-child]:font-semibold">
              <div className="flex justify-between gap-4">
                <span>subtotal ({2} items)</span>
                <span>${order?.totalAmount}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Shipping Fee</span>
                <span>
                  ${mapShippingEnumToObj(order?.deliveryMethod).price}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Order Total</span>
                <span>${order?.finalAmount}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 text-right">
              (Inclusive of all taxes)
            </div>
          </div>
          <div className="pt-4">
            <h4 className="font-semibold">Items Ordered</h4>
            <div className="mt-2">
              {orderedItems?.map((item: any) => (
                <div key={item?.productId} className="flex gap-2">
                  <div className="relative w-12 h-12 rounded-sm overflow-hidden">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      fill
                      sizes="100%*100%"
                    />
                  </div>
                  <div className="text-xs text-gray-600 flex flex-col leading-tight">
                    <p className="font-medium text-gray-700">{item?.name}</p>
                    <p>Qty: {item?.quantity ?? 1}</p>
                    <p>${item?.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
