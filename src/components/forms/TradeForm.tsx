import { z } from "zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, X } from "lucide-react"
import Button from "../ui/Button"
import { Input } from "../ui/Input"
import { cn } from "@/lib/utils"
import { useState } from "react"

type Props = {
    handleClose: () => void
}

const TradeSchema = z.object({
    coin: z
        .string()
        .min(3, "Symbol must be 3 characters")
        .max(3, "Symbol must be 3 characters"),
    openedAt: z.coerce.date(),
    closedAt: z.coerce.date().optional(),
    direction: z.enum(["Long", "Short"]),
    amount: z.coerce.number().positive("Amount must be greater than 0"),
    entryPrice: z.coerce
        .number()
        .positive("Entry price must be greater than 0"),
    exitPrice: z.coerce
        .number()
        .positive("Exit price must be greater than 0")
        .optional(),
    reflection: z.string().optional(),
    tags: z.array(z.string()).optional(),
})

type TradeInput = z.input<typeof TradeSchema>

export default function TradeForm({ handleClose }: Props) {
    const [tagValue, setTagValue] = useState<string>("")
    const [tags, setTags] = useState<string[]>([])

    const handleAddTag = () => {
        const trimmed = tagValue.trim()
        if (!trimmed) return
        if (tags.includes(trimmed)) return
        setTags((prev) => [...prev, trimmed])
        setTagValue("")
    }

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        setError,
        formState: { errors },
    } = useForm<TradeInput>({
        resolver: zodResolver(TradeSchema),
        defaultValues: { direction: "Long" },
    })

    const direction = watch("direction")

    const onSubmit: SubmitHandler<TradeInput> = async (data) => {
        try {
        } catch (err) {
            throw new Error(`Unexpected error: ${err}`)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card border border-neon-cyan/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,212,255,0.1)] flex flex-col gap-5"
        >
            <div className="flex justify-between">
                <h2 className="text-sm">New Trade Entry</h2>
                <Button type="button" onClick={handleClose}>
                    <X className="w-4 h-4 text-text-muted" />
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-center">
                <Input
                    {...register("coin")}
                    type="text"
                    label="COIN"
                    placeholder="BTC, ETH, SOL..."
                    className="text-foreground font-normal"
                />
                <Input
                    {...register("amount")}
                    type="number"
                    label="AMOUNT"
                    placeholder="0.00"
                    className="text-foreground font-normal"
                />
                <div className="flex flex-col gap-2 col-span-2">
                    <label className="font-semibold text-xs text-text-muted">
                        TYPE
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
                            Buy
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
                            Sell
                        </Button>
                    </div>
                </div>
                <Input
                    {...register("openedAt")}
                    type="date"
                    label="OPENED AT"
                    className="text-foreground font-normal"
                />
                <Input
                    {...register("closedAt")}
                    type="date"
                    label="CLOSED AT"
                    className="text-foreground font-normal"
                />
                <Input
                    {...register("entryPrice")}
                    type="number"
                    label="ENTRY PRICE (USD)"
                    placeholder="0.00"
                    className="text-foreground font-normal"
                />
                <Input
                    {...register("exitPrice")}
                    type="number"
                    label="EXIT PRICE (USD)"
                    placeholder="0.00"
                    className="text-foreground font-normal"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-xs text-text-muted">
                    TRADE REFLECTION
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
                                <div
                                    key={tag}
                                    className="flex justify-center items-center gap-1 text-xs text-neon-cyan bg-neon-cyan/10 py-1 px-2.5 rounded-2xl"
                                >
                                    {tag}
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            setTags((prev) =>
                                                prev.filter((t) => t !== tag)
                                            )
                                        }
                                    >
                                        <X className="w-3 h-3" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
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
                </div>
                <Button
                    type="button"
                    size="xs"
                    className="bg-input px-3 py-2 rounded-2xl text-text-muted font-medium self-end"
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
                >
                    <Save className="w-4 h-4" />
                    Save Entry
                </Button>
                <Button
                    type="button"
                    size="sm"
                    className="bg-input px-4 py-2 rounded-2xl text-text-muted"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
            </div>
        </form>
    )
}
