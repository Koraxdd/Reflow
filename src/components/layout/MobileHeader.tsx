import { Menu, Sun } from "lucide-react"
import Button from "../ui/Button"

type Props = {
    handleOpen: () => void
}

export default function MobileHeader({ handleOpen }: Props) {
    return (
        <header className="bg-header border border-border px-5 py-4 flex justify-between fixed left-0 right-0 z-50 h-17 md:hidden">
            <div className="flex items-center gap-3">
                <Button className="text-white/50 cursor-pointer p-1">
                    <Menu className="w-5 h-5" onClick={handleOpen} />
                </Button>
                <h1 className="text-base font-semibold">Reflow</h1>
            </div>
            <Button className="w-8 h-8 bg-border rounded-xl flex items-center justify-center text-sun">
                <Sun className="w-4 h-4" />
            </Button>
        </header>
    )
}
