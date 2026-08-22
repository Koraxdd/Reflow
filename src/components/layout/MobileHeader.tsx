"use client"

import { Menu, Moon, Sun } from "lucide-react"
import Button from "../ui/Button"
import { useTheme } from "next-themes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserPreferences, updateUserPreferences } from "@/actions/users"
import type { UserPreferences } from "@/app/dashboard/settings/page"

type Props = {
    handleOpen: () => void
}

export default function MobileHeader({ handleOpen }: Props) {
    const queryClient = useQueryClient()
    const { setTheme } = useTheme()

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

    return (
        <header className="bg-header border border-border px-5 py-4 flex justify-between fixed left-0 right-0 z-50 h-17 md:hidden">
            <div className="flex items-center gap-3">
                <Button className="text-white/50 cursor-pointer p-1">
                    <Menu className="w-5 h-5" onClick={handleOpen} />
                </Button>
                <h1 className="text-base font-semibold text-white">Reflow</h1>
            </div>
            <Button
                className="w-8 h-8 bg-[#FFFFFF0F] rounded-xl flex items-center justify-center"
                onClick={handleThemeToggle}
            >
                {preferences?.theme === "dark" ? (
                    <Sun className="w-4 h-4 text-sun" />
                ) : (
                    <Moon className="w-4 h-4 text-neon-cyan" />
                )}
            </Button>
        </header>
    )
}
