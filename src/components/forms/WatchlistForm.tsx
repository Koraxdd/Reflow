"use client"

import { Search } from "lucide-react"
import Button from "../ui/Button"
import {
    type SubmitErrorHandler,
    useForm,
    type SubmitHandler,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    type WatchlistInput,
    WatchlistSchema,
} from "@/schemas/watchlist.schema"
import { supportedCoins } from "@/lib/supportedCoins"
import type { WatchlistItem } from "@/generated/prisma/client"

type Props = {
    handleClose: () => void
    onAddWatchlistItem: (data: { symbol: string; name: string }) => void
    watchlistItems: WatchlistItem[]
}

export default function WatchlistForm({
    handleClose,
    onAddWatchlistItem,
    watchlistItems,
}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<WatchlistInput>({
        resolver: zodResolver(WatchlistSchema),
    })

    const onSubmit: SubmitHandler<WatchlistInput> = (data) => {
        try {
            const coin = supportedCoins.find((c) => c.symbol === data.symbol)
            if (!coin) return
            onAddWatchlistItem({ symbol: coin.symbol, name: coin.name })
            reset()
            handleClose()
        } catch (err) {
            setError("root", { message: "Failed to add watchlist item" })
        }
    }

    const onInvalid: SubmitErrorHandler<WatchlistInput> = (errors) => {
        setError("root", {
            message: errors.symbol?.message,
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="border-b border-border px-5 py-4 bg-dark-blue flex flex-col gap-2.5"
        >
            <div className="flex items-center gap-3 flex-1">
                <select
                    {...register("symbol")}
                    className="border border-border bg-input rounded-2xl text-sm px-3 py-2 outline-none flex-1"
                >
                    <option value="">Select a coin...</option>
                    {supportedCoins
                        .filter(
                            (coin) =>
                                !watchlistItems.some(
                                    (item) => item.symbol === coin.symbol
                                )
                        )
                        .map((coin) => (
                            <option key={coin.symbol} value={coin.symbol}>
                                {coin.symbol} {coin.name}
                            </option>
                        ))}
                </select>
                <Button
                    type="submit"
                    variant="neon"
                    size="xs"
                    className="flex items-center justify-center gap-1 px-4 py-2 active:scale-95 h-8"
                >
                    <Search className="w-3.5 h-3.5" />
                    Add
                </Button>
            </div>
            {errors.root && (
                <span className="text-neon-cyan text-xs">
                    {errors.root.message}
                </span>
            )}
        </form>
    )
}
