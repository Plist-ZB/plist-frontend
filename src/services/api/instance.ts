// axios instance
import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_SERVER_URL;
const MOCK_SERVER_NAME = import.meta.env.VITE_MOCK_SERVER_URL;

export const instance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? MOCK_SERVER_NAME : API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // TODO: 임시 토큰 로직
    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : ``;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const axiosError = error as AxiosError;

    return Promise.reject(axiosError);
  }
);
