import { z } from "zod"

export const RegisterSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export type RegisterInput = z.infer<typeof RegisterSchema>
