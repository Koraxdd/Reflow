import { ChevronLeft, ChevronRight } from "lucide-react"
import Button from "./Button"
import type { MouseEventHandler } from "react"

type Props = {
    onClick: MouseEventHandler<HTMLButtonElement>
    isOpen: boolean
}

export default function SidebarButton({ onClick, isOpen }: Props) {
    return (
        <Button
            className="bg-header border border-sidebar-border rounded-full w-6 h-6 flex items-center justify-center p-1 absolute top-20 -right-3"
            onClick={onClick}
        >
            {isOpen ? (
                <ChevronLeft className="text-link/50 w-3.5 h-3.5" />
            ) : (
                <ChevronRight className="text-link/50 w-3.5 h-3.5" />
            )}
        </Button>
    )
}
