import { api } from "./api";
import { API_ROUTES } from "@/constants/apiRoutes";
import type { AuthTokens, LoginCredentials } from "@/types/auth";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const response = await api.post<AuthTokens>(API_ROUTES.auth.login, credentials);
    return response.data;
  },
  async logout(): Promise<void> {
    return Promise.resolve();
  }
};
