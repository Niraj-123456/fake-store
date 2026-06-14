import { config } from "@/lib/config";
import axios from "axios";

export async function createUserOrder(data: any) {
  return await axios.post(`${config.baseUrl}/order/create`, data);
}

export async function getUserOrder(userId: string, limit = 20, offset = 1) {
  return await axios.get(
    `${config.baseUrl}/order/${userId}?limit=${limit}&offset=${offset}`,
  );
}

export async function getOrderById(orderId: string) {
  return await axios.get(`${config.baseUrl}/order/id/${orderId}`);
}
