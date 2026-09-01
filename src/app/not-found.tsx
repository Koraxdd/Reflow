"use client"

import Button from "@/components/ui/Button"
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="flex gap-6 flex-col items-center justify-center h-screen">
            <h1 className="text-6xl">Page Not Found</h1>
            <p className="text-text-muted">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Button
                size="lg"
                variant="neon"
                className="px-4"
                onClick={() => router.push("/dashboard")}
            >
                Take me home
            </Button>
        </div>
    )
}
