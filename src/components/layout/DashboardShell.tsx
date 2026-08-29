"use client"

import { useState, type ReactNode } from "react"
import DesktopHeader from "./DesktopHeader"
import MobileHeader from "./MobileHeader"
import Sidebar from "./Sidebar"
import { motion } from "motion/react"
import { useDesktop } from "@/hooks/useDesktop"
import AlertsSidebar from "./AlertsSidebar"

type Props = {
    children: ReactNode
}

export default function DashboardShell({ children }: Props) {
    const { isDesktop, isOpen, setIsOpen } = useDesktop()
    const [isAlertsOpen, setIsAlertsOpen] = useState<boolean>(false)

    return (
        <>
            <MobileHeader handleOpen={() => setIsOpen(true)} />
            <DesktopHeader isOpen={isOpen} />
            <Sidebar
                isDesktop={isDesktop}
                isOpen={isOpen}
                handleAlertsToggle={() => setIsAlertsOpen((prev) => !prev)}
                handleToggle={() => setIsOpen((prev) => !prev)}
            />
            <motion.main
                animate={{ marginLeft: isDesktop ? (isOpen ? 240 : 80) : 0 }}
                transition={{ type: "tween", duration: 0.2 }}
                className="mt-17 md:mt-16"
            >
                {children}
            </motion.main>
            <AlertsSidebar
                isOpen={isAlertsOpen}
                handleToggle={() => setIsAlertsOpen((prev) => !prev)}
            />
        </>
    )
}
