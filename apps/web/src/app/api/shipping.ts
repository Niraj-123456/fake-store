import { ShippingAddress } from "@/components/shipping/SavedShippingAddressList";
import { config } from "@/lib/config";
import axios from "axios";

export async function addShippingAddress(data: ShippingAddress) {
  return await axios.post(`${config.baseUrl}/shipping/add`, data);
}

export async function updateShippingAddress(data: ShippingAddress) {
  return await axios.put(
    `${config.baseUrl}/shipping/update/${data?._id}`,
    data,
  );
}

export async function getShippingAddressList(userId: string) {
  return await axios.get(`${config.baseUrl}/shipping/list/${userId}`);
}

export async function deleteShippingAddress(shippingId: string) {
  return await axios.delete(`${config.baseUrl}/shipping/delete/${shippingId}`);
}
