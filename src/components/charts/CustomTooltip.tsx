import { formatMoney } from "@/utils/formatMoney"
import { format } from "date-fns"

type PriceData = {
    openTime: number
    price: number
}

type PriceProps = {
    variant: "price"
    active?: boolean
    symbol?: string
    payload?: { payload: PriceData; color?: string }[]
}

type AllocationData = {
    symbol: string
    value: number
    percentage: number
}

type AllocationProps = {
    variant: "allocation"
    active?: boolean
    payload?: { payload: AllocationData; color?: string }[]
}

type EquityData = {
    cumulativePnl: number
    date: string
    tooltipDate: string
}

type EquityProps = {
    variant: "equity"
    active?: boolean
    currency?: string
    rate?: number
    payload?: { payload: EquityData }[]
}

type CustomTooltipProps = PriceProps | AllocationProps | EquityProps

export default function CustomTooltip(props: CustomTooltipProps) {
    const { active, payload, variant } = props

    if (!active || !payload?.length) return null

    if (variant === "price") {
        const { symbol } = props
        const data = payload[0].payload
        const colour = payload[0].color
        return (
            <div className="bg-card border border-border rounded-2xl px-2.5 py-3 flex flex-col gap-1.5">
                <span className="text-xs text-text-muted">
                    {format(data.openTime, "HH:mm")}
                </span>
                <span className="text-sm font-medium" style={{ color: colour }}>
                    {symbol}: {formatMoney(data.price)}
                </span>
            </div>
        )
    }

    if (variant === "allocation") {
        const data = payload[0].payload
        const colour = payload[0].color
        return (
            <div
                className="bg-card border border-border rounded-xl px-2.5 py-3 text-sm font-medium"
                style={{ color: colour }}
            >
                <span>
                    {data.symbol}: {formatMoney(data.value)}
                </span>
            </div>
        )
    }

    if (variant === "equity") {
        const { currency, rate } = props
        const data = payload[0].payload
        return (
            <div className="bg-card border border-border rounded-2xl px-2.5 py-3 flex flex-col gap-1.5">
                <span className="text-xs text-text-muted">
                    {data.tooltipDate}
                </span>
                <span className="text-sm font-medium">
                    {formatMoney(data.cumulativePnl, currency, rate)}
                </span>
            </div>
        )
    }
}
