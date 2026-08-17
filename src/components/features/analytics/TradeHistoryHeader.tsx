"use client"

import Button from "@/components/ui/Button"
import { ArrowUpDown } from "lucide-react"

export default function TradeHistoryHeader() {
    return (
        <thead>
            <tr>
                <th className="px-5 py-1.5 text-left">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-base font-medium gap-1 hover:opacity-80"
                    >
                        Date
                        <ArrowUpDown className="w-3.5 h-3.5 opacity-30" />
                    </Button>
                </th>
                <th className="px-5 py-1 text-left">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-base font-medium gap-1 hover:opacity-80"
                    >
                        Asset
                        <ArrowUpDown className="w-3.5 h-3.5 opacity-30" />
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
                    >
                        Amount
                        <ArrowUpDown className="w-3.5 h-3.5 opacity-30" />
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
                    >
                        P&L
                        <ArrowUpDown className="w-3.5 h-3.5 opacity-30" />
                    </Button>
                </th>
            </tr>
        </thead>
    )
}
