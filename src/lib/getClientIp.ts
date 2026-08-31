import { headers } from "next/headers"

export async function getClientIp(): Promise<string> {
    const headerList = await headers()
    const forwardedFor = headerList.get("x-forwarded-for")
    return forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown"
}
