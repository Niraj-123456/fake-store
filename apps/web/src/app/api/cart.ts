import { config } from "@/lib/config";
import { https } from "@/lib/axiosInterceptor";

export function addToCart(data: any) {
  return https.post(`${config.baseUrl}/cart/add`, data);
}
