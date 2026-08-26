"use server"

import type { Trade } from "@/generated/prisma/client"
import { getUserId } from "@/lib/getUserId"
import {
    createTrade,
    deleteTradeById,
    editTradeById,
    EditTradeVariables,
    getPaginatedTradeHistoryByUser,
    getPaginatedTradesByUser,
    getTradesByUser,
    type TradeQueryOptions,
    type PaginatedTrades,
} from "@/queries/trades"
import { type TradeOutput } from "@/schemas/trade.schema"

export async function submitTrade(data: TradeOutput): Promise<Trade> {
    const userId = await getUserId()
    return await createTrade(userId, data)
}

export async function getTrades(): Promise<Trade[]> {
    const userId = await getUserId()
    return await getTradesByUser(userId)
}

export async function getPaginatedTrades(
    page: number,
    pageSize: number
): Promise<PaginatedTrades> {
    const userId = await getUserId()
    return await getPaginatedTradesByUser(userId, page, pageSize)
}

export async function getPaginatedTradeHistory(
    page: number,
    pageSize: number,
    options?: TradeQueryOptions
): Promise<PaginatedTrades> {
    const userId = await getUserId()
    return await getPaginatedTradeHistoryByUser(
        userId,
        page,
        pageSize,
        options ?? { tradeFilter: "All", sortField: "date", sortOrder: "desc" }
    )
}

export async function removeTrade(id: string): Promise<Trade> {
    const userId = await getUserId()
    return await deleteTradeById(id, userId)
}

export async function updateTrade({
    id,
    userId,
    trade,
}: EditTradeVariables): Promise<Trade> {
    return await editTradeById({ id, userId, trade })
}
