import type { Trade } from "@/generated/prisma/client"
import { cn } from "@/lib/utils"
import { calculatePnL } from "@/utils/calculatePnL"
import { formatMoney, formatSignedMoney } from "@/utils/formatMoney"
import { format } from "date-fns"
import { LucideArrowRight } from "lucide-react"
import type { TradeFilter } from "./TradeHistoryTable"

type Props = {
    trades: Trade[]
    tradeFilter: TradeFilter
    currency: string
    rate: number
    isCompact: boolean
}

const emptyStateMessages: Record<TradeFilter, string> = {
    All: "No trade history found — completed trades will appear here once you close them.",
    Win: "No winning trades found — trades with positive PnL will show up here.",
    Loss: "No losing trades logged — zero losses so far!",
}

export default function TradeHistoryBody({
    trades,
    tradeFilter,
    currency,
    rate,
    isCompact,
}: Props) {
    return (
        <tbody>
            {trades.length > 0 ? (
                trades.map((trade) => {
                    const { pnlAmount, pnlPercentage } = calculatePnL(
                        trade.direction as "Long" | "Short",
                        trade.exitPrice!,
                        trade.entryPrice,
                        trade.quantity
                    )

                    return (
                        <tr key={trade.id} className="border-t border-border">
                            <td
                                className={cn(
                                    "text-text-muted font-medium",
                                    isCompact
                                        ? "px-3 py-1.5 text-xs"
                                        : "px-5 py-3.5 text-sm"
                                )}
                            >
                                {format(trade.closedAt!, "MMM d")}
                            </td>
                            <td
                                className={cn(
                                    "font-semibold",
                                    isCompact
                                        ? "px-3 py-1.5 text-xs"
                                        : "px-5 py-3.5 text-sm"
                                )}
                            >
                                {trade.symbol}
                            </td>
                            <td
                                className={
                                    isCompact ? "px-3 py-1.5" : "px-5 py-3.5"
                                }
                            >
                                <span
                                    className={cn(
                                        "rounded-full text-xs font-medium",
                                        isCompact
                                            ? "px-1.5 py-px"
                                            : "px-2 py-0.5",
                                        trade.direction === "Long"
                                            ? "bg-neon-green/10 text-neon-green"
                                            : "bg-neon-red/10 text-neon-red"
                                    )}
                                >
                                    {trade.direction}
                                </span>
                            </td>
                            <td
                                className={cn(
                                    "font-semibold",
                                    isCompact
                                        ? "px-3 py-1.5 text-xs"
                                        : "px-5 py-3.5 text-sm"
                                )}
                            >
                                {trade.quantity} {trade.symbol}
                            </td>
                            <td
                                className={cn(
                                    "font-medium text-text-muted",
                                    isCompact
                                        ? "px-3 py-1.5 text-xs"
                                        : "px-5 py-3.5 text-sm"
                                )}
                            >
                                <div className="flex items-center gap-1.5">
                                    {formatMoney(trade.entryPrice)}
                                    <LucideArrowRight className="w-2.75 h-2.75" />
                                    {formatMoney(trade.exitPrice!)}
                                </div>
                            </td>
                            <td
                                className={
                                    isCompact ? "px-3 py-1.5" : "px-5 py-3.5"
                                }
                            >
                                <span
                                    className={cn(
                                        "font-semibold",
                                        isCompact ? "text-xs" : "text-sm",
                                        pnlAmount >= 0
                                            ? "text-neon-green"
                                            : "text-neon-red"
                                    )}
                                >
                                    {formatSignedMoney(
                                        pnlAmount,
                                        currency,
                                        rate
                                    )}
                                </span>
                                <span
                                    className={cn(
                                        "text-xs font-medium ml-1.5",
                                        pnlPercentage >= 0
                                            ? "text-neon-green/70"
                                            : "text-neon-red/70"
                                    )}
                                >
                                    {pnlPercentage >= 0
                                        ? `(+${pnlPercentage.toFixed(2)}%)`
                                        : `(${pnlPercentage.toFixed(2)}%)`}
                                </span>
                            </td>
                        </tr>
                    )
                })
            ) : (
                <tr>
                    <td
                        colSpan={6}
                        className="px-5 py-10 text-center border-t border-border"
                    >
                        <p className="text-text-muted text-sm font-medium">
                            {emptyStateMessages[tradeFilter] ??
                                emptyStateMessages.All}
                        </p>
                    </td>
                </tr>
            )}
        </tbody>
    )
}
