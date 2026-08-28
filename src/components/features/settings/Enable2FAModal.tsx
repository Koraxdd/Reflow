"use client"

import { enable2FA, generate2FASecret } from "@/actions/two-factor"
import Button from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import Modal from "@/components/ui/Modal"
import Spinner from "@/components/ui/Spinner"
import { cn } from "@/lib/utils"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
    onClose: () => void
}

export default function Enable2FAModal({ onClose }: Props) {
    const [code, setCode] = useState<string>("")
    const [isVerifying, setIsVerifying] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const { data: qrCode, isLoading } = useQuery({
        queryKey: ["qrCode"],
        queryFn: generate2FASecret,
        staleTime: Infinity,
    })

    const { secret, qrCodeUrl } = qrCode ?? {}

    const handleEnable2FA = async () => {
        if (!secret || code.length !== 6) {
            toast.error("Please enter a valid 6-digit code")
            return
        }

        setIsVerifying(true)
        try {
            const res = await enable2FA(secret, code)
            if (!res.success) {
                toast.error(res.error)
                return
            }

            toast.success("Two-Factor Authentication enabled!")
            onClose()
            setCode("")
            queryClient.invalidateQueries({ queryKey: ["twoFactorStatus"] })
        } catch (err) {
            toast.error("Failed to enable 2FA")
        } finally {
            setIsVerifying(false)
        }
    }

    return (
        <Modal onClose={onClose}>
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-center items-center gap-3">
                {isLoading ? (
                    <>
                        <p className="text-sm text-center font-medium">
                            Generating QR code...
                        </p>
                        <Spinner className="w-46 h-46 border-10" />
                    </>
                ) : (
                    qrCodeUrl && (
                        <>
                            <h3 className="text-base font-semibold">
                                Enable Two-Factor Authentication
                            </h3>
                            <p className="text-sm text-text-muted text-center font-medium">
                                1. Scan this QR code with your authenticator
                                app.
                            </p>
                            <Image
                                src={qrCodeUrl}
                                width={200}
                                height={200}
                                alt="Scan QR Code"
                            />
                            <p className="text-sm text-text-muted text-center font-medium">
                                2. Enter the 6-digit code from your app to
                                verify:
                            </p>
                            <Input
                                type="text"
                                maxLength={6}
                                placeholder="000000"
                                value={code}
                                onChange={(e) =>
                                    setCode(e.target.value.replace(/\D/g, ""))
                                }
                                className="tracking-widest text-center text-xl py-2"
                            />
                        </>
                    )
                )}
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
                        onClick={handleEnable2FA}
                    >
                        {isVerifying ? (
                            <div className="flex items-center justify-center gap-3">
                                <Spinner className="w-4 h-4 border-3" />
                                <span>Verifying...</span>
                            </div>
                        ) : (
                            "Verify & Enable"
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
