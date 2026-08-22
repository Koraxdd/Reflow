"use client"

import { Moon, Sun } from "lucide-react"
import Button from "../ui/Button"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { UserPreferences } from "@/app/dashboard/settings/page"
import { useTheme } from "next-themes"
import { getUserPreferences, updateUserPreferences } from "@/actions/users"

type Props = {
    isOpen: boolean
}

export default function DesktopHeader({ isOpen }: Props) {
    const queryClient = useQueryClient()
    const { setTheme } = useTheme()
    const pathname = usePathname()

    const { data: preferences } = useQuery({
        queryKey: ["preferences"],
        queryFn: getUserPreferences,
    })

    const { mutate: toggleTheme } = useMutation({
        mutationFn: async (newTheme: "dark" | "light") => {
            await updateUserPreferences("theme", newTheme)
        },
        onMutate: async (newTheme) => {
            await queryClient.cancelQueries({ queryKey: ["preferences"] })
            const previous = queryClient.getQueryData<UserPreferences>([
                "preferences",
            ])

            queryClient.setQueryData<UserPreferences>(
                ["preferences"],
                (prev) => (prev ? { ...prev, theme: newTheme } : prev)
            )

            return { previous }
        },
        onError(_error, _variables, onMutateResult) {
            if (onMutateResult?.previous) {
                queryClient.setQueryData<UserPreferences>(
                    ["preferences"],
                    onMutateResult.previous
                )
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["preferences"] })
        },
    })

    const handleThemeToggle = () => {
        const newTheme = preferences?.theme === "dark" ? "light" : "dark"
        setTheme(newTheme)
        toggleTheme(newTheme)
    }

    let title = "Dashboard"
    if (pathname.endsWith("/trade-journal")) title = "Trade Journal"
    if (pathname.endsWith("/analytics")) title = "Analytics"
    if (pathname.endsWith("/settings")) title = "Settings"

    return (
        <motion.header
            animate={{ marginLeft: isOpen ? 240 : 80 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="hidden md:flex px-6 py-4 justify-between items-center border-b bg-background border-border ml-60 fixed z-50 h-16 left-0 right-0"
        >
            <span className="text-text-muted text-sm font-medium">{title}</span>
            <div className="flex items-center gap-3.5">
                <Button
                    className="flex items-center text-xs rounded-2xl gap-2 bg-dark-input px-3 py-1.5 font-medium text-foreground/70"
                    onClick={handleThemeToggle}
                >
                    {preferences?.theme === "dark" ? (
                        <Sun className="text-sun w-4 h-4" />
                    ) : (
                        <Moon className="text-neon-cyan w-4 h-4" />
                    )}
                    {preferences?.theme === "dark" ? "Light Mode" : "Dark Mode"}
                </Button>
                <Button className="bg-linear-to-br from-neon-cyan/25 to-neon-purple/25 text-neon-cyan text-sm border border-neon-cyan/20 w-8 h-8 rounded-full flex justify-center items-center">
                    A
                </Button>
            </div>
        </motion.header>
    )
}
