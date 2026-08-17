"use client"

import { useMemo, useState } from "react"
import TradeHistoryHeader from "./TradeHistoryHeader"
import TradeHistoryBody from "./TradeHistoryBody"
import type { Trade } from "@/generated/prisma/client"
import { calculatePnL } from "@/utils/calculatePnL"
import TradeHistoryToolbar from "./TradeHistoryToolbar"

type Props = {
    trades: Trade[]
}

export type TradeFilter = "All" | "Win" | "Loss"

export default function TradeHistoryTable({ trades }: Props) {
    const [tradeFilter, setTradeFilter] = useState<TradeFilter>("All")

    const filteredTrades = useMemo(() => {
        return trades.filter((trade) => {
            const isClosed = Boolean(trade.closedAt && trade.exitPrice)
            if (!isClosed) return false

            const { pnlAmount } = calculatePnL(
                trade.direction as "Long" | "Short",
                trade.exitPrice!,
                trade.entryPrice,
                trade.quantity
            )

            if (tradeFilter === "Win") return pnlAmount > 0
            if (tradeFilter === "Loss") return pnlAmount < 0
            return true
        })
    }, [trades, tradeFilter])

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <TradeHistoryToolbar
                    activeFilter={tradeFilter}
                    onFilterChange={setTradeFilter}
                />
                <table className="w-full">
                    <TradeHistoryHeader />
                    <TradeHistoryBody trades={filteredTrades} />
                </table>
            </div>
        </div>
    )
}
