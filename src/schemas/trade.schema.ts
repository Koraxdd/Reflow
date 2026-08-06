import { z } from "zod"

export const TradeSchema = z.object({
    coin: z
        .string()
        .min(3, "Symbol must be 3 characters")
        .max(3, "Symbol must be 3 characters"),
    openedAt: z.coerce.date(),
    closedAt: z.preprocess(
        (val) => (val === "" ? undefined : val),
        z.coerce.date().optional()
    ),
    direction: z.enum(["Long", "Short"]),
    amount: z.coerce.number().positive("Amount must be greater than 0"),
    entryPrice: z.coerce
        .number()
        .positive("Entry price must be greater than 0"),
    exitPrice: z.preprocess(
        (val) =>
            val === "" || val === null || Number.isNaN(val) ? undefined : val,
        z.coerce
            .number()
            .positive("Exit price must be greater than 0")
            .optional()
    ),
    reflection: z.string().optional(),
    tags: z.array(z.string()).optional(),
})

export type TradeInput = z.input<typeof TradeSchema>
export type TradeOutput = z.infer<typeof TradeSchema>
