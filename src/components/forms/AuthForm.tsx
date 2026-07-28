"use client"

import { z } from "zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Lock, Mail, User } from "lucide-react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/auth";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})
const RegisterSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

type LoginInput = z.infer<typeof LoginSchema>
export type RegisterInput = z.infer<typeof RegisterSchema>

export default function AuthForm() {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(true)
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<LoginInput | RegisterInput>({
        resolver: zodResolver(isLogin ? LoginSchema : RegisterSchema)
    })

    const onSubmit: SubmitHandler<LoginInput | RegisterInput> = async (data) => {
        try {
            const { email, password } = data
            if (isLogin) {
                const res = await signIn("credentials", {
                    email,
                    password,
                    redirect: false
                })
                if (res?.error) {
                    setError("root", { message: "Invalid email or password" })
                } else {
                    router.push("/dashboard")
                }
            } 
            if (!isLogin && "username" in data) {
                const result = await signUp({
                    username: data.username,
                    email,
                    password
                })
                
                if (!result.success) {
                    if (result.userError) {
                        setError("username", { message: result.userError })
                    }
                    if (result.emailError) {
                        setError("email", { message: result.emailError })
                    }
                } else {
                    const res = await signIn("credentials", {
                        email,
                        password,
                        redirect: false
                    })
                    if (res?.error) {
                        setError("root", { message: "Invalid email or password" })
                    } else {
                        router.push("/dashboard")
                    }
                }
            }
        } catch (err) {
            throw new Error(`Unexpected error: ${err}`)
        }
    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-7 bg-card border border-border p-8 rounded-2xl w-full md:w-95 shadow-[0_0_60px_rgba(0,212,255,0.1)] md:shadow-[0_0_30px_rgba(0,212,255,0.05)]"
        >
            <div className="bg-input rounded-xl grid grid-cols-2 p-1">
                <Button 
                    type="button"
                    variant="ghost" 
                    size="sm"
                    className={cn(
                        isLogin && "bg-neon-cyan text-background",
                        !isLogin && "transition-all duration-250"
                    )}
                    onClick={() => {
                        setIsLogin(true)
                        reset()
                    }}
                >
                    Sign In
                </Button>
                <Button 
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={cn(
                        !isLogin && "bg-neon-cyan text-background",
                        isLogin && "transition-all duration-250"
                    )}
                    onClick={() => {
                        setIsLogin(false)
                        reset()
                    }}
                >
                    Sign Up
                </Button>
            </div>
            <div className="flex flex-col gap-5">
                {!isLogin && (
                    <Input 
                        type="text"
                        label="USERNAME"
                        icon={<User className="w-4 h-4" />}
                        placeholder="trader123"
                        {...register("username")}
                    />
                    
                )}
                {"username" in errors && errors.username && !isLogin && <span className="text-neon-cyan text-xs">{errors.username.message}</span>}
                <Input 
                    type="text" 
                    label="EMAIL ADDRESS"
                    icon={<Mail className="w-4 h-4" />}
                    placeholder="trader@example.com" 
                    {...register("email")}
                />
                {errors.email && !isLogin && <span className="text-neon-cyan text-xs">{errors.email.message}</span>}
                <Input 
                    type="password" 
                    label="PASSWORD"
                    icon={<Lock className="w-4 h-4" />}
                    placeholder="••••••••" 
                    {...register("password")}
                />
                {errors.password && <span className="text-neon-cyan text-xs">{errors.password.message}</span>}
                {errors.root && <span className="text-neon-cyan text-xs">{errors.root.message}</span>}
                {isLogin && (
                    <Button 
                        type="button" 
                        className="text-neon-cyan text-xs self-end mb-1"
                    >
                        Forgot password?
                    </Button>
                )}
                <Button 
                    type="submit" 
                    variant="neon" 
                    size="lg"
                >
                    {isLogin ? "Sign In" : "Create Account"}
                </Button>
                <div className="flex gap-2 items-center justify-center">
                    <span className="text-text-muted/50 text-xs">
                        Don't have an account?
                    </span>
                    <Button 
                        type="button" 
                        className="text-neon-cyan text-sm"
                        onClick={() => {
                            setIsLogin(prev => !prev)
                            reset()
                        }}
                    >
                        {isLogin ? "Sign Up" : "Sign In"}
                    </Button>
                </div>
            </div>
        </form>
    )
}