"use client"

import Button from "@/components/ui/Button"
import { Trade } from "@/generated/prisma/client"
import { cn } from "@/lib/utils"
import { BookOpen } from "lucide-react"

type Props = {
    data: Trade
}

export default function TradeCard({ data }: Props) {
    const { quantity, symbol, direction, notes, tags, entryPrice } = data

    return (
        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <span
                        className={cn(
                            "font-semibold text-xs p-3 rounded-2xl",
                            direction === "Long"
                                ? "text-neon-green bg-neon-green/10"
                                : "text-neon-red bg-neon-red/10"
                        )}
                    >
                        {symbol}
                    </span>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2">
                            <span className="font-semibold text-sm">
                                {symbol}
                            </span>
                            <span
                                className={cn(
                                    "rounded-full text-xs flex items-center justify-center font-semibold px-2",
                                    direction === "Long"
                                        ? "text-neon-green bg-neon-green/10"
                                        : "text-neon-red bg-neon-red/10"
                                )}
                            >
                                {direction === "Long" ? "Buy" : "Sell"}
                            </span>
                        </div>
                        <span className="text-xs text-text-muted">
                            {"Aug 3, 2026"}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-end [word-spacing:5px]">
                    <span className="text-sm font-medium">
                        {quantity} {symbol}
                    </span>
                    <span className="text-xs text-text-muted font-medium">
                        @ ${entryPrice}
                    </span>
                </div>
            </div>
            <div className="bg-input flex gap-2 p-2 text-text-muted text-xs rounded-xl font-medium">
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>{notes}</span>
            </div>
            <div className="flex gap-2 flex-wrap">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="flex justify-center items-center gap-1 text-xs text-neon-cyan bg-neon-cyan/10 py-1 px-2.5 rounded-2xl"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <Button
                    variant="ghost"
                    size="xs"
                    className="bg-input px-2.5 py-1.5 rounded-xl"
                >
                    Edit
                </Button>
                <Button
                    variant="ghost"
                    size="xs"
                    className="bg-input px-2.5 py-1.5 rounded-xl"
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}
