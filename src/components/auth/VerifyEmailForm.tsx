"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useResendSignupCode } from "@/hooks/use-resend-signup-code";
import { useVerifySignup } from "@/hooks/use-verify-signup";
import AuthButtonLoader from "./AuthButtonLoader";
import AuthLogo from "./AuthLogo";
import RecoverySteps from "./RecoverySteps";
import ResetCodeInput from "./ResetCodeInput";
import {
  verifyEmailSchema,
  type VerifyEmailValues,
} from "@/validations/auth/verify-email";

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const emailFromLink = searchParams.get("email")?.trim() ?? "";

  const verifySignup = useVerifySignup();
  const resendCode = useResendSignupCode();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = (data: VerifyEmailValues) => {
    if (!emailFromLink) return;

    verifySignup.mutate({
      email: emailFromLink,
      code: data.code,
    });
  };

  const handleResend = () => {
    if (!emailFromLink) return;
    resendCode.mutate({ email: emailFromLink });
  };

  return (
    <div className="auth-recovery-shell font-plus w-full max-w-[820px] overflow-hidden rounded-lg border-3 border-white bg-white">
      <div className="auth-recovery-hero auth-panel-dark relative w-full">
        <div className="relative z-10 flex items-center justify-between p-4">
          <AuthLogo />
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-medium text-text-on-dark ring-1 ring-white/15 transition-all duration-300 hover:bg-white/15"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to register
          </Link>
        </div>

        <div className="relative z-10 px-8 pb-10 sm:px-10">
          <header className="mx-auto max-w-xl text-center">
            <h1 className="text-[1.65rem] font-bold leading-tight text-text-on-dark sm:text-[1.85rem]">
              Verify your email
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-text-on-dark/75 sm:text-sm">
              We sent an 8-digit code to your inbox. Enter it below to confirm
              your account and finish registration.
            </p>
          </header>

          <RecoverySteps
            step={2}
            labels={["Create account", "Verify email", "Get started"]}
          />
        </div>
      </div>

      <div className="auth-panel-light w-full p-2">
        <div className="flex w-full flex-col justify-center rounded-lg bg-white px-8 py-10 sm:px-11 sm:py-12">
          {!emailFromLink ? (
            <div className="space-y-4 text-center">
              <p className="text-sm text-text-secondary">
                Missing email address. Please start from the register page.
              </p>
              <Link
                href="/register"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-text-on-dark"
              >
                Go to register
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-start gap-4 rounded-lg bg-input/70 p-4 ring-1 ring-border/40">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                  <Mail className="h-5 w-5 text-accent" strokeWidth={2} />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[12px] font-medium uppercase text-text-secondary">
                    Code sent to
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-text-primary">
                    {emailFromLink}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-text-secondary">
                    Check your inbox and spam folder. The code expires in 15
                    minutes.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full space-y-5"
                noValidate
              >
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-text-primary">
                    8-digit verification code
                  </label>
                  <Controller
                    control={control}
                    name="code"
                    render={({ field }) => (
                      <ResetCodeInput
                        value={field.value}
                        onChange={field.onChange}
                        disabled={verifySignup.isPending}
                      />
                    )}
                  />
                  {errors.code && (
                    <p className="text-xs text-error">{errors.code.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={verifySignup.isPending}
                  className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-text-on-dark transition-all duration-300 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {verifySignup.isPending ? (
                    <>
                      Verifying…
                      <AuthButtonLoader />
                    </>
                  ) : (
                    <>
                      Verify and continue
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-input/60 px-3 py-3 text-center">
                  <ShieldCheck
                    className="mx-auto h-4 w-4 text-accent"
                    strokeWidth={2}
                  />
                  <p className="mt-1.5 text-[11px] font-medium text-text-primary">
                    Secure verification
                  </p>
                </div>
                <div className="rounded-lg bg-input/60 px-3 py-3 text-center">
                  <Clock3 className="mx-auto h-4 w-4 text-accent" strokeWidth={2} />
                  <p className="mt-1.5 text-[11px] font-medium text-text-primary">
                    15 min expiry
                  </p>
                </div>
              </div>

              <p className="mt-6 text-center text-[13px] text-text-secondary">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCode.isPending}
                  className="font-semibold text-accent hover:text-secondary disabled:opacity-60"
                >
                  {resendCode.isPending ? "Sending…" : "Resend code"}
                </button>
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
