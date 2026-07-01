import { Suspense } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { PublicOnly } from "@/components/layout/PublicOnly";
import { Spinner } from "@/components/ui/Spinner";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { LoginForm } from "@/features/auth/components/LoginForm";

function LoginFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-ink">
      <Spinner className="text-primary" />
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <PublicOnly>
        <main className="relative min-h-screen overflow-hidden bg-background px-4 py-6 text-ink sm:px-6 lg:px-8">
          <AnimatedBackground intensity="strong" />
          <header className="mx-auto flex h-16 max-w-7xl items-center justify-between">
            <Link className="focus-ring flex items-center gap-3 rounded-full" href="/">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white shadow-glow">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="text-base font-black tracking-tight">Omega CRM</span>
            </Link>
            <ThemeToggle />
          </header>
          <LoginForm />
        </main>
      </PublicOnly>
    </Suspense>
  );
}
