import axios from "axios";
import { config } from "@/lib/config";

export function getHomeData() {
  return axios.get(`${config.baseUrl}/home`);
}
