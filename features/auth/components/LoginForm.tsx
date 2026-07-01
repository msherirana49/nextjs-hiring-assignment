"use client";

import { FormEvent, type SVGProps, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  MoveRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearAuthError, login } from "@/redux/slices/authSlice";
import { fetchProfile } from "@/redux/slices/userSlice";

type SignInPartner = "Google" | "Facebook" | "Apple";

const signInPartners: SignInPartner[] = ["Google", "Facebook", "Apple"];

function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path
        d="M21.6 12.23c0-.78-.07-1.53-.2-2.23H12v4.22h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.52Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 4.97-.9 6.62-2.44l-3.24-2.51c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.76-5.59-4.12H3.06v2.59A10 10 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.41 13.88A6.01 6.01 0 0 1 6.1 12c0-.65.11-1.28.31-1.88V7.53H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.47l3.35-2.59Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6c1.47 0 2.8.51 3.84 1.5l2.86-2.87A9.58 9.58 0 0 0 12 2a10 10 0 0 0-8.94 5.53l3.35 2.59C7.2 7.76 9.4 6 12 6Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path
        d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.25c-1.24 0-1.63.77-1.63 1.57v1.89h2.77l-.44 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06Z"
        fill="#1877F2"
      />
      <path
        d="m15.9 14.97.44-2.91h-2.77v-1.89c0-.8.39-1.57 1.63-1.57h1.25V6.13s-1.14-.2-2.23-.2c-2.28 0-3.77 1.39-3.77 3.91v2.22H7.9v2.91h2.54V22a10.24 10.24 0 0 0 3.12 0v-7.03h2.33Z"
        fill="#fff"
      />
    </svg>
  );
}

function AppleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path
        d="M16.75 12.82c-.03-2.28 1.86-3.37 1.95-3.43-1.06-1.55-2.7-1.76-3.28-1.79-1.4-.14-2.72.82-3.43.82-.72 0-1.82-.8-2.99-.78-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.9 1.15 9.15.76 1.1 1.67 2.33 2.86 2.29 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.78.74 2.99.72 1.24-.02 2.02-1.12 2.78-2.22.87-1.27 1.23-2.5 1.25-2.56-.03-.01-2.4-.92-2.42-3.74Zm-2.25-6.7c.63-.77 1.06-1.84.95-2.9-.91.04-2.02.61-2.67 1.38-.59.68-1.1 1.77-.96 2.81 1.02.08 2.05-.52 2.68-1.29Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BrandIcon({ brand }: { brand: SignInPartner }) {
  if (brand === "Google") {
    return <GoogleIcon className="h-5 w-5" />;
  }

  if (brand === "Facebook") {
    return <FacebookIcon className="h-5 w-5" />;
  }

  return <AppleIcon className="h-5 w-5 text-ink" />;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const error = useAppSelector((state) => state.auth.error);
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(clearAuthError());

    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      await dispatch(fetchProfile());
      const next = searchParams.get("next");
      router.replace(next?.startsWith("/") ? next : "/dashboard");
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-5.5rem)] w-full max-w-7xl place-items-center py-8">
      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="grid w-full overflow-hidden rounded-[2rem] border border-line bg-surface/75 shadow-card backdrop-blur-glass lg:grid-cols-[1.06fr_0.94fr]"
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <section className="relative hidden min-h-[43rem] overflow-hidden border-r border-white/10 bg-[linear-gradient(135deg,#061024_0%,#0c1b3a_48%,#241646_100%)] p-10 text-white lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(96,165,250,0.28),transparent_26rem),radial-gradient(circle_at_86%_8%,rgba(167,139,250,0.20),transparent_30rem),radial-gradient(circle_at_58%_84%,rgba(14,165,233,0.18),transparent_24rem)]" />
          <div className="absolute -left-28 top-20 h-[32rem] w-[32rem] rounded-full border-[3rem] border-primary/10" />
          <div className="absolute -right-24 -top-32 h-[34rem] w-[34rem] rounded-full border-[3rem] border-secondary/10" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.22),transparent_42%,rgba(2,6,23,0.36))]" />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/35 bg-sky-400/15 px-4 py-2 text-sm font-black text-sky-200 shadow-inset">
                <ShieldCheck className="h-4 w-4" />
                Enterprise-ready auth flow
              </span>
              <h1 className="mt-8 max-w-[38rem] text-[clamp(3.35rem,4.6vw,5.75rem)] font-black leading-[0.98] tracking-[-0.065em] text-white">
                <span className="block whitespace-nowrap">Secure access</span>
                <span className="block whitespace-nowrap">for every</span>
                <span className="block whitespace-nowrap">CRM operator.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                JWT persistence, Axios interceptors, protected routes, and Redux
                session state wrapped in a premium login experience.
              </p>
            </div>

            <div className="relative mt-10 grid max-w-xl gap-4 rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-card backdrop-blur-glass">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4">
                <div>
                  <p className="text-sm font-bold text-slate-300">
                    Session health
                  </p>
                  <p className="mt-1 font-mono text-3xl font-black tracking-tight text-white">
                    98.7%
                  </p>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-success/15 text-success">
                  <TrendingUp className="h-5 w-5" />
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["Auth", "Routes", "Redux"].map((item) => (
                  <div
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center shadow-inset"
                    key={item}
                  >
                    <Sparkles className="mx-auto h-4 w-4 text-primary" />
                    <p className="mt-2 text-xs font-black text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative flex min-h-[43rem] items-center justify-center p-5 sm:p-8 lg:p-10">
          <div className="absolute inset-x-10 top-10 h-48 rounded-full bg-primary/10 blur-3xl" />
          <form
            className="relative z-10 w-full max-w-[29rem] rounded-[2rem] border border-line bg-surface/95 p-6 shadow-card backdrop-blur-glass sm:p-8"
            onSubmit={submitLogin}
          >
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-3xl bg-primary/10 text-primary shadow-soft">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-black tracking-tight text-ink">
                Sign in with email
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Use the prefilled Platzi demo credentials or enter your account
                details.
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <Input
                label="Email"
                leftIcon={<Mail className="h-4 w-4" />}
                name="email"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <Input
                label="Password"
                leftIcon={<KeyRound className="h-4 w-4" />}
                rightIcon={
                  <button
                    aria-label="Toggle password visibility"
                    type="button"
                    onClick={() => setPasswordVisible((value) => !value)}
                  >
                    {passwordVisible ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                name="password"
                placeholder="Password"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {error ? (
              <p className="mt-4 rounded-2xl bg-danger/10 px-4 py-3 text-sm font-semibold text-danger">
                {error}
              </p>
            ) : null}

            <Button
              className="mt-6 h-14 w-full rounded-2xl"
              disabled={status === "loading"}
              rightIcon={
                status === "loading" ? (
                  <Spinner />
                ) : (
                  <MoveRight className="h-4 w-4" />
                )
              }
              size="lg"
              type="submit"
            >
              {status === "loading" ? "Signing in" : "Sign in"}
            </Button>

            <div className="my-6 flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-muted">
              <span className="h-px flex-1 bg-line" />
              <span>or continue with</span>
              <span className="h-px flex-1 bg-line" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {signInPartners.map((item) => (
                <button
                  aria-label={`Continue with ${item}`}
                  className="focus-ring grid h-12 place-items-center rounded-2xl border border-line bg-background/60 text-sm font-black shadow-inset transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                  key={item}
                  type="button"
                >
                  <BrandIcon brand={item} />
                </button>
              ))}
            </div>
          </form>
        </section>
      </motion.div>
    </div>
  );
}
