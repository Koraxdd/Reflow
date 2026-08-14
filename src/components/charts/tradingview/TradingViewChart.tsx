import TradingViewWidget from "./TradingViewWidget"

export default function TradingViewChart() {
    return (
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
    )
}
