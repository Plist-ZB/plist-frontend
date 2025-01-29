// axios instance
import axios, { AxiosError, AxiosResponse } from "axios";

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
    const accessToken = localStorage.getItem("access_token");
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : ``;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface ErrorResponse extends AxiosError {
  response: AxiosResponse & {
    data: {
      message?: string;
    };
  };
}

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const axiosError = error as ErrorResponse;

    const isTokenExpired = axiosError.status === 401;
    //const errorMessage = axiosError.response.data.message;

    // 리프레시 토큰 롤백하면 복구할 코드
    /* if (isTokenExpired && errorMessage === "EXPIRED_ACCESS_TOKEN") {
      const getToken = async () => {
        const response = await instance.get("/auth/access", { withCredentials: true });
        localStorage.setItem("access_token", response.data.data.access_token);
      };
      getToken();

      return instance(axiosError.config!);
    }

    if (isTokenExpired && errorMessage === "EXPIRED_REFRESH_TOKEN") {
      localStorage.removeItem("access_token");
      return window.location.reload();
    } */

    if (isTokenExpired) {
      localStorage.removeItem("access_token");
      window.location.href = "/auth/login";
    }

    return Promise.reject(axiosError);
  }
);
