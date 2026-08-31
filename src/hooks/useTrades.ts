"use client"

import { submitTrade, updateTrade } from "@/actions/trades"
import type {
    SortField,
    SortOrder,
    TradeFilter,
} from "@/components/features/analytics/TradeHistoryTable"
import type { Trade } from "@/generated/prisma/client"
import type { PaginatedTrades, TradeQueryOptions } from "@/queries/trades"
import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"

export type TradesOptions = {
    filter?: TradeFilter
    sortField?: SortField
    sortOrder?: SortOrder
}

export function useTrades(
    page: number,
    initialTrades: Trade[] | null,
    fetchTrades: (
        page: number,
        pageSize: number,
        options?: TradeQueryOptions
    ) => Promise<PaginatedTrades>,
    options?: TradeQueryOptions
) {
    const queryClient = useQueryClient()

    const { data: tradeData } = useQuery({
        queryKey: ["trades", fetchTrades.name, page, options],
        queryFn: () => fetchTrades(page, 10, options),
        placeholderData: keepPreviousData,
    })

    const { trades, totalPages, totalCount } = tradeData ?? {
        trades: initialTrades ?? [],
        totalPages: 1,
        totalCount: 0,
    }

    const { mutate: addTrade } = useMutation({
        mutationFn: submitTrade,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trades"] })
            queryClient.invalidateQueries({ queryKey: ["notifications"] })
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
