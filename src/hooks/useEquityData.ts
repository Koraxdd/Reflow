import type { Trade } from "@/generated/prisma/client"
import type { EquityCurveTimeframe } from "@/lib/equityCurveTimeframes"
import { calculatePnL } from "@/utils/calculatePnL"
import { getTimeframeStartDate } from "@/utils/getTimeframeStartDate"
import { format } from "date-fns"
import { useMemo } from "react"

type EquityCurveData = {
    cumulativePnl: number
    date: string
    tooltipDate: string
}[]

export function useEquityData(
    trades: Trade[],
    timeframe: EquityCurveTimeframe = "1M"
): EquityCurveData {
    return useMemo(() => {
        const isLongTimeframe =
            timeframe === "6M" || timeframe === "1Y" || timeframe === "All"
        const startDate = getTimeframeStartDate(timeframe)
        const closedTrades = trades
            .filter((trade) => trade.closedAt && trade.exitPrice)
            .sort((a, b) => a.closedAt!.getTime() - b.closedAt!.getTime())

        const chartMap = new Map<
            string,
            { dateLabel: string; pnl: number; fullDate: string }
        >()

        let cumulativePnl = 0
        for (const trade of closedTrades) {
            const { pnlAmount } = calculatePnL(
                trade.direction as "Long" | "Short",
                trade.exitPrice!,
                trade.entryPrice,
                trade.quantity
            )
            cumulativePnl += pnlAmount

            if (!startDate || trade.closedAt! >= startDate) {
                const dateKey = format(
                    trade.closedAt!,
                    isLongTimeframe ? "MMM yyyy" : "yyyy-MM-dd"
                )
                const dateLabel = format(
                    trade.closedAt!,
                    isLongTimeframe ? "MMM yyyy" : "MMM dd"
                )

                chartMap.set(dateKey, {
                    dateLabel,
                    pnl: cumulativePnl,
                    fullDate: format(trade.closedAt!, "dd/MM/yyyy"),
                })
            }
        }

        return Array.from(chartMap.values()).map((item) => ({
            cumulativePnl: item.pnl,
            date: item.dateLabel,
            tooltipDate: item.fullDate,
        }))
    }, [trades, timeframe])
}
