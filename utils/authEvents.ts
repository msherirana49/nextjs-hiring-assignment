import type { AuthTokens } from "@/types/auth";

export const AUTH_EVENTS = {
  tokensRefreshed: "omega-crm:tokens-refreshed",
  sessionExpired: "omega-crm:session-expired"
} as const;

export function emitTokensRefreshed(tokens: AuthTokens): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent<AuthTokens>(AUTH_EVENTS.tokensRefreshed, { detail: tokens }));
}

export function emitSessionExpired(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(AUTH_EVENTS.sessionExpired));
}
