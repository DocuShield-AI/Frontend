import AuthBrandingPanel from "@/components/auth/AuthBrandingPanel";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex w-full max-w-[1120px] overflow-hidden rounded-lg border-3 border-white bg-white">
      <AuthBrandingPanel
        variant="register"
        headline="Build Your Team. Triage Smarter."
        description="Create a workspace for your legal team or join an existing one with an invite code. Start uploading contracts and flagging risk from day one with your team."
      />
      <RegisterForm />
    </div>
  );
}
