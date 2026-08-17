import type { Trade } from "@/generated/prisma/client"
import { cn } from "@/lib/utils"
import { calculatePnL } from "@/utils/calculatePnL"
import { formatMoney, formatSignedMoney } from "@/utils/formatMoney"
import { format } from "date-fns"
import { LucideArrowRight } from "lucide-react"

type Props = {
    trades: Trade[]
}

export default function TradeHistoryBody({ trades }: Props) {
    return (
        <tbody>
            {trades.map((trade) => {
                const { pnlAmount, pnlPercentage } = calculatePnL(
                    trade.direction as "Long" | "Short",
                    trade.exitPrice!,
                    trade.entryPrice,
                    trade.quantity
                )

                return (
                    <tr key={trade.id} className="border-t border-border">
                        <td className="px-5 py-3.5 text-sm text-text-muted font-medium">
                            {format(trade.closedAt!, "MMM d")}
                        </td>
                        <td className="px-5 py-3.5 text-sm font-semibold">
                            {trade.symbol}
                        </td>
                        <td className="px-5 py-3.5">
                            <span
                                className={cn(
                                    "px-2 py-0.5 rounded-full text-xs font-medium",
                                    trade.direction === "Long"
                                        ? "bg-neon-green/10 text-neon-green"
                                        : "bg-neon-red/10 text-neon-red"
                                )}
                            >
                                {trade.direction}
                            </span>
                        </td>
                        <td className="px-5 py-3.5 text-sm font-semibold">
                            {trade.quantity} {trade.symbol}
                        </td>
                        <td className="px-5 py-3.5 text-sm font-medium text-text-muted flex items-center gap-1.5">
                            {formatMoney(trade.entryPrice)}
                            <LucideArrowRight className="w-2.75 h-2.75" />
                            {formatMoney(trade.exitPrice!)}
                        </td>
                        <td className="px-5 py-3.5">
                            <span
                                className={cn(
                                    "text-sm font-semibold",
                                    pnlAmount >= 0
                                        ? "text-neon-green"
                                        : "text-neon-red"
                                )}
                            >
                                {formatSignedMoney(pnlAmount)}
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
                                    ? `(+${pnlPercentage.toFixed(2)})`
                                    : `(${pnlPercentage.toFixed(2)})`}
                            </span>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )
}
