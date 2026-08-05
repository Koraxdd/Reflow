type Direction = "Long" | "Short"

type PnLResult = {
    pnlAmount: number
    pnlPercentage: number
}

export function calculatePnL(
    direction: Direction,
    exitPrice: number,
    entryPrice: number,
    positionSize: number
): PnLResult {
    const priceDiff =
        direction === "Long" ? exitPrice - entryPrice : entryPrice - exitPrice

    const pnlAmount = Number((priceDiff * positionSize).toFixed(2))
    const pnlPercentage = Number(((priceDiff / entryPrice) * 100).toFixed(2))

    return { pnlAmount, pnlPercentage }
}
