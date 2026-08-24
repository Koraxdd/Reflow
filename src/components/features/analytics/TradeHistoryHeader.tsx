"use client"

import Button from "@/components/ui/Button"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import type { SortField, SortOrder } from "./TradeHistoryTable"
import { cn } from "@/lib/utils"
import { tradeHistoryColumns } from "@/lib/tradeHistoryColumns"

type Props = {
    sortField: SortField
    sortOrder: SortOrder
    onSort: (field: SortField) => void
    isCompact: boolean
}

export default function TradeHistoryHeader({
    sortField,
    sortOrder,
    onSort,
    isCompact,
}: Props) {
    const renderSortIcon = (field: SortField) => {
        const iconSize = isCompact ? "w-3 h-3" : "w-3.5 h-3.5"

        if (sortField !== field) {
            return <ArrowUpDown className={cn(iconSize, "opacity-30")} />
        }
        if (sortOrder === "desc") {
            return <ArrowDown className={cn(iconSize, "text-neon-cyan")} />
        } else {
            return <ArrowUp className={cn(iconSize, "text-neon-cyan")} />
        }
    }

    return (
        <thead>
            <tr>
                {tradeHistoryColumns.map(({ label, field }) => (
                    <th
                        key={label}
                        className={cn(
                            "text-left",
                            isCompact ? "px-3 py-1.5" : "px-5 py-1.5"
                        )}
                    >
                        {field ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "flex items-center font-medium gap-1 hover:opacity-80",
                                    isCompact ? "text-xs" : "text-base"
                                )}
                                onClick={() => onSort(field)}
                            >
                                {label}
                                {renderSortIcon(field)}
                            </Button>
                        ) : (
                            <span
                                className={cn(
                                    "text-text-muted font-medium flex items-center",
                                    isCompact ? "text-xs" : "text-base"
                                )}
                            >
                                {label}
                            </span>
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    )
}
