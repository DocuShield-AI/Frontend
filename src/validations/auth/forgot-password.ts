import { z } from "zod";
import { emailSchema } from "./common";

/**
 * FORGOT PASSWORD — email only; reset link backend par bheja jata hai.
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
