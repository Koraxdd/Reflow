"use client"

import type { Trade } from "@/generated/prisma/client"
import { usePortfolioAllocation } from "@/hooks/usePortfolioAllocation"
import { Cell, Pie, PieChart, Tooltip } from "recharts"
import CustomTooltip from "./CustomTooltip"

type Props = {
    trades: Trade[]
}

export default function PortfolioAllocationChart({ trades }: Props) {
    const data = usePortfolioAllocation(trades)

    const colours = ["#f59e0b", "#00d4ff", "#00e676", "#a855f7", "#ff4d6d"]

    return (
        <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="text-sm font-medium">Allocation</h3>
            <PieChart width="100%" height={200} accessibilityLayer={false}>
                <Pie
                    data={data}
                    dataKey={"value"}
                    nameKey={"symbol"}
                    stroke="none"
                    outerRadius={85}
                    innerRadius={55}
                >
                    {data.map((coin, index) => (
                        <Cell
                            key={coin.symbol}
                            fill={colours[index % colours.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
            <div className="flex flex-col gap-2.5">
                {data.map((coin, index) => (
                    <div key={coin.symbol} className="flex justify-between">
                        <div className="flex items-center gap-1.5">
                            <div
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{
                                    backgroundColor:
                                        colours[index % colours.length],
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
        </div>
    )
}
