"use server"

import type { Notification } from "@/generated/prisma/client"
import { getUserId } from "@/lib/getUserId"
import {
    getUserNotifications,
    updateAllNotificationsReadStatus,
    updateNotificationReadStatus,
} from "@/queries/notifications"

export async function getNotifications(): Promise<Notification[]> {
    const userId = await getUserId()
    return await getUserNotifications(userId)
}

export async function markNotificationAsRead(
    id: string
): Promise<Notification> {
    return await updateNotificationReadStatus(id)
}

export async function markAllNotificationsAsRead() {
    const userId = await getUserId()
    return await updateAllNotificationsReadStatus(userId)
}
