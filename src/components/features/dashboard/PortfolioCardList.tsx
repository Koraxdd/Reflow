"use client"

import PortfolioOverviewCard from "./PortfolioOverviewCard"
import type { Trade } from "@/generated/prisma/client"
import { useCurrentBalance } from "@/hooks/useCurrentBalance"

type Props = {
    trades: Trade[]
}

export default function PortfolioCardList({ trades }: Props) {
    const currentBalance = useCurrentBalance(trades)

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <PortfolioOverviewCard
                title="TOTAL BALANCE"
                value={currentBalance}
                change={{ value: 3.24, label: "today" }}
            />
            <PortfolioOverviewCard
                title="DAY P&L"
                value={84231.5}
                change={{ value: 3.24, label: "vs yesterday" }}
            />
            <PortfolioOverviewCard
                title="WEEK P&L"
                value={84231.5}
                change={{ value: 3.24, label: "this week" }}
            />
            <PortfolioOverviewCard
                title="ALL-TIME P&L"
                value={84231.5}
                change={{ value: 3.24, label: "total" }}
            />
        </div>
    )
}
