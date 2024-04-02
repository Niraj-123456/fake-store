import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001/api";

export function fetchProducts(pageNumber: number, limit: number) {
  return axios.get(
    `${baseUrl}/product/list?offset=${pageNumber}&limit=${limit}`
  );
}

export function fetchProduct(id: string | undefined) {
  return axios.get(`${baseUrl}/product/${id}`);
}
