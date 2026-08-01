import type { MouseEventHandler, ReactNode } from "react"
import { cn } from "@/lib/utils"

type Props = {
    children: ReactNode
    type?: "button" | "submit" | "reset"
    size?: "xs" | "sm" | "md" | "lg"
    variant?: "ghost" | "neon"
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({
    children,
    type = "button",
    size = "md",
    variant,
    className,
    onClick,
}: Props) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={cn(
                "rounded-lg transition-colors cursor-pointer font-semibold",
                variant === "ghost" && "text-text-muted",
                variant === "neon" &&
                    "bg-neon-cyan rounded-2xl text-background shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:bg-dark-cyan",
                size === "xs" && "text-xs",
                size === "sm" && "text-sm py-2",
                size === "lg" && "text-sm py-3",
                className
            )}
        >
            {children}
        </button>
    )
}
