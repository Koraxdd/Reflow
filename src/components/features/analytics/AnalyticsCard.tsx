import type { ReactElement } from "react"

type Props = {
    icon: ReactElement
    title: string
    value: string | number
}

export default function AnalyticsCard({ icon, title, value }: Props) {
    return (
        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
                {icon}
                <span className="text-text-muted text-xs font-medium">
                    {title}
                </span>
            </div>
            <span className="text-lg font-medium">{value}</span>
        </div>
    )
}
