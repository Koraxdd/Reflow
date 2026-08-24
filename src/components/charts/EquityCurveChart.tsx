"use client"

import { cn } from "@/lib/utils"
import Button from "../ui/Button"
import { formatMoney, formatSignedMoney } from "@/utils/formatMoney"
import { useState } from "react"
import {
    type EquityCurveTimeframe,
    equityCurveTimeframes,
} from "@/lib/equityCurveTimeframes"
import {
    Area,
    AreaChart,
    CartesianGrid,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import type { Trade } from "@/generated/prisma/client"
import { useEquityData } from "@/hooks/useEquityData"
import CustomTooltip from "./CustomTooltip"
import { calculatePercentageChange } from "@/utils/calculatePercentageChange"
import { AnimatePresence, motion } from "motion/react"

type Props = {
    trades: Trade[]
}

export default function EquityCurveChart({ trades }: Props) {
    const [timeframe, setTimeframe] = useState<EquityCurveTimeframe>("1W")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const data = useEquityData(trades, timeframe)

    const filteredTimeframes = equityCurveTimeframes.filter(
        (t) => t !== timeframe
    )

    if (data.length <= 1) {
        return (
            <div className="bg-card border border-border rounded-2xl p-5 text-center text-text-muted text-sm font-medium flex flex-col items-center justify-center gap-3 h-75">
                <span>
                    At least 2 completed trades are needed to plot your equity
                    curve.
                </span>
                <Button
                    href="/dashboard/trade-journal"
                    className="px-2"
                    variant="neon"
                    size="sm"
                >
                    Open a Trade
                </Button>
            </div>
        )
    }

    const firstItemPnl = data[0].cumulativePnl
    const lastItemPnl = data[data.length - 1].cumulativePnl

    const pnlChange =
        timeframe === "All" ? lastItemPnl : lastItemPnl - firstItemPnl
    const percentChange =
        timeframe === "All"
            ? pnlChange >= 0
                ? 100
                : -100
            : calculatePercentageChange(lastItemPnl, firstItemPnl)

    return (
        <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium">Equity Curve</h3>
                    <div className="flex gap-2 text-xs font-medium">
                        <span
                            className={cn(
                                pnlChange >= 0
                                    ? "text-neon-green"
                                    : "text-neon-red"
                            )}
                        >
                            {formatSignedMoney(pnlChange)}
                        </span>
                        <span
                            className={cn(
                                percentChange >= 0
                                    ? "text-neon-green"
                                    : "text-neon-red"
                            )}
                        >
                            {percentChange >= 0
                                ? `(+${percentChange.toFixed(1)}%)`
                                : `(${percentChange.toFixed(1)}%)`}
                        </span>
                        <span className="text-text-muted">
                            {timeframe !== "All"
                                ? `last ${timeframe}`
                                : "all time"}
                        </span>
                    </div>
                </div>
                <div className="relative flex flex-col items-center gap-2 rounded-lg p-1 bg-input md:hidden">
                    <Button
                        size="xs"
                        variant="ghost"
                        className="rounded-md px-3 py-1 text-background bg-neon-cyan"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        {timeframe}
                    </Button>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{
                                    type: "tween",
                                    duration: 0.2,
                                    ease: "easeOut",
                                }}
                                className="flex flex-col gap-1 absolute top-8.5 z-50 rounded-lg p-1 bg-input origin-top border border-border"
                            >
                                {filteredTimeframes.map((t) => (
                                    <Button
                                        key={t}
                                        size="xs"
                                        variant="ghost"
                                        className="rounded-md px-3 py-1"
                                        onClick={() => {
                                            setTimeframe(t)
                                            setIsOpen(false)
                                        }}
                                    >
                                        {t}
                                    </Button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="rounded-lg p-1 bg-input hidden md:flex">
                    {equityCurveTimeframes.map((t) => {
                        const isActive = t === timeframe
                        return (
                            <Button
                                key={t}
                                size="xs"
                                variant="ghost"
                                className={cn(
                                    "rounded-md px-3 py-1",
                                    isActive && "text-background bg-neon-cyan"
                                )}
                                onClick={() => setTimeframe(t)}
                            >
                                {t}
                            </Button>
                        )
                    })}
                </div>
            </div>
            <div className="w-full h-55">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        accessibilityLayer={false}
                        margin={{ top: 30, left: 30 }}
                    >
                        <defs>
                            <linearGradient
                                id="equityGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#00d4ff"
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#00d4ff"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            minTickGap={30}
                            fontSize={12}
                            stroke="#64748b"
                        />
                        <YAxis
                            dataKey="cumulativePnl"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(tick) => formatMoney(tick)}
                            fontSize={12}
                            stroke="#64748b"
                            domain={["auto", "auto"]}
                        />
                        <Area
                            dataKey="cumulativePnl"
                            stroke="none"
                            fill="url(#equityGradient)"
                        />
                        <Line
                            dataKey="cumulativePnl"
                            stroke="#00d4ff"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 4.5 }}
                        />
                        <CartesianGrid strokeWidth={0.2} stroke="#64748b" />
                        <Tooltip content={<CustomTooltip variant="equity" />} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
