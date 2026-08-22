import Button from "@/components/ui/Button"
import type { WatchlistItem } from "@/generated/prisma/client"
import type { TickerData } from "@/hooks/useWatchlistPrices"
import { supportedCoins } from "@/lib/supportedCoins"
import { cn } from "@/lib/utils"
import WatchlistRow from "./WatchlistRow"

type Props = {
    watchlistItems: WatchlistItem[]
    prices: Record<string, TickerData>
    onDelete: (id: string) => void
    isCompact: boolean
}

export default function WatchlistTable({
    watchlistItems,
    prices,
    onDelete,
    isCompact,
}: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th
                            className={cn(
                                "text-xs text-left text-text-muted font-medium",
                                isCompact ? "px-3 py-1.5" : "px-5 py-3"
                            )}
                        >
                            Asset
                        </th>
                        <th
                            className={cn(
                                "text-xs text-left text-text-muted font-medium",
                                isCompact ? "px-3 py-1.5" : "px-5 py-3"
                            )}
                        >
                            Price
                        </th>
                        <th
                            className={cn(
                                "text-xs text-left text-text-muted font-medium",
                                isCompact ? "px-3 py-1.5" : "px-5 py-3"
                            )}
                        >
                            24h Change
                        </th>
                        <th
                            className={cn(
                                "text-xs text-left text-text-muted font-medium",
                                isCompact ? "px-3 py-1.5" : "px-5 py-3"
                            )}
                        >
                            Volume
                        </th>
                        <th
                            className={cn(
                                "text-xs text-left text-text-muted font-medium",
                                isCompact ? "px-3 py-1.5" : "px-5 py-3"
                            )}
                        ></th>
                    </tr>
                </thead>
                <tbody>
                    {watchlistItems.length > 0 ? (
                        watchlistItems.map((item) => {
                            const coin = supportedCoins.find(
                                (coin) => coin.symbol === item.symbol
                            )
                            if (!coin) return null
                            const live =
                                prices[coin.binanceSymbol.toUpperCase()]

                            return (
                                <WatchlistRow
                                    key={item.id}
                                    item={item}
                                    live={live}
                                    onDelete={onDelete}
                                    isCompact={isCompact}
                                />
                            )
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-5 py-10 text-center border-t border-border"
                            >
                                <p className="text-sm text-text-muted font-medium">
                                    Your watchlist is empty — add an asset
                                    above.
                                </p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
