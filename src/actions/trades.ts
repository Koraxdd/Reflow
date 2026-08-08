"use server"

import { getUserId } from "@/lib/getUserId"
import {
    createTrade,
    deleteTradeById,
    editTradeById,
    EditTradeVariables,
    getTradesByUser,
} from "@/queries/trades"
import { type TradeOutput } from "@/schemas/trade.schema"

export async function submitTrade(data: TradeOutput) {
    const userId = await getUserId()
    return await createTrade(userId, data)
}

export async function getTrades() {
    const userId = await getUserId()
    return await getTradesByUser(userId)
}

export async function removeTrade(id: string) {
    const userId = await getUserId()
    return await deleteTradeById(id, userId)
}

export async function updateTrade({ id, userId, trade }: EditTradeVariables) {
    return await editTradeById({ id, userId, trade })
}
