import { Sun } from "lucide-react"
import Button from "../ui/Button"
import { motion } from "motion/react"

type Props = {
    isOpen: boolean
}

export default function DesktopHeader({ isOpen }: Props) {
    return (
        <motion.header
            animate={{ marginLeft: isOpen ? 240 : 80 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="hidden md:flex px-6 py-4 justify-between items-center border-b border-border ml-60"
        >
            <span className="text-foreground/40 text-sm font-medium">
                Dashboard
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
