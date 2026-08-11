export function formatMoney(value: number): string {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol",
    }).format(value)
}

export function formatSignedMoney(value: number): string {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol",
        signDisplay: "exceptZero",
    }).format(value)
}
