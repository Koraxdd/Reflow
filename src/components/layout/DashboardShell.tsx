"use client"

import { type ReactNode, useEffect, useState } from "react"
import DesktopHeader from "./DesktopHeader"
import MobileHeader from "./MobileHeader"
import Sidebar from "./Sidebar"
import { motion } from "motion/react"

type Props = {
    children: ReactNode
}

export default function DashboardShell({ children }: Props) {
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
            <motion.main
                animate={isDesktop && { marginLeft: isOpen ? 240 : 80 }}
                transition={{ type: "tween", duration: 0.2 }}
                className="md:ml-60"
            >
                {children}
            </motion.main>
        </>
    )
}
