"use client"

import { Bell, CheckCheck, TrendingDown, TrendingUp, X } from "lucide-react"
import { motion } from "motion/react"
import Button from "../ui/Button"
import { useMemo } from "react"
import { formatDistanceToNow } from "date-fns"
import { useNotifications } from "@/hooks/useNotifications"
import { cn } from "@/lib/utils"

type Props = {
    isOpen: boolean
    handleToggle: () => void
}

export default function AlertsSidebar({ isOpen, handleToggle }: Props) {
    const { notifications, markAsRead, markAllAsRead } = useNotifications()

    const unreadAmount =
        useMemo(
            () =>
                notifications?.filter((notification) => !notification.read)
                    .length,
            [notifications]
        ) ?? 0

    const getNotificationIcon = (type: string, message: string) => {
        if (type === "tradeExecuted") {
            if (message.startsWith("Long")) {
                return (
                    <TrendingUp className="w-8 h-8 bg-neon-green/10 border border-neon-green/20 rounded-xl text-neon-green p-1.75" />
                )
            } else {
                return (
                    <TrendingDown className="w-8 h-8 bg-neon-red/10 border border-neon-red/20 rounded-xl text-neon-red p-1.75" />
                )
            }
        }

        return (
            <Bell className="w-8 h-8 bg-neon-cyan/10 border border-neon-cyan/20 rounded-xl text-neon-cyan p-1.75" />
        )
    }

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-100"
                    onClick={handleToggle}
                />
            )}
            <motion.aside
                initial={{ x: 0 }}
                animate={{ width: isOpen ? 340 : 0 }}
                transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                className="bg-header border-l border-border min-h-screen fixed z-110 top-0 right-0 flex flex-col"
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <div className="flex items-center gap-2.5">
                        <Bell className="w-4 h-4 text-neon-cyan" />
                        <span className="text-sm font-semibold">Alerts</span>
                        {unreadAmount > 0 && (
                            <span className="bg-neon-red rounded-full text-xs font-bold w-5.5 h-5.5 flex items-center justify-center">
                                {unreadAmount}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            className="bg-neon-cyan/10 text-neon-cyan text-xs flex items-center justify-center gap-1 px-2 py-1 rounded-lg hover:opacity-80"
                            onClick={() => markAllAsRead()}
                        >
                            <CheckCheck className="w-3 h-3" />
                            Mark all read
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-6 h-6 rounded-full bg-input flex items-center justify-center hover:opacity-80"
                            onClick={handleToggle}
                        >
                            <X className="w-3.5 h-3.5" />
                        </Button>
                    </div>
                </div>
                <div className="overflow-y-auto flex-1 p-3 space-y-1">
                    {notifications &&
                        notifications.map((notification) => {
                            const {
                                id,
                                read,
                                type,
                                message,
                                title,
                                createdAt,
                            } = notification
                            return (
                                <div
                                    key={id}
                                    onClick={() => markAsRead(id)}
                                    className={cn(
                                        "relative p-3.5 flex gap-3 rounded-xl cursor-pointer transition-colors duration-150 hover:bg-white/4",
                                        !read
                                            ? "border border-border bg-card"
                                            : "opacity-60"
                                    )}
                                >
                                    {!read && (
                                        <div className="absolute w-1.5 h-1.5 top-3.5 right-3.5 bg-neon-cyan rounded-full" />
                                    )}
                                    {getNotificationIcon(type, message)}
                                    <div
                                        className={cn(
                                            "flex flex-col",
                                            read && "text-text-muted"
                                        )}
                                    >
                                        <span className="text-sm font-medium mb-1">
                                            {title}
                                        </span>
                                        <span className="text-xs text-text-muted font-medium mb-1.5">
                                            {message}
                                        </span>
                                        <span className="text-xs">
                                            {formatDistanceToNow(createdAt, {
                                                addSuffix: true,
                                            })}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                </div>
                <div className="border-t border-border px-5 py-4">
                    <Button
                        variant="ghost"
                        className="bg-white/5 border border-border w-full rounded-2xl py-2.5 text-xs font-semibold hover:opacity-80"
                    >
                        View all activity
                    </Button>
                </div>
            </motion.aside>
        </>
    )
}
