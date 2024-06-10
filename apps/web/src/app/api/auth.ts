import { config } from "@/lib/config";
import axios from "axios";

export function userLogin(email: string, password: string) {
  return axios.post(`${config.baseUrl}/login`, { email, password });
}
