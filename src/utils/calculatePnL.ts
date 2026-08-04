type PnLResult = {
    pnlAmount: number
    pnlPercentage: number
}

export function calculatePnL(
    exitPrice: number,
    entryPrice: number,
    positionSize: number
): PnLResult {
    const pnlAmount = Number(
        ((exitPrice - entryPrice) * positionSize).toFixed(2)
    )
    const pnlPercentage = Number(
        (((exitPrice - entryPrice) / entryPrice) * 100).toFixed(2)
    )

    return { pnlAmount, pnlPercentage }
}
