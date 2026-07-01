"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProfile } from "@/redux/slices/userSlice";

export function ProtectedRoute({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated, hydrated } = useAppSelector((state) => state.auth);
  const userStatus = useAppSelector((state) => state.user.status);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [hydrated, isAuthenticated, pathname, router]);

  useEffect(() => {
    if (isAuthenticated && userStatus === "idle") {
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuthenticated, userStatus]);

  if (!hydrated || !isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-ink">
        <Spinner className="text-primary" />
      </main>
    );
  }

  return children;
}
