"use client"

import { enable2FA, generate2FASecret } from "@/actions/two-factor"
import { updatePassword } from "@/actions/users"
import Button from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import Modal from "@/components/ui/Modal"
import Spinner from "@/components/ui/Spinner"
import { cn } from "@/lib/utils"
import { type SecurityInput, SecuritySchema } from "@/schemas/security.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { Shield } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"

export default function SecurityTab() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [code, setCode] = useState<string>("")
    const [isVerifying, setIsVerifying] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<SecurityInput>({
        resolver: zodResolver(SecuritySchema),
    })

    const { data: qrCode, isLoading } = useQuery({
        queryKey: ["qrCode"],
        queryFn: generate2FASecret,
        enabled: isOpen,
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
            setIsOpen(false)
            setCode("")
        } catch (err) {
            toast.error("Failed to enable 2FA")
        } finally {
            setIsVerifying(false)
        }
    }

    const onSubmit: SubmitHandler<SecurityInput> = async (data) => {
        try {
            const res = await updatePassword(
                data.currentPassword,
                data.newPassword
            )
            if (res?.error) {
                setError("currentPassword", { message: res.error })
                return
            }
            reset()
            toast.success("Password updated successfully")
        } catch (err) {
            setError("root", { message: "Failed to change password" })
            toast.error("Failed to change password")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h3 className="text-sm font-semibold mb-1">Change Password</h3>
                <p className="text-xs text-text-muted font-medium mb-5">
                    Choose a strong password with at least 8 characters.
                </p>
                <div className="flex flex-col gap-2.5">
                    <Input
                        {...register("currentPassword")}
                        type="password"
                        placeholder="••••••••"
                        label="CURRENT PASSWORD"
                        className="py-2 text-foreground"
                    />
                    {errors.currentPassword && (
                        <span className="text-neon-cyan text-xs">
                            {errors.currentPassword.message}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2.5">
                    <Input
                        {...register("newPassword")}
                        type="password"
                        placeholder="••••••••"
                        label="NEW PASSWORD"
                        className="py-2 text-foreground"
                    />
                    {errors.newPassword && (
                        <span className="text-neon-cyan text-xs">
                            {errors.newPassword.message}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2.5">
                    <Input
                        {...register("confirmPassword")}
                        type="password"
                        placeholder="••••••••"
                        label="CONFIRM PASSWORD"
                        className="py-2 text-foreground"
                    />
                    {errors.confirmPassword && (
                        <span className="text-neon-cyan text-xs">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2.5">
                    {errors.root && (
                        <span className="text-neon-cyan text-xs">
                            {errors.root.message}
                        </span>
                    )}
                    <Button
                        type="submit"
                        variant="neon"
                        size="sm"
                        className="px-4 self-start"
                    >
                        Update Password
                    </Button>
                </div>
                <div className="pt-4 border-t border-border">
                    <h3 className="text-sm font-semibold mb-4">
                        Two-Factor Authentication
                    </h3>
                    <div className="bg-input p-4 border border-border rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Shield className="text-neon-green w-5 h-5" />
                            <div>
                                <h4 className="text-sm font-medium">
                                    Authenticator App
                                </h4>
                                <p className="text-xs text-text-muted">
                                    Not configured
                                </p>
                            </div>
                        </div>
                        <Button
                            type="button"
                            size="xs"
                            className="text-neon-cyan bg-neon-cyan/10 px-3 py-1.5 rounded-xl"
                            onClick={() => setIsOpen(true)}
                        >
                            Enable
                        </Button>
                    </div>
                </div>
            </form>
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <div className="bg-card border border-border rounded-2xl p-6 relative flex flex-col justify-center items-center gap-3">
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
                                    <p className="text-sm text-center font-medium">
                                        1. Scan this QR code with your
                                        authenticator app.
                                    </p>
                                    <Image
                                        src={qrCodeUrl}
                                        width={200}
                                        height={200}
                                        alt="Scan QR Code"
                                    />
                                    <p className="text-sm text-center font-medium">
                                        2. Enter the 6-digit code from your app
                                        to verify:
                                    </p>
                                    <Input
                                        type="text"
                                        maxLength={6}
                                        placeholder="000000"
                                        value={code}
                                        onChange={(e) =>
                                            setCode(
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                )
                                            )
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
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                variant="neon"
                                disabled={code.length !== 6 || isVerifying}
                                className={cn(
                                    "rounded-2xl py-2.5",
                                    !isVerifying && "hover:opacity-90"
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
            )}
        </>
    )
}
