"use client"

import { Bell, TrendingUp } from "lucide-react"
import CustomLink from "../ui/CustomLink"
import { navLinks } from "@/lib/navLinks"
import LogoutButton from "../ui/LogoutButton"
import SidebarButton from "../ui/SidebarButton"

export default function Sidebar() {
    return (
        <aside className="bg-header border-r border-border min-h-screen w-55 md:w-60 fixed top-0 flex flex-col">
            <div className="flex items-center gap-3 border-b border-border py-5 px-4">
                <TrendingUp className="bg-neon-cyan/20 text-neon-cyan w-8 h-8 p-2 rounded-xl" />
                <h2 className="text-base font-semibold">CryptoLog</h2>
            </div>
            <SidebarButton />
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
                            {link.label}
                        </CustomLink>
                    )
                })}
            </nav>
            <div className="py-5 px-4 border-t border-border mt-auto">
                <CustomLink
                    href="/alerts"
                    className="w-full flex items-center gap-3"
                >
                    <Bell className="w-3.5 h-3.5" />
                    Alerts
                </CustomLink>
                <LogoutButton
                    size="sm"
                    className="w-full flex items-center gap-3 px-3 py-2 text-link font-medium rounded-2xl hover:bg-red-500/10"
                />
            </div>
        </aside>
    )
}
