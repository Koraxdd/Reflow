import type { EquityCurveTimeframe } from "@/lib/equityCurveTimeframes"
import { subDays, subMonths, subYears } from "date-fns"

export function getTimeframeStartDate(
    timeframe: EquityCurveTimeframe
): Date | null {
    const now = new Date()

    switch (timeframe) {
        case "1W":
            return subDays(now, 7)
        case "1M":
            return subMonths(now, 1)
        case "3M":
            return subMonths(now, 3)
        case "6M":
            return subMonths(now, 6)
        case "1Y":
            return subYears(now, 1)
        case "All":
            return null
    }
}
