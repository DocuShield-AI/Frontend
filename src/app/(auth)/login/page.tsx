import AuthBrandingPanel from "@/components/auth/AuthBrandingPanel";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-[1120px] overflow-hidden rounded-lg border-3 border-white bg-white">
      <AuthBrandingPanel />
      <LoginForm />
    </div>
  );
}
