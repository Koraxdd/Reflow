import type { Trade } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { type TradeOutput } from "@/schemas/trade.schema"

export type EditTradeVariables = {
    id: string
    trade: TradeOutput
}

export async function createTrade(
    userId: string,
    data: TradeOutput
): Promise<Trade> {
    const {
        coin,
        direction,
        entryPrice,
        exitPrice,
        amount,
        reflection,
        openedAt,
        closedAt,
        tags,
    } = data

    return await prisma.trade.create({
        data: {
            userId,
            symbol: coin,
            direction,
            entryPrice,
            exitPrice,
            quantity: amount,
            notes: reflection,
            openedAt,
            closedAt,
            tags,
        },
    })
}

export async function getTradesByUser(userId: string): Promise<Trade[] | null> {
    return await prisma.trade.findMany({
        where: {
            userId,
        },
        orderBy: { openedAt: "desc" },
    })
}

export async function deleteTradeById(id: string): Promise<Trade> {
    return await prisma.trade.delete({
        where: {
            id,
        },
    })
}

export async function editTradeById({
    id,
    trade,
}: EditTradeVariables): Promise<Trade> {
    return await prisma.trade.update({
        where: { id },
        data: {
            symbol: trade.coin,
            direction: trade.direction,
            entryPrice: trade.entryPrice,
            exitPrice: trade.exitPrice,
            quantity: trade.amount,
            notes: trade.reflection,
            openedAt: trade.openedAt,
            closedAt: trade.closedAt,
            tags: trade.tags,
        },
    })
}
