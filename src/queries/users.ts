import type {
    NotificationSettings,
    UserPreferences,
} from "@/app/dashboard/settings/page"
import type { User } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"

export async function createUser(
    username: string,
    email: string,
    password: string
): Promise<User> {
    return await prisma.user.create({
        data: {
            username,
            email,
            password,
        },
    })
}

export async function getUserById(userId: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: { id: userId },
    })
}

export async function getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    })
}

export async function getUserByUsername(
    username: string
): Promise<User | null> {
    return await prisma.user.findUnique({
        where: {
            username,
        },
    })
}

export async function updateUserEmail(
    userId: string,
    email: string
): Promise<User> {
    return await prisma.user.update({
        where: { id: userId },
        data: { email, pendingEmail: null, emailVerified: new Date() },
    })
}

export async function updateUserPendingEmail(
    userId: string,
    email: string
): Promise<User> {
    return await prisma.user.update({
        where: { id: userId },
        data: { pendingEmail: email },
    })
}

export async function updateUserData(
    userId: string,
    username: string,
    timezone: string,
    baseCurrency: string
): Promise<User> {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            username,
            timezone,
            baseCurrency,
        },
    })
}

export async function updateUserPassword(
    userId: string,
    password: string
): Promise<User> {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            password,
        },
    })
}

export async function getUserPassword(
    userId: string
): Promise<{ password: string } | null> {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            password: true,
        },
    })
}

export async function updateUserNotificationSettings(
    userId: string,
    key: keyof NotificationSettings,
    value: boolean
): Promise<User> {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            [key]: value,
        },
    })
}

export async function getUserNotificationSettings(
    userId: string
): Promise<NotificationSettings | null> {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            priceAlerts: true,
            tradeExecuted: true,
            dailySummary: true,
            cryptoNews: true,
            emailAlerts: true,
        },
    })
}

export async function getUserPreferenceSettings(
    userId: string
): Promise<UserPreferences | null> {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            theme: true,
            defaultChart: true,
            compactView: true,
            timezone: true,
            baseCurrency: true,
        },
    })
}

export async function updateUserPreferenceSettings(
    userId: string,
    key: keyof UserPreferences,
    value: UserPreferences[keyof UserPreferences]
): Promise<User> {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            [key]: value,
        },
    })
}

export async function getUsernameById(
    userId: string
): Promise<string | undefined> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            username: true,
        },
    })

    return user?.username
}

export async function verifyUser(userId: string): Promise<User> {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            emailVerified: new Date(),
        },
    })
}
