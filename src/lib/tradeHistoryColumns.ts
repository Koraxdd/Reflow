import type { SortField } from "@/components/features/analytics/TradeHistoryTable"

export type TradeHistoryColumn = {
    label: string
    field?: SortField
}

export const tradeHistoryColumns: TradeHistoryColumn[] = [
    { label: "Date", field: "date" },
    { label: "Asset", field: "asset" },
    { label: "Type" },
    { label: "Amount", field: "amount" },
    { label: "Entry / Exit" },
    { label: "P&L", field: "pnl" },
]
