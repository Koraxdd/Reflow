"use client"

import { useState } from "react"
import TradeHistoryHeader from "./TradeHistoryHeader"
import TradeHistoryBody from "./TradeHistoryBody"
import type { Trade } from "@/generated/prisma/client"
import TradeHistoryToolbar from "./TradeHistoryToolbar"
import { useUserPreferences } from "@/hooks/useUserPreferences"
import { useExchangeRate } from "@/hooks/useExchangeRate"
import { useTrades } from "@/hooks/useTrades"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { getPaginatedTradeHistory } from "@/actions/trades"

type Props = {
    initialTrades: Trade[]
}

export type TradeFilter = "All" | "Win" | "Loss"
export type SortField = "date" | "asset" | "amount" | "pnl"
export type SortOrder = "asc" | "desc"

export default function TradeHistoryTable({ initialTrades }: Props) {
    const [tradeFilter, setTradeFilter] = useState<TradeFilter>("All")
    const [sortField, setSortField] = useState<SortField>("date")
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
    const [page, setPage] = useState<number>(1)
    const { trades, totalPages } = useTrades(
        page,
        initialTrades,
        getPaginatedTradeHistory,
        { tradeFilter, sortField, sortOrder }
    )

    const preferences = useUserPreferences()
    const currency = preferences?.baseCurrency ?? "USD"
    const rate = useExchangeRate(currency)

    const isCompact = Boolean(preferences?.compactView)

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            setPage(1)
        } else {
            setSortField(field)
            setSortOrder("desc")
            setPage(1)
        }
    }

    return (
        <>
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
                            trades={trades}
                            tradeFilter={tradeFilter}
                            currency={currency}
                            rate={rate}
                            isCompact={isCompact}
                        />
                    </table>
                </div>
            </div>
            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-border gap-2 pt-4 mt-2">
                    <span className="text-sm text-text-muted font-medium">
                        Page {page} of {totalPages}
                    </span>
                    <div className="flex items-center gap-10 text-text-muted">
                        <Button
                            size="sm"
                            disabled={page === 1}
                            onClick={() => {
                                setPage((prev) => prev - 1)
                            }}
                            className={cn(
                                "flex items-center gap-1",
                                page !== 1 && "hover:opacity-80"
                            )}
                        >
                            <ChevronLeft className="w-4.5 h-4.5" />
                            Previous
                        </Button>
                        <Button
                            size="sm"
                            disabled={page === totalPages}
                            onClick={() => {
                                setPage((prev) => prev + 1)
                            }}
                            className={cn(
                                "flex items-center gap-1",
                                page !== totalPages && "hover:opacity-80"
                            )}
                        >
                            Next
                            <ChevronRight className="w-4.5 h-4.5" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}
