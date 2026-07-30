import { LogOut } from "lucide-react"
import Button from "./Button"
import { signOut } from "next-auth/react"
import { AnimatePresence, motion } from "motion/react"

type Props = {
    size?: "xs" | "sm" | "md" | "lg"
    variant?: "ghost" | "neon"
    className?: string
    isOpen?: boolean
}

export default function LogoutButton({
    size = "md",
    variant,
    className,
    isOpen = true,
}: Props) {
    return (
        <Button
            size={size}
            type="button"
            className={className}
            variant={variant}
            onClick={() => signOut()}
        >
            <LogOut className="w-3.5 h-3.5" />
            {isOpen && "Logout"}
        </Button>
    )
}
