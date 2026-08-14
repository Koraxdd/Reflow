import type { Trade } from "@/generated/prisma/client"
import { calculatePnL } from "./calculatePnL"
import { isThisWeek, isToday } from "date-fns"

type RealisedPnLResult = {
    day: number
    week: number
    allTime: number
}

export function calculateRealisedPnL(trades: Trade[]): RealisedPnLResult {
    const closed = trades.filter((trade) => trade.closedAt && trade.exitPrice)

    let day = 0
    let week = 0
    let allTime = 0

    for (const trade of closed) {
        const { pnlAmount } = calculatePnL(
            trade.direction as "Long" | "Short",
            trade.exitPrice!,
            trade.entryPrice,
            trade.quantity
        )
        allTime += pnlAmount
        if (isToday(trade.closedAt!)) day += pnlAmount
        if (isThisWeek(trade.closedAt!)) week += pnlAmount
    }

    return { day, week, allTime }
}
