import type { ApiUser, BillingInfo, Contract, ContractDetail, WorkspaceMember, WorkspaceStats } from "@/types/api";

export const demoUser: ApiUser = { userId: "demo-zayyam", email: "zayyam@docushield.ai", role: "admin", workspaceId: "demo-workspace" };
export const demoStats: WorkspaceStats = { contractsThisMonth: 128, collaborators: 18, completedReviews: 32, reviewActivity: 84.5, readyRate: 43.5, processedClauses: 6078, riskCoverage: 80 };
export const demoContracts: Contract[] = [
  { id: "msa-vertex", name: "Master Services Agreement", status: "classifying", uploadedAt: "2026-09-27T10:42:00.000Z", uploadedBy: "Zayyam Ahmed", size: 2_400_000, riskCount: 2 },
  { id: "nda-altera", name: "NDA — Altera Systems", status: "ready", uploadedAt: "2026-09-26T16:18:00.000Z", uploadedBy: "Sarah Ali", size: 820_000, riskCount: 1 },
  { id: "vendor-northstar", name: "Vendor Agreement", status: "extracting", uploadedAt: "2026-09-25T09:20:00.000Z", uploadedBy: "Maria Khan", size: 1_700_000 },
  { id: "dpa-aurora", name: "Data Processing Addendum", status: "ready", uploadedAt: "2026-09-21T13:05:00.000Z", uploadedBy: "Zayyam Ahmed", size: 1_100_000, riskCount: 3 },
];
export const demoContractDetails: Record<string, ContractDetail> = Object.fromEntries(demoContracts.map((contract) => [contract.id, { ...contract, clauses: contract.status === "ready" ? [{ id: `${contract.id}-liability`, title: "Limitation of liability", excerpt: "The supplier's total liability is capped at fees paid during the prior three-month period.", level: "high", confidence: 92, needsHumanReview: true }, { id: `${contract.id}-termination`, title: "Termination notice", excerpt: "Either party may terminate for convenience with thirty days' written notice.", level: "medium", confidence: 86 }] : [] }])) as Record<string, ContractDetail>;
export const demoMembers: WorkspaceMember[] = [{ id: "demo-zayyam", name: "Zayyam Ahmed", email: "zayyam@docushield.ai", role: "admin", joinedAt: "2026-06-02T00:00:00.000Z" }, { id: "demo-sarah", name: "Sarah Ali", email: "sarah@docushield.ai", role: "legal", joinedAt: "2026-06-14T00:00:00.000Z" }, { id: "demo-maria", name: "Maria Khan", email: "maria@docushield.ai", role: "viewer", joinedAt: "2026-07-01T00:00:00.000Z" }];
export const demoBilling: BillingInfo = { plan: "Pro plan", status: "Active", price: "$79/month", renewalDate: "2026-10-27T00:00:00.000Z" };
