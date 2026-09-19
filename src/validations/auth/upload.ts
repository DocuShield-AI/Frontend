import { z } from "zod";

/**
 * UPLOAD — contract file, type + size validate karta hai (#6).
 *
 * Contract types jo classification ke liye accept karte hain. EK jagah rakhe
 * hain taaki upload zone ka accept attribute aur zod schema kabhi drift na
 * karein.
 */
export const ACCEPTED_CONTRACT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const CONTRACT_TYPE_OPTIONS = [
  { value: "application/pdf", label: "PDF" },
  { value: "application/msword", label: "DOC" },
  { value: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", label: "DOCX" },
] as const;

export const MAX_UPLOAD_SIZE = 25 * 1024 * 1024; // 25 MB bytes me

export const uploadSchema = z.object({
  contract: z
    .instanceof(File, { error: "A file is required" })
    .refine((f) => f.size > 0, "File must not be empty")
    .refine((f) => f.size <= MAX_UPLOAD_SIZE, "File is too large — max size is 25 MB")
    .refine(
      (f) => (ACCEPTED_CONTRACT_TYPES as readonly string[]).includes(f.type),
      "Unsupported file type — upload a PDF, DOC, or DOCX",
    )
    .refine((f) => (f.type as string) !== "application/pdf" || f.size > 0, "Invalid PDF"),
});

export type UploadValues = z.infer<typeof uploadSchema>;
