"use server"

import type { RegisterInput } from "@/components/forms/AuthForm"
import { EmailTakenError, UsernameTakenError } from "@/errors"
import { createUser, getUserByEmail, getUserByUsername } from "@/queries/users"
import argon2 from "argon2"

type SignUpResult =
    | { success: true }
    | { success: false; emailError?: string; userError?: string }

export async function signUp(data: RegisterInput): Promise<SignUpResult> {
    try {
        const { username, email, password } = data

        const emailExists = await getUserByEmail(email)
        if (emailExists) throw new EmailTakenError("Email already in use")

        const usernameExists = await getUserByUsername(username)
        if (usernameExists)
            throw new UsernameTakenError("Username already in use")

        const hashedPassword = await argon2.hash(password)
        await createUser(username, email, hashedPassword)

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
