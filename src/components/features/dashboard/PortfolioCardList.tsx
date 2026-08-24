"use client"

import PortfolioOverviewCard from "./PortfolioOverviewCard"
import type { Trade } from "@/generated/prisma/client"
import { useCurrentBalance } from "@/hooks/useCurrentBalance"
import { useExchangeRate } from "@/hooks/useExchangeRate"
import { useUserPreferences } from "@/hooks/useUserPreferences"
import { calculatePercentageChange } from "@/utils/calculatePercentageChange"
import { calculateRealisedPnL } from "@/utils/calculateRealisedPnL"
import { formatMoney, formatSignedMoney } from "@/utils/formatMoney"

type Props = {
    trades: Trade[]
}

export default function PortfolioCardList({ trades }: Props) {
    const preferences = useUserPreferences()
    const currency = preferences?.baseCurrency ?? "USD"
    const rate = useExchangeRate(currency)

    const currentBalance = useCurrentBalance(trades)
    const { day, week, allTime } = calculateRealisedPnL(trades)

    const startOfDayBalance = currentBalance - day
    const startOfWeekBalance = currentBalance - week
    const startOfAlltimeBalance = currentBalance - allTime

    const totalBalancePercent =
        currentBalance === 0 && startOfDayBalance !== 0
            ? -100
            : calculatePercentageChange(currentBalance, startOfDayBalance)

    const dayPercent = calculatePercentageChange(
        currentBalance,
        startOfDayBalance
    )
    const weekPercent = calculatePercentageChange(
        currentBalance,
        startOfWeekBalance
    )
    const allTimePercent = calculatePercentageChange(
        currentBalance,
        startOfAlltimeBalance
    )

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <PortfolioOverviewCard
                title="TOTAL BALANCE"
                value={formatMoney(Number(currentBalance), currency, rate)}
                change={{ value: totalBalancePercent, label: "today" }}
            />
            <PortfolioOverviewCard
                title="DAY P&L"
                value={formatSignedMoney(day, currency, rate)}
                change={{ value: dayPercent, label: "vs yesterday" }}
            />
            <PortfolioOverviewCard
                title="WEEK P&L"
                value={formatSignedMoney(week, currency, rate)}
                change={{ value: weekPercent, label: "this week" }}
            />
            <PortfolioOverviewCard
                title="ALL-TIME P&L"
                value={formatSignedMoney(allTime, currency, rate)}
                change={{ value: allTimePercent, label: "total" }}
            />
        </div>
    )
}
