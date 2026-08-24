import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { Plus, X } from "lucide-react"

type Props = {
    count: number
    showForm: boolean
    onToggleForm: () => void
    isCompact: boolean
}

export default function WatchlistHeader({
    count,
    showForm,
    onToggleForm,
    isCompact,
}: Props) {
    return (
        <div
            className={cn(
                "flex items-center justify-between border-b border-border",
                isCompact ? "px-3 py-2.5" : "px-5 py-4"
            )}
        >
            <div className="flex items-center gap-2.5 font-medium">
                <span className={isCompact ? "text-xs" : "text-sm"}>
                    Watchlist
                </span>
                <span className="bg-input rounded-full text-xs text-text-muted px-2 py-0.5">
                    {count}
                </span>
            </div>
            <Button
                variant={showForm ? "ghost" : "neon"}
                size="xs"
                className={cn(
                    "flex items-center justify-center gap-1.5 active:scale-95",
                    showForm && "bg-input hover:opacity-80 rounded-2xl",
                    isCompact ? "px-2 py-1" : "px-3 py-1.5"
                )}
                onClick={onToggleForm}
            >
                {showForm ? (
                    <>
                        <X className={isCompact ? "w-3 h-3" : "w-3.5 h-3.5"} />
                        Cancel
                    </>
                ) : (
                    <>
                        <Plus
                            className={isCompact ? "w-3 h-3" : "w-3.5 h-3.5"}
                        />
                        Add Asset
                    </>
                )}
            </Button>
        </div>
    )
}
