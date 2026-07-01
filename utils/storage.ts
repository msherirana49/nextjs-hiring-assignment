import { STORAGE_KEYS } from "@/constants/appConfig";
import type { AuthTokens } from "@/types/auth";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export const tokenStorage = {
  getTokens(): AuthTokens | null {
    if (!isBrowser()) {
      return null;
    }

    const raw = window.localStorage.getItem(STORAGE_KEYS.auth);
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as Partial<AuthTokens>;
      if (typeof parsed.access_token === "string" && typeof parsed.refresh_token === "string") {
        return {
          access_token: parsed.access_token,
          refresh_token: parsed.refresh_token
        };
      }
      return null;
    } catch {
      return null;
    }
  },
  getAccessToken(): string | null {
    return this.getTokens()?.access_token ?? null;
  },
  getRefreshToken(): string | null {
    return this.getTokens()?.refresh_token ?? null;
  },
  setTokens(tokens: AuthTokens): void {
    if (!isBrowser()) {
      return;
    }
    window.localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(tokens));
  },
  clear(): void {
    if (!isBrowser()) {
      return;
    }
    window.localStorage.removeItem(STORAGE_KEYS.auth);
    window.sessionStorage.clear();
  }
};

export function clearClientStorage(): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEYS.auth);
  window.sessionStorage.clear();
}
