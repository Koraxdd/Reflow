import { z } from "zod"

export const ProfileSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    timezone: z.string(),
    baseCurrency: z.string(),
})

export type ProfileInput = z.infer<typeof ProfileSchema>
