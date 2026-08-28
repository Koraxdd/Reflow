"use server"

import { getUserId } from "@/lib/getUserId"
import { getUserById, updateUser2FA } from "@/queries/users"
import { generateSecret, generateURI, verify } from "otplib"
import QRCode from "qrcode"
import argon2 from "argon2"

type TwoFactorResponse = {
    success: boolean
    error?: string
}

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
): Promise<TwoFactorResponse> {
    const userId = await getUserId()
    const { valid } = await verify({ secret, token })

    if (!valid) {
        return { success: false, error: "Invalid verification code" }
    }

    await updateUser2FA(userId, secret, true)

    return { success: true }
}

export async function disable2FA(password: string): Promise<TwoFactorResponse> {
    const userId = await getUserId()
    const user = await getUserById(userId)

    if (!user) {
        return { success: false, error: "User not found" }
    }

    const isPasswordValid = await argon2.verify(user.password, password)
    if (!isPasswordValid) {
        return { success: false, error: "Invalid password" }
    }

    await updateUser2FA(userId, null, false)

    return { success: true }
}

export async function get2FAStatus(): Promise<boolean> {
    const userId = await getUserId()
    const user = await getUserById(userId)

    return user?.twoFactorEnabled ?? false
}
