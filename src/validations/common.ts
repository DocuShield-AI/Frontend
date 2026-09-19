import { z } from "zod";

/**
 * DocuShield ke har form schema ka shared building block.
 *
 * Policy chizein (password rules, upload limits, expiry requirements, accepted
 * MIME types) sirf EK jagah rakhi hain taaki design prompt, zod validations,
 * aur aage upload/billing UI kabhi drift na karein.
 */

/* ----------------------------------------------------------------------------
 * Password policy
 * ------------------------------------------------------------------------- */

export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 72; // bcrypt 72-byte truncation limit

export const passwordSchema = z
  .string({ error: "Password is required" })
  .min(PASSWORD_MIN, `Password must be at least ${PASSWORD_MIN} characters`)
  .max(PASSWORD_MAX, `Password must be at most ${PASSWORD_MAX} characters`);

/* ----------------------------------------------------------------------------
 * Email
 * ------------------------------------------------------------------------- */

export const emailSchema = z
  .email("Enter a valid email address")
  .transform((v) => v.trim().toLowerCase());

/* ----------------------------------------------------------------------------
 * Single-word identifiers (workspace / invite)
 * ------------------------------------------------------------------------- */

/**
 * Workspace name — chhota, human, display-only value (e.g. "Acme Legal").
 * Jaan boojh kar loose rakha hai: sirf required + length, koi character filter
 * nahi, taaki real-world company names (jo "&", "'", "," rakh sakte hain)
 * reject na hon.
 */
export const workspaceNameSchema = z
  .string({ error: "Workspace name is required" })
  .trim()
  .min(2, "Workspace name must be at least 2 characters")
  .max(60, "Workspace name must be at most 60 characters");

/**
 * Invite code — uppercase alphanumeric token (e.g. "XK7Q2A"). Copy-paste se
 * lower-case + surrounding whitespace aa jaye to tolerate karta hai; parse par
 * normalise ho jaata hai.
 *
 * ORDER MATTERS (zod v4): `.regex` pehle raw string par chalta hai, `.transform`
 * (toUpperCase) baad mein — kyunki transform ke baad vo `ZodPipe` ban jaata
 * hai jisme `.regex` exist nahi karta.
 */
export const inviteCodeSchema = z
  .string({ error: "Invite code is required" })
  .trim()
  .regex(/^[A-Z0-9]{6,12}$/, "Invite code must be 6–12 letters or numbers")
  .transform((v) => v.toUpperCase());
