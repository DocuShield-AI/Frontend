"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { ContractDetail } from "@/types/api";
import { queryKeys } from "./query-keys";

export function useJobStatus(contractId?: string) {
  return useQuery({
    queryKey: contractId ? queryKeys.contractStatus(contractId) : ["contract-status", "none"],
    queryFn: async () => (await api.get<ContractDetail>(`/contracts/${contractId}/status`)).data,
    enabled: Boolean(contractId),
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === "ready" || status === "failed" ? false : 2_000;
    },
  });
}
