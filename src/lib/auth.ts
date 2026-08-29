import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import argon2 from "argon2"
import { verify } from "otplib"

export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
                twoFactorCode: {},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })
                if (!user) return null

                const validPassword = await argon2.verify(
                    user.password,
                    credentials.password
                )
                if (!validPassword) return null

                if (!user.emailVerified) return null

                if (user.twoFactorEnabled) {
                    if (!credentials.twoFactorCode) return null

                    const { valid } = await verify({
                        secret: user.twoFactorSecret!,
                        token: credentials.twoFactorCode,
                    })
                    if (!valid) return null

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.username,
                    }
                }

                return { id: user.id, email: user.email, name: user.username }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
            }

            if (trigger === "update") {
                if (session.email) token.email = session.email
                if (session.username) token.name = session.username
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.email = token.email as string
                session.user.name = token.name as string
            }
            return session
        },
    },
    pages: {
        signIn: "/",
    },
}
