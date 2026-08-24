"use client"

import { getUserPreferences } from "@/actions/users"
import type { UserPreferences } from "@/app/dashboard/settings/page"
import { useQuery } from "@tanstack/react-query"

export function useUserPreferences(): UserPreferences | null | undefined {
    const { data: preferences } = useQuery({
        queryKey: ["preferences"],
        queryFn: getUserPreferences,
    })

    return preferences
}
