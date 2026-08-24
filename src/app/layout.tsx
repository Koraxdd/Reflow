import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "./providers"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Toaster } from "sonner"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})

export const metadata: Metadata = {
    title: "Reflow",
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await getServerSession(authOptions)

    return (
        <html
            lang="en"
            className={`${inter.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col">
                <Providers session={session}>
                    {children}
                    <Toaster position="top-right" richColors theme="system" />
                </Providers>
            </body>
        </html>
    )
}
