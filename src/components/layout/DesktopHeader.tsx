import { Sun } from "lucide-react"
import Button from "../ui/Button"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"

type Props = {
    isOpen: boolean
}

export default function DesktopHeader({ isOpen }: Props) {
    const pathname = usePathname()

    let title = "Dashboard"
    if (pathname.endsWith("/trade-journal")) title = "Trade Journal"
    if (pathname.endsWith("/analytics")) title = "Analytics"
    if (pathname.endsWith("/settings")) title = "Settings"

    return (
        <motion.header
            animate={{ marginLeft: isOpen ? 240 : 80 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="hidden md:flex px-6 py-4 justify-between items-center border-b bg-background border-border ml-60 fixed z-50 h-16 left-0 right-0"
        >
            <span className="text-foreground/40 text-sm font-medium">
                {title}
            </span>
            <div className="flex items-center gap-3.5">
                <Button className="flex items-center text-xs rounded-2xl gap-2 bg-input px-3 py-1.5 font-medium text-foreground/70">
                    <Sun className="text-sun w-4 h-4" />
                    Light Mode
                </Button>
                <Button className="bg-linear-to-br from-neon-cyan/25 to-neon-purple/25 text-neon-cyan text-sm border border-neon-cyan/20 w-8 h-8 rounded-full flex justify-center items-center">
                    A
                </Button>
            </div>
        </motion.header>
    )
}
