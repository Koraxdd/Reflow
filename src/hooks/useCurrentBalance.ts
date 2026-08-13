"use client"

import { fetchCurrentPrices } from "@/actions/prices"
import type { Trade } from "@/generated/prisma/client"
import { getCurrentHoldings } from "@/lib/getCurrentHoldings"
import { supportedCoins } from "@/lib/supportedCoins"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

export function useCurrentBalance(trades: Trade[]): number {
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

    const { data: prices } = useQuery({
        queryKey: ["currentPrices", holdingSymbols],
        queryFn: () => fetchCurrentPrices(holdingSymbols),
        enabled: holdingSymbols.length > 0,
    })

    const balance = Object.entries(holdings).reduce(
        (total, [symbol, amount]) => {
            const coin = supportedCoins.find((coin) => coin.symbol === symbol)
            const price =
                coin && prices && prices[coin.binanceSymbol.toUpperCase()]
            return total + (price ? amount * price : 0)
        },
        0
    )

    return balance
}
