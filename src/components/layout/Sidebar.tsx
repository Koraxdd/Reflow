import { Bell, TrendingUp } from "lucide-react"
import CustomLink from "../ui/CustomLink"
import { navLinks } from "@/lib/navLinks"
import LogoutButton from "../ui/LogoutButton"
import SidebarButton from "../ui/SidebarButton"
import { motion } from "motion/react"

type Props = {
    isDesktop: boolean
    isOpen: boolean
    handleToggle: () => void
}

export default function Sidebar({ isDesktop, isOpen, handleToggle }: Props) {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-99 md:hidden"
                    onClick={handleToggle}
                />
            )}
            <motion.aside
                initial={isDesktop ? { x: 0 } : false}
                animate={
                    isDesktop
                        ? { width: isOpen ? 240 : 80 }
                        : { x: isOpen ? 0 : -300, width: 220 }
                }
                transition={{ type: "tween", duration: 0.2 }}
                className="bg-header border-r border-border min-h-screen fixed z-100 top-0 flex flex-col"
            >
                <div className="flex items-center gap-3 border-b border-border py-5 px-4">
                    <TrendingUp className="bg-neon-cyan/20 text-neon-cyan w-8 h-8 p-2 rounded-xl" />
                    {isOpen && (
                        <h2 className="text-base font-semibold">Reflow</h2>
                    )}
                </div>
                <SidebarButton onClick={handleToggle} isOpen={isOpen} />
                <nav className="p-4 flex flex-col gap-1">
                    {navLinks.map((link) => {
                        const Icon = link.icon
                        return (
                            <CustomLink
                                key={link.href}
                                href={link.href}
                                className="w-full flex items-center gap-3"
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {isOpen && link.label}
                            </CustomLink>
                        )
                    })}
                </nav>
                <div className="py-5 px-4 border-t border-border mt-auto">
                    <CustomLink
                        href="/alerts"
                        className="w-full flex items-center gap-3"
                    >
                        <Bell className="w-3.5 h-3.5" />
                        {isOpen && "Alerts"}
                    </CustomLink>
                    <LogoutButton
                        size="sm"
                        className="w-full flex items-center gap-3 px-3 py-2 text-link font-medium rounded-2xl hover:bg-red-500/10"
                        isOpen={isOpen}
                    />
                </div>
            </motion.aside>
        </>
    )
}
