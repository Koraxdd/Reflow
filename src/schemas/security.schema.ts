import { z } from "zod"

export const SecuritySchema = z
    .object({
        currentPassword: z.string(),
        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export type SecurityInput = z.infer<typeof SecuritySchema>
