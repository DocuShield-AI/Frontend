"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthButtonLoader from "@/components/auth/AuthButtonLoader";
import { useMe } from "@/hooks/use-me";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { isSuccess, isError, refetch } = useMe();

  useEffect(() => {
    void refetch();
  }, [refetch]);

  useEffect(() => {
    if (isSuccess) {
      router.replace("/");
    }
  }, [isSuccess, router]);

  if (isError) {
    return (
      <div className="auth-page-bg flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl border-3 border-white bg-white p-8 text-center">
          <h1 className="text-lg font-bold text-text-primary">
            Sign-in failed
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            We couldn&apos;t complete Google sign-in. Please try again.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-text-on-dark hover:bg-secondary"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page-bg flex min-h-screen items-center justify-center p-6">
      <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
        Signing you in…
        <AuthButtonLoader />
      </div>
    </div>
  );
}
