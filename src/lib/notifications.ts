import { createUserNotification } from "@/queries/notifications"
import { getUserNotificationSettings } from "@/queries/users"
import { resend } from "./resend"

export async function sendTradeNotification(
    userId: string,
    email: string,
    title: string,
    message: string
) {
    const { tradeExecuted, emailAlerts } =
        (await getUserNotificationSettings(userId)) ?? {}

    if (!tradeExecuted) return

    await createUserNotification(userId, title, message, "tradeExecuted")

    if (emailAlerts) {
        await resend.emails.send({
            from: "Reflow <onboarding@resend.dev>",
            to: email,
            subject: title,
            text: message,
        })
    }
}
