"use server"

import type { User } from "@/generated/prisma/client"
import { updateUserData } from "@/queries/users"
import type { ProfileInput } from "@/schemas/profile.schema"

export async function updateUser(
    userId: string,
    data: ProfileInput
): Promise<User> {
    const { username, email, timezone, baseCurrency } = data

    return updateUserData(userId, username, email, timezone, baseCurrency)
}
