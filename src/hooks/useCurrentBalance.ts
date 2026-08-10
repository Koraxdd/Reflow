"use client"

import type { Trade } from "@/generated/prisma/client"
import { useWatchlistPrices } from "@/hooks/useWatchlistPrices"
import { getCurrentHoldings } from "@/lib/getCurrentHoldings"
import { supportedCoins } from "@/lib/supportedCoins"
import { useEffect, useMemo, useRef, useState } from "react"

export function useCurrentBalance(
    trades: Trade[],
    intervalMs: number = 10000
): string {
    const [displayedBalance, setDisplayedBalance] = useState<string>("0.00")

    const holdings = useMemo(() => getCurrentHoldings(trades), [trades])

    const holdingSymbols = useMemo(() => {
        return Object.keys(holdings)
            .map(
                (holding) =>
                    supportedCoins.find((coin) => coin.symbol === holding)
                        ?.binanceSymbol
            )
            .filter((s): s is string => Boolean(s))
    }, [holdings])

    const holdingPrices = useWatchlistPrices(holdingSymbols)

    const pricesRef = useRef(holdingPrices)
    pricesRef.current = holdingPrices

    const holdingsRef = useRef(holdings)
    holdingsRef.current = holdings

    useEffect(() => {
        const calculateBalance = () => {
            const currentPrices = pricesRef.current
            const currentHoldings = holdingsRef.current
            const totalBalance = Object.entries(currentHoldings).reduce(
                (total, [symbol, amount]) => {
                    const coin = supportedCoins.find((c) => c.symbol === symbol)
                    const live =
                        coin && currentPrices[coin.binanceSymbol.toUpperCase()]
                    return total + (live ? amount * live.price : 0)
                },
                0
            )
            setDisplayedBalance(totalBalance.toFixed(2))
        }

        calculateBalance()
        const interval = setInterval(calculateBalance, intervalMs)

        return () => clearInterval(interval)
    }, [intervalMs])

    return displayedBalance
}
