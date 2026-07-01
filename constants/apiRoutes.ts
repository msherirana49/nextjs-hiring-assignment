export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.escuelajs.co/api/v1";

export const API_ROUTES = {
  auth: {
    login: "/auth/login",
    profile: "/auth/profile",
    refresh: "/auth/refresh-token"
  },
  users: "/users"
} as const;
