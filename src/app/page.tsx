import AuthForm from "@/components/forms/AuthForm"
import { TrendingUp } from "lucide-react"

export default function LandingPage() {
  return (
    <>
      <div className="absolute inset-0 bg-grid -z-50" />
      <div className="min-h-screen flex flex-col justify-center items-center px-5 gap-10">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="bg-neon-cyan/20 text-neon-cyan w-10 h-10 p-2.5 rounded-2xl" />
            <h1>CryptoLog</h1>
          </div>
          <span className="text-sm text-text-muted">Track every trade. Master every move.</span>
        </div>
        <AuthForm />
      </div>
    </>
  )
}