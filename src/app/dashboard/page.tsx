import TradingViewWidget from "@/components/charts/TradingViewWidget"
import PortfolioOverviewCard from "@/components/features/portfolio/PortfolioOverviewCard"

export default function DashboardPage() {
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
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <PortfolioOverviewCard
                    title="TOTAL BALANCE"
                    value={84231.5}
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
            <div className="bg-card border border-border rounded-2xl h-150 flex flex-col">
                <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                    <span className="w-1.75 h-1.75 bg-neon-green rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium">Live Chart</span>
                    <span className="text-xs px-1.5 py-0.5 text-neon-green bg-neon-green/10 border border-neon-green/20 rounded-full">
                        TradingView
                    </span>
                </div>
                <TradingViewWidget />
                <div className="px-5 py-2 border-t border-border flex items-center justify-end">
                    <a
                        href="https://www.tradingview.com/"
                        target="_blank"
                        className="text-xs text-text-muted font-medium transition-opacity hover:opacity-80"
                    >
                        Powered by TradingView
                    </a>
                </div>
            </div>
        </div>
    )
}
