import { getUserById, updateUserEmail, verifyUser } from "@/queries/users"
import {
    deleteVerificationToken,
    getVerificationToken,
} from "@/queries/verificationTokens"
import { redirect } from "next/navigation"

type Props = {
    searchParams: Promise<{ token?: string }>
}

export default async function VerifyEmailPage({ searchParams }: Props) {
    const { token } = await searchParams
    if (!token)
        return (
            <p className="flex items-center justify-center h-screen text-xl text-text-muted font-medium">
                Invalid verification link.
            </p>
        )

    const verificationToken = await getVerificationToken(token)
    if (!verificationToken || verificationToken.expiresAt < new Date()) {
        return (
            <p className="flex items-center justify-center h-screen text-xl text-text-muted font-medium">
                This verification link is invalid or has expired.
            </p>
        )
    }

    const user = await getUserById(verificationToken.userId)
    if (!user) return

    if (user.pendingEmail) {
        await updateUserEmail(user.id, user.pendingEmail)
    } else {
        await verifyUser(verificationToken.userId)
    }
    await deleteVerificationToken(token)

    redirect("/?verified=true")
}
