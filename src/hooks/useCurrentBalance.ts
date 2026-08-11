"use client"

import type { Trade } from "@/generated/prisma/client"
import { useWatchlistPrices } from "@/hooks/useWatchlistPrices"
import { getCurrentHoldings } from "@/lib/getCurrentHoldings"
import { supportedCoins } from "@/lib/supportedCoins"
import { useEffect, useMemo, useRef, useState } from "react"

export function useCurrentBalance(trades: Trade[]): string {
    const [balance, setBalance] = useState<string>("0.00")
    const isCalculated = useRef(false)

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

    useEffect(() => {
        if (isCalculated.current) return
        if (!holdingPrices || Object.keys(holdingPrices).length === 0) return

        const totalBalance = Object.entries(holdings).reduce(
            (total, [symbol, amount]) => {
                const coin = supportedCoins.find((c) => c.symbol === symbol)
                const live =
                    coin && holdingPrices[coin.binanceSymbol.toUpperCase()]
                return total + (live ? amount * live.price : 0)
            },
            0
        )

        setBalance(totalBalance.toFixed(2))
        isCalculated.current = true
    }, [holdings, holdingPrices])

    return balance
}
