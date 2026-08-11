export function formatMoney(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value)
}

export function formatSignedMoney(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        signDisplay: "exceptZero",
    }).format(value)
}
