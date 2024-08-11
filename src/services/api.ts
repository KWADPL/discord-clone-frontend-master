import axios from "axios";
import store from "../Store/index";
import UserService from "./user.service";

export const API_URL = "http://localhost:8080/graphql";
export const SITE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: `${API_URL}/graphql`
});

api.interceptors.request.use((config) => {
  if (UserService.isLoggedIn()) {
    const { user } = store.getState();
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default api;