import { config } from "@/lib/config";
import { https } from "@/lib/axiosInterceptor";

export function addToCart(data: any) {
  return https.post(`${config.baseUrl}/cart/add`, data);
}

export function fetchCartItems(userId: string) {
  return https.get(`${config.baseUrl}/cart/items/${userId}`);
}

export function deleteCartItem(userId: string, productId: string) {
  return https.delete(
    `${config.baseUrl}/cart/item/remove/${userId}/${productId}`
  );
}

export function fetchCartItemCount(userId: string) {
  return https.get(`${config.baseUrl}/cart/items/count/${userId}`);
}
