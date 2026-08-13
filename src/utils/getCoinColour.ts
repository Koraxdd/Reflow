const coinColours: Record<string, string> = {
    BTC: "#f59e0b",
    ETH: "#00d4ff",
    SOL: "#a855f7",
    BNB: "#f3ba2f",
    XRP: "#23292f",
    ADA: "#0033ad",
    DOGE: "#c2a633",
    AVAX: "#e84142",
    DOT: "#e6007a",
    LINK: "#375bd2",
}

const fallbackColours = [
    "#f59e0b",
    "#00d4ff",
    "#00e676",
    "#a855f7",
    "#ff4d6d",
    "#3b82f6",
    "#f97316",
    "#10b981",
    "#ec4899",
    "#8b5cf6",
]

export function stringToHslColour(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + hash * 31
    }
    const hue = Math.abs(hash) % 360
    return `hsl(${hue}, 75%, 55%)`
}

export function getCoinColour(symbol?: string, index?: number): string {
    const coinSymbol = symbol?.toUpperCase()
    if (!coinSymbol) return fallbackColours[0]

    if (coinColours[coinSymbol]) return coinColours[coinSymbol]

    if (typeof index === "number")
        return fallbackColours[index % fallbackColours.length]

    return stringToHslColour(coinSymbol)
}
