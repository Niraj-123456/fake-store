import { config } from "@next/lib/config";
import axios from "axios";

export async function getOrders(offset: number, limit: number) {
  return await axios.get(
    `${config.baseUrl}/order/list?offset=${offset}&limit=${limit}`
  );
}
