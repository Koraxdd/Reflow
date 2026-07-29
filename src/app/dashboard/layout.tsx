import DesktopHeader from "@/components/layout/DesktopHeader"
import MobileHeader from "@/components/layout/MobileHeader"
import Sidebar from "@/components/layout/Sidebar"
import type { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
    return (
        <div className="min-h-screen">
            <MobileHeader />
            <DesktopHeader />
            <Sidebar />
            <main>{children}</main>
        </div>
    )
}
