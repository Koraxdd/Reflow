"use client"

import Button from "@/components/ui/Button"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import type { SortField, SortOrder } from "./TradeHistoryTable"

type Props = {
    sortField: SortField
    sortOrder: SortOrder
    onSort: (field: SortField) => void
}

export default function TradeHistoryHeader({
    sortField,
    sortOrder,
    onSort,
}: Props) {
    const renderSortIcon = (field: SortField) => {
        if (sortField !== field) {
            return <ArrowUpDown className="w-3.5 h-3.5 opacity-30" />
        }
        if (sortOrder === "desc") {
            return <ArrowDown className="w-3.5 h-3.5 text-neon-cyan" />
        } else {
            return <ArrowUp className="w-3.5 h-3.5 text-neon-cyan" />
        }
    }

    return (
        <thead>
            <tr>
                <th className="px-5 py-1.5 text-left">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-base font-medium gap-1 hover:opacity-80"
                        onClick={() => onSort("date")}
                    >
                        Date
                        {renderSortIcon("date")}
                    </Button>
                </th>
                <th className="px-5 py-1 text-left">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-base font-medium gap-1 hover:opacity-80"
                        onClick={() => onSort("asset")}
                    >
                        Asset
                        {renderSortIcon("asset")}
                    </Button>
                </th>
                <th className="px-5 py-1 text-left text-base font-medium text-text-muted">
                    Type
                </th>
                <th className="px-5 py-1 text-left">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-base font-medium gap-1 hover:opacity-80"
                        onClick={() => onSort("amount")}
                    >
                        Amount
                        {renderSortIcon("amount")}
                    </Button>
                </th>
                <th className="px-5 py-1 text-left text-base font-medium text-text-muted">
                    Entry / Exit
                </th>
                <th className="px-5 py-1 text-left">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-base font-medium gap-1 hover:opacity-80"
                        onClick={() => onSort("pnl")}
                    >
                        P&L
                        {renderSortIcon("pnl")}
                    </Button>
                </th>
            </tr>
        </thead>
    )
}
