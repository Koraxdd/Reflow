import { z } from "zod"

export const WatchlistSchema = z.object({
    symbol: z.string().min(1, "Must select a coin"),
})

export type WatchlistInput = z.infer<typeof WatchlistSchema>
