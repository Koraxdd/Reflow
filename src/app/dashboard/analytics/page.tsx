import { getTrades } from "@/actions/trades"
import AnalyticsCardList from "@/components/features/analytics/AnalyticsCardList"

export default async function AnalyticsPage() {
    const trades = await getTrades()

    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="flex flex-col">
                <h2 className="font-semibold">Trade Analytics</h2>
                <span className="text-text-muted text-sm font-medium">
                    Performance metrics & trade history
                </span>
            </div>
            <AnalyticsCardList trades={trades} />
        </div>
    )
}
