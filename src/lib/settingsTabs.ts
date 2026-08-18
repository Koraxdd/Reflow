import { Bell, Lock, type LucideIcon, Shield, User } from "lucide-react"

export type ActiveTab = "Profile" | "Security" | "Notifications" | "Preferences"

type SettingsTab = {
    name: ActiveTab
    icon: LucideIcon
}

export const settingsTabs: SettingsTab[] = [
    { name: "Profile", icon: User },
    { name: "Security", icon: Lock },
    { name: "Notifications", icon: Bell },
    { name: "Preferences", icon: Shield },
]
