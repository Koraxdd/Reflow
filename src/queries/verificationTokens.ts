import type { VerificationToken } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"

export async function createVerificationToken(
    userId: string,
    token: string,
    expiresAt: Date
): Promise<VerificationToken> {
    return await prisma.verificationToken.create({
        data: { userId, token, expiresAt },
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
