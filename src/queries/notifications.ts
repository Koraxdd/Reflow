import type { Notification } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"

export async function createUserNotification(
    userId: string,
    title: string,
    message: string,
    type: string
): Promise<Notification> {
    return await prisma.notification.create({
        data: {
            userId,
            title,
            message,
            type,
        },
    })
}

export async function getUserNotifications(
    userId: string
): Promise<Notification[]> {
    return await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    })
}

export async function updateNotificationReadStatus(
    id: string
): Promise<Notification> {
    return await prisma.notification.update({
        where: { id },
        data: { read: true },
    })
}

export async function updateAllNotificationsReadStatus(userId: string) {
    return await prisma.notification.updateMany({
        where: { userId, read: false },
        data: { read: true },
    })
}
