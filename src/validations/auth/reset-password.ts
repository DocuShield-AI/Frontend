import { z } from "zod";
import { passwordSchema } from "./common";

export const RESET_CODE_LENGTH = 8;

export const resetCodeSchema = z.object({
  code: z
    .string({ error: "Reset code is required" })
    .trim()
    .regex(
      new RegExp(`^\\d{${RESET_CODE_LENGTH}}$`),
      `Enter the ${RESET_CODE_LENGTH}-digit code from your email`,
    ),
});

export const resetPasswordSchema = z
  .object({
    code: resetCodeSchema.shape.code,
    password: passwordSchema,
    confirmPassword: z.string({ error: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetCodeValues = z.infer<typeof resetCodeSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
