"use client"

import TradeForm from "@/components/forms/TradeForm"
import Button from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function TradeJournalPage() {
    const [showForm, setShowForm] = useState<boolean>(false)

    return (
        <div className="md:ml-60 p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-semibold">Trade Journal</h2>
                    <span className="text-text-muted text-sm font-medium">
                        0 entries logged
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
            {showForm && <TradeForm handleClose={() => setShowForm(false)} />}
        </div>
    )
}
