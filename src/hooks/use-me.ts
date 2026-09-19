"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { AuthUserResponse } from "@/types/api";
import { queryKeys } from "./query-keys";

export function useMe(enabled = true) {
  return useQuery({
    queryKey: queryKeys.me,
    enabled,
    queryFn: async () => {
      const { data } = await api.get<AuthUserResponse>("/auth/me");
      return data.user;
    },
    retry: false,
  });
}
