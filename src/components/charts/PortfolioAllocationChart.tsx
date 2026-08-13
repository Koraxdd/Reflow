"use client"

import type { Trade } from "@/generated/prisma/client"
import { usePortfolioAllocation } from "@/hooks/usePortfolioAllocation"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import CustomTooltip from "./CustomTooltip"
import { getCoinColour } from "@/utils/getCoinColour"
import { cn } from "@/lib/utils"

type Props = {
    trades: Trade[]
}

export default function PortfolioAllocationChart({ trades }: Props) {
    const data = usePortfolioAllocation(trades)
    const showChart = data.length > 0

    return (
        <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-sm font-medium">Allocation</h3>
            <div
                className={cn(
                    "w-full h-55",
                    !showChart && "flex items-center justify-center h-70"
                )}
            >
                {showChart ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart accessibilityLayer={false}>
                            <Pie
                                data={data}
                                dataKey={"value"}
                                nameKey={"symbol"}
                                stroke="none"
                                outerRadius={80}
                                innerRadius={55}
                            >
                                {data.map((coin) => (
                                    <Cell
                                        key={coin.symbol}
                                        fill={getCoinColour(coin.symbol)}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="text-center text-text-muted text-sm font-medium">
                        <span>
                            No active positions — Place a trade to view your
                            portfolio breakdown.
                        </span>
                    </div>
                )}
            </div>
            {showChart && (
                <div className="flex flex-col gap-2.5">
                    {data.map((coin) => (
                        <div key={coin.symbol} className="flex justify-between">
                            <div className="flex items-center gap-1.5">
                                <div
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{
                                        backgroundColor: getCoinColour(
                                            coin.symbol
                                        ),
                                    }}
                                />
                                <span className="text-xs text-text-muted">
                                    {coin.symbol}
                                </span>
                            </div>
                            <span className="text-xs">{`${coin.percentage.toFixed(1)}%`}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
