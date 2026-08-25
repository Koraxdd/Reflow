"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    getPaginatedTrades,
    getTrades,
    submitTrade,
    updateTrade,
} from "@/actions/trades"
import Button from "@/components/ui/Button"
import TradeForm from "@/components/forms/TradeForm"
import TradeCard from "@/components/features/trades/TradeCard"
import { Trade } from "@/generated/prisma/client"
import { cn } from "@/lib/utils"
import { useTrades } from "@/hooks/useTrades"

type Props = {
    initialTrades: Trade[] | null
}

export default function TradeJournalClient({ initialTrades }: Props) {
    const [showForm, setShowForm] = useState<boolean>(false)
    const [editingTrade, setEditingTrade] = useState<Trade | null>(null)
    const [page, setPage] = useState<number>(1)
    const { trades, totalPages, totalCount, addTrade, editTrade } = useTrades(
        page,
        initialTrades
    )

    const formRef = useRef<HTMLFormElement>(null)
    useEffect(() => {
        if (showForm && formRef.current) {
            formRef.current?.scrollIntoView()
        }
    }, [showForm, editingTrade])

    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-semibold">Trade Journal</h2>
                    <span className="text-text-muted text-sm font-medium">
                        {totalCount} entries logged
                    </span>
                </div>
                <Button
                    variant="neon"
                    size="sm"
                    className="flex justify-center items-center gap-2 px-4 active:scale-90"
                    onClick={() => {
                        setShowForm(true)
                        setEditingTrade(null)
                    }}
                >
                    <Plus className="w-4 h-4" />
                    New Entry
                </Button>
            </div>
            {showForm && (
                <TradeForm
                    key={editingTrade ? editingTrade.id : "new-trade"}
                    handleClose={() => {
                        setShowForm(false)
                        setEditingTrade(null)
                    }}
                    onAddTrade={addTrade}
                    onEditTrade={editTrade}
                    existingTrade={editingTrade}
                    ref={formRef}
                />
            )}
            <div className="flex flex-col gap-4">
                {trades &&
                    trades.map((trade) => (
                        <TradeCard
                            key={trade.id}
                            data={trade}
                            onEdit={() => {
                                setShowForm(true)
                                setEditingTrade(trade)
                            }}
                        />
                    ))}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-border gap-2 pt-4 mt-2">
                        <span className="text-sm text-text-muted font-medium">
                            Page {page} of {totalPages}
                        </span>
                        <div className="flex items-center gap-10 text-text-muted">
                            <Button
                                size="sm"
                                disabled={page === 1}
                                onClick={() => {
                                    setShowForm(false)
                                    setPage((prev) => prev - 1)
                                }}
                                className={cn(
                                    "flex items-center gap-1",
                                    page !== 1 && "hover:opacity-80"
                                )}
                            >
                                <ChevronLeft className="w-4.5 h-4.5" />
                                Previous
                            </Button>
                            <Button
                                size="sm"
                                disabled={page === totalPages}
                                onClick={() => {
                                    setShowForm(false)
                                    setPage((prev) => prev + 1)
                                }}
                                className={cn(
                                    "flex items-center gap-1",
                                    page !== totalPages && "hover:opacity-80"
                                )}
                            >
                                Next
                                <ChevronRight className="w-4.5 h-4.5" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
