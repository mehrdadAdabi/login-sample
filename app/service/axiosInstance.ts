import axios from "axios";
import { useNotification } from "../hooks/useNotif";
import { MethodTypes } from "../types/index.type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});

const useAxios = () => {
  const { showNotification } = useNotification();
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }

      showNotification(
        error.response?.data?.message || "خطای ناشناخته",
        "error"
      );
      return Promise.reject(error);
    }
  );

  const request = async (
    method: MethodTypes,
    url: string,
    data = {},
    config = {}
  ) => {
    try {
      const response = await axiosInstance({ method, url, data, ...config });
      return [null, response.data];
    } catch (error: any) {
      return [error.response?.data?.message || error.message, null];
    }
  };

  return {
    get: (url: string, config = {}) => request("get", url, {}, config),
    post: (url: string, data: any, config = {}) =>
      request("post", url, data, config),
    put: (url: string, data: any, config = {}) =>
      request("put", url, data, config),
    patch: (url: string, data: any, config = {}) =>
      request("patch", url, data, config),
    delete: (url: string, config = {}) => request("delete", url, {}, config),
  };
};

export default useAxios;
