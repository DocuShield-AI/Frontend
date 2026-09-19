/**
 * EmailJS client config. Used by the members/invite UI (to be built).
 * Values come from frontend .env.local — never put secrets here without NEXT_PUBLIC_.
 */
export const emailJsEnv = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateInvite: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_INVITE ?? "",
} as const;

export function isEmailJsConfigured(): boolean {
  return Boolean(
    emailJsEnv.publicKey && emailJsEnv.serviceId && emailJsEnv.templateInvite,
  );
}
