import { TrendingUp } from "lucide-react"
import CustomLink from "../ui/CustomLink"
import { navLinks } from "@/lib/navLinks"

export default function Sidebar() {
    return (
        <aside className="bg-header border-r border-border min-h-screen w-4/7 fixed">
            <div className="flex items-center gap-3 border-b border-border py-5 px-4">
                <TrendingUp className="bg-neon-cyan/20 text-neon-cyan w-8 h-8 p-2 rounded-xl" />
                <h2 className="text-base font-semibold">CryptoLog</h2>
            </div>
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
                            {link.label}
                        </CustomLink>
                    )
                })}
            </nav>
        </aside>
    )
}
