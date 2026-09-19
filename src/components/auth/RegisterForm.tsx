"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  useForm,
  type FieldErrors,
  type Path,
  type UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRegister } from "@/hooks/use-register";
import { googleAuthUrl } from "@/lib/api";
import AuthButtonLoader from "./AuthButtonLoader";
import {
  registerCreateSchema,
  registerJoinSchema,
  type RegisterCreateValues,
  type RegisterJoinValues,
} from "@/validations/auth/register";

const inputClassName =
  "h-11 w-full rounded-lg bg-input py-0 font-plus text-sm text-text-primary outline-none transition placeholder:font-plus placeholder:text-text-secondary/60 focus:bg-input-focus focus:ring-2 focus:ring-accent/15";

type RegisterMode = "create" | "join";

function ModeTabs({
  mode,
  onChange,
}: {
  mode: RegisterMode;
  onChange: (mode: RegisterMode) => void;
}) {
  return (
    <div className="mb-6 flex rounded-lg bg-input p-1">
      <button
        type="button"
        onClick={() => onChange("create")}
        className={`flex-1 rounded-md py-2 text-[13px] font-medium transition ${
          mode === "create"
            ? "bg-white text-text-primary shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        Create workspace
      </button>
      <button
        type="button"
        onClick={() => onChange("join")}
        className={`flex-1 rounded-md py-2 text-[13px] font-medium transition ${
          mode === "join"
            ? "bg-white text-text-primary shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        Join workspace
      </button>
    </div>
  );
}

function CreateWorkspaceForm() {
  const [showPassword, setShowPassword] = useState(false);
  const registerAccount = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCreateValues>({
    resolver: zodResolver(registerCreateSchema),
    defaultValues: { workspaceName: "", email: "", password: "" },
  });

  const onSubmit = (data: RegisterCreateValues) => {
    registerAccount.mutate({
      type: "create",
      email: data.email,
      password: data.password,
      workspaceName: data.workspaceName,
    });
  };

  return (
    <RegisterFormShell
      title="Create your workspace"
      subtitle="Set up DocuShield for your legal team"
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={registerAccount.isPending}
      submitLabel="Create account"
      submittingLabel="Creating account…"
      googleHref={googleAuthUrl()}
    >
      <div className="space-y-1.5">
        <label
          htmlFor="workspaceName"
          className="text-[13px] font-medium text-text-primary"
        >
          Workspace name
        </label>
        <div className="relative">
          <input
            id="workspaceName"
            type="text"
            autoComplete="organization"
            placeholder="e.g. Acme Legal"
            className={`${inputClassName} pl-11 pr-4`}
            {...register("workspaceName")}
          />
          <Building2
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary/60"
            aria-hidden
          />
        </div>
        {errors.workspaceName && (
          <p className="text-xs text-error">{errors.workspaceName.message}</p>
        )}
      </div>

      <EmailField register={register} errors={errors} />
      <PasswordField
        register={register}
        errors={errors}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        autoComplete="new-password"
      />
    </RegisterFormShell>
  );
}

function JoinWorkspaceForm({ initialInviteCode = "" }: { initialInviteCode?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const registerAccount = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterJoinValues>({
    resolver: zodResolver(registerJoinSchema),
    defaultValues: { inviteCode: initialInviteCode, email: "", password: "" },
  });

  const inviteCode = watch("inviteCode");

  const onSubmit = (data: RegisterJoinValues) => {
    registerAccount.mutate({
      type: "join",
      email: data.email,
      password: data.password,
      inviteCode: data.inviteCode,
    });
  };

  return (
    <RegisterFormShell
      title="Join a workspace"
      subtitle="Enter your invite code to join your team"
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={registerAccount.isPending}
      submitLabel="Join workspace"
      submittingLabel="Joining…"
      googleHref={googleAuthUrl(inviteCode)}
    >
      <div className="space-y-1.5">
        <label
          htmlFor="inviteCode"
          className="text-[13px] font-medium text-text-primary"
        >
          Invite code
        </label>
        <div className="relative">
          <input
            id="inviteCode"
            type="text"
            autoComplete="off"
            placeholder="XK7Q2A"
            className={`${inputClassName} pl-11 pr-4 uppercase`}
            {...register("inviteCode")}
          />
          <KeyRound
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary/60"
            aria-hidden
          />
        </div>
        {errors.inviteCode && (
          <p className="text-xs text-error">{errors.inviteCode.message}</p>
        )}
      </div>

      <EmailField register={register} errors={errors} />
      <PasswordField
        register={register}
        errors={errors}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        autoComplete="new-password"
      />
    </RegisterFormShell>
  );
}

function EmailField<T extends { email: string }>({
  register,
  errors,
}: {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}) {
  return (
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
          className={`${inputClassName} pl-11 pr-4`}
          {...register("email" as Path<T>)}
        />
        <Mail
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary/60"
          aria-hidden
        />
      </div>
      {errors.email && (
        <p className="text-xs text-error">{String(errors.email.message)}</p>
      )}
    </div>
  );
}

function PasswordField<T extends { password: string }>({
  register,
  errors,
  showPassword,
  onTogglePassword,
  autoComplete,
}: {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  showPassword: boolean;
  onTogglePassword: () => void;
  autoComplete: "new-password" | "current-password";
}) {
  return (
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
          autoComplete={autoComplete}
          placeholder="Enter password"
          className={`${inputClassName} pl-11 pr-11`}
          {...register("password" as Path<T>)}
        />
        <Lock
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary/60"
          aria-hidden
        />
        <button
          type="button"
          onClick={onTogglePassword}
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
        <p className="text-xs text-error">{String(errors.password.message)}</p>
      )}
    </div>
  );
}

function RegisterFormShell({
  title,
  subtitle,
  onSubmit,
  isSubmitting,
  submitLabel,
  submittingLabel,
  googleHref,
  children,
}: {
  title: string;
  subtitle: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
  submitLabel: string;
  submittingLabel: string;
  googleHref: string;
  children: React.ReactNode;
}) {
  const handleGoogleSignIn = () => {
    window.location.href = googleHref;
  };

  return (
    <>
      <header className="mb-5 space-y-1">
        <h1 className="text-[1.5rem] font-bold leading-tight text-text-primary">
          {title}
        </h1>
        <p className="text-[13px] text-text-secondary">{subtitle}</p>
      </header>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {children}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-text-on-dark transition-all duration-300 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              {submittingLabel}
              <AuthButtonLoader />
            </>
          ) : (
            submitLabel
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
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-accent hover:text-secondary"
        >
          Log in
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
    </>
  );
}

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const inviteFromLink = searchParams.get("inviteCode")?.trim().toUpperCase() ?? "";
  const modeFromLink = searchParams.get("mode") === "join" || inviteFromLink ? "join" : "create";
  const [mode, setMode] = useState<RegisterMode>(modeFromLink);

  return (
    <section className="auth-panel-light font-plus flex min-h-[640px] flex-1 p-2">
      <div className="flex w-full flex-1 flex-col justify-center rounded-lg bg-white px-8 py-10 sm:px-11 sm:py-12">
        <div className="mx-auto w-full max-w-[500px]">
          <ModeTabs mode={mode} onChange={setMode} />
          {mode === "create" ? (
            <CreateWorkspaceForm key="create" />
          ) : (
            <JoinWorkspaceForm key={`join-${inviteFromLink}`} initialInviteCode={inviteFromLink} />
          )}
        </div>
      </div>
    </section>
  );
}
