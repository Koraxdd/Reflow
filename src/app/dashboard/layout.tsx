import Header from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import type { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
    return (
        <>
            <Header />
            <Sidebar />
            <main>{children}</main>
        </>
    )
}
