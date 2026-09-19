import { CheckCircle2 } from "lucide-react";

const defaultSteps = [
  { id: 1, label: "Verify email" },
  { id: 2, label: "Check inbox" },
  { id: 3, label: "New password" },
] as const;

export type RecoveryStep = 1 | 2 | 3;

export default function RecoverySteps({
  step,
  labels,
}: {
  step: RecoveryStep;
  labels?: [string, string, string];
}) {
  const steps = labels
    ? labels.map((label, index) => ({ id: (index + 1) as RecoveryStep, label }))
    : defaultSteps;

  return (
    <ol className="mt-6 flex w-full items-center justify-center gap-0">
      {steps.map((item, index) => {
        const done = item.id < step;
        const active = item.id === step;

        return (
          <li key={item.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold transition-all duration-300 ${
                  done
                    ? "bg-white text-primary"
                    : active
                      ? "bg-white text-primary ring-4 ring-white/20"
                      : "bg-white/10 text-text-on-dark/50 ring-1 ring-white/15"
                }`}
              >
                {done ? (
                  <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                ) : (
                  item.id
                )}
              </span>
              <span
                className={`hidden text-[10px] font-medium tracking-wide uppercase sm:block ${
                  active || done ? "text-text-on-dark" : "text-text-on-dark/45"
                }`}
              >
                {item.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span
                className={`mx-2 h-px w-10 sm:mx-3 sm:w-14 ${
                  item.id < step ? "bg-white/70" : "bg-white/20"
                }`}
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
