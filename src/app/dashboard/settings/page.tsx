import SettingsClient from "@/components/layout/SettingsClient"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (!user) {
        redirect("/")
    }

    return <SettingsClient user={user} />
}
