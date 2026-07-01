"use client";

import { Moon, Palette, ShieldCheck, Sun } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTheme } from "@/redux/slices/themeSlice";

export function SettingsPanel() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const profile = useAppSelector((state) => state.user.profile);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-line bg-surface/90 p-6 shadow-soft backdrop-blur-glass">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-primary">Settings</p>
        <h1 className="mt-3 text-title font-black text-ink">Workspace preferences</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Keep theme switching and profile information inside Redux slices while using centralized design tokens.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.78fr_1fr]">
        <Card className="rounded-[2rem] bg-surface/90 p-6 backdrop-blur-glass">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Palette className="h-6 w-6" />
          </span>
          <h2 className="mt-5 text-2xl font-black">Theme mode</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Choose the visual theme stored in Redux and synchronized to local storage.</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant={mode === "light" ? "primary" : "outline"} onClick={() => dispatch(setTheme("light"))} leftIcon={<Sun className="h-4 w-4" />}>
              Light
            </Button>
            <Button variant={mode === "dark" ? "primary" : "outline"} onClick={() => dispatch(setTheme("dark"))} leftIcon={<Moon className="h-4 w-4" />}>
              Dark
            </Button>
          </div>
        </Card>

        <Card className="rounded-[2rem] bg-surface/90 p-6 backdrop-blur-glass">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-success/10 text-success">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <h2 className="mt-5 text-2xl font-black">Authenticated profile</h2>
          <div className="mt-5 grid gap-3 text-sm">
            <div className="rounded-2xl bg-background p-4">
              <p className="font-bold text-muted">Name</p>
              <p className="mt-1 font-black text-ink">{profile?.name ?? "Profile loading"}</p>
            </div>
            <div className="rounded-2xl bg-background p-4">
              <p className="font-bold text-muted">Email</p>
              <p className="mt-1 font-black text-ink">{profile?.email ?? "Signed in user"}</p>
            </div>
            <div className="rounded-2xl bg-background p-4">
              <p className="font-bold text-muted">Role</p>
              <p className="mt-1 font-black text-ink">{profile?.role ?? "Session role"}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
