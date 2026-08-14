export function calculateWinRate(
    tradesAmount: number,
    winsAmount: number
): number {
    if (tradesAmount === 0 || winsAmount === 0) return 0
    return (winsAmount / tradesAmount) * 100
}
