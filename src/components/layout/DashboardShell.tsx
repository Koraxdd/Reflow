"use client"

import { type ReactNode } from "react"
import DesktopHeader from "./DesktopHeader"
import MobileHeader from "./MobileHeader"
import Sidebar from "./Sidebar"
import { motion } from "motion/react"
import { useDesktop } from "@/hooks/useDesktop"

type Props = {
    children: ReactNode
}

export default function DashboardShell({ children }: Props) {
    const { isDesktop, isOpen, setIsOpen } = useDesktop()

    return (
        <>
            <MobileHeader handleOpen={() => setIsOpen(true)} />
            <DesktopHeader isOpen={isOpen} />
            <Sidebar
                isDesktop={isDesktop}
                isOpen={isOpen}
                handleToggle={() => setIsOpen((prev) => !prev)}
            />
            <motion.main
                animate={{ marginLeft: isDesktop ? (isOpen ? 240 : 80) : 0 }}
                transition={{ type: "tween", duration: 0.2 }}
                className="mt-17 md:mt-16"
            >
                {children}
            </motion.main>
        </>
    )
}
