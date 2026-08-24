"use client"

import { useUserPreferences } from "@/hooks/useUserPreferences"
import { useEffect, useRef, memo } from "react"

function TradingViewWidget() {
    const container = useRef<HTMLDivElement>(null)
    const preferences = useUserPreferences()

    const isDark = preferences?.theme === "dark"

    const getChartStyle = (style?: string) => {
        switch (style) {
            case "LINE":
                return 2
            case "BAR":
                return 0
            case "CANDLESTICK":
            default:
                return 1
        }
    }

    useEffect(() => {
        if (!container.current) return

        container.current.innerHTML = ""

        const script = document.createElement("script")
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
        script.type = "text/javascript"
        script.async = true
        script.innerHTML = JSON.stringify({
            allow_symbol_change: true,
            calendar: false,
            details: false,
            hide_side_toolbar: true,
            hide_top_toolbar: false,
            hide_legend: false,
            hide_volume: false,
            hotlist: false,
            interval: "D",
            locale: "en",
            save_image: true,
            style: getChartStyle(preferences?.defaultChart),
            symbol: "BINANCE:BTCUSDT",
            theme: isDark ? "dark" : "light",
            timezone: preferences?.timezone || "Etc/UTC",
            backgroundColor: isDark ? "#111827" : "#ffffff",
            gridColor: isDark
                ? "rgba(255, 255, 255, 0.07)"
                : "rgba(0, 0, 0, 0.07)",
            watchlist: [],
            withdateranges: false,
            compareSymbols: [],
            studies: [],
            autosize: true,
        })
        container.current.appendChild(script)
    }, [preferences?.theme, preferences?.defaultChart, preferences?.timezone])

    return (
        <div
            className="tradingview-widget-container w-full h-full"
            ref={container}
        >
            <div
                className="tradingview-widget-container__widget"
                style={{ height: "calc(100% - 32px)", width: "100%" }}
            ></div>
            <div className="tradingview-widget-copyright"></div>
        </div>
    )
}

export default memo(TradingViewWidget)
