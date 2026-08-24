"use client"

import { getUserNotifications, updateUserNotifications } from "@/actions/users"
import type { NotificationSettings } from "@/app/dashboard/settings/page"
import Switch from "@/components/ui/Switch"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type Props = {
    initialSettings: NotificationSettings
}

export default function NotificationsTab({ initialSettings }: Props) {
    const queryClient = useQueryClient()

    const { data: settings } = useQuery({
        queryKey: ["notificationSettings"],
        queryFn: getUserNotifications,
        initialData: initialSettings,
    })

    const { mutate: toggleNotification } = useMutation({
        mutationFn: ({
            key,
            value,
        }: {
            key: keyof NotificationSettings
            value: boolean
        }) => updateUserNotifications(key, value),
        onMutate: async ({ key, value }) => {
            await queryClient.cancelQueries({
                queryKey: ["notificationSettings"],
            })
            const previous = queryClient.getQueryData<NotificationSettings>([
                "notificationSettings",
            ])

            queryClient.setQueryData<NotificationSettings>(
                ["notificationSettings"],
                (prev) => (prev ? { ...prev, [key]: value } : prev)
            )

            return { previous }
        },
        onError(_error, _variables, onMutateResult) {
            if (onMutateResult?.previous) {
                queryClient.setQueryData<NotificationSettings>(
                    ["notificationSettings"],
                    onMutateResult.previous
                )
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["notificationSettings"],
            })
        },
    })

    if (!settings) return null

    return (
        <div className="space-y-5">
            <h3 className="text-sm font-semibold">Notification Preferences</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                        <h4 className="text-sm font-medium">Price Alerts</h4>
                        <p className="text-xs text-text-muted">
                            Notify when watched assets hit target prices
                        </p>
                    </div>
                    <Switch
                        checked={settings.priceAlerts}
                        onChange={(checked) =>
                            toggleNotification({
                                key: "priceAlerts",
                                value: checked,
                            })
                        }
                    />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                        <h4 className="text-sm font-medium">Trade Executed</h4>
                        <p className="text-xs text-text-muted">
                            Confirm when trades are logged
                        </p>
                    </div>
                    <Switch
                        checked={settings.tradeExecuted}
                        onChange={(checked) =>
                            toggleNotification({
                                key: "tradeExecuted",
                                value: checked,
                            })
                        }
                    />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                        <h4 className="text-sm font-medium">
                            Daily Portfolio Summary
                        </h4>
                        <p className="text-xs text-text-muted">
                            Daily P&L digest at market close
                        </p>
                    </div>
                    <Switch
                        checked={settings.dailySummary}
                        onChange={(checked) =>
                            toggleNotification({
                                key: "dailySummary",
                                value: checked,
                            })
                        }
                    />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                        <h4 className="text-sm font-medium">
                            Crypto News Digest
                        </h4>
                        <p className="text-xs text-text-muted">
                            Top stories from trusted sources
                        </p>
                    </div>
                    <Switch
                        checked={settings.cryptoNews}
                        onChange={(checked) =>
                            toggleNotification({
                                key: "cryptoNews",
                                value: checked,
                            })
                        }
                    />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                        <h4 className="text-sm font-medium">Email Alerts</h4>
                        <p className="text-xs text-text-muted">
                            Receive important alerts via email
                        </p>
                    </div>
                    <Switch
                        checked={settings.emailAlerts}
                        onChange={(checked) =>
                            toggleNotification({
                                key: "emailAlerts",
                                value: checked,
                            })
                        }
                    />
                </div>
            </div>
        </div>
    )
}
