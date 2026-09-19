"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useResetPassword } from "@/hooks/use-reset-password";
import { useVerifyResetCode } from "@/hooks/use-verify-reset-code";
import AuthButtonLoader from "./AuthButtonLoader";
import AuthLogo from "./AuthLogo";
import RecoverySteps from "./RecoverySteps";
import ResetCodeInput from "./ResetCodeInput";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/validations/auth/reset-password";

const passwordInputClassName =
  "h-11 w-full rounded-lg bg-input py-0 pl-11 pr-11 font-plus text-sm text-text-primary outline-none transition placeholder:font-plus placeholder:text-text-secondary/60 focus:bg-input-focus focus:ring-2 focus:ring-accent/15";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const emailFromLink = searchParams.get("email")?.trim() ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const verifyResetCode = useVerifyResetCode();
  const resetPassword = useResetPassword();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code: "", password: "", confirmPassword: "" },
  });

  const verifyCode = async () => {
    setVerifyError(null);

    if (!emailFromLink) {
      setVerifyError("Missing email. Start from forgot password.");
      return;
    }

    const valid = await trigger("code");
    if (!valid) return;

    verifyResetCode.mutate(
      { email: emailFromLink, code: getValues("code") },
      {
        onSuccess: () => setCodeVerified(true),
        onError: () => {
          setVerifyError("Invalid or expired code. Request a new one and try again.");
        },
      },
    );
  };

  const onSubmit = (data: ResetPasswordValues) => {
    if (!codeVerified || !emailFromLink) return;

    resetPassword.mutate(
      {
        email: emailFromLink,
        code: data.code,
        password: data.password,
      },
      { onSuccess: () => setDone(true) },
    );
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
              {done
                ? "Password updated"
                : codeVerified
                  ? "Choose a new password"
                  : "Confirm your reset code"}
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-text-on-dark/75 sm:text-sm">
              {done
                ? "Your password has been reset. You can now sign in with your new credentials."
                : codeVerified
                  ? "Your code is verified. Create a strong password for your DocuShield account."
                  : emailFromLink
                    ? `Enter the 8-digit code we sent to ${emailFromLink}. Once verified, you can set a new password.`
                    : "Enter the 8-digit code we emailed you. Once verified, you can set a new password."}
            </p>
          </header>

          <RecoverySteps step={3} />
        </div>
      </div>

      <div className="auth-panel-light w-full p-2">
        <div className="flex w-full flex-col justify-center rounded-lg bg-white px-8 py-10 sm:px-11 sm:py-12">
          {done ? (
            <div className="w-full space-y-6">
              <div className="rounded-lg bg-input/70 px-4 py-4 text-center">
                <p className="text-sm font-medium text-text-primary">
                  You&apos;re all set
                </p>
                <p className="mt-1 text-[13px] text-text-secondary">
                  Sign in with your new password to continue to your workspace.
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-primary text-sm font-medium text-text-on-dark transition-all duration-300 hover:bg-secondary"
              >
                Go to login
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-5"
              noValidate
            >
              <div className="space-y-3">
                {emailFromLink && !codeVerified && (
                  <p className="rounded-lg bg-input/70 px-4 py-2.5 text-center text-[13px] text-text-secondary">
                    Code sent to{" "}
                    <span className="font-medium text-text-primary">
                      {emailFromLink}
                    </span>
                  </p>
                )}

                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="reset-code"
                    className="text-[13px] font-medium text-text-primary"
                  >
                    8-digit reset code
                  </label>
                  {codeVerified && (
                    <span className="inline-flex items-center gap-1 text-[12px] font-medium text-success">
                      <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
                      Verified
                    </span>
                  )}
                </div>

                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => (
                    <ResetCodeInput
                      id="reset-code"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={codeVerified}
                    />
                  )}
                />

                {(errors.code?.message || verifyError) && (
                  <p className="text-center text-xs text-error">
                    {errors.code?.message ?? verifyError}
                  </p>
                )}

                {!codeVerified && (
                  <button
                    type="button"
                    onClick={verifyCode}
                    disabled={verifyResetCode.isPending}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-text-on-dark transition-all duration-300 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {verifyResetCode.isPending ? (
                      <>
                        Verifying code…
                        <AuthButtonLoader />
                      </>
                    ) : (
                      <>
                        Verify code
                        <KeyRound className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}

                {!codeVerified && (
                  <p className="text-center text-[12px] text-text-secondary">
                    Didn&apos;t get a code?{" "}
                    <Link
                      href="/forgot-password"
                      className="font-medium text-accent hover:text-secondary"
                    >
                      Request a new one
                    </Link>
                  </p>
                )}
              </div>

              {codeVerified && (
                <>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="password"
                      className="text-[13px] font-medium text-text-primary"
                    >
                      New password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Enter new password"
                        className={passwordInputClassName}
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

                  <div className="space-y-1.5">
                    <label
                      htmlFor="confirmPassword"
                      className="text-[13px] font-medium text-text-primary"
                    >
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Confirm new password"
                        className={passwordInputClassName}
                        {...register("confirmPassword")}
                      />
                      <Lock
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary/60"
                        aria-hidden
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((prev) => !prev)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary/70 transition hover:text-text-primary"
                        aria-label={
                          showConfirm
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showConfirm ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-error">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={resetPassword.isPending}
                    className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-text-on-dark transition-all duration-300 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {resetPassword.isPending ? (
                      <>
                        Updating password…
                        <AuthButtonLoader />
                      </>
                    ) : (
                      <>
                        Update password
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
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
