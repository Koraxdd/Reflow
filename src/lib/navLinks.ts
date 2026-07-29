import {
    BookOpen,
    ChartNoAxesColumn,
    LayoutDashboard,
    Settings,
    type LucideIcon,
} from "lucide-react"

type NavLink = {
    href: string
    label: string
    icon: LucideIcon
}

const navLinks: NavLink[] = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/trade-journal", label: "Trade Journal", icon: BookOpen },
    { href: "/analytics", label: "Analytics", icon: ChartNoAxesColumn },
    { href: "/settings", label: "Settings", icon: Settings },
]

export { navLinks }
