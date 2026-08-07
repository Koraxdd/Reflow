"use client"

import Button from "@/components/ui/Button"
import { supportedCoins } from "@/lib/supportedCoins"
import { Plus } from "lucide-react"
import Image from "next/image"

export default function Watchlist() {
    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2.5 font-medium">
                    <span className="text-sm">Watchlist</span>
                    <span className="bg-input rounded-full text-xs text-text-muted px-2 py-0.5">
                        5
                    </span>
                </div>
                <Button
                    variant="neon"
                    size="xs"
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Add Asset
                </Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 text-xs text-left text-text-muted font-medium">
                                Asset
                            </th>
                            <th className="px-5 py-3 text-xs text-left text-text-muted font-medium">
                                Price
                            </th>
                            <th className="px-5 py-3 text-xs text-left text-text-muted font-medium">
                                24h Change
                            </th>
                            <th className="px-5 py-3 text-xs text-left text-text-muted font-medium">
                                Volume
                            </th>
                            <th className="px-5 py-3 text-xs text-left text-text-muted font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {supportedCoins.map((coin) => (
                            <tr
                                key={coin.symbol}
                                className="border-t border-border"
                            >
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={coin.logo}
                                            width={24}
                                            height={24}
                                            alt={`${coin.name} logo`}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">
                                                {coin.symbol}
                                            </span>
                                            <span className="text-xs text-text-muted">
                                                {coin.name}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-3.5"></td>
                                <td className="px-5 py-3.5"></td>
                                <td className="px-5 py-3.5"></td>
                                <td className="px-5 py-3.5"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
