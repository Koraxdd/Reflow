import { formatMoney } from "@/utils/formatMoney"

type Props = {
    active?: boolean
    payload?: {
        payload: { symbol: string; value: number }
    }[]
}

export default function CustomTooltip({ active, payload }: Props) {
    if (!active || !payload || payload.length === 0) return null

    const data = payload[0].payload

    return (
        <div className="bg-card border border-border rounded-2xl px-2.5 py-3 flex gap-2">
            <span>{data.symbol}</span>
            <span>{formatMoney(data.value)}</span>
        </div>
    )
}
