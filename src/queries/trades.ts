import type {
    SortField,
    SortOrder,
    TradeFilter,
} from "@/components/features/analytics/TradeHistoryTable"
import type { Trade } from "@/generated/prisma/client"
import type {
    TradeOrderByWithRelationInput,
    TradeWhereInput,
} from "@/generated/prisma/models"
import { prisma } from "@/lib/prisma"
import { type TradeOutput } from "@/schemas/trade.schema"
import { calculatePnL } from "@/utils/calculatePnL"

export type EditTradeVariables = {
    id: string
    userId: string
    trade: TradeOutput
}

export type PaginatedTrades = {
    trades: Trade[]
    totalPages: number
    totalCount: number
}

export type TradeQueryOptions = {
    tradeFilter: TradeFilter
    sortField: SortField
    sortOrder: SortOrder
}

export async function createTrade(
    userId: string,
    data: TradeOutput
): Promise<Trade> {
    const {
        coin,
        direction,
        entryPrice,
        exitPrice,
        amount,
        reflection,
        openedAt,
        closedAt,
        tags,
    } = data

    const { pnlAmount } = calculatePnL(
        direction as "Long" | "Short",
        exitPrice!,
        entryPrice,
        amount
    )

    return await prisma.trade.create({
        data: {
            userId,
            symbol: coin,
            direction,
            entryPrice,
            exitPrice,
            quantity: amount,
            notes: reflection,
            pnl: pnlAmount,
            openedAt,
            closedAt,
            tags,
        },
    })
}

export async function getTradesByUser(userId: string): Promise<Trade[]> {
    return await prisma.trade.findMany({
        where: { userId },
        orderBy: { openedAt: "desc" },
    })
}

export async function getPaginatedTradesByUser(
    userId: string,
    page: number,
    pageSize: number
): Promise<PaginatedTrades> {
    const [trades, totalCount] = await Promise.all([
        prisma.trade.findMany({
            where: {
                userId,
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { openedAt: "desc" },
        }),
        prisma.trade.count({ where: { userId } }),
    ])

    const totalPages = Math.ceil(totalCount / pageSize)

    return { trades, totalPages, totalCount }
}

export async function getPaginatedTradeHistoryByUser(
    userId: string,
    page: number,
    pageSize: number,
    options: TradeQueryOptions
): Promise<PaginatedTrades> {
    const { tradeFilter, sortField, sortOrder } = options

    const where: TradeWhereInput = {
        userId,
        closedAt: { not: null },
        exitPrice: { not: null },
    }

    if (tradeFilter === "Win") {
        where.pnl = { gt: 0 }
    }
    if (tradeFilter === "Loss") {
        where.pnl = { lt: 0 }
    }

    const orderByMap: Record<SortField, TradeOrderByWithRelationInput> = {
        date: { closedAt: sortOrder },
        amount: { quantity: sortOrder },
        asset: { symbol: sortOrder },
        pnl: { pnl: sortOrder },
    }

    const orderBy = orderByMap[sortField]

    const [trades, totalCount] = await Promise.all([
        prisma.trade.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy,
        }),
        prisma.trade.count({ where }),
    ])

    const totalPages = Math.ceil(totalCount / pageSize)

    return { trades, totalPages, totalCount }
}

export async function deleteTradeById(
    id: string,
    userId: string
): Promise<Trade> {
    return await prisma.trade.delete({
        where: {
            id,
            userId,
        },
    })
}

export async function editTradeById({
    id,
    userId,
    trade,
}: EditTradeVariables): Promise<Trade> {
    return await prisma.trade.update({
        where: { id, userId },
        data: {
            symbol: trade.coin,
            direction: trade.direction,
            entryPrice: trade.entryPrice,
            exitPrice: trade.exitPrice,
            quantity: trade.amount,
            notes: trade.reflection,
            openedAt: trade.openedAt,
            closedAt: trade.closedAt,
            tags: trade.tags,
        },
    })
}
