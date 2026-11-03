import type { ContractStatus, RiskLevel } from "@/types/api";
const statusClasses: Record<ContractStatus, string> = {
  queued: "bg-[#eff2f5] text-[#5a6b7b]",
  extracting: "bg-accent/10 text-accent",
  embedding: "bg-primary/10 text-accent",
  classifying: "bg-amber-50 text-amber-700",
  ready: "bg-green-50 text-green-700",
  failed: "bg-red-50 text-red-700",
};
const riskClasses: Record<RiskLevel, string> = {
  low: "bg-green-50 text-green-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-red-50 text-red-700",
};
export function StatusBadge({ status }: { status: ContractStatus }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
}
export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${riskClasses[level]}`}
    >
      {level} risk
    </span>
  );
}
