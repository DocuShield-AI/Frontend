import Image from "next/image";
import { AuthFloatingDecorations } from "./AuthDecorations";
import AuthLogo from "./AuthLogo";

type AuthBrandingPanelProps = {
  headline?: string;
  description?: string;
  variant?: "login" | "register" | "forgot-password";
};

export default function AuthBrandingPanel({
  headline = "Review Contracts. Spot Risk Fast.",
  description = "Your AI co-pilot for legal contract triage. Upload a contract, get clause-level risk flags — low, medium, or high — and help your team focus on the terms that matter most.",
  variant = "login",
}: AuthBrandingPanelProps) {
  return (
    <section className="auth-panel-light-left hidden min-h-[640px] flex-1 p-2 md:flex">
      <div className="auth-panel-dark relative flex w-full flex-1 flex-col justify-between overflow-hidden rounded-lg">
        <div className="relative z-10 p-4">
          <AuthLogo />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 items-center justify-center px-4 py-6">
          <AuthFloatingDecorations variant={variant} />
          <Image
            src="/assets/girlsearching.svg"
            alt="Searching for documents illustration"
            width={582}
            height={437}
            className="relative z-0 h-auto w-full max-w-[400px] -scale-x-100 object-contain"
            priority
          />
        </div>

        <div className="relative z-10 space-y-4 p-10 text-center">
          <h2 className="font-plus text-3xl font-semibold leading-tight text-text-on-dark lg:text-[1.5rem]">
            {headline}
          </h2>
          <p className="mx-auto max-w-md text-xs leading-relaxed text-text-on-dark/80 lg:text-sm">
            {description}
          </p>

          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-8 rounded-full bg-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
