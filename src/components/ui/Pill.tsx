import { type ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function Pill({ children }: Props) {
    return (
        <div className="bg-input px-3 py-1.5 rounded-xl text-xs flex gap-2">
            {children}
        </div>
    )
}
