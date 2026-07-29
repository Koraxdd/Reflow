"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

type Props = {
    children: ReactNode
    href: string
    className?: string
}

export default function CustomLink({ children, href, className }: Props) {
    const pathname = usePathname()

    return (
        <Link
            href={href}
            className={cn(
                "font-medium text-sm text-link px-3 py-2",
                pathname === href &&
                    "text-neon-cyan border border-neon-cyan/15 rounded-2xl bg-neon-cyan/10",
                className
            )}
        >
            {children}
        </Link>
    )
}
