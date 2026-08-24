"use client"

import { fetchExchangeRate } from "@/actions/rates"
import { useQuery } from "@tanstack/react-query"

export function useExchangeRate(currency: string): number {
    const { data: rate } = useQuery({
        queryKey: ["rate", currency],
        queryFn: () => fetchExchangeRate(currency),
        enabled: currency !== "USD",
    })

    return currency === "USD" ? 1 : (rate ?? 1)
}
