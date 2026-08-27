import type { VerificationToken } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"

export async function createVerificationToken(
    userId: string,
    token: string,
    expiresAt: Date
): Promise<VerificationToken> {
    return await prisma.verificationToken.upsert({
        where: { userId },
        create: { userId, token, expiresAt },
        update: { token, expiresAt, createdAt: new Date() },
    })
}

export async function getVerificationToken(
    token: string
): Promise<VerificationToken | null> {
    return await prisma.verificationToken.findUnique({ where: { token } })
}

export async function deleteVerificationToken(
    token: string
): Promise<VerificationToken> {
    return await prisma.verificationToken.delete({ where: { token } })
}
