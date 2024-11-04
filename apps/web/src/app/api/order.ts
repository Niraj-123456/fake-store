import { config } from "@/lib/config";
import axios from "axios";

export async function createUserOrder(data: any) {
  return await axios.post(`${config.baseUrl}/order/create`, data);
}

export async function getUserOrder(userId: string) {
  return await axios.get(`${config.baseUrl}/order/${userId}`);
}
