"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { AUTH_EVENTS } from "@/utils/authEvents";
import type { AuthTokens } from "@/types/auth";
import { usePersistedTheme } from "@/hooks/usePersistedTheme";
import { clearLoading } from "./slices/uiLoadingSlice";
import { clearUser } from "./slices/userSlice";
import { logoutSucceeded, refreshTokensSucceeded } from "./slices/authSlice";
import { store } from "./store";

function ThemeBridge({ children }: Readonly<{ children: React.ReactNode }>) {
  usePersistedTheme();

  useEffect(() => {
    const handleTokensRefreshed = (event: Event) => {
      const customEvent = event as CustomEvent<AuthTokens>;
      store.dispatch(refreshTokensSucceeded(customEvent.detail));
    };

    const handleSessionExpired = () => {
      store.dispatch(logoutSucceeded());
      store.dispatch(clearUser());
      store.dispatch(clearLoading());
    };

    window.addEventListener(AUTH_EVENTS.tokensRefreshed, handleTokensRefreshed);
    window.addEventListener(AUTH_EVENTS.sessionExpired, handleSessionExpired);

    return () => {
      window.removeEventListener(AUTH_EVENTS.tokensRefreshed, handleTokensRefreshed);
      window.removeEventListener(AUTH_EVENTS.sessionExpired, handleSessionExpired);
    };
  }, []);

  return children;
}

export function ReduxProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <ThemeBridge>{children}</ThemeBridge>
    </Provider>
  );
}
