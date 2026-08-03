"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getTrades, submitTrade } from "@/actions/trades"
import Button from "@/components/ui/Button"
import TradeForm from "@/components/forms/TradeForm"
import TradeCard from "@/components/features/trades/TradeCard"

export default function TradeJournalPage() {
    const [showForm, setShowForm] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const {
        data: trades,
        isLoading,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["trades"],
        queryFn: getTrades,
    })

    const { mutate: addTrade } = useMutation({
        mutationFn: submitTrade,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trades"] })
        },
    })

    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-semibold">Trade Journal</h2>
                    <span className="text-text-muted text-sm font-medium">
                        {trades?.length} entries logged
                    </span>
                </div>
                <Button
                    variant="neon"
                    size="sm"
                    className="flex justify-center items-center gap-2 px-4"
                    onClick={() => setShowForm(true)}
                >
                    <Plus className="w-4 h-4" />
                    New Entry
                </Button>
            </div>
            {showForm && (
                <TradeForm
                    handleClose={() => setShowForm(false)}
                    onAddTrade={addTrade}
                />
            )}
            <div className="flex flex-col gap-4">
                {trades &&
                    trades.map((trade) => (
                        <TradeCard key={trade.id} data={trade} />
                    ))}
            </div>
        </div>
    )
}
