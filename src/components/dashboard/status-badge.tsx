import type { ContractStatus, RiskLevel } from "@/types/api";
const statusClasses: Record<ContractStatus, string> = { queued: "bg-slate-100 text-slate-600", extracting: "bg-blue-50 text-blue-700", embedding: "bg-violet-50 text-violet-700", classifying: "bg-amber-50 text-amber-700", ready: "bg-green-50 text-green-700", failed: "bg-red-50 text-red-700" };
const riskClasses: Record<RiskLevel, string> = { low: "bg-green-50 text-green-700", medium: "bg-amber-50 text-amber-700", high: "bg-red-50 text-red-700" };
export function StatusBadge({ status }: { status: ContractStatus }) { return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusClasses[status]}`}>{status}</span>; }
export function RiskBadge({ level }: { level: RiskLevel }) { return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${riskClasses[level]}`}>{level} risk</span>; }
