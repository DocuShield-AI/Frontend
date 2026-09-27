"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Contract, ContractDetail } from "@/types/api";
import { queryKeys } from "./query-keys";

export function useContracts(workspaceId?: string) {
  return useQuery({
    queryKey: workspaceId ? queryKeys.contracts(workspaceId) : ["contracts", "none"],
    queryFn: async () => (await api.get<Contract[]>(`/workspaces/${workspaceId}/contracts`)).data,
    enabled: Boolean(workspaceId),
  });
}

export function useContract(contractId?: string) {
  return useQuery({
    queryKey: contractId ? queryKeys.contract(contractId) : ["contract", "none"],
    queryFn: async () => (await api.get<ContractDetail>(`/contracts/${contractId}`)).data,
    enabled: Boolean(contractId),
  });
}
