import type { TradeFilter } from "@/components/features/analytics/TradeHistoryTable"

export type TradeHistoryFilter = {
    label: TradeFilter
    activeClass: string
}

export const tradeHistoryFilters: TradeHistoryFilter[] = [
    { label: "All", activeClass: "bg-neon-cyan/10 text-neon-cyan" },
    { label: "Win", activeClass: "bg-neon-green/10 text-neon-green" },
    { label: "Loss", activeClass: "bg-neon-red/10 text-neon-red" },
]
