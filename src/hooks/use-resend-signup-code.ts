"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, getApiErrorMessage } from "@/lib/api";
import type { MessageResponse, ResendSignupCodeBody } from "@/types/api";

export function useResendSignupCode() {
  return useMutation({
    mutationFn: async (body: ResendSignupCodeBody) => {
      const { data } = await api.post<MessageResponse>(
        "/auth/resend-signup-code",
        body,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("A new verification code has been sent");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not resend code"));
    },
  });
}
