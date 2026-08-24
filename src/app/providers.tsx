"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type ReactNode, useState } from "react"
import { ThemeProvider } from "next-themes"

type Props = {
    children: ReactNode
    session?: Session | null
}

export default function Providers({ children, session }: Props) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
            <SessionProvider session={session}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </SessionProvider>
        </ThemeProvider>
    )
}
