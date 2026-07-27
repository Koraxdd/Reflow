"use client"

import { Lock, Mail, User } from "lucide-react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <form className="flex flex-col gap-7 bg-card border border-border p-8 rounded-2xl w-full md:w-95 shadow-[0_0_60px_rgba(0,212,255,0.1)] md:shadow-[0_0_30px_rgba(0,212,255,0.05)]">
            <div className="bg-input rounded-xl grid grid-cols-2 p-1">
                <Button 
                    variant="ghost" 
                    size="sm"
                    className={cn(
                        isLogin && "bg-neon-cyan text-background",
                        !isLogin && "transition-all duration-250"
                    )}
                    onClick={() => setIsLogin(true)}
                >
                    Sign In
                </Button>
                <Button 
                    variant="ghost"
                    size="sm"
                    className={cn(
                        !isLogin && "bg-neon-cyan text-background",
                        isLogin && "transition-all duration-250"
                    )}
                    onClick={() => setIsLogin(false)}
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
                    />
                )}
                <Input 
                    type="text" 
                    label="EMAIL ADDRESS"
                    icon={<Mail className="w-4 h-4" />}
                    placeholder="trader@example.com" 
                />
                <Input 
                    type="password" 
                    label="PASSWORD"
                    icon={<Lock className="w-4 h-4" />}
                    placeholder="••••••••" 
                />
                {isLogin && (
                    <Button 
                        type="button" 
                        className="text-neon-cyan text-xs self-end my-1"
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
                        onClick={() => setIsLogin(prev => !prev)}
                    >
                        {isLogin ? "Sign Up" : "Sign In"}
                    </Button>
                </div>
            </div>
        </form>
    )
}