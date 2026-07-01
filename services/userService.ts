import { api } from "./api";
import { API_ROUTES } from "@/constants/apiRoutes";
import type { UserProfile } from "@/types/user";

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const response = await api.get<UserProfile>(API_ROUTES.auth.profile);
    return response.data;
  }
};
