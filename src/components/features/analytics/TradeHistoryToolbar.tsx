"use client"

import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import type { TradeFilter } from "./TradeHistoryTable"

type Props = {
    activeFilter: "All" | "Win" | "Loss"
    onFilterChange: (filter: TradeFilter) => void
}

export default function TradeHistoryToolbar({
    activeFilter,
    onFilterChange,
}: Props) {
    return (
        <div className="px-5 py-3.5 flex justify-between items-center border-b border-border">
            <h3 className="text-sm">Trade History</h3>
            <div className="rounded-lg p-1 bg-input">
                <Button
                    variant="ghost"
                    size="xs"
                    className={cn(
                        "rounded-md px-3 py-1.5",
                        activeFilter === "All" &&
                            "bg-neon-cyan/10 text-neon-cyan"
                    )}
                    onClick={() => onFilterChange("All")}
                >
                    All
                </Button>
                <Button
                    variant="ghost"
                    size="xs"
                    className={cn(
                        "rounded-md px-3 py-1.5",
                        activeFilter === "Win" &&
                            "bg-neon-green/10 text-neon-green"
                    )}
                    onClick={() => onFilterChange("Win")}
                >
                    Win
                </Button>
                <Button
                    variant="ghost"
                    size="xs"
                    className={cn(
                        "rounded-md px-3 py-1.5",
                        activeFilter === "Loss" &&
                            "bg-neon-red/10 text-neon-red"
                    )}
                    onClick={() => onFilterChange("Loss")}
                >
                    Loss
                </Button>
            </div>
        </div>
    )
}
