"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api, getApiErrorMessage } from "@/lib/api";
import type { AuthUserResponse, VerifySignupBody } from "@/types/api";
import { queryKeys } from "./query-keys";

export function useVerifySignup() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: VerifySignupBody) => {
      const { data } = await api.post<AuthUserResponse>(
        "/auth/verify-signup",
        body,
      );
      return data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.me, user);
      toast.success("Email verified — welcome to DocuShield");
      router.push("/");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Invalid or expired code"));
    },
  });
}
