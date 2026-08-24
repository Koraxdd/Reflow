"use server"

import type {
    NotificationSettings,
    UserPreferences,
} from "@/app/dashboard/settings/page"
import type { User } from "@/generated/prisma/client"
import { getUserId } from "@/lib/getUserId"
import {
    getUsernameById,
    getUserNotificationSettings,
    getUserPassword,
    getUserPreferenceSettings,
    updateUserData,
    updateUserNotificationSettings,
    updateUserPassword,
    updateUserPreferenceSettings,
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

export async function updateUserNotifications(
    key: keyof NotificationSettings,
    value: boolean
): Promise<User> {
    const userId = await getUserId()
    return await updateUserNotificationSettings(userId, key, value)
}

export async function getUserNotifications(): Promise<NotificationSettings | null> {
    const userId = await getUserId()
    return await getUserNotificationSettings(userId)
}

export async function getUserPreferences(): Promise<UserPreferences | null> {
    const userId = await getUserId()
    return await getUserPreferenceSettings(userId)
}

export async function updateUserPreferences(
    key: keyof UserPreferences,
    value: UserPreferences[keyof UserPreferences]
): Promise<User> {
    const userId = await getUserId()
    return await updateUserPreferenceSettings(userId, key, value)
}

export async function getUsername(): Promise<string | undefined> {
    const userId = await getUserId()
    return await getUsernameById(userId)
}
