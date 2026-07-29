import { ChevronLeft } from "lucide-react"
import Button from "./Button"

export default function SidebarButton() {
    return (
        <Button className="bg-header border border-border rounded-full w-6 h-6 flex items-center justify-center p-1 absolute top-20 left-52.5 md:left-57">
            <ChevronLeft className="text-link/50 w-3.5 h-3.5" />
        </Button>
    )
}
