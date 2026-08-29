"use client"

import {
    getNotifications,
    markAllNotificationsAsRead,
    markNotificationAsRead,
} from "@/actions/notifications"
import type { Notification } from "@/generated/prisma/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useNotifications() {
    const queryClient = useQueryClient()

    const { data: notifications } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
    })

    const { mutate: markAsRead } = useMutation({
        mutationFn: (id: string) => markNotificationAsRead(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["notifications"] })
            const previous = queryClient.getQueryData<Notification[]>([
                "notifications",
            ])

            queryClient.setQueryData<Notification[]>(
                ["notifications"],
                (prev) =>
                    prev?.map((notification) =>
                        notification.id === id
                            ? { ...notification, read: true }
                            : notification
                    )
            )

            return { previous }
        },
        onError(_error, _variables, onMutateResult) {
            if (onMutateResult?.previous) {
                queryClient.setQueryData<Notification[]>(
                    ["notifications"],
                    onMutateResult.previous
                )
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] })
        },
    })

    const { mutate: markAllAsRead } = useMutation({
        mutationFn: markAllNotificationsAsRead,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["notifications"] })
            const previous = queryClient.getQueryData<Notification[]>([
                "notifications",
            ])

            queryClient.setQueryData<Notification[]>(
                ["notifications"],
                (prev) =>
                    prev?.map((notification) =>
                        notification
                            ? { ...notification, read: true }
                            : notification
                    )
            )

            return { previous }
        },
        onError(_error, _variables, onMutateResult) {
            if (onMutateResult?.previous) {
                queryClient.setQueryData<Notification[]>(
                    ["notifications"],
                    onMutateResult.previous
                )
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] })
        },
    })

    return { notifications, markAsRead, markAllAsRead }
}
