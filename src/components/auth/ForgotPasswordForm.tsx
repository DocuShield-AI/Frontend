"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import AuthButtonLoader from "./AuthButtonLoader";
import AuthLogo from "./AuthLogo";
import RecoverySteps from "./RecoverySteps";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/validations/auth/forgot-password";

const inputClassName =
  "h-11 w-full rounded-lg bg-input py-0 pl-11 pr-4 font-plus text-sm text-text-primary outline-none transition placeholder:font-plus placeholder:text-text-secondary/60 focus:bg-input-focus focus:ring-2 focus:ring-accent/15";

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSubmittedEmail(data.email);
    setSent(true);
  };

  return (
    <div className="auth-recovery-shell font-plus w-full max-w-[820px] overflow-hidden rounded-lg border-3 border-white bg-white">
      <div className="auth-recovery-hero auth-panel-dark relative w-full">
        <div className="relative z-10 flex items-center justify-between p-4">
          <AuthLogo />
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-medium text-text-on-dark ring-1 ring-white/15 transition-all duration-300 hover:bg-white/15"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to login
          </Link>
        </div>

        <div className="relative z-10 px-8 pb-10 sm:px-10">
          <header className="mx-auto max-w-xl text-center">
            <h1 className="text-[1.65rem] font-bold leading-tight text-text-on-dark sm:text-[1.85rem]">
              {sent ? "Almost there — check your inbox" : "Let\u2019s get you back in"}
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-text-on-dark/75 sm:text-sm">
              {sent
                ? "We\u2019ve sent an 8-digit reset code to your email. Enter it on the next screen to choose a new password."
                : "Enter the email tied to your workspace. We\u2019ll send a secure 8-digit code to reset your password."}
            </p>
          </header>

          <RecoverySteps step={sent ? 2 : 1} />
        </div>
      </div>

      <div className="auth-panel-light w-full p-2">
        <div className="flex w-full flex-col justify-center rounded-lg bg-white px-8 py-10 sm:px-11 sm:py-12">
          {sent ? (
            <div className="w-full space-y-6">
              <div className="flex items-start gap-4 rounded-lg bg-input/70 p-4 ring-1 ring-border/40">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                  <Mail className="h-5 w-5 text-accent" strokeWidth={2} />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[12px] font-medium uppercase text-text-secondary">
                    Reset code sent
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-text-primary">
                    {submittedEmail}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-text-secondary">
                    The 8-digit code expires in 15 minutes. If you don&apos;t see it,
                    check spam or promotions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-input/60 px-3 py-3 text-center">
                  <Lock className="mx-auto h-4 w-4 text-accent" strokeWidth={2} />
                  <p className="mt-1.5 text-[11px] font-medium text-text-primary">
                    Secure code
                  </p>
                </div>
                <div className="rounded-lg bg-input/60 px-3 py-3 text-center">
                  <Clock3 className="mx-auto h-4 w-4 text-accent" strokeWidth={2} />
                  <p className="mt-1.5 text-[11px] font-medium text-text-primary">
                    15 min expiry
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-input text-sm font-medium text-text-primary transition hover:bg-input-focus"
                >
                  Try another email
                </button>
                <Link
                  href={`/reset-password?email=${encodeURIComponent(submittedEmail)}`}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary text-sm font-medium text-text-on-dark transition-all duration-300 hover:bg-secondary"
                >
                  Enter 8-digit code
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full space-y-5"
                noValidate
              >
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-[13px] font-medium text-text-primary"
                  >
                    Work email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={inputClassName}
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-text-on-dark transition-all duration-300 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      Sending code…
                      <AuthButtonLoader />
                    </>
                  ) : (
                    <>
                      Send reset code
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 flex w-full items-center gap-3 rounded-lg border border-border/60 bg-auth-panel-top/80 px-4 py-3">
                <ShieldCheck className="h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                <p className="text-[12px] leading-relaxed text-text-secondary">
                  For your security, reset links are single-use and tied to this
                  device session.
                </p>
              </div>

              <p className="mt-6 text-center text-[13px] text-text-secondary">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-accent hover:text-secondary"
                >
                  Log in
                </Link>
              </p>
            </>
          )}

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
    </div>
  );
}
