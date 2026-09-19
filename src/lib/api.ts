import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<void> | null = null;

async function refreshSession(): Promise<void> {
  await api.post("/auth/refresh");
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetriableConfig | undefined;
    const status = error.response?.status;
    const url = config?.url ?? "";

    const isAuthRoute =
      url.includes("/auth/login") ||
      url.includes("/auth/signup") ||
      url.includes("/auth/refresh") ||
      url.includes("/auth/forgot-password") ||
      url.includes("/auth/verify-reset-code") ||
      url.includes("/auth/reset-password") ||
      url.includes("/auth/verify-signup") ||
      url.includes("/auth/resend-signup-code");

    if (status !== 401 || !config || config._retry || isAuthRoute) {
      return Promise.reject(error);
    }

    config._retry = true;

    if (!refreshPromise) {
      refreshPromise = refreshSession()
        .catch((refreshError) => {
          refreshPromise = null;
          throw refreshError;
        })
        .then(() => {
          refreshPromise = null;
        });
    }

    try {
      await refreshPromise;
      return api(config);
    } catch {
      return Promise.reject(error);
    }
  },
);

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string | string[] } | undefined;
    const message = data?.message;
    if (Array.isArray(message)) {
      return message[0] ?? fallback;
    }
    if (typeof message === "string" && message.length > 0) {
      return message;
    }
  }
  return fallback;
}

/** Google OAuth — full redirect to backend (sets cookies on callback). */
export function googleAuthUrl(inviteCode?: string): string {
  const base = `${API_URL}/auth/google`;
  if (!inviteCode?.trim()) {
    return base;
  }
  return `${base}?inviteCode=${encodeURIComponent(inviteCode.trim().toUpperCase())}`;
}
