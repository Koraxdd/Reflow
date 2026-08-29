"use client"

import { get2FAStatus } from "@/actions/two-factor"
import { updatePassword } from "@/actions/users"
import Button from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { type SecurityInput, SecuritySchema } from "@/schemas/security.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { Shield } from "lucide-react"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import Enable2FAModal from "./Enable2FAModal"
import Disable2FAModal from "./Disable2FAModal"

export default function SecurityTab() {
    const [activeModal, setActiveModal] = useState<"enable" | "disable" | null>(
        null
    )

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<SecurityInput>({
        resolver: zodResolver(SecuritySchema),
    })

    const { data: is2FAEnabled, isLoading } = useQuery({
        queryKey: ["twoFactorStatus"],
        queryFn: get2FAStatus,
    })

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
                                    {isLoading
                                        ? "Loading..."
                                        : is2FAEnabled
                                          ? "Enabled"
                                          : "Not configured"}
                                </p>
                            </div>
                        </div>
                        {is2FAEnabled ? (
                            <Button
                                type="button"
                                size="xs"
                                className="text-neon-red bg-neon-red/10 px-3 py-1.5 rounded-xl hover:opacity-80 active:scale-95"
                                onClick={() => setActiveModal("disable")}
                            >
                                Disable
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                size="xs"
                                className="text-neon-cyan bg-neon-cyan/10 px-3 py-1.5 rounded-xl hover:opacity-80 active:scale-95"
                                onClick={() => setActiveModal("enable")}
                            >
                                Enable
                            </Button>
                        )}
                    </div>
                </div>
            </form>
            {activeModal === "enable" && (
                <Enable2FAModal onClose={() => setActiveModal(null)} />
            )}
            {activeModal === "disable" && (
                <Disable2FAModal onClose={() => setActiveModal(null)} />
            )}
        </>
    )
}
