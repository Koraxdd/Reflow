import { type TradeOutput } from "@/components/forms/TradeForm"
import { Trade } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"

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
