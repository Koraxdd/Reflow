"use client"

import Button from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import Modal from "@/components/ui/Modal"
import Spinner from "@/components/ui/Spinner"
import { cn } from "@/lib/utils"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
    onClose: () => void
    pendingCredentials: { email: string; password: string }
}

export default function Login2FAModal({ onClose, pendingCredentials }: Props) {
    const [code, setCode] = useState<string>("")
    const [isVerifying, setIsVerifying] = useState<boolean>(false)
    const router = useRouter()

    const handleVerify2FA = async () => {
        if (code.length !== 6) {
            toast.error("Please enter a valid 6-digit code")
            return
        }

        setIsVerifying(true)
        try {
            const res = await signIn("credentials", {
                email: pendingCredentials.email,
                password: pendingCredentials.password,
                twoFactorCode: code,
            })

            if (res?.error) {
                toast.error("Invalid verification code")
                return
            } else {
                router.push("/dashboard")
            }
        } catch (err) {
            toast.error("Failed to verify")
        } finally {
            setIsVerifying(false)
        }
    }

    return (
        <Modal onClose={onClose}>
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-center items-center gap-3">
                <h3 className="text-base font-semibold">
                    Two-Factor Authentication
                </h3>
                <p className="text-sm text-text-muted text-center">
                    Enter the 6-digit verification code from your authenticator
                    app to sign in.
                </p>
                <Input
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    className="tracking-widest text-center text-xl py-2"
                />
                <div className="grid grid-cols-2 gap-2.5 mt-3 w-full">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="bg-input rounded-2xl hover:opacity-80 py-2.5"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        variant="neon"
                        disabled={code.length !== 6 || isVerifying}
                        className={cn(
                            "rounded-2xl py-2.5",
                            code.length === 6 && "hover:bg-neon-cyan/80"
                        )}
                        onClick={handleVerify2FA}
                    >
                        {isVerifying ? (
                            <div className="flex items-center justify-center gap-3">
                                <Spinner className="w-4 h-4 border-3" />
                                <span>Verifying...</span>
                            </div>
                        ) : (
                            "Verify & Sign in"
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
