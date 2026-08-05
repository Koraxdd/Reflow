"use server"

import { authOptions } from "@/lib/auth"
import {
    createTrade,
    deleteTradeById,
    editTradeById,
    EditTradeVariables,
    getTradesByUser,
} from "@/queries/trades"
import { type TradeOutput } from "@/schemas/trade.schema"
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

export async function getTrades() {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id
    if (!userId) {
        redirect("/")
    }

    return await getTradesByUser(userId)
}

export async function removeTrade(id: string) {
    return await deleteTradeById(id)
}

export async function updateTrade({ id, trade }: EditTradeVariables) {
    return await editTradeById({ id, trade })
}
