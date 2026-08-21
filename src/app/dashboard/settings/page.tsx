import SettingsClient from "@/components/layout/SettingsClient"
import { authOptions } from "@/lib/auth"
import { getUserByEmail } from "@/queries/users"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export type NotificationSettings = {
    priceAlerts: boolean
    tradeExecuted: boolean
    dailySummary: boolean
    cryptoNews: boolean
    emailAlerts: boolean
}

export type UserPreferences = {
    theme: string
    defaultChart: string
    compactView: boolean
}

export default async function SettingsPage() {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id
    if (!userId) {
        redirect("/")
    }

    const user = await getUserByEmail(session.user.email)
    if (!user) {
        redirect("/")
    }

    const settings: NotificationSettings = {
        priceAlerts: user.priceAlerts,
        tradeExecuted: user.tradeExecuted,
        dailySummary: user.dailySummary,
        cryptoNews: user.cryptoNews,
        emailAlerts: user.emailAlerts,
    }

    const preferences: UserPreferences = {
        theme: user.theme,
        defaultChart: user.defaultChart,
        compactView: user.compactView,
    }

    return (
        <SettingsClient
            initialSettings={settings}
            initialPreferences={preferences}
            username={session.user.name}
            email={session.user.email}
            timezone={user.timezone}
            baseCurrency={user.baseCurrency}
        />
    )
}
