import { Suspense } from "react";
import RecoveryFormSkeleton from "@/components/auth/RecoveryFormSkeleton";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<RecoveryFormSkeleton activeStep={3} />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
