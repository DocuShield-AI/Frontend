function SkeletonBar({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`animate-pulse rounded-lg ${
        dark ? "bg-white/12" : "bg-input/80"
      } ${className}`}
      aria-hidden
    />
  );
}

function RecoveryStepsSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mt-6 flex w-full items-center justify-center" aria-hidden>
      {[0, 1, 2].map((index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <SkeletonBar dark={dark} className="h-8 w-8 rounded-full" />
            <SkeletonBar dark={dark} className="hidden h-2.5 w-14 sm:block" />
          </div>
          {index < 2 && (
            <SkeletonBar dark={dark} className="mx-2 h-px w-10 sm:mx-3 sm:w-14" />
          )}
        </div>
      ))}
    </div>
  );
}

function CodeInputSkeleton() {
  return (
    <div className="flex justify-center gap-2 sm:gap-2.5" aria-hidden>
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonBar
          key={index}
          className="h-12 w-9 rounded-lg sm:h-[52px] sm:w-11"
        />
      ))}
    </div>
  );
}

type RecoveryFormSkeletonProps = {
  /** Step highlight on the progress row (1–3). Reset password uses 3. */
  activeStep?: 1 | 2 | 3;
};

export default function RecoveryFormSkeleton({
  activeStep = 3,
}: RecoveryFormSkeletonProps) {
  return (
    <div
      className="auth-recovery-shell font-plus w-full max-w-[820px] overflow-hidden rounded-lg border-3 border-white bg-white"
      role="status"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="auth-recovery-hero auth-panel-dark relative w-full">
        <div className="relative z-10 flex items-center justify-between p-4">
          <SkeletonBar dark className="h-9 w-36" />
          <SkeletonBar dark className="h-8 w-28 rounded-full" />
        </div>

        <div className="relative z-10 px-8 pb-10 sm:px-10">
          <header className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
            <SkeletonBar dark className="h-8 w-56 max-w-full sm:h-9 sm:w-72" />
            <SkeletonBar dark className="h-4 w-full max-w-md" />
            <SkeletonBar dark className="h-4 w-4/5 max-w-sm" />
          </header>

          <RecoveryStepsSkeleton dark />
          <span className="sr-only">Loading step {activeStep} of 3</span>
        </div>
      </div>

      <div className="auth-panel-light w-full p-2">
        <div className="flex w-full flex-col justify-center rounded-lg bg-white px-8 py-10 sm:px-11 sm:py-12">
          <div className="w-full space-y-5">
            <SkeletonBar className="mx-auto h-10 w-full max-w-md" />

            <div className="space-y-3">
              <SkeletonBar className="mx-auto h-4 w-32" />
              <CodeInputSkeleton />
              <SkeletonBar className="h-11 w-full rounded-lg" />
              <SkeletonBar className="mx-auto h-3.5 w-48" />
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-lg border border-border/40 bg-auth-panel-top/60 px-4 py-3">
              <SkeletonBar className="h-4 w-4 shrink-0 rounded" />
              <SkeletonBar className="h-3.5 flex-1" />
            </div>
          </div>

          <footer className="mt-7 flex justify-center gap-4" aria-hidden>
            <SkeletonBar className="h-3 w-28" />
            <SkeletonBar className="h-3 w-24" />
          </footer>
        </div>
      </div>
    </div>
  );
}
