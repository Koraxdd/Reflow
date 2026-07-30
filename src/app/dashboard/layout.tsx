import DashboardShell from "@/components/layout/DashboardShell"
import type { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
    return (
        <div className="min-h-screen">
            <DashboardShell />
            <main>{children}</main>
        </div>
    )
}
