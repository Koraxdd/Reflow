import { cn } from "@/lib/utils"

type Props = {
    className?: string
}

export default function Spinner({ className }: Props) {
    return (
        <div
            className={cn(
                "w-5 h-5 border-4 border-blue-600 border-t-blue-600/10 rounded-full animate-spin",
                "[animation-duration:1.2s]",
                className
            )}
        />
    )
}
