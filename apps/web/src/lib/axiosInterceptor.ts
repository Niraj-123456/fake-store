import axios from "axios";
import { readFromLocalStorage } from "./localStorage";

axios.interceptors.request.use((req) => {
  const token = readFromLocalStorage("accessToken");
  console.log("token", token);
  req.headers.Authorization = token ? `Bearer ${token}` : "";
  return req;
});

export const https = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
