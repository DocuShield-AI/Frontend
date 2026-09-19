import { z } from "zod";
import { workspaceNameSchema, inviteCodeSchema } from "./common";
import { loginSchema } from "./login";

/**
 * REGISTER — ek page, do modes, Register page ke tab se select hota hai.
 *
 *   registerCreateSchema | mode: "create" → naya workspace banta hai
 *     { workspaceName, email, password }
 *   registerJoinSchema   | mode: "join"   → existing workspace join karta hai
 *     { inviteCode, email, password }
 *
 * Auth pages (#9) active tab ke hisaab se in dono ko swap karte hain. The
 * `inviteCode` Join variant mein Google button par bhi forward hota hai taaki
 * Google join code ke saath carry ho — `auth/register` see plan (#9/#10).
 *
 * Guest users "Join workspace" by invite code; "join" mode Receivers ko
 * gated hai app me kahin aur — yahan sirf form-shape hai.
 */
export const registerCreateSchema = loginSchema.extend({
  workspaceName: workspaceNameSchema,
  inviteCode: inviteCodeSchema.optional(), // sirf "join" UI me dikhta hai
});

export const registerJoinSchema = loginSchema.extend({
  inviteCode: inviteCodeSchema,
});

export const registerSchema = z.union([
  z.object({ mode: z.literal("create"), data: registerCreateSchema }),
  z.object({ mode: z.literal("join"), data: registerJoinSchema }),
]);

export type RegisterCreateValues = z.infer<typeof registerCreateSchema>;
export type RegisterJoinValues = z.infer<typeof registerJoinSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
