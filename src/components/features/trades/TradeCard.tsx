"use client"

import { format } from "date-fns"
import { removeTrade } from "@/actions/trades"
import Button from "@/components/ui/Button"
import Modal from "@/components/ui/Modal"
import { type Trade } from "@/generated/prisma/client"
import { cn } from "@/lib/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ArrowRight, BookOpen, Trash2, TriangleAlert } from "lucide-react"
import { useState } from "react"
import Pill from "@/components/ui/Pill"
import { calculatePnL } from "@/utils/calculatePnL"
import { formatMoney, formatSignedMoney } from "@/utils/formatMoney"

type Props = {
    data: Trade
    onEdit: () => void
}

export default function TradeCard({ data, onEdit }: Props) {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const {
        quantity,
        symbol,
        direction,
        notes,
        tags,
        openedAt,
        closedAt,
        entryPrice,
        exitPrice,
        id,
    } = data

    const pnl =
        exitPrice && quantity
            ? calculatePnL(
                  direction as "Long" | "Short",
                  exitPrice,
                  entryPrice,
                  quantity
              )
            : null

    const { mutate: deleteTrade } = useMutation({
        mutationFn: removeTrade,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trades"] })
        },
    })

    return (
        <>
            <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-px hover:border-white/15">
                <div className="flex justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span
                            className={cn(
                                "font-semibold text-xs p-3 rounded-2xl",
                                direction === "Long"
                                    ? "text-neon-green bg-neon-green/10"
                                    : "text-neon-red bg-neon-red/10"
                            )}
                        >
                            {symbol}
                        </span>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2 flex-wrap">
                                <span className="font-semibold text-sm">
                                    {symbol}
                                </span>
                                <span
                                    className={cn(
                                        "rounded-full text-xs flex items-center justify-center font-medium px-2",
                                        direction === "Long"
                                            ? "text-neon-green bg-neon-green/10"
                                            : "text-neon-red bg-neon-red/10"
                                    )}
                                >
                                    {direction === "Long"
                                        ? "▲ Long"
                                        : "▼ Short"}
                                </span>
                                {!closedAt && (
                                    <div className="bg-neon-orange/15 border border-neon-orange/40 text-neon-orange text-xs font-medium rounded-full px-2 flex gap-1 items-center justify-center">
                                        <span className="w-1.25 h-1.25 bg-neon-orange rounded-full animate-pulse"></span>
                                        <span>Open</span>
                                    </div>
                                )}
                            </div>
                            <div className="text-xs text-text-muted flex items-center flex-wrap gap-1.5">
                                <span>{format(openedAt, "MMM d, yyyy")}</span>
                                {closedAt && (
                                    <ArrowRight className="w-2.5 h-2.5" />
                                )}
                                {closedAt && (
                                    <span>
                                        {format(closedAt, "MMM d, yyyy")}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    {pnl ? (
                        <div className="flex flex-col items-end">
                            <span
                                className={cn(
                                    "text-sm font-medium",
                                    pnl.pnlAmount >= 0
                                        ? "text-neon-green"
                                        : "text-neon-red"
                                )}
                            >
                                {formatSignedMoney(pnl.pnlAmount)}
                            </span>
                            <span
                                className={cn(
                                    "text-xs text-text-muted font-medium",
                                    pnl.pnlPercentage >= 0
                                        ? "text-neon-green/70"
                                        : "text-neon-red/70"
                                )}
                            >
                                {pnl.pnlPercentage >= 0
                                    ? `+${pnl.pnlPercentage}%`
                                    : `${pnl.pnlPercentage}%`}
                            </span>
                        </div>
                    ) : (
                        <span className="text-sm font-medium">
                            {quantity} {symbol}
                        </span>
                    )}
                </div>
                <div className="flex items-center flex-wrap gap-3">
                    <Pill>
                        <span className="text-text-muted font-medium">
                            Entry
                        </span>
                        <span className="font-medium">
                            {formatMoney(entryPrice)}
                        </span>
                    </Pill>
                    {exitPrice && (
                        <ArrowRight className="w-3 h-3 text-text-muted" />
                    )}
                    {exitPrice && (
                        <Pill>
                            <span className="text-text-muted font-medium">
                                Exit
                            </span>
                            <span className="font-medium">
                                {formatMoney(exitPrice)}
                            </span>
                        </Pill>
                    )}
                    <Pill>
                        <span className="text-text-muted font-medium">
                            Size
                        </span>
                        <span className="font-medium">
                            {quantity} {symbol}
                        </span>
                    </Pill>
                </div>
                {notes && (
                    <div className="bg-input flex gap-2 p-2 text-text-muted text-xs rounded-xl font-medium">
                        <BookOpen className="w-3.5 h-3.5 shrink-0" />
                        <span>{notes}</span>
                    </div>
                )}
                {tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="flex justify-center items-center gap-1 text-xs text-neon-cyan bg-neon-cyan/10 py-1 px-2.5 rounded-2xl"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="xs"
                        className="bg-input px-2.5 py-1.5 rounded-xl hover:opacity-80 active:scale-95"
                        onClick={onEdit}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        size="xs"
                        className="px-2.5 py-1.5 rounded-xl flex items-center justify-center gap-2"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        <Trash2 className="w-3 h-3" />
                        Delete
                    </Button>
                </div>
            </div>
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <div className="bg-card border border-neon-red/30 rounded-xl flex flex-col gap-3 items-center justify-center py-5 px-6 shadow-[0_0_20px_rgba(255,77,109,0.2)]">
                        <div className="w-11 h-11 bg-neon-red/10 border border-neon-red/30 flex items-center justify-center rounded-2xl">
                            <TriangleAlert className="text-neon-red w-6 h-6" />
                        </div>
                        <div className="flex flex-col gap-1 items-center justify-center text-center">
                            <h2 className="text-base font-semibold">
                                Delete Trade Entry?
                            </h2>
                            <p className="text-text-muted text-xs font-medium">
                                This will permanently remove the entry and its
                                notes. This action cannot be undone.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5 mt-3 w-full">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="bg-input rounded-2xl hover:opacity-80"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                className="flex items-center justify-center gap-2 rounded-2xl"
                                onClick={() => {
                                    deleteTrade(id)
                                    setShowDeleteModal(false)
                                }}
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}
