import { getTrades } from "@/actions/trades"
import { getWatchlistItems } from "@/actions/watchlistItems"
import TradingViewChart from "@/components/charts/tradingview/TradingViewChart"
import PortfolioCardList from "@/components/features/dashboard/PortfolioCardList"
import Watchlist from "@/components/features/dashboard/Watchlist"

export default async function DashboardPage() {
    const watchlistItems = await getWatchlistItems()
    const trades = await getTrades()

    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-semibold">Portfolio Overview</h2>
                    <span className="text-text-muted text-sm font-medium">
                        Last updated at:
                    </span>
                </div>
                <div className="bg-neon-green/10 border border-neon-green/20 rounded-full text-xs text-neon-green px-3 py-1.5 flex items-center justify-center gap-2">
                    <span className="w-1.25 h-1.25 bg-neon-green rounded-full animate-pulse"></span>
                    <span>Markets Open</span>
                </div>
            </div>
            <PortfolioCardList trades={trades} />
            <TradingViewChart />
            <Watchlist initialCoins={watchlistItems} />
        </div>
    )
}
