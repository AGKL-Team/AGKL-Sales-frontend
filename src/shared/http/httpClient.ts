import axios, { AxiosError } from "axios";

import { toast } from "sonner";
import { useAuthStore } from "../../features/auth/hooks/useAuthStore";
import { ErrorResponse } from "../interfaces/error_response";
import { EXCLUDED_BEARER_ROUTES } from "./constants";

/**
 * Gestor de solicitudes HTTP para comunicar el front con el backend
 */
export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    console.log(error.response?.data);

    const status = error.response?.data.statusCode;
    const titulo = "Error";
    const detalle =
      error.response?.data?.message ?? "Ocurrió un error inesperado.";

    toast.error(titulo, {
      description: detalle,
    });

    if (status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

httpClient.interceptors.request.use(function (config) {
  const { authResponse } = useAuthStore.getState();
  if (!authResponse) return config;

  const { access_token } = authResponse;
  const shouldExclude = EXCLUDED_BEARER_ROUTES.some((path) =>
    config.url?.includes(path)
  );

  if (!shouldExclude && access_token) {
    config.headers.set("Authorization", `Bearer ${access_token}`);
    config.withCredentials = true;
  }

  return config;
});
