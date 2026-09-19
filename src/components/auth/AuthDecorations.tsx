function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function LineChartCard({ className = "" }: { className?: string }) {
  return (
    <GlassCard className={`auth-float-up w-[100px] ${className}`}>
      <svg viewBox="0 0 96 56" fill="none" className="h-auto w-full">
        <path
          d="M4 44 L24 30 L40 36 L56 18 L72 26 L92 8"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <circle cx="24" cy="30" r="3" fill="white" />
        <circle cx="56" cy="18" r="3" fill="white" />
        <circle cx="92" cy="8" r="3" fill="white" />
      </svg>
    </GlassCard>
  );
}

export function PieChartCard({ className = "" }: { className?: string }) {
  return (
    <GlassCard className={`auth-float-down w-[88px] ${className}`}>
      <svg viewBox="0 0 64 64" fill="none" className="mx-auto h-12 w-12">
        <circle cx="32" cy="32" r="24" stroke="white" strokeWidth="4" opacity="0.25" />
        <path
          d="M32 8 A24 24 0 0 1 52 44 L32 32 Z"
          fill="white"
          opacity="0.85"
        />
        <path
          d="M32 32 L52 44 A24 24 0 0 1 12 36 Z"
          fill="white"
          opacity="0.45"
        />
      </svg>
    </GlassCard>
  );
}

/** Register — team / workspace */
export function TeamWorkspaceCard({ className = "" }: { className?: string }) {
  return (
    <GlassCard className={`auth-float-up w-[80px] ${className}`}>
      <svg viewBox="0 0 96 88" fill="none" className="h-auto w-full">
        <rect
          x="14"
          y="36"
          width="68"
          height="44"
          rx="8"
          stroke="white"
          strokeWidth="2.5"
          opacity="0.85"
        />
        <path
          d="M14 52 H82"
          stroke="white"
          strokeWidth="2"
          opacity="0.35"
        />
        <rect
          x="26"
          y="14"
          width="44"
          height="28"
          rx="6"
          stroke="white"
          strokeWidth="2.5"
          opacity="0.7"
        />
        <circle cx="38" cy="58" r="7" fill="white" fillOpacity="0.22" />
        <circle cx="38" cy="55" r="3.5" fill="white" opacity="0.9" />
        <path
          d="M32 68 C32 63 34.5 61 38 61 C41.5 61 44 63 44 68"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle cx="58" cy="58" r="7" fill="white" fillOpacity="0.18" />
        <circle cx="58" cy="55" r="3.5" fill="white" opacity="0.75" />
        <path
          d="M52 68 C52 63 54.5 61 58 61 C61.5 61 64 63 64 68"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <circle cx="74" cy="24" r="9" fill="white" fillOpacity="0.3" />
        <path
          d="M74 20 V28 M70 24 H78"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </GlassCard>
  );
}

/** Register — invite / join workspace */
export function InviteTicketCard({ className = "" }: { className?: string }) {
  return (
    <GlassCard className={`auth-float-down w-[85px] ${className}`}>
      <svg viewBox="0 0 88 88" fill="none" className="mx-auto h-[60px] w-[60px]">
        <path
          d="M12 20 H76 C76 20 76 28 68 28 C76 28 76 36 76 36 V68 H12 V36 C12 36 12 28 20 28 C12 28 12 20 12 20 Z"
          stroke="white"
          strokeWidth="2.5"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path
          d="M36 28 V68"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="4 4"
          opacity="0.45"
        />
        <circle cx="54" cy="42" r="10" stroke="white" strokeWidth="2.5" opacity="0.85" />
        <circle cx="54" cy="42" r="4" fill="white" opacity="0.85" />
        <path
          d="M48 54 H60"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M48 58 C48 62 50 64 54 64 C58 64 60 62 60 58"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    </GlassCard>
  );
}

/** Forgot password — secure reset key */
export function ResetKeyCard({ className = "" }: { className?: string }) {
  return (
    <GlassCard className={`auth-float-up w-[82px] ${className}`}>
      <svg viewBox="0 0 88 88" fill="none" className="mx-auto h-[58px] w-[58px]">
        <circle
          cx="28"
          cy="44"
          r="14"
          stroke="white"
          strokeWidth="2.5"
          opacity="0.9"
        />
        <circle cx="28" cy="44" r="6" stroke="white" strokeWidth="2.5" opacity="0.5" />
        <path
          d="M42 44 H72"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M62 44 V36 M68 44 V40 M74 44 V38"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </GlassCard>
  );
}

/** Forgot password — reset email */
export function ResetMailCard({ className = "" }: { className?: string }) {
  return (
    <GlassCard className={`auth-float-down w-[88px] ${className}`}>
      <svg viewBox="0 0 96 72" fill="none" className="h-auto w-full">
        <rect
          x="8"
          y="16"
          width="80"
          height="48"
          rx="8"
          stroke="white"
          strokeWidth="2.5"
          opacity="0.9"
        />
        <path
          d="M8 24 L48 46 L88 24"
          stroke="white"
          strokeWidth="2.5"
          strokeLinejoin="round"
          opacity="0.85"
        />
        <circle cx="72" cy="28" r="12" fill="white" fillOpacity="0.25" />
        <path
          d="M68 28 L71 31 L76 25"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </GlassCard>
  );
}

export function AuthFloatingDecorations({
  variant = "login",
}: {
  variant?: "login" | "register" | "forgot-password";
}) {
  if (variant === "register") {
    return (
      <>
        <TeamWorkspaceCard className="absolute left-[0%] top-[34%] z-10" />
        <InviteTicketCard className="absolute right-[0%] top-[24%] z-10" />
      </>
    );
  }

  if (variant === "forgot-password") {
    return (
      <>
        <ResetKeyCard className="absolute left-[0%] top-[36%] z-10" />
        <ResetMailCard className="absolute right-[2%] top-[26%] z-10" />
      </>
    );
  }

  return (
    <>
      <LineChartCard className="absolute left-[0%] top-[38%] z-10" />
      <PieChartCard className="absolute right-[4%] top-[28%] z-10" />
    </>
  );
}
