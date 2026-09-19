"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api, getApiErrorMessage } from "@/lib/api";
import type { SignupBody, SignupInitResponse } from "@/types/api";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: SignupBody) => {
      const { data } = await api.post<SignupInitResponse>("/auth/signup", body);
      return data;
    },
    onSuccess: (data) => {
      router.push(
        `/verify-email?email=${encodeURIComponent(data.email)}`,
      );
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Could not create account"));
    },
  });
}
