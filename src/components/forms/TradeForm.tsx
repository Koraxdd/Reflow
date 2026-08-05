import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Calendar,
    DollarSign,
    FileText,
    Hash,
    Save,
    TrendingDown,
    TrendingUp,
    X,
} from "lucide-react"
import Button from "../ui/Button"
import { Input } from "../ui/Input"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { calculatePnL } from "@/utils/calculatePnL"
import { format } from "date-fns"
import type { Trade } from "@/generated/prisma/client"
import {
    type TradeInput,
    type TradeOutput,
    TradeSchema,
} from "@/schemas/trade.schema"

type Props = {
    handleClose: () => void
    onAddTrade: (data: TradeOutput) => void
    onEditTrade: (data: { id: string; trade: TradeOutput }) => void
    existingTrade: Trade | null
}

export default function TradeForm({
    handleClose,
    onAddTrade,
    onEditTrade,
    existingTrade,
}: Props) {
    const [tagValue, setTagValue] = useState<string>("")
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        setError,
        formState: { errors, isValid, isSubmitting },
    } = useForm<TradeInput>({
        resolver: zodResolver(TradeSchema),
        defaultValues: existingTrade
            ? {
                  coin: existingTrade.symbol,
                  direction: existingTrade.direction as "Long" | "Short",
                  amount: existingTrade.quantity,
                  entryPrice: existingTrade.entryPrice,
                  exitPrice: existingTrade.exitPrice ?? null,
                  openedAt: format(existingTrade.openedAt, "yyyy-MM-dd"),
                  closedAt: existingTrade.closedAt
                      ? format(existingTrade.closedAt, "yyyy-MM-dd")
                      : "",
                  reflection: existingTrade.notes as string | undefined,
                  tags: existingTrade.tags,
              }
            : {
                  direction: "Long",
                  openedAt: format(new Date(), "yyyy-MM-dd"),
                  tags: [],
              },
    })

    const tags = watch("tags") ?? []
    const direction = watch("direction")
    const entryPrice = watch("entryPrice") as number
    const exitPrice = watch("exitPrice") as number
    const amount = watch("amount") as number

    const handleAddTag = () => {
        const trimmed = tagValue.trim()
        if (!trimmed || tags.includes(trimmed)) return
        setValue("tags", [...tags, trimmed], { shouldValidate: true })
        setTagValue("")
    }

    const handleRemoveTag = (tag: string) => {
        setValue(
            "tags",
            tags.filter((t) => t !== tag),
            { shouldValidate: true }
        )
    }

    const pnl =
        entryPrice && exitPrice && amount
            ? calculatePnL(direction, exitPrice, entryPrice, amount)
            : null

    const onSubmit: SubmitHandler<TradeInput> = (data) => {
        try {
            if (existingTrade) {
                onEditTrade({
                    id: existingTrade.id,
                    trade: TradeSchema.parse(data),
                })
            } else {
                onAddTrade(TradeSchema.parse(data))
            }
            reset()
            handleClose()
        } catch (err) {
            setError("root", { message: "Failed to save trade" })
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card border border-neon-cyan/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,212,255,0.1)] flex flex-col gap-5"
        >
            <div className="flex justify-between">
                <h2 className="text-sm">New Trade Entry</h2>
                <Button
                    type="button"
                    onClick={handleClose}
                    className="hover:opacity-80"
                >
                    <X className="w-4 h-4 text-text-muted" />
                </Button>
            </div>
            <div className="flex flex-col gap-4 justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex flex-col gap-2.5">
                        <label className="font-semibold text-xs text-text-muted flex items-center gap-1">
                            <Hash className="w-3 h-3" /> COIN
                        </label>
                        <Input
                            {...register("coin")}
                            type="text"
                            placeholder="BTC, ETH, SOL..."
                            className="text-foreground font-normal"
                        />
                        {errors.coin && (
                            <span className="text-neon-cyan text-xs">
                                {errors.coin.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-xs text-text-muted">
                            DIRECTION
                        </label>
                        <div className="bg-input rounded-2xl grid grid-cols-2 p-1">
                            <Button
                                type="button"
                                variant="ghost"
                                size="xs"
                                className={cn(
                                    "py-2 rounded-xl",
                                    direction === "Long" &&
                                        "bg-neon-green text-background"
                                )}
                                onClick={() => setValue("direction", "Long")}
                            >
                                ▲ Long
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="xs"
                                className={cn(
                                    "py-2 rounded-xl",
                                    direction === "Short" &&
                                        "bg-neon-red text-background"
                                )}
                                onClick={() => setValue("direction", "Short")}
                            >
                                ▼ Short
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5 col-span-2">
                        <label className="font-semibold text-xs text-text-muted flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> AMOUNT / SIZE
                        </label>
                        <Input
                            {...register("amount")}
                            type="number"
                            step="0.00000001"
                            placeholder="0.00"
                            className="text-foreground font-normal"
                        />
                        {errors.amount && (
                            <span className="text-neon-cyan text-xs">
                                {errors.amount.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 items-center">
                    <div className="flex flex-col gap-2.5">
                        <label className="font-semibold text-xs text-text-muted flex items-center gap-1">
                            <DollarSign className="w-3 h-3" /> ENTRY PRICE
                        </label>
                        <Input
                            {...register("entryPrice")}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="text-foreground font-normal"
                        />
                        {errors.entryPrice && (
                            <span className="text-neon-cyan text-xs">
                                {errors.entryPrice.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div className="text-text-muted flex justify-between items-center gap-1">
                            <label className="text-xs font-semibold flex items-center gap-1">
                                <DollarSign className="w-3 h-3 shrink-0" /> EXIT
                                PRICE
                            </label>
                            <span className="text-xs bg-input px-1.5 py-0.5 font-medium rounded">
                                optional
                            </span>
                        </div>
                        <Input
                            {...register("exitPrice")}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="text-foreground font-normal"
                        />
                        {errors.exitPrice && (
                            <span className="text-neon-cyan text-xs">
                                {errors.exitPrice.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 items-center">
                    <div className="flex flex-col gap-2.5">
                        <label className="font-semibold text-xs text-text-muted flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> OPENED
                        </label>
                        <Input
                            {...register("openedAt")}
                            type="date"
                            className="text-foreground font-normal"
                        />
                    </div>
                    <div className="flex flex-col items gap-2.5">
                        <div className="text-text-muted flex justify-between items-center gap-1">
                            <label className="font-semibold text-xs text-text-muted flex items-center gap-1">
                                <Calendar className="w-3 h-3 shrink-0" /> CLOSED
                            </label>
                            <span className="text-xs bg-input px-1.5 py-0.5 font-medium rounded">
                                optional
                            </span>
                        </div>
                        <Input
                            {...register("closedAt")}
                            type="date"
                            className="text-foreground font-normal"
                        />
                    </div>
                </div>
                {pnl && (
                    <div
                        className={cn(
                            "border flex gap-4 items-center p-3.5 rounded-2xl text-xs",
                            pnl.pnlAmount >= 0
                                ? "bg-neon-green/10 border-neon-green/20"
                                : "bg-neon-red/10 border-neon-red/20"
                        )}
                    >
                        <div className="flex items-center gap-2">
                            {pnl.pnlAmount >= 0 ? (
                                <TrendingUp className="w-3.5 h-3.5 text-neon-green" />
                            ) : (
                                <TrendingDown className="w-3.5 h-3.5 text-neon-red" />
                            )}
                            <span className="text-text-muted font-medium">
                                Estimated P&L
                            </span>
                        </div>
                        <span
                            className={cn(
                                "text-sm font-medium",
                                pnl.pnlAmount >= 0
                                    ? "text-neon-green"
                                    : "text-neon-red"
                            )}
                        >
                            {pnl.pnlAmount >= 0
                                ? `+${pnl.pnlAmount}`
                                : `${pnl.pnlAmount}`}
                        </span>
                        <span
                            className={cn(
                                "text-xs text-text-muted font-medium",
                                pnl.pnlPercentage >= 0
                                    ? "text-neon-green/70"
                                    : "text-neon-red/70"
                            )}
                        >
                            {pnl.pnlPercentage >= 0
                                ? `(+${pnl.pnlPercentage}%)`
                                : `(${pnl.pnlPercentage}%)`}
                        </span>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-xs text-text-muted flex items-center gap-1">
                    <FileText className="w-3 h-3" /> TRADE REFLECTION
                </label>
                <textarea
                    {...register("reflection")}
                    className="bg-input w-full h-30 resize-none rounded-2xl border border-border text-sm px-3 py-2.5 outline-none focus:ring-[0.5px] focus:ring-neon-cyan transition-shadow duration-200"
                    placeholder="Why did you enter this trade? What is your thesis? Risk/reward analysis..."
                />
            </div>
            <div className="flex gap-2">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="font-semibold text-xs text-text-muted">
                        TAGS
                    </label>
                    {tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            {tags.map((tag) => (
                                <Button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    key={tag}
                                    className="flex justify-center items-center gap-1 text-xs text-neon-cyan bg-neon-cyan/10 py-1 px-2.5 rounded-2xl hover:opacity-70"
                                >
                                    {tag}
                                    <X className="w-3 h-3" />
                                </Button>
                            ))}
                        </div>
                    )}
                    <div>
                        <Input
                            type="text"
                            placeholder="Add a tag..."
                            className="text-xs py-2 text-foreground font-normal w-full"
                            value={tagValue}
                            onChange={(e) => setTagValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    handleAddTag()
                                }
                            }}
                        />
                        {errors.root && (
                            <span className="text-neon-cyan text-xs">
                                {errors.root.message}
                            </span>
                        )}
                    </div>
                </div>
                <Button
                    type="button"
                    size="xs"
                    className="bg-input px-3 py-2 rounded-2xl text-text-muted font-medium self-end hover:opacity-80"
                    onClick={handleAddTag}
                >
                    Add
                </Button>
            </div>
            <div className="flex gap-3">
                <Button
                    type="submit"
                    variant="neon"
                    size="sm"
                    className="flex justify-center items-center gap-2 px-4"
                    disabled={!isValid || isSubmitting}
                >
                    <Save className="w-4 h-4" />
                    Save Entry
                </Button>
                <Button
                    type="button"
                    size="sm"
                    className="bg-input px-4 py-2 rounded-2xl text-text-muted hover:opacity-80"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
            </div>
        </form>
    )
}
