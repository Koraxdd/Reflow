"use client"

import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"
import TradeHistoryHeader from "./TradeHistoryHeader"
import TradeHistoryBody from "./TradeHistoryBody"
import type { Trade } from "@/generated/prisma/client"

type Props = {
    trades: Trade[]
}

type TradeFilter = "All" | "Win" | "Loss"

export default function TradeHistoryTable({ trades }: Props) {
    const [tradeFilter, setTradeFilter] = useState<TradeFilter>("All")
    const closedTrades = useMemo(
        () => trades.filter((trade) => trade.closedAt && trade.exitPrice),
        [trades]
    )

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 flex justify-between items-center border-b border-border">
                <h3 className="text-sm">Trade History</h3>
                <div className="rounded-lg p-1 bg-input">
                    <Button
                        variant="ghost"
                        size="xs"
                        className={cn(
                            "rounded-md px-3 py-1.5",
                            tradeFilter === "All" &&
                                "bg-neon-cyan/10 text-neon-cyan"
                        )}
                        onClick={() => setTradeFilter("All")}
                    >
                        All
                    </Button>
                    <Button
                        variant="ghost"
                        size="xs"
                        className={cn(
                            "rounded-md px-3 py-1.5",
                            tradeFilter === "Win" &&
                                "bg-neon-green/10 text-neon-green"
                        )}
                        onClick={() => setTradeFilter("Win")}
                    >
                        Win
                    </Button>
                    <Button
                        variant="ghost"
                        size="xs"
                        className={cn(
                            "rounded-md px-3 py-1.5",
                            tradeFilter === "Loss" &&
                                "bg-neon-red/10 text-neon-red"
                        )}
                        onClick={() => setTradeFilter("Loss")}
                    >
                        Loss
                    </Button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <TradeHistoryHeader />
                    <TradeHistoryBody trades={closedTrades} />
                </table>
            </div>
        </div>
    )
}
