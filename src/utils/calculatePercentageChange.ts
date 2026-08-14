export function calculatePercentageChange(
    newValue: number,
    oldValue: number
): number {
    if (oldValue === 0) {
        if (newValue === 0) return 0
        return newValue > 0 ? 100 : -100
    }

    return ((newValue - oldValue) / Math.abs(oldValue)) * 100
}
