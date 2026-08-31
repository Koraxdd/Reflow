"use server"

import { EmailTakenError, UsernameTakenError } from "@/errors"
import { getClientIp } from "@/lib/getClientIp"
import { loginRateLimit, signUpRateLimit } from "@/lib/ratelimit"
import { sendVerificationEmail } from "@/lib/sendVerificationEmail"
import { createUser, getUserByEmail, getUserByUsername } from "@/queries/users"
import type { RegisterInput } from "@/schemas/register.schema"
import argon2 from "argon2"
import { toast } from "sonner"

type CheckCredentialsResult =
    { valid: false; error?: string } | { valid: true; requires2FA: boolean }

type SignUpResult =
    | { success: true }
    | { success: false; emailError?: string; userError?: string }

export async function signUp(data: RegisterInput): Promise<SignUpResult> {
    try {
        const ip = await getClientIp()
        const { success } = await signUpRateLimit.limit(ip)
        if (!success) {
            toast.error("Too many attempts. Try again later.")
            return { success: false }
        }

        const { username, email, password } = data

        const emailExists = await getUserByEmail(email)
        if (emailExists) throw new EmailTakenError("Email already in use")

        const usernameExists = await getUserByUsername(username)
        if (usernameExists)
            throw new UsernameTakenError("Username already in use")

        const hashedPassword = await argon2.hash(password)
        const user = await createUser(username, email, hashedPassword)
        await sendVerificationEmail(user.id, email)

        return { success: true }
    } catch (err) {
        if (err instanceof EmailTakenError) {
            return { success: false, emailError: "Email already in use" }
        }
        if (err instanceof UsernameTakenError) {
            return { success: false, userError: "Username already in use" }
        }
        throw new Error(`Unexpected error: ${err}`)
    }
}

export async function checkCredentials(
    email: string,
    password: string
): Promise<CheckCredentialsResult> {
    const { success } = await loginRateLimit.limit(email)
    if (!success) {
        return { valid: false, error: "Too many attempts. Try again later." }
    }

    const user = await getUserByEmail(email)
    if (!user) {
        return { valid: false }
    }

    const isPasswordValid = await argon2.verify(user.password, password)
    if (!isPasswordValid) {
        return { valid: false }
    }

    return { valid: true, requires2FA: user.twoFactorEnabled }
}
