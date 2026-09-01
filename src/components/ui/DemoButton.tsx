"use client"

import { signIn } from "next-auth/react"
import Button from "./Button"
import { useRouter } from "next/navigation"

export default function DemoButton() {
    const router = useRouter()

    return (
        <Button
            variant="ghost"
            className="hover:opacity-80"
            onClick={async () => {
                const res = await signIn("credentials", {
                    email: "demo@gmail.com",
                    password: "demo1234",
                    redirect: false,
                })
                if (!res?.error) {
                    router.push("/dashboard")
                }
            }}
        >
            Try Live Demo (No Sign Up)
        </Button>
    )
}
