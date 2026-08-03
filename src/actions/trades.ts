"use server"

import { TradeOutput } from "@/components/forms/TradeForm"
import { authOptions } from "@/lib/auth"
import { createTrade } from "@/queries/trades"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export async function submitTrade(data: TradeOutput) {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id
    if (!userId) {
        redirect("/")
    }

    return await createTrade(userId, data)
}
