"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { api, getApiErrorMessage } from "@/lib/api";
import type { AuthUserResponse, LoginBody } from "@/types/api";
import { queryKeys } from "./query-keys";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: LoginBody) => {
      const { data } = await api.post<AuthUserResponse>("/auth/login", body);
      return data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.me, user);
      const next = searchParams.get("next");
      router.push(next && next.startsWith("/") ? next : "/");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Invalid email or password"));
    },
  });
}
