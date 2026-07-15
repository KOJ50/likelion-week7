import axios from "axios";

export const ACCESS_TOKEN_KEY = "accessToken";

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!accessToken || accessToken === "undefined" || accessToken === "null") {
    return null;
  }

  return accessToken;
};

export const saveAccessToken = (accessToken) => {
  if (typeof accessToken !== "string" || !accessToken.trim()) {
    throw new Error("로그인 응답에서 액세스 토큰을 확인할 수 없습니다.");
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const clearAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default axiosInstance;
