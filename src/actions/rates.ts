"use server"

type ExchangeRates = {
    date: string
    base: string
    quote: string
    rate: number
}[]

export async function fetchExchangeRate(currency: string): Promise<number> {
    if (currency === "USD") return 1
    const res = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=USD&quotes=${currency}`
    )

    if (!res.ok) {
        throw new Error("Failed to fetch exchange rate")
    }

    const data: ExchangeRates = await res.json()

    return data[0].rate
}
