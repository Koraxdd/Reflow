"use server"

import type { User } from "@/generated/prisma/client"
import { getUserId } from "@/lib/getUserId"
import {
    getUserPassword,
    updateUserData,
    updateUserPassword,
} from "@/queries/users"
import type { ProfileInput } from "@/schemas/profile.schema"
import argon2 from "argon2"

export async function updateUser(data: ProfileInput): Promise<User> {
    const { username, email, timezone, baseCurrency } = data
    const userId = await getUserId()

    return await updateUserData(userId, username, email, timezone, baseCurrency)
}

export async function updatePassword(
    currentPassword: string,
    newPassword: string
): Promise<{ success?: boolean; error?: string }> {
    const userId = await getUserId()
    const result = await getUserPassword(userId)
    if (!result) {
        return { error: "User not found" }
    }

    const validPassword = await argon2.verify(result.password, currentPassword)
    if (!validPassword) {
        return { error: "Incorrect current password" }
    }

    const hashedPassword = await argon2.hash(newPassword)
    await updateUserPassword(userId, hashedPassword)

    return { success: true }
}
