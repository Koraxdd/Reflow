import { cn } from "@/lib/utils"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

type Props = {
    title: string
    value: string | number
    change: {
        value: number
        label: string
    }
}

export default function PortfolioOverviewCard({ title, value, change }: Props) {
    return (
        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col">
            <span className="mb-3 text-xs text-text-muted font-medium">
                {title}
            </span>
            <span className="text-xl font-medium mb-1">{value}</span>
            <div className="flex gap-1 items-center">
                {change.value >= 0 ? (
                    <ArrowUpRight className="w-3 h-3 text-neon-green shrink-0" />
                ) : (
                    <ArrowDownRight className="w-3 h-3 text-neon-red shrink-0" />
                )}
                <span
                    className={cn(
                        "text-xs font-medium",
                        change.value >= 0 ? "text-neon-green" : "text-neon-red"
                    )}
                >
                    {change.value >= 0
                        ? `+${change.value.toFixed(1)}%`
                        : `${change.value.toFixed(1)}%`}
                </span>
                <span className="text-xs text-text-muted font-medium">
                    {change.label}
                </span>
            </div>
        </div>
    )
}
