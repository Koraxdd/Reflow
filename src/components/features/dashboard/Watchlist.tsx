"use client"

import {
    removeWatchlistItem,
    getWatchlistItems,
    submitWatchlistItem,
} from "@/actions/watchlistItems"
import WatchlistForm from "@/components/forms/WatchlistForm"
import Button from "@/components/ui/Button"
import type { WatchlistItem } from "@/generated/prisma/client"
import { useWatchlistPrices } from "@/hooks/useWatchlistPrices"
import { supportedCoins } from "@/lib/supportedCoins"
import { cn } from "@/lib/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Plus, TrendingDown, TrendingUp, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type Props = {
    initialCoins: WatchlistItem[]
}

export default function Watchlist({ initialCoins }: Props) {
    const [showWatchlistForm, setShowWatchlistForm] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const { data: watchlistItems } = useQuery({
        queryKey: ["watchlistItems"],
        queryFn: getWatchlistItems,
        initialData: initialCoins,
    })

    const { mutate: addWatchlistItem } = useMutation({
        mutationFn: submitWatchlistItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["watchlistItems"] })
        },
    })

    const { mutate: deleteWatchlistItem } = useMutation({
        mutationFn: removeWatchlistItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["watchlistItems"] })
        },
    })

    const symbols = watchlistItems
        .map(
            (item) =>
                supportedCoins.find((coin) => coin.symbol === item.symbol)
                    ?.binanceSymbol
        )
        .filter((s): s is string => Boolean(s))

    const prices = useWatchlistPrices(symbols)

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2.5 font-medium">
                    <span className="text-sm">Watchlist</span>
                    <span className="bg-input rounded-full text-xs text-text-muted px-2 py-0.5">
                        {watchlistItems.length}
                    </span>
                </div>
                {!showWatchlistForm ? (
                    <Button
                        variant="neon"
                        size="xs"
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 active:scale-95"
                        onClick={() => setShowWatchlistForm(true)}
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Add Asset
                    </Button>
                ) : (
                    <Button
                        variant="ghost"
                        size="xs"
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-input hover:opacity-80 active:scale-95 rounded-2xl"
                        onClick={() => setShowWatchlistForm(false)}
                    >
                        <X className="w-3.5 h-3.5" />
                        Cancel
                    </Button>
                )}
            </div>
            {showWatchlistForm && (
                <WatchlistForm
                    handleClose={() => setShowWatchlistForm(false)}
                    onAddWatchlistItem={addWatchlistItem}
                    watchlistItems={watchlistItems}
                />
            )}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 text-xs text-left text-text-muted font-medium">
                                Asset
                            </th>
                            <th className="px-5 py-3 text-xs text-left text-text-muted font-medium">
                                Price
                            </th>
                            <th className="px-5 py-3 text-xs text-left text-text-muted font-medium">
                                24h Change
                            </th>
                            <th className="px-5 py-3 text-xs text-left text-text-muted font-medium">
                                Volume
                            </th>
                            <th className="px-5 py-3 text-xs text-left text-text-muted font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {watchlistItems.length > 0 ? (
                            watchlistItems.map((item) => {
                                const coin = supportedCoins.find(
                                    (coin) => coin.symbol === item.symbol
                                )
                                if (!coin) return null
                                const live =
                                    prices[coin.binanceSymbol.toUpperCase()]

                                return (
                                    <tr
                                        key={item.id}
                                        className="border-t border-border"
                                    >
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={coin.logo}
                                                    width={24}
                                                    height={24}
                                                    alt={`${coin.name} logo`}
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">
                                                        {coin.symbol}
                                                    </span>
                                                    <span className="text-xs text-text-muted">
                                                        {coin.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            className={cn(
                                                "px-5 py-3.5 text-sm font-medium",
                                                !live &&
                                                    "text-text-muted font-light"
                                            )}
                                        >
                                            {live ? `$${live.price}` : "—"}
                                        </td>
                                        <td
                                            className={cn(
                                                "px-5 py-3.5 text-sm",
                                                live &&
                                                    live.changePercentage >= 0
                                                    ? "text-neon-green"
                                                    : "text-neon-red"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "flex items-center gap-1 font-medium",
                                                    !live &&
                                                        "text-text-muted font-light"
                                                )}
                                            >
                                                {live &&
                                                    (live.changePercentage >=
                                                    0 ? (
                                                        <TrendingUp className="w-3.5 h-3.5" />
                                                    ) : (
                                                        <TrendingDown className="w-3.5 h-3.5" />
                                                    ))}
                                                {live
                                                    ? `${live.changePercentage.toFixed(
                                                          2
                                                      )}%`
                                                    : "—"}
                                            </div>
                                        </td>
                                        <td
                                            className={cn(
                                                "px-5 py-3.5 text-sm text-text-muted font-medium",
                                                !live && "font-light"
                                            )}
                                        >
                                            {live
                                                ? live.volume.toFixed(2)
                                                : "—"}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <Button
                                                className="text-text-muted hover:bg-neon-red/10 hover:text-neon-red w-6 h-6 rounded-full flex justify-center items-center"
                                                onClick={() =>
                                                    deleteWatchlistItem(item.id)
                                                }
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-5 py-10 text-center border-t border-border"
                                >
                                    <p className="text-sm text-text-muted font-medium">
                                        Your watchlist is empty — add an asset
                                        above.
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
