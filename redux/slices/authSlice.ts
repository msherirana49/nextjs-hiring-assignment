import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authService } from "@/services/authService";
import type { AuthState, AuthTokens, LoginCredentials } from "@/types/auth";
import { clearClientStorage, tokenStorage } from "@/utils/storage";

const persistedTokens = tokenStorage.getTokens();

const initialState: AuthState = {
  accessToken: persistedTokens?.access_token ?? null,
  refreshToken: persistedTokens?.refresh_token ?? null,
  isAuthenticated: Boolean(persistedTokens?.access_token),
  status: "idle",
  error: null,
  hydrated: true
};

export const login = createAsyncThunk<AuthTokens, LoginCredentials, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign in.";
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk<void, void>("auth/logout", async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshTokensSucceeded(state, action: PayloadAction<AuthTokens>) {
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.isAuthenticated = true;
      state.error = null;
      tokenStorage.setTokens(action.payload);
    },
    logoutSucceeded(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      clearClientStorage();
    },
    clearAuthError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isAuthenticated = true;
        state.error = null;
        tokenStorage.setTokens(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unable to sign in.";
      })
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.status = "idle";
        state.error = null;
        clearClientStorage();
      })
      .addCase(logout.rejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.status = "idle";
        state.error = null;
        clearClientStorage();
      });
  }
});

export const { clearAuthError, logoutSucceeded, refreshTokensSucceeded } = authSlice.actions;
export default authSlice.reducer;
