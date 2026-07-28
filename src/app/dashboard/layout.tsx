import Header from "@/components/layout/Header"
import type { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    )
}
