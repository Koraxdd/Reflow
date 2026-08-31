"use client"

import { Bell, TrendingUp } from "lucide-react"
import CustomLink from "../ui/CustomLink"
import { navLinks } from "@/lib/navLinks"
import LogoutButton from "../ui/LogoutButton"
import SidebarButton from "../ui/SidebarButton"
import { motion } from "motion/react"
import Button from "../ui/Button"
import { useNotifications } from "@/hooks/useNotifications"
import { useMemo } from "react"

type Props = {
    isDesktop: boolean
    isOpen: boolean
    handleToggle: () => void
    handleAlertsToggle: () => void
}

export default function Sidebar({
    isDesktop,
    isOpen,
    handleToggle,
    handleAlertsToggle,
}: Props) {
    const { notifications } = useNotifications()

    const unreadAmount =
        useMemo(
            () =>
                notifications?.filter((notification) => !notification.read)
                    .length,
            [notifications]
        ) ?? 0

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-99 md:hidden"
                    onClick={handleToggle}
                />
            )}
            <motion.aside
                initial={isDesktop ? { x: 0 } : false}
                animate={
                    isDesktop
                        ? { width: isOpen ? 240 : 80 }
                        : { x: isOpen ? 0 : -300, width: 220 }
                }
                transition={{ type: "tween", duration: 0.2 }}
                className="bg-header border-r border-sidebar-border min-h-screen fixed z-100 top-0 flex flex-col"
            >
                <div className="flex items-center gap-3 border-b border-sidebar-border py-5 px-4">
                    <TrendingUp className="bg-neon-cyan/20 text-neon-cyan w-8 h-8 p-2 rounded-xl" />
                    {isOpen && (
                        <h2 className="text-base font-semibold text-white">
                            Reflow
                        </h2>
                    )}
                </div>
                <SidebarButton onClick={handleToggle} isOpen={isOpen} />
                <nav className="p-4 flex flex-col gap-1">
                    {navLinks.map((link) => {
                        const Icon = link.icon
                        return (
                            <CustomLink
                                key={link.href}
                                href={link.href}
                                className="w-full flex items-center gap-3"
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {isOpen && link.label}
                            </CustomLink>
                        )
                    })}
                </nav>
                <div className="py-5 px-4 border-t border-sidebar-border mt-auto">
                    <Button
                        className="w-full flex items-center gap-3 font-medium text-sm text-link px-3 py-2 rounded-2xl overflow-hidden whitespace-nowrap"
                        onClick={handleAlertsToggle}
                    >
                        <div className="relative shrink-0">
                            <Bell className="w-3.5 h-3.5" />
                            {unreadAmount > 0 && (
                                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-neon-red font-bold flex items-center justify-center text-[10px] text-white">
                                    {unreadAmount}
                                </span>
                            )}
                        </div>
                        {isOpen && "Alerts"}
                    </Button>
                    <LogoutButton
                        size="sm"
                        className="w-full flex items-center gap-3 px-3 py-2 text-link font-medium rounded-2xl hover:bg-red-500/10"
                        isOpen={isOpen}
                    />
                </div>
            </motion.aside>
        </>
    )
}
