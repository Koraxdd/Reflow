"use server"

import { getUserId } from "@/lib/getUserId"
import {
    createWatchlistItem,
    deleteWatchlistItemById,
    getWatchlistItemsByUser,
} from "@/queries/watchlistItems"

export async function submitWatchlistItem(data: {
    symbol: string
    name: string
}) {
    const userId = await getUserId()
    return await createWatchlistItem(userId, {
        symbol: data.symbol,
        name: data.name,
    })
}

export async function getWatchlistItems() {
    const userId = await getUserId()
    return await getWatchlistItemsByUser(userId)
}

export async function removeWatchlistItem(id: string) {
    const userId = await getUserId()
    return await deleteWatchlistItemById(id, userId)
}
