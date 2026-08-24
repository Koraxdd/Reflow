export function formatMoney(
    value: number,
    currency: string = "USD",
    rate: number = 1
): string {
    const converted = value * rate
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
        currencyDisplay: "narrowSymbol",
    }).format(converted)
}

export function formatSignedMoney(
    value: number,
    currency = "USD",
    rate: number = 1
): string {
    const converted = value * rate
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
        currencyDisplay: "narrowSymbol",
        signDisplay: "exceptZero",
    }).format(converted)
}
