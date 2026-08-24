"use client"

import {
    Award,
    ChartNoAxesColumn,
    TrendingDown,
    TrendingUp,
} from "lucide-react"
import AnalyticsCard from "./AnalyticsCard"
import type { Trade } from "@/generated/prisma/client"
import { formatSignedMoney } from "@/utils/formatMoney"
import { useAnalyticsMetrics } from "@/hooks/useAnalyticsMetrics"
import { useUserPreferences } from "@/hooks/useUserPreferences"
import { useExchangeRate } from "@/hooks/useExchangeRate"

type Props = {
    trades: Trade[]
}

export default function AnalyticsCardList({ trades }: Props) {
    const preferences = useUserPreferences()
    const currency = preferences?.baseCurrency ?? "USD"
    const rate = useExchangeRate(currency)
    const { allTime, winRate, bestTrade, worstTrade } =
        useAnalyticsMetrics(trades)

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <AnalyticsCard
                icon={<ChartNoAxesColumn className="w-4 h-4 text-neon-green" />}
                title="TOTAL P&L"
                value={formatSignedMoney(allTime, currency, rate)}
            />
            <AnalyticsCard
                icon={<TrendingUp className="w-4 h-4 text-neon-cyan" />}
                title="WIN RATE"
                value={`${winRate.toFixed(1)}%`}
            />
            <AnalyticsCard
                icon={<Award className="w-4 h-4 text-neon-green" />}
                title="BEST TRADE"
                value={formatSignedMoney(bestTrade, currency, rate)}
            />
            <AnalyticsCard
                icon={<TrendingDown className="w-4 h-4 text-neon-red" />}
                title="WORST TRADE"
                value={formatSignedMoney(worstTrade, currency, rate)}
            />
        </div>
    )
}
