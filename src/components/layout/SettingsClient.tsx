"use client"

import { ChevronRight } from "lucide-react"
import Button from "../ui/Button"
import { useState } from "react"
import { type ActiveTab, settingsTabs } from "@/lib/settingsTabs"
import { cn } from "@/lib/utils"
import ProfileTab from "../features/settings/ProfileTab"
import SecurityTab from "../features/settings/SecurityTab"
import NotificationsTab from "../features/settings/NotificationsTab"
import PreferencesTab from "../features/settings/PreferencesTab"
import type { NotificationSettings } from "@/app/dashboard/settings/page"

type Props = {
    initialSettings: NotificationSettings
    username: string
    email: string
    timezone: string
    baseCurrency: string
}

export default function SettingsClient({
    initialSettings,
    username,
    email,
    timezone,
    baseCurrency,
}: Props) {
    const [activeTab, setActiveTab] = useState<ActiveTab>("Profile")

    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="flex flex-col">
                <h2 className="font-semibold">Settings</h2>
                <span className="text-text-muted text-sm font-medium">
                    Manage your account and preferences
                </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="rounded-2xl p-3 border border-border bg-card space-y-2 h-fit">
                    <div className="flex flex-col items-center justify-center py-5 px-3 mb-2">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 bg-linear-to-br from-neon-cyan/25 to-neon-purple/25 border-2 border-neon-cyan/20">
                            <span className="text-neon-cyan font-semibold text-2xl">
                                {username[0].toUpperCase()}
                            </span>
                        </div>
                        <span className="text-sm font-semibold">
                            {username}
                        </span>
                        <span className="text-text-muted text-xs font-medium mt-0.5">
                            {email}
                        </span>
                    </div>
                    {settingsTabs.map((tab) => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.name

                        return (
                            <Button
                                key={tab.name}
                                className={cn(
                                    "font-medium text-sm px-3 py-2 border border-transparent rounded-2xl flex items-center justify-between w-full text-text-muted transition-colors",
                                    isActive &&
                                        "text-neon-cyan border-neon-cyan/20 bg-neon-cyan/10"
                                )}
                                onClick={() => setActiveTab(tab.name)}
                            >
                                <div className="flex items-center gap-2.5">
                                    <Icon className="w-4 h-4" />
                                    <span>{tab.name}</span>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Button>
                        )
                    })}
                </div>
                <div className="md:col-span-3 rounded-2xl p-6 bg-card border border-border h-fit">
                    {activeTab === "Profile" && (
                        <ProfileTab
                            username={username}
                            email={email}
                            timezone={timezone}
                            baseCurrency={baseCurrency}
                        />
                    )}
                    {activeTab === "Security" && <SecurityTab />}
                    {activeTab === "Notifications" && (
                        <NotificationsTab initialSettings={initialSettings} />
                    )}
                    {activeTab === "Preferences" && <PreferencesTab />}
                </div>
            </div>
        </div>
    )
}
