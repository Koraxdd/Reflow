import AuthForm from "@/components/forms/AuthForm"
import DemoButton from "@/components/ui/DemoButton"
import { TrendingUp } from "lucide-react"

export default function LandingPage() {
    return (
        <>
            <div className="absolute inset-0 bg-grid -z-50" />
            <div className="min-h-screen flex flex-col justify-center items-center px-5 gap-10">
                <div className="fixed inset-0 -z-10">
                    <div className="absolute left-120 top-65 h-90 w-90 rounded-full bg-neon-cyan/10 blur-[60px]" />
                    <div className="absolute right-120 top-115 h-60 w-60 rounded-full bg-neon-purple/10 blur-[60px]" />
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="bg-neon-cyan/20 text-neon-cyan w-10 h-10 p-2.5 rounded-2xl" />
                        <h1>Reflow</h1>
                    </div>
                    <span className="text-sm text-text-muted">
                        Track every trade. Master every move.
                    </span>
                </div>
                <AuthForm />
                <DemoButton />
            </div>
        </>
    )
}
