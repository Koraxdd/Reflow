"use server"

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
    const data: { symbol: string; price: string }[] = await res.json()

    return data.reduce(
        (acc, item) => {
            acc[item.symbol] = Number(item.price)
            return acc
        },
        {} as Record<string, number>
    )
}
