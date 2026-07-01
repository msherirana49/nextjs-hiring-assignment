"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";
import { useAppSelector } from "@/redux/hooks";

export function PublicOnly({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const hydrated = useAppSelector((state) => state.auth.hydrated);

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      const next = searchParams.get("next");
      router.replace(next?.startsWith("/") ? next : "/dashboard");
    }
  }, [hydrated, isAuthenticated, router, searchParams]);

  if (!hydrated || isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-ink">
        <Spinner className="text-primary" />
      </main>
    );
  }

  return children;
}
