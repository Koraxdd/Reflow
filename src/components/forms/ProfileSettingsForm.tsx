"use client"

import Button from "../ui/Button"
import { Input } from "../ui/Input"

export default function ProfileSettingsForm() {
    return (
        <form className="space-y-4">
            <h3 className="text-sm font-semibold mb-5">Profile Details</h3>
            <div className="grid grid-cols-2 gap-4">
                <Input
                    type="text"
                    label="FULL NAME"
                    className="py-2 text-foreground"
                />
                <Input
                    type="text"
                    label="EMAIL"
                    className="py-2 text-foreground"
                />
                <div className="flex flex-col gap-2">
                    <label className="text-text-muted font-semibold text-xs">
                        TIMEZONE
                    </label>
                    <select className="bg-input border border-border rounded-2xl px-3 py-2 text-sm font-light outline-none">
                        <option>UTC-5</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-text-muted font-semibold text-xs">
                        BASE CURRENCY
                    </label>
                    <select className="bg-input border border-border rounded-2xl px-3 py-2 text-sm font-light outline-none">
                        <option>USD</option>
                    </select>
                </div>
            </div>
            <Button type="submit" variant="neon" size="sm" className="px-4">
                Save Changes
            </Button>
        </form>
    )
}
