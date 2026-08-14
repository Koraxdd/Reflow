import type { Trade } from "@/generated/prisma/client"

export function getCurrentHoldings(trades: Trade[]): Record<string, number> {
    const openTrades = trades.filter((trade) => !trade.closedAt)
    const holdings: Record<string, number> = {}

    for (const trade of openTrades) {
        holdings[trade.symbol] = (holdings[trade.symbol] ?? 0) + trade.quantity
    }

    return holdings
}
