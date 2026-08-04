"use client"

import { removeTrade } from "@/actions/trades"
import Button from "@/components/ui/Button"
import Modal from "@/components/ui/Modal"
import { Trade } from "@/generated/prisma/client"
import { cn } from "@/lib/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BookOpen, Trash2, TriangleAlert } from "lucide-react"
import { useState } from "react"

type Props = {
    data: Trade
}

export default function TradeCard({ data }: Props) {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const { quantity, symbol, direction, notes, tags, entryPrice, id } = data

    const { mutate: deleteTrade } = useMutation({
        mutationFn: removeTrade,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trades"] })
        },
    })

    return (
        <>
            <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex justify-between">
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
                            <div className="flex gap-2">
                                <span className="font-semibold text-sm">
                                    {symbol}
                                </span>
                                <span
                                    className={cn(
                                        "rounded-full text-xs flex items-center justify-center font-semibold px-2",
                                        direction === "Long"
                                            ? "text-neon-green bg-neon-green/10"
                                            : "text-neon-red bg-neon-red/10"
                                    )}
                                >
                                    {direction === "Long" ? "Buy" : "Sell"}
                                </span>
                            </div>
                            <span className="text-xs text-text-muted">
                                {"Aug 3, 2026"}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end [word-spacing:5px]">
                        <span className="text-sm font-medium">
                            {quantity} {symbol}
                        </span>
                        <span className="text-xs text-text-muted font-medium">
                            @ ${entryPrice}
                        </span>
                    </div>
                </div>
                <div className="bg-input flex gap-2 p-2 text-text-muted text-xs rounded-xl font-medium">
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    <span>{notes}</span>
                </div>
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
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="xs"
                        className="bg-input px-2.5 py-1.5 rounded-xl"
                    >
                        Edit
                    </Button>
                    <Button
                        variant="ghost"
                        size="xs"
                        className="bg-input px-2.5 py-1.5 rounded-xl"
                        onClick={() => setShowDeleteModal(true)}
                    >
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
                                className="bg-input rounded-2xl"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                className="flex items-center justify-center gap-2 rounded-2xl"
                                onClick={() => {
                                    deleteTrade(data.id)
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
