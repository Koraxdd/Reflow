"use client"

import { getUserPreferences, updateUserPreferences } from "@/actions/users"
import type { UserPreferences } from "@/app/dashboard/settings/page"
import Button from "@/components/ui/Button"
import Switch from "@/components/ui/Switch"
import { chartOptions } from "@/lib/chartOptions"
import { cn } from "@/lib/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Moon } from "lucide-react"

type Props = {
    initialPreferences: UserPreferences
}

export default function PreferencesTab({ initialPreferences }: Props) {
    const queryClient = useQueryClient()

    const { data: preferences } = useQuery({
        queryKey: ["preferences"],
        queryFn: getUserPreferences,
        initialData: initialPreferences,
    })

    const { mutate: togglePreferences } = useMutation({
        mutationFn: async ({
            key,
            value,
        }: {
            key: keyof UserPreferences
            value: UserPreferences[keyof UserPreferences]
        }) => updateUserPreferences(key, value),
        onMutate: async ({ key, value }) => {
            await queryClient.cancelQueries({ queryKey: ["preferences"] })
            const previous = queryClient.getQueryData<UserPreferences>([
                "preferences",
            ])

            queryClient.setQueryData<UserPreferences>(
                ["preferences"],
                (prev) => (prev ? { ...prev, [key]: value } : prev)
            )

            return { previous }
        },
        onError(error, variables, onMutateResult) {
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

    if (!preferences) return null

    return (
        <div className="space-y-5">
            <h3 className="text-sm font-semibold">Appearance & Preferences</h3>
            <div className="flex items-center justify-between border-b border-border py-3">
                <div className="flex items-center gap-3">
                    <Moon className="w-4 h-4 text-neon-cyan" />
                    <div>
                        <h4 className="text-sm font-medium">Dark Mode</h4>
                        <p className="text-xs text-text-muted">
                            Switch between light and dark interface
                        </p>
                    </div>
                </div>
                <Switch
                    checked={preferences.theme === "dark"}
                    onChange={(checked) =>
                        togglePreferences({
                            key: "theme",
                            value: checked ? "dark" : "light",
                        })
                    }
                />
            </div>
            <div className="flex items-center justify-between border-b border-border py-3">
                <div>
                    <h4 className="text-sm font-medium">Compact View</h4>
                    <p className="text-xs text-text-muted">
                        Reduce spacing for more data density
                    </p>
                </div>
                <Switch
                    checked={preferences.compactView}
                    onChange={(checked) =>
                        togglePreferences({
                            key: "compactView",
                            value: checked,
                        })
                    }
                />
            </div>
            <div className="space-y-2">
                <h4 className="text-sm font-medium">Default Chart Type</h4>
                <div className="flex gap-2">
                    {chartOptions.map((option) => {
                        const isActive =
                            option.value === preferences.defaultChart
                        return (
                            <Button
                                key={option.label}
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "bg-input px-4 rounded-2xl hover:opacity-80",
                                    isActive &&
                                        "border border-neon-cyan/20 bg-neon-cyan/10 text-neon-cyan"
                                )}
                                onClick={() =>
                                    togglePreferences({
                                        key: "defaultChart",
                                        value: option.value,
                                    })
                                }
                            >
                                {option.label}
                            </Button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
