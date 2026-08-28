"use server"

import { getUserId } from "@/lib/getUserId"
import { getUserById, updateUser2FA } from "@/queries/users"
import { generateSecret, generateURI, verify } from "otplib"
import QRCode from "qrcode"

export async function generate2FASecret(): Promise<{
    secret: string
    qrCodeUrl: string
}> {
    const userId = await getUserId()
    const user = await getUserById(userId)
    if (!user) throw new Error("User not found")

    const secret = generateSecret()
    const uri = generateURI({
        issuer: "Reflow",
        label: user.email,
        secret,
    })

    const qrCodeUrl = await QRCode.toDataURL(uri)

    return { secret, qrCodeUrl }
}

export async function enable2FA(
    secret: string,
    token: string
): Promise<{ success: boolean; error?: string }> {
    const userId = await getUserId()
    const { valid } = await verify({ secret, token })

    if (!valid) {
        return { success: false, error: "Invalid verification code" }
    }

    await updateUser2FA(userId, secret)

    return { success: true }
}
