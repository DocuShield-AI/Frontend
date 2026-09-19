import { z } from "zod";

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .length(8, "Enter the full 8-digit code")
    .regex(/^\d{8}$/, "Code must contain only digits"),
});

export type VerifyEmailValues = z.infer<typeof verifyEmailSchema>;
