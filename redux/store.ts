import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { logout, logoutSucceeded } from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import uiLoadingReducer from "./slices/uiLoadingSlice";
import userReducer from "./slices/userSlice";

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  theme: themeReducer,
  uiLoading: uiLoadingReducer
});

const rootReducer: typeof appReducer = (state, action) => {
  if (logoutSucceeded.match(action) || logout.fulfilled.match(action) || logout.rejected.match(action)) {
    const persistedTheme = state?.theme;
    const resetState = appReducer(undefined, action);

    return persistedTheme ? { ...resetState, theme: persistedTheme } : resetState;
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
