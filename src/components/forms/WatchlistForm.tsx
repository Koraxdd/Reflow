"use client"

import { Search } from "lucide-react"
import Button from "../ui/Button"
import { Input } from "../ui/Input"
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

type Props = {
    handleClose: () => void
    onAddWatchlistItem: (data: WatchlistInput) => void
}

export default function WatchlistForm({
    handleClose,
    onAddWatchlistItem,
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
            onAddWatchlistItem(data)
            reset()
            handleClose()
        } catch (err) {
            setError("root", { message: "Failed to add watchlist item" })
        }
    }

    const onInvalid: SubmitErrorHandler<WatchlistInput> = (errors) => {
        setError("root", {
            message: errors.symbol?.message || errors.name?.message,
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="border-b border-border px-5 py-4 bg-dark-blue flex flex-col gap-2.5"
        >
            <div className="flex gap-3 items-end">
                <Input
                    {...register("symbol")}
                    label="Ticker Symbol"
                    type="text"
                    placeholder="BTC"
                    className="text-foreground h-8 text-xs font-normal"
                />
                <Input
                    {...register("name")}
                    label="Asset Name"
                    type="text"
                    placeholder="Bitcoin"
                    className="text-foreground h-8 text-xs font-normal"
                />
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
