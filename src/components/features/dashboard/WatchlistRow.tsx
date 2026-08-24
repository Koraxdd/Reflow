import Button from "@/components/ui/Button"
import type { WatchlistItem } from "@/generated/prisma/client"
import type { TickerData } from "@/hooks/useWatchlistPrices"
import { supportedCoins } from "@/lib/supportedCoins"
import { cn } from "@/lib/utils"
import { formatMoney } from "@/utils/formatMoney"
import { TrendingDown, TrendingUp, X } from "lucide-react"
import Image from "next/image"

type Props = {
    item: WatchlistItem
    live?: TickerData
    onDelete: (id: string) => void
    isCompact: boolean
}

export default function WatchlistRow({
    item,
    live,
    onDelete,
    isCompact,
}: Props) {
    const coin = supportedCoins.find((coin) => coin.symbol === item.symbol)
    if (!coin) return null

    return (
        <tr key={item.id} className="border-t border-border">
            <td className={isCompact ? "px-3 py-1.5" : "px-5 py-3.5"}>
                <div className="flex items-center gap-3">
                    <Image
                        src={coin.logo}
                        width={isCompact ? 18 : 24}
                        height={isCompact ? 18 : 24}
                        alt={`${coin.name} logo`}
                    />
                    <div className="flex flex-col">
                        <span
                            className={cn(
                                "font-medium",
                                isCompact ? "text-xs" : "text-sm"
                            )}
                        >
                            {coin.symbol}
                        </span>
                        {!isCompact && (
                            <span className="text-xs text-text-muted">
                                {coin.name}
                            </span>
                        )}
                    </div>
                </div>
            </td>
            <td
                className={cn(
                    "font-medium",
                    isCompact ? "px-3 py-1.5 text-xs" : "px-5 py-3.5 text-sm",
                    !live && "text-text-muted font-light"
                )}
            >
                {live ? formatMoney(live.price) : "—"}
            </td>
            <td
                className={cn(
                    isCompact ? "px-3 py-1.5 text-xs" : "px-5 py-3.5 text-sm",
                    live && live.changePercentage >= 0
                        ? "text-neon-green"
                        : "text-neon-red"
                )}
            >
                <div
                    className={cn(
                        "flex items-center gap-1 font-medium",
                        !live && "text-text-muted font-light"
                    )}
                >
                    {live &&
                        (live.changePercentage >= 0 ? (
                            <TrendingUp
                                className={
                                    isCompact ? "w-3 h-3" : "w-3.5 h-3.5"
                                }
                            />
                        ) : (
                            <TrendingDown
                                className={
                                    isCompact ? "w-3 h-3" : "w-3.5 h-3.5"
                                }
                            />
                        ))}
                    {live ? `${live.changePercentage.toFixed(2)}%` : "—"}
                </div>
            </td>
            <td
                className={cn(
                    "text-text-muted font-medium",
                    isCompact ? "px-3 py-1.5 text-xs" : "px-5 py-3.5 text-sm",
                    !live && "font-light"
                )}
            >
                {live ? live.volume.toFixed(2) : "—"}
            </td>
            <td className={isCompact ? "px-3 py-1.5" : "px-5 py-3.5"}>
                <Button
                    className={cn(
                        "text-text-muted hover:bg-neon-red/10 hover:text-neon-red rounded-full flex justify-center items-center",
                        isCompact ? "w-5 h-5" : "w-6 h-6"
                    )}
                    onClick={() => onDelete(item.id)}
                >
                    <X className={isCompact ? "w-3 h-3" : "w-3.5 h-3.5"} />
                </Button>
            </td>
        </tr>
    )
}
