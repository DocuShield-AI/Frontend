"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useLogin } from "@/hooks/use-login";
import { googleAuthUrl } from "@/lib/api";
import { loginSchema, type LoginValues } from "@/validations/auth/login";
import AuthButtonLoader from "./AuthButtonLoader";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginValues) => {
    login.mutate(data);
  };

  const handleGoogleSignIn = () => {
    window.location.href = googleAuthUrl();
  };

  return (
    <section className="auth-panel-light font-plus flex min-h-[640px] flex-1 p-2">
      <div className="flex w-full flex-1 flex-col justify-center rounded-lg bg-white px-8 py-10 sm:px-11 sm:py-12">
        <div className="mx-auto w-full max-w-[500px]">
          <header className="mb-7 space-y-1">
            <h1 className="text-[1.5rem] font-bold leading-tight text-text-primary">
              Welcome back to DocuShield
            </h1>
            <p className="text-[13px] text-text-secondary">
              Enter the details to login to your dashboard
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-[13px] font-medium text-text-primary"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  className="h-11 w-full rounded-lg bg-input py-0 pl-11 pr-4 font-plus text-sm text-text-primary outline-none transition placeholder:font-plus placeholder:text-text-secondary/60 focus:bg-input-focus focus:ring-2 focus:ring-accent/15"
                  {...register("email")}
                />
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary/60"
                  aria-hidden
                />
              </div>
              {errors.email && (
                <p className="text-xs text-error">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-[13px] font-medium text-text-primary"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="h-11 w-full rounded-lg bg-input py-0 pl-11 pr-11 font-plus text-sm text-text-primary outline-none transition placeholder:font-plus placeholder:text-text-secondary/60 focus:bg-input-focus focus:ring-2 focus:ring-accent/15"
                  {...register("password")}
                />
                <Lock
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary/60"
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary/70 transition hover:text-text-primary"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-error">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-end pt-0.5">
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-accent hover:text-secondary"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={login.isPending}
              className="mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-text-on-dark transition-all duration-300 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
            >
              {login.isPending ? (
                <>
                  Logging in…
                  <AuthButtonLoader />
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border/80" />
            <span className="text-xs font-medium text-text-secondary">or</span>
            <span className="h-px flex-1 bg-border/80" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg bg-input text-sm font-medium text-text-primary transition hover:bg-input-focus"
          >
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </button>

          <p className="mt-5 text-center text-[13px] text-text-secondary">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-accent hover:text-secondary"
            >
              Sign Up
            </Link>
          </p>

          <footer className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-text-secondary/75">
            <Link href="/terms" className="hover:text-text-secondary">
              Terms and Conditions
            </Link>
            <Link href="/privacy" className="hover:text-text-secondary">
              Privacy policy
            </Link>
          </footer>
        </div>
      </div>
    </section>
  );
}
