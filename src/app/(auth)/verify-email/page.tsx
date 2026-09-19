import { Suspense } from "react";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";

export default function VerifyEmailPage() {
  return (
    <div className="flex w-full justify-center px-4 py-8">
      <Suspense fallback={null}>
        <VerifyEmailForm />
      </Suspense>
    </div>
  );
}
