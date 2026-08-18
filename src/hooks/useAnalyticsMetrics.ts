import type { Trade } from "@/generated/prisma/client"
import { calculatePnL } from "@/utils/calculatePnL"
import { calculateRealisedPnL } from "@/utils/calculateRealisedPnL"
import { calculateWinRate } from "@/utils/calculateWinRate"
import { useMemo } from "react"

type AnalyticsMetrics = {
    allTime: number
    winRate: number
    bestTrade: number
    worstTrade: number
}

export function useAnalyticsMetrics(trades: Trade[]): AnalyticsMetrics {
    const { allTime } = calculateRealisedPnL(trades)

    return useMemo(() => {
        const closed = trades.filter(
            (trade) => trade.closedAt && trade.exitPrice
        )

        if (closed.length === 0) {
            return { allTime, winRate: 0, bestTrade: 0, worstTrade: 0 }
        }

        let wonTrades = 0
        let bestTrade = -Infinity
        let worstTrade = Infinity
        for (const trade of closed) {
            const { pnlAmount } = calculatePnL(
                trade.direction as "Long" | "Short",
                trade.exitPrice!,
                trade.entryPrice,
                trade.quantity
            )
            if (pnlAmount > 0) wonTrades++
            if (pnlAmount > bestTrade) bestTrade = pnlAmount
            if (pnlAmount < worstTrade) worstTrade = pnlAmount
        }
        const winRate = calculateWinRate(closed.length, wonTrades)

        return {
            allTime,
            winRate,
            bestTrade: bestTrade === -Infinity ? 0 : bestTrade,
            worstTrade: worstTrade === Infinity ? 0 : worstTrade,
        }
    }, [trades, allTime])
}
