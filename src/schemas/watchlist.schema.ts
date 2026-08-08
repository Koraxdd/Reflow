import { z } from "zod"

export const WatchlistSchema = z.object({
    symbol: z
        .string()
        .min(3, "Symbol must be 3 characters")
        .max(3, "Symbol must be 3 characters"),
    name: z.string(),
})

export type WatchlistInput = z.infer<typeof WatchlistSchema>
