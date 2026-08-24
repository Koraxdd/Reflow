"use client"

import { getUserPreferences } from "@/actions/users"
import {
    removeWatchlistItem,
    getWatchlistItems,
    submitWatchlistItem,
} from "@/actions/watchlistItems"
import WatchlistForm from "@/components/forms/WatchlistForm"
import type { WatchlistItem } from "@/generated/prisma/client"
import { useWatchlistPrices } from "@/hooks/useWatchlistPrices"
import { supportedCoins } from "@/lib/supportedCoins"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import WatchlistHeader from "./WatchlistHeader"
import WatchlistTable from "./WatchlistTable"
import { useUserPreferences } from "@/hooks/useUserPreferences"

type Props = {
    initialCoins: WatchlistItem[]
}

export default function Watchlist({ initialCoins }: Props) {
    const [showForm, setShowForm] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const preferences = useUserPreferences()

    const isCompact = Boolean(preferences?.compactView)

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
            <WatchlistHeader
                count={watchlistItems.length}
                showForm={showForm}
                onToggleForm={() => setShowForm((prev) => !prev)}
                isCompact={isCompact}
            />
            {showForm && (
                <WatchlistForm
                    handleClose={() => setShowForm(false)}
                    onAddWatchlistItem={addWatchlistItem}
                    watchlistItems={watchlistItems}
                />
            )}
            <WatchlistTable
                watchlistItems={watchlistItems}
                prices={prices}
                onDelete={deleteWatchlistItem}
                isCompact={isCompact}
            />
        </div>
    )
}
