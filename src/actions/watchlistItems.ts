"use server"

import { getUserId } from "@/lib/getUserId"
import {
    createWatchlistItem,
    deleteWatchlistItemById,
    getWatchlistItemsByUser,
} from "@/queries/watchlistItems"
import type { WatchlistInput } from "@/schemas/watchlist.schema"

export async function submitWatchlistItem(data: WatchlistInput) {
    const userId = await getUserId()
    return await createWatchlistItem(userId, data)
}

export async function getWatchlistItems() {
    const userId = await getUserId()
    return await getWatchlistItemsByUser(userId)
}

export async function removeWatchlistItem(id: string) {
    return await deleteWatchlistItemById(id)
}
