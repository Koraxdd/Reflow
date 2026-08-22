"use client"

import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import type { TradeFilter } from "./TradeHistoryTable"
import { tradeHistoryFilters } from "@/lib/tradeHistoryFilters"

type Props = {
    activeFilter: "All" | "Win" | "Loss"
    onFilterChange: (filter: TradeFilter) => void
    isCompact: boolean
}

export default function TradeHistoryToolbar({
    activeFilter,
    onFilterChange,
    isCompact,
}: Props) {
    return (
        <div
            className={cn(
                "flex justify-between items-center border-b border-border",
                isCompact ? "px-3 py-2" : "px-5 py-3.5"
            )}
        >
            <h3 className={isCompact ? "text-xs" : "text-sm"}>Trade History</h3>
            <div
                className={cn(
                    "rounded-lg bg-input flex items-center",
                    isCompact ? "p-0.5" : "p-1"
                )}
            >
                {tradeHistoryFilters.map((filter) => (
                    <Button
                        key={filter.label}
                        variant="ghost"
                        size="xs"
                        className={cn(
                            "rounded-md",
                            isCompact ? "px-2 py-0.5" : "px-3 py-1.5",
                            activeFilter === filter.label && filter.activeClass
                        )}
                        onClick={() => onFilterChange(filter.label)}
                    >
                        {filter.label}
                    </Button>
                ))}
            </div>
        </div>
    )
}
