import { config } from "@/lib/config";
import axios from "axios";

type User = {
  username: string;
  email: string;
  password: string;
};

export function login(username: string, password: string) {
  return axios.post(`${config.baseUrl}/login`, { username, password });
}

export function register(data: User) {
  return axios.post(`${config.baseUrl}/register`, { ...data });
}
