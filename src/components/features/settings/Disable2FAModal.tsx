"use client"

import { disable2FA } from "@/actions/two-factor"
import Button from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import Modal from "@/components/ui/Modal"
import Spinner from "@/components/ui/Spinner"
import { cn } from "@/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
    onClose: () => void
}

export default function Disable2FAModal({ onClose }: Props) {
    const [password, setPassword] = useState<string>("")
    const [isDisabling, setIsDisabling] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const handleDisable2FA = async () => {
        if (!password) return

        setIsDisabling(true)
        try {
            const res = await disable2FA(password)
            if (!res.success) {
                toast.error(res.error)
                return
            }

            toast.success("Two-Factor Authentication disabled!")
            onClose()
            setPassword("")
            queryClient.invalidateQueries({ queryKey: ["twoFactorStatus"] })
        } catch (err) {
            toast.error("Failed to disable 2FA")
        } finally {
            setIsDisabling(false)
        }
    }

    return (
        <Modal onClose={onClose}>
            <div className="bg-card border border-border rounded-2xl p-6 relative flex flex-col justify-center items-center gap-3">
                <h3 className="text-base font-semibold">
                    Disable Two-Factor Authentication
                </h3>
                <p className="text-sm text-text-muted text-center">
                    This will lower your account security. Please enter your
                    account password to confirm:
                </p>
                <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                        variant="danger"
                        disabled={!password || isDisabling}
                        className={cn(
                            "rounded-2xl py-2.5",
                            password && "hover:bg-neon-red/80"
                        )}
                        onClick={handleDisable2FA}
                    >
                        {isDisabling ? (
                            <div className="flex items-center justify-center gap-3">
                                <Spinner className="w-4 h-4 border-3 border-red-700 border-t-red-700/50" />
                                <span>Disabling...</span>
                            </div>
                        ) : (
                            "Disable 2FA"
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
