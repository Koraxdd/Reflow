import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import argon2 from "argon2"

export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })
                if (!user) return null

                const validPassword = await argon2.verify(user.password, credentials.password)
                if (!validPassword) return null

                return { id: user.id, email: user.email, name: user.username }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            return session
        }
    },
    pages: {
        signIn: "/"
    }
}