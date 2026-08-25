"use client"

import { getPaginatedTrades, submitTrade, updateTrade } from "@/actions/trades"
import type { Trade } from "@/generated/prisma/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useTrades(page: number, initialTrades: Trade[] | null) {
    const queryClient = useQueryClient()

    const { data: tradeData } = useQuery({
        queryKey: ["trades", page],
        queryFn: () => getPaginatedTrades(page, 10),
        initialData: {
            trades: initialTrades ?? [],
            totalPages: 1,
            totalCount: 0,
        },
    })

    const { trades, totalPages, totalCount } = tradeData

    const { mutate: addTrade } = useMutation({
        mutationFn: submitTrade,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trades"] })
        },
    })

    const { mutate: editTrade } = useMutation({
        mutationFn: updateTrade,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trades"] })
        },
    })

    return { trades, totalPages, totalCount, addTrade, editTrade }
}
