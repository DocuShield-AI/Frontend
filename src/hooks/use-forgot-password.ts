"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, getApiErrorMessage } from "@/lib/api";
import type { ForgotPasswordBody, MessageResponse } from "@/types/api";

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (body: ForgotPasswordBody) => {
      const { data } = await api.post<MessageResponse>(
        "/auth/forgot-password",
        body,
      );
      return data;
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not send reset code"));
    },
  });
}
