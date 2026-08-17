"use client"

import { useEffect, useState } from "react"

export function useDesktop(breakpoint: number = 768) {
    const [isDesktop, setIsDesktop] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        const mediaQueryList = window.matchMedia(`(min-width: ${breakpoint}px)`)

        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsDesktop(e.matches)
            setIsOpen(e.matches)
        }
        handleChange(mediaQueryList)
        mediaQueryList.addEventListener("change", handleChange)
        return () => mediaQueryList.removeEventListener("change", handleChange)
    }, [breakpoint])

    return { isDesktop, isOpen, setIsOpen }
}
