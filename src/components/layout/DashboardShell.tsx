"use client"

import { useState } from "react"
import DesktopHeader from "./DesktopHeader"
import MobileHeader from "./MobileHeader"
import Sidebar from "./Sidebar"

export default function DashboardShell() {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    return (
        <>
            <MobileHeader isOpen={isOpen} />
            <DesktopHeader isOpen={isOpen} />
            <Sidebar
                isOpen={isOpen}
                handleToggle={() => setIsOpen((prev) => !prev)}
            />
        </>
    )
}
