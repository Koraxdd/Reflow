"use client"

import { baseCurrencies } from "@/lib/baseCurrencies"
import Button from "../../ui/Button"
import { Input } from "../../ui/Input"
import { timezones } from "@/lib/timezones"
import {
    useForm,
    type SubmitHandler,
    type SubmitErrorHandler,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProfileInput, ProfileSchema } from "@/schemas/profile.schema"
import { updateUser } from "@/actions/users"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type Props = {
    userId: string
    username: string
    email: string
    timezone: string
    baseCurrency: string
}

export default function ProfileTab({
    userId,
    username,
    email,
    timezone,
    baseCurrency,
}: Props) {
    const { update } = useSession()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<ProfileInput>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            username,
            email,
            timezone,
            baseCurrency,
        },
    })

    const onSubmit: SubmitHandler<ProfileInput> = async (data) => {
        try {
            await updateUser(userId, data)
            await update({
                username: data.username,
                email: data.email,
            })
            reset(data)
            router.refresh()
        } catch (err) {
            setError("root", { message: "Failed to update data" })
        }
    }

    const onInvalid: SubmitErrorHandler<ProfileInput> = (errors) => {}

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="space-y-4"
        >
            <h3 className="text-sm font-semibold mb-5">Profile Details</h3>
            <div className="grid grid-cols-2 gap-4">
                <Input
                    {...register("username")}
                    type="text"
                    label="USERNAME"
                    className="py-2 text-foreground"
                />
                <Input
                    {...register("email")}
                    type="text"
                    label="EMAIL"
                    className="py-2 text-foreground"
                />
                <div className="flex flex-col gap-2">
                    <label className="text-text-muted font-semibold text-xs">
                        TIMEZONE
                    </label>
                    <select
                        {...register("timezone")}
                        className="bg-input border border-border rounded-2xl px-3 py-2 text-sm font-light outline-none"
                    >
                        {timezones.map((timezone) => (
                            <option key={timezone.value} value={timezone.value}>
                                {timezone.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-text-muted font-semibold text-xs">
                        BASE CURRENCY
                    </label>
                    <select
                        {...register("baseCurrency")}
                        className="bg-input border border-border rounded-2xl px-3 py-2 text-sm font-light outline-none"
                    >
                        {baseCurrencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {errors.root && (
                <span className="text-neon-cyan text-xs">
                    {errors.root.message}
                </span>
            )}
            <Button type="submit" variant="neon" size="sm" className="px-4">
                Save Changes
            </Button>
        </form>
    )
}
