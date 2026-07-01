import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL, API_ROUTES } from "@/constants/apiRoutes";
import type { ApiErrorPayload, AppApiError } from "@/types/api";
import type { AuthTokens } from "@/types/auth";
import { emitSessionExpired, emitTokensRefreshed } from "@/utils/authEvents";
import { tokenStorage } from "@/utils/storage";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

let refreshPromise: Promise<string | null> | null = null;

function getErrorMessage(payload: ApiErrorPayload | undefined, fallback: string): string {
  if (!payload) {
    return fallback;
  }

  if (Array.isArray(payload.message)) {
    return payload.message.join(" ");
  }

  return payload.message ?? payload.error ?? fallback;
}

export function normalizeApiError(error: AxiosError<ApiErrorPayload>): AppApiError {
  const statusCode = error.response?.status ?? 0;
  const message = getErrorMessage(error.response?.data, error.message || "Something went wrong.");

  return {
    statusCode,
    message,
    original: error
  };
}

async function requestTokenRefresh(refreshToken: string): Promise<string | null> {
  try {
    const response = await refreshClient.post<AuthTokens>(API_ROUTES.auth.refresh, {
      refreshToken
    });
    tokenStorage.setTokens(response.data);
    emitTokensRefreshed(response.data);
    return response.data.access_token;
  } catch {
    tokenStorage.clear();
    emitSessionExpired();
    return null;
  }
}

api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorPayload>) => {
    const status = error.response?.status;
    const originalRequest = error.config as RetryAxiosRequestConfig | undefined;
    const isAuthError = status === 401 || status === 403;
    const isRefreshRequest = originalRequest?.url?.includes(API_ROUTES.auth.refresh) ?? false;

    if (isAuthError && originalRequest && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true;
      const refreshToken = tokenStorage.getRefreshToken();

      if (refreshToken) {
        refreshPromise = refreshPromise ?? requestTokenRefresh(refreshToken).finally(() => {
          refreshPromise = null;
        });

        const newAccessToken = await refreshPromise;

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      }

      tokenStorage.clear();
      emitSessionExpired();
    }

    const normalized = normalizeApiError(error);
    return Promise.reject(new Error(normalized.message));
  }
);
