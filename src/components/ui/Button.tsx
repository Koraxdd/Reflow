import type { CSSProperties, MouseEventHandler, ReactNode } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Props = {
    children: ReactNode
    type?: "button" | "submit" | "reset"
    size?: "xs" | "sm" | "md" | "lg"
    variant?: "ghost" | "neon" | "danger" | "destructive"
    disabled?: boolean
    className?: string
    style?: CSSProperties
    href?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({
    children,
    type = "button",
    size = "md",
    variant,
    disabled,
    className,
    style,
    href,
    onClick,
}: Props) {
    const buttonClasses = cn(
        "rounded-lg transition-all cursor-pointer font-medium",
        variant === "ghost" && "text-text-muted",
        variant === "neon" &&
            "bg-neon-cyan rounded-2xl text-text-dark shadow-[0_0_20px_rgba(0,212,255,0.3)]",
        !disabled && variant === "neon" && "hover:bg-neon-cyan/80",
        variant === "danger" &&
            "bg-neon-red text-white shadow-[0_0_20px_rgba(255,77,109,0.3)]",
        variant === "destructive" &&
            "bg-neon-red/10 border border-neon-red/15 text-neon-red hover:bg-neon-red/20 hover:border-neon-red/40",
        size === "xs" && "text-xs",
        size === "sm" && "text-sm py-2",
        size === "lg" && "text-sm py-3",
        disabled && "cursor-not-allowed opacity-30 shadow-none",
        className
    )

    return href ? (
        <Link href={href} className={buttonClasses}>
            {children}
        </Link>
    ) : (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={buttonClasses}
            style={style}
        >
            {children}
        </button>
    )
}
