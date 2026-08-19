import { User } from "@/generated/prisma/client"
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

export async function updateUserData(
    userId: string,
    username: string,
    email: string,
    timezone: string,
    baseCurrency: string
): Promise<User> {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            username,
            email,
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
