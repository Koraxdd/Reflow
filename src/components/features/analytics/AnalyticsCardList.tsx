import {
    Award,
    ChartNoAxesColumn,
    TrendingDown,
    TrendingUp,
} from "lucide-react"
import AnalyticsCard from "./AnalyticsCard"

export default function AnalyticsCardList() {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <AnalyticsCard
                icon={<ChartNoAxesColumn className="w-4 h-4 text-neon-green" />}
                title="TOTAL P&L"
                value={"+$4,643.5"}
            />
            <AnalyticsCard
                icon={<TrendingUp className="w-4 h-4 text-neon-cyan" />}
                title="TOTAL P&L"
                value={"+$4,643.5"}
            />
            <AnalyticsCard
                icon={<Award className="w-4 h-4 text-neon-green" />}
                title="TOTAL P&L"
                value={"+$4,643.5"}
            />
            <AnalyticsCard
                icon={<TrendingDown className="w-4 h-4 text-neon-red" />}
                title="TOTAL P&L"
                value={"+$4,643.5"}
            />
        </div>
    )
}
