"use client"

import PortfolioOverviewCard from "./PortfolioOverviewCard"
import type { Trade } from "@/generated/prisma/client"
import { useCurrentBalance } from "@/hooks/useCurrentBalance"
import { calculateRealisedPnL } from "@/utils/calculateRealisedPnL"
import { formatMoney } from "@/utils/formatNumber"

type Props = {
    trades: Trade[]
}

export default function PortfolioCardList({ trades }: Props) {
    const currentBalance = useCurrentBalance(trades)
    const { day, week, allTime } = calculateRealisedPnL(trades)
    const formattedValues = {
        currentBalance: formatMoney(currentBalance),
        day: formatMoney(day),
        week: formatMoney(week),
        allTime: formatMoney(allTime),
    }

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <PortfolioOverviewCard
                title="TOTAL BALANCE"
                value={formattedValues.currentBalance}
                change={{ value: 3.24, label: "today" }}
            />
            <PortfolioOverviewCard
                title="DAY P&L"
                value={
                    day >= 0 ? `+${formattedValues.day}` : formattedValues.day
                }
                change={{ value: 3.24, label: "vs yesterday" }}
            />
            <PortfolioOverviewCard
                title="WEEK P&L"
                value={
                    week >= 0
                        ? `+${formattedValues.week}`
                        : formattedValues.week
                }
                change={{ value: 3.24, label: "this week" }}
            />
            <PortfolioOverviewCard
                title="ALL-TIME P&L"
                value={
                    allTime >= 0
                        ? `+${formattedValues.allTime}`
                        : formattedValues.allTime
                }
                change={{ value: 3.24, label: "total" }}
            />
        </div>
    )
}
