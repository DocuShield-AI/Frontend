import { z } from "zod";
import { emailSchema, passwordSchema } from "./common";

/**
 * LOGIN — email + password.
 *
 * Consume karte hain: Annas ke `login/page.tsx` aur `register/page.tsx`
 * (account create/join ke baad) via `@hookform/resolvers` + react-hook-form.
 *
 * Google button note: "Continue with Google" plain oauth redirect hai (koi
 * form state nahi), isliye wo is schema ka hissa JAAN BOOJH KAR nahi banaya.
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginValues = z.infer<typeof loginSchema>;
