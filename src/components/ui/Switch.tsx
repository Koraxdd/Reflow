"use client"

import { cn } from "@/lib/utils"
import Button from "./Button"

type Props = {
    checked: boolean
    onChange: (checked: boolean) => void
}

export default function Switch({ checked, onChange }: Props) {
    return (
        <Button
            className={cn(
                "relative w-11 h-6 bg-switch rounded-full duration-200 shrink-0",
                checked && "bg-neon-cyan"
            )}
            onClick={() => onChange(!checked)}
        >
            <span
                className={cn(
                    "absolute top-0.5 left-0.5 rounded-full w-5 h-5 bg-white transition-all duration-200",
                    checked && "translate-x-5.25"
                )}
            ></span>
        </Button>
    )
}
