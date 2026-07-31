"use client"

import { useEffect, useState } from "react"
import DesktopHeader from "./DesktopHeader"
import MobileHeader from "./MobileHeader"
import Sidebar from "./Sidebar"

export default function DashboardShell() {
    const [isDesktop, setIsDesktop] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        const check = () => {
            const desktop = window.innerWidth >= 768
            setIsDesktop(desktop)
            setIsOpen(desktop)
        }
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    return (
        <>
            <MobileHeader handleOpen={() => setIsOpen(true)} />
            <DesktopHeader isOpen={isOpen} />
            <Sidebar
                isDesktop={isDesktop}
                isOpen={isOpen}
                handleToggle={() => setIsOpen((prev) => !prev)}
            />
        </>
    )
}
