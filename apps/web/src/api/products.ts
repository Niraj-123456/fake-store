import axios from "axios";

export function fetchProducts(pageNumber: number, limit: number) {
  return axios.get(
    `https://api.escuelajs.co/api/v1/products?offset=${pageNumber}&limit=${limit}`
  );
}

export function fetchProduct(id: string | undefined) {
  return axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
}
