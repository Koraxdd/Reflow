"use client"

import { useState, useEffect } from "react"

export type TickerData = {
    symbol: string
    price: number
    changePercentage: number
    volume: number
}

export function useWatchlistPrices(binanceSymbols: string[]) {
    const [prices, setPrices] = useState<Record<string, TickerData>>({})

    useEffect(() => {
        if (binanceSymbols.length === 0) return

        const streams = binanceSymbols
            .map((symbol) => `${symbol}@miniTicker`)
            .join("/")
        const socket = new WebSocket(
            `wss://stream.binance.com:9443/stream?streams=${streams}`
        )

        socket.onmessage = (event) => {
            const {
                data: { s, c, o, v },
            } = JSON.parse(event.data)
            const price = Number(c)
            const open = Number(o)

            setPrices((prev) => ({
                ...prev,
                [s]: {
                    symbol: s,
                    price: price,
                    changePercentage: ((price - open) / open) * 100,
                    volume: Number(v),
                },
            }))
        }

        socket.onerror = (err) => console.log(`Websocket error: ${err}`)

        return () => {
            socket.close()
        }
    }, [binanceSymbols.join(",")])

    return prices
}
