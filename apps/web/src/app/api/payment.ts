import { config } from "@/lib/config";
import axios from "axios";

export const createPaymentIntent = async (orderId: string, userId: string) => {
  return await axios.post(
    `${config.baseUrl}/payment/create-payment-intent/${userId}`,
    {
      orderId,
    }
  );
};

export const paymentVerification = async (tokenId: string) => {
  return await axios.get(`${config.baseUrl}/payment/verify/${tokenId}`);
};
