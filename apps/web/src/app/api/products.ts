import axios from "axios";
import { config } from "@/lib/config";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080/api";

export function fetchProducts(pageNumber: number, limit: number) {
  return axios.get(
    `${config.baseUrl}/product/list?offset=${pageNumber}&limit=${limit}`
  );
}

export function fetchProduct(id: string | undefined) {
  return axios.get(`${config.baseUrl}/product/${id}`);
}
