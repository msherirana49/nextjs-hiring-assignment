export type UserRole = "customer" | "admin" | "manager" | "viewer" | string;

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface UserState {
  profile: UserProfile | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface DashboardUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited" | "Paused";
  team: string;
  createdAt: string;
  revenue: number;
}
