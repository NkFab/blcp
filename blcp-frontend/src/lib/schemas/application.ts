import { z } from "zod"

export const applicationSchema = z.object({
  institutionName: z
    .string()
    .min(2, "Institution name is required"),
  institutionType: z.enum(
    [
      "commercial_bank",
      "microfinance",
      "savings_and_credit",
    ] as const,
    { error: "Select a licence type" },
  ),
  proposedCapital: z
    .number({ error: "Enter a valid amount" })
    .positive("Capital must be greater than 0"),
  contactEmail: z
    .string()
    .email("Enter a valid email address"),
})

export type ApplicationFormValues = z.infer<typeof applicationSchema>
