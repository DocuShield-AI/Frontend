"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, getApiErrorMessage } from "@/lib/api";
import type { MessageResponse, ResetPasswordBody } from "@/types/api";

export function useResetPassword() {
  return useMutation({
    mutationFn: async (body: ResetPasswordBody) => {
      const { data } = await api.post<MessageResponse>(
        "/auth/reset-password",
        body,
      );
      return data;
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not update password"));
    },
  });
}
