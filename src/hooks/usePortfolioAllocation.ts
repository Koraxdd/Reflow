import type { Trade } from "@/generated/prisma/client"
import { getCurrentHoldings } from "@/lib/getCurrentHoldings"
import { useMemo } from "react"
import { supportedCoins } from "@/lib/supportedCoins"
import { useQuery } from "@tanstack/react-query"
import { fetchCurrentPrices } from "@/actions/prices"

type PortfolioAllocation = {
    symbol: string
    value: number
    percentage: number
}[]

export function usePortfolioAllocation(trades: Trade[]): PortfolioAllocation {
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
        queryKey: ["currentPrices"],
        queryFn: () => fetchCurrentPrices(holdingSymbols),
        refetchInterval: 300000,
        enabled: holdingSymbols.length > 0,
    })

    const holdingValues = Object.entries(holdings).map(([symbol, amount]) => {
        const coin = supportedCoins.find((c) => c.symbol === symbol)
        const price = coin && prices && prices[coin.binanceSymbol.toUpperCase()]
        const value = price ? price * amount : 0

        return { symbol, value }
    })

    const totalValue = holdingValues.reduce(
        (total, holding) => total + holding.value,
        0
    )

    const allocation = holdingValues.map((holding) => ({
        symbol: holding.symbol,
        value: holding.value,
        percentage: totalValue > 0 ? (holding.value / totalValue) * 100 : 0,
    }))

    return allocation
}
