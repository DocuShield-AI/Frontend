import { z } from "zod";

/**
 * INVITE — admin-only, generate-a-code flow (#8 Members & Billing).
 *
 * Members page par generate hota hai, phir invitee ko copy karke diya jaata
 * hai (jo usse Register page ke "Join" tab mein paste karta hai). Yeh schema
 * generate modal ka shape hai, JOIN form ka NAHI — join form `registerJoinSchema`
 * (register.ts) reuse karta hai. Yahan sirf wo capture hota hai jo admin
 * configure karta hai:
 *
 *   ROLE_SCHEMA   → admin | legal | viewer  (role jo invite deta hai)
 *   inviteSchema  → { role, expiresAt }     (expiry = ISO date-time string,
 *                    `YYYY-MM-DDTHH:mm` from <input type="datetime-local">)
 *
 * 6–12 uppercase wala code khud backend banata hai aur Register page ke
 * `registerJoinSchema` se re-validate hota hai — isliye yeh file jaan boojh
 * kar invite-code ke format ke baare me kuch nahi jaanti, taaki code rule ka
 * ek second, drift-prone copy na bane.
 */
export const ROLE_VALUES = ["admin", "legal", "viewer"] as const;

export const roleSchema = z.enum(ROLE_VALUES, {
  error: "Please pick a role for this invite",
});

/**
 * Expiry — valid future date-time hona chahiye. Value `datetime-local` input
 * se `YYYY-MM-DDTHH:mm` string ke roop me aati hai. "Future only" yahan hard
 * enforce karte hain (+ friendly bounds: today…90 days out) taaki Members UI
 * instantly-dead invite na bana sake.
 */
export const MIN_INVITE_HOURS = 1;
export const MAX_INVITE_DAYS = 90;

export const expiresAtSchema = z
  .string({ error: "Invite expiry is required" })
  .refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date and time")
  .refine((v) => Date.parse(v) > Date.now(), "Expiry must be in the future")
  .refine(
    (v) => Date.parse(v) <= Date.now() + MAX_INVITE_DAYS * 24 * 60 * 60 * 1000,
    `Invite expiry can be at most ${MAX_INVITE_DAYS} days out`,
  );

export const inviteSchema = z.object({
  role: roleSchema,
  expiresAt: expiresAtSchema,
});

export type InviteValues = z.infer<typeof inviteSchema>;
export type InviteRole = z.infer<typeof roleSchema>;
