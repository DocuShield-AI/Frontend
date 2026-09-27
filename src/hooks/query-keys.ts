export const queryKeys = {
  me: ["auth", "me"] as const,
  contracts: (workspaceId: string) => ["contracts", workspaceId] as const,
  contract: (contractId: string) => ["contract", contractId] as const,
  contractStatus: (contractId: string) => ["contract-status", contractId] as const,
  workspaceStats: (workspaceId: string) => ["workspace-stats", workspaceId] as const,
  members: (workspaceId: string) => ["workspace-members", workspaceId] as const,
  billing: (workspaceId: string) => ["workspace-billing", workspaceId] as const,
};
