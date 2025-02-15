import axios from "axios";
import { eventEmitter } from "./eventEmitter";
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

// Request Interceptor: Attach Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 400 / 401 Errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      console.info("Invalid or expired token detected.");

      // sout
      if (status === 400 || status === 401) {
        // localStorage.removeItem("token");
        // alert("emmittig");

        eventEmitter.emit("sessionExpired");
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
