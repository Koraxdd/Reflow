"use client"

import { useMemo, useState } from "react"
import TradeHistoryHeader from "./TradeHistoryHeader"
import TradeHistoryBody from "./TradeHistoryBody"
import type { Trade } from "@/generated/prisma/client"
import { calculatePnL } from "@/utils/calculatePnL"
import TradeHistoryToolbar from "./TradeHistoryToolbar"
import { useQuery } from "@tanstack/react-query"
import { getUserPreferences } from "@/actions/users"

type Props = {
    trades: Trade[]
}

export type TradeFilter = "All" | "Win" | "Loss"
export type SortField = "date" | "asset" | "amount" | "pnl"
export type SortOrder = "asc" | "desc"

export default function TradeHistoryTable({ trades }: Props) {
    const [tradeFilter, setTradeFilter] = useState<TradeFilter>("All")
    const [sortField, setSortField] = useState<SortField>("date")
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc")

    const { data: preferences } = useQuery({
        queryKey: ["preferences"],
        queryFn: getUserPreferences,
    })

    const isCompact = Boolean(preferences?.compactView)

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        } else {
            setSortField(field)
            setSortOrder("desc")
        }
    }

    const sortedTrades = useMemo(() => {
        const filteredTrades = trades.filter((trade) => {
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

        return [...filteredTrades].sort((a, b) => {
            let result = 0

            switch (sortField) {
                case "date":
                    result = a.closedAt!.getTime() - b.closedAt!.getTime()
                    break
                case "asset":
                    result = a.symbol.localeCompare(b.symbol)
                    break
                case "amount":
                    result = a.quantity - b.quantity
                    break
                case "pnl":
                    const pnlA = calculatePnL(
                        a.direction as "Long" | "Short",
                        a.exitPrice!,
                        a.entryPrice,
                        a.quantity
                    )

                    const pnlB = calculatePnL(
                        b.direction as "Long" | "Short",
                        b.exitPrice!,
                        b.entryPrice,
                        b.quantity
                    )

                    result = pnlA.pnlAmount - pnlB.pnlAmount
                    break
            }
            return sortOrder === "asc" ? result : -result
        })
    }, [trades, tradeFilter, sortField, sortOrder])

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <TradeHistoryToolbar
                activeFilter={tradeFilter}
                onFilterChange={setTradeFilter}
                isCompact={isCompact}
            />
            <div className="overflow-x-auto">
                <table className="w-full">
                    <TradeHistoryHeader
                        sortField={sortField}
                        sortOrder={sortOrder}
                        onSort={handleSort}
                        isCompact={isCompact}
                    />
                    <TradeHistoryBody
                        trades={sortedTrades}
                        tradeFilter={tradeFilter}
                        isCompact={isCompact}
                    />
                </table>
            </div>
        </div>
    )
}
