import SettingsClient from "@/components/layout/SettingsClient"
import { authOptions } from "@/lib/auth"
import { getUserByEmail } from "@/queries/users"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user.id) {
        redirect("/")
    }

    const user = await getUserByEmail(session.user.email)
    if (!user) {
        redirect("/")
    }

    return (
        <SettingsClient
            userId={session.user.id}
            username={session.user.name}
            email={session.user.email}
            timezone={user.timezone}
            baseCurrency={user.baseCurrency}
        />
    )
}
