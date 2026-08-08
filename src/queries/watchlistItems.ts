import { type WatchlistItem } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { type WatchlistInput } from "@/schemas/watchlist.schema"

export async function createWatchlistItem(
    userId: string,
    data: WatchlistInput
): Promise<WatchlistItem> {
    return await prisma.watchlistItem.create({
        data: {
            userId,
            symbol: data.symbol,
            name: data.name,
        },
    })
}

export async function getWatchlistItemsByUser(
    userId: string
): Promise<WatchlistItem[]> {
    return await prisma.watchlistItem.findMany({
        where: { userId },
    })
}

export async function deleteWatchlistItemById(
    id: string
): Promise<WatchlistItem> {
    return await prisma.watchlistItem.delete({
        where: { id },
    })
}
