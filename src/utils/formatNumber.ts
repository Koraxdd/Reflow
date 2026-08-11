export function formatMoney(value: number | string): string {
    return new Intl.NumberFormat("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(value))
}
