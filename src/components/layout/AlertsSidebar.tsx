"use client"

import { Bell, CheckCheck, X } from "lucide-react"
import { motion } from "motion/react"
import Button from "../ui/Button"

type Props = {
    isOpen: boolean
    handleToggle: () => void
}

export default function AlertsSidebar({ isOpen, handleToggle }: Props) {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-100"
                    onClick={handleToggle}
                />
            )}
            <motion.aside
                initial={{ x: 0 }}
                animate={{ width: isOpen ? 340 : 0 }}
                transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                className="bg-header border-l border-border min-h-screen fixed z-110 top-0 right-0 flex flex-col"
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <div className="flex items-center gap-2.5">
                        <Bell className="w-4 h-4 text-neon-cyan" />
                        <span className="text-sm font-semibold">Alerts</span>
                        <span className="bg-neon-red rounded-full text-xs font-bold w-5.5 h-5.5 flex items-center justify-center">
                            3
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button className="bg-neon-cyan/10 text-neon-cyan text-xs flex items-center justify-center gap-1 px-2 py-1 rounded-lg hover:opacity-80">
                            <CheckCheck className="w-3 h-3" />
                            Mark all read
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-6 h-6 rounded-full bg-input flex items-center justify-center hover:opacity-80"
                            onClick={handleToggle}
                        >
                            <X className="w-3.5 h-3.5" />
                        </Button>
                    </div>
                </div>
                <div className="overflow-y-auto flex-1 p-3 space-y-1"></div>
                <div className="border-t border-border px-5 py-4">
                    <Button
                        variant="ghost"
                        className="bg-input border border-border w-full rounded-xl py-2.5 text-xs font-semibold hover:opacity-80"
                    >
                        View all activity
                    </Button>
                </div>
            </motion.aside>
        </>
    )
}
