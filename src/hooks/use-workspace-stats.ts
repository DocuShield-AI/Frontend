"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { WorkspaceStats } from "@/types/api";
import { queryKeys } from "./query-keys";

export function useWorkspaceStats(workspaceId?: string) {
  return useQuery({
    queryKey: workspaceId ? queryKeys.workspaceStats(workspaceId) : ["workspace-stats", "none"],
    queryFn: async () => (await api.get<WorkspaceStats>(`/workspaces/${workspaceId}/stats`)).data,
    enabled: Boolean(workspaceId),
  });
}
