"use client"

import { fetchPriceHistory } from "@/actions/prices"
import type { WatchlistItem } from "@/generated/prisma/client"
import { formatMoney } from "@/utils/formatMoney"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { useState } from "react"
import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import Button from "../ui/Button"
import { cn } from "@/lib/utils"
import { getCoinColour } from "@/utils/getCoinColour"

type Props = {
    watchlistItems: WatchlistItem[]
}

export default function PriceChart({ watchlistItems }: Props) {
    const [selectedCoin, setSelectedCoin] = useState<WatchlistItem>(
        watchlistItems[0] ?? null
    )

    const currentColour = getCoinColour(selectedCoin.symbol)

    const { data: prices } = useQuery({
        queryKey: ["priceHistory", selectedCoin.symbol],
        queryFn: () => fetchPriceHistory(selectedCoin),
        enabled: !!selectedCoin.symbol,
    })

    return (
        <div className="bg-card border border-border rounded-2xl p-5 md:col-span-2">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Price Chart</h3>
                <div className="flex rounded-lg p-1 bg-input">
                    {watchlistItems.map((item) => {
                        const isActive = selectedCoin.symbol === item.symbol
                        return (
                            <Button
                                key={item.id}
                                size="xs"
                                variant="ghost"
                                className={cn(
                                    "rounded-md px-3 py-1",
                                    isActive && "text-background"
                                )}
                                onClick={() => setSelectedCoin(item)}
                                style={
                                    isActive
                                        ? { backgroundColor: currentColour }
                                        : undefined
                                }
                            >
                                {item.symbol}
                            </Button>
                        )
                    })}
                </div>
            </div>
            <div className="w-full h-55">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={prices}
                        accessibilityLayer={false}
                        margin={{ top: 30, left: 30, right: 15 }}
                    >
                        <XAxis
                            dataKey="openTime"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(tick) =>
                                format(new Date(tick), "HH:mm")
                            }
                            fontSize={12}
                            stroke="#64748b"
                        />
                        <YAxis
                            dataKey="price"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(tick) => formatMoney(tick)}
                            fontSize={12}
                            stroke="#64748b"
                            domain={["auto", "auto"]}
                        />
                        <Line
                            dataKey="price"
                            type="monotone"
                            stroke={currentColour}
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 4.5 }}
                        />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
