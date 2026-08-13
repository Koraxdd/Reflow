"use client"

import { fetchPriceHistory } from "@/actions/prices"
import type { WatchlistItem } from "@/generated/prisma/client"
import { formatMoney } from "@/utils/formatMoney"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { useEffect, useState } from "react"
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
import { getWatchlistItems } from "@/actions/watchlistItems"

type Props = {
    initialWatchlistItems: WatchlistItem[]
}

export default function PriceChart({ initialWatchlistItems }: Props) {
    const { data: watchlistItems } = useQuery({
        queryKey: ["watchlistItems"],
        queryFn: getWatchlistItems,
        initialData: initialWatchlistItems,
    })

    const [selectedSymbol, setSelectedSymbol] = useState<string>(
        watchlistItems[0]?.symbol ?? ""
    )

    const { data: prices } = useQuery({
        queryKey: ["priceHistory", selectedSymbol],
        queryFn: () => fetchPriceHistory(selectedSymbol),
        enabled: !!selectedSymbol,
    })

    useEffect(() => {
        if (!watchlistItems.length) {
            setSelectedSymbol("")
            return
        }

        const symbolExists = watchlistItems.some(
            (item) => item.symbol === selectedSymbol
        )
        if (!symbolExists) {
            setSelectedSymbol(watchlistItems[0]?.symbol ?? "")
        }
    }, [watchlistItems, selectedSymbol])

    const currentColour = selectedSymbol
        ? getCoinColour(selectedSymbol)
        : "#64748b"

    const showChart = Boolean(selectedSymbol && prices && prices?.length > 0)

    return (
        <div className="bg-card border border-border rounded-2xl p-5 md:col-span-2">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Price Chart</h3>
                {watchlistItems.length > 0 && (
                    <div className="flex rounded-lg p-1 bg-input">
                        {watchlistItems.map((item) => {
                            const isActive = selectedSymbol === item.symbol
                            return (
                                <Button
                                    key={item.id}
                                    size="xs"
                                    variant="ghost"
                                    className={cn(
                                        "rounded-md px-3 py-1",
                                        isActive && "text-background"
                                    )}
                                    onClick={() =>
                                        setSelectedSymbol(item.symbol)
                                    }
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
                )}
            </div>
            <div
                className={cn(
                    "w-full h-55",
                    !showChart && "flex items-center justify-center h-70"
                )}
            >
                {showChart ? (
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
                ) : (
                    <div className="text-center text-text-muted text-sm font-medium">
                        <span>
                            No assets in the watchlist — add an asset to display
                            its price history.
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
