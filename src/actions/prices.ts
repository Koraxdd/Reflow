"use server"

import { supportedCoins } from "@/lib/supportedCoins"

type CurrentPrices = {
    symbol: string
    price: string
}[]

export async function fetchCurrentPrices(
    binanceSymbols: string[]
): Promise<Record<string, number>> {
    if (binanceSymbols.length === 0) return {}

    const symbols = JSON.stringify(
        binanceSymbols.map((symbol) => symbol.toUpperCase())
    )

    const res = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbols=${symbols}`
    )

    if (!res.ok) {
        throw new Error("Failed to fetch current prices")
    }

    const data: CurrentPrices = await res.json()

    return data.reduce(
        (acc, item) => {
            acc[item.symbol] = Number(item.price)
            return acc
        },
        {} as Record<string, number>
    )
}

export async function fetchPriceHistory(
    symbol: string
): Promise<{ openTime: number; price: number }[]> {
    const coin = supportedCoins.find((c) => c.symbol === symbol)
    if (!coin) return []

    const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${coin.binanceSymbol.toUpperCase()}&interval=4h&limit=7`
    )

    if (!res.ok) {
        throw new Error("Failed to fetch price history")
    }

    const data: (string | number)[][] = await res.json()

    return data.map((row) => ({
        openTime: Number(row[0]),
        price: Number(row[1]),
    }))
}
