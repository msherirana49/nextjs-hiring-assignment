"use client";

import { useEffect } from "react";
import { STORAGE_KEYS } from "@/constants/appConfig";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTheme, type ThemeMode } from "@/redux/slices/themeSlice";

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark";
}

function resolveStoredTheme(): ThemeMode {
  const savedTheme = window.localStorage.getItem(STORAGE_KEYS.theme);
  if (isThemeMode(savedTheme)) {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(mode: ThemeMode): void {
  document.documentElement.dataset.theme = mode;
  document.documentElement.classList.toggle("dark", mode === "dark");
}

export function usePersistedTheme(): void {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    const persistedTheme = resolveStoredTheme();
    applyTheme(persistedTheme);
    window.localStorage.setItem(STORAGE_KEYS.theme, persistedTheme);
    dispatch(setTheme(persistedTheme));
  }, [dispatch]);

  useEffect(() => {
    applyTheme(mode);
    window.localStorage.setItem(STORAGE_KEYS.theme, mode);
  }, [mode]);
}
