"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, getApiErrorMessage } from "@/lib/api";
import type { VerifyResetCodeBody, VerifyResetCodeResponse } from "@/types/api";

export function useVerifyResetCode() {
  return useMutation({
    mutationFn: async (body: VerifyResetCodeBody) => {
      const { data } = await api.post<VerifyResetCodeResponse>(
        "/auth/verify-reset-code",
        body,
      );
      return data;
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Invalid or expired code"));
    },
  });
}
