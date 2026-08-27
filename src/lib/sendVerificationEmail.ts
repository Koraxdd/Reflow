import crypto from "crypto"

import { createVerificationToken } from "@/queries/verificationTokens"
import { resend } from "./resend"

export async function sendVerificationEmail(userId: string, email: string) {
    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24)

    await createVerificationToken(userId, token, expiresAt)
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

    await resend.emails.send({
        from: "Reflow <onboarding@resend.dev>",
        to: email,
        subject: "Verify your email",
        html: `<a href="${verifyUrl}">Click to verify your email</a>`,
    })
}
