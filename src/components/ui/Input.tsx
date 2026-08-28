import { cn } from "@/lib/utils"
import {
    type ChangeEventHandler,
    forwardRef,
    type KeyboardEventHandler,
    type ReactNode,
} from "react"

type Props = {
    label?: string
    icon?: ReactNode
    type: "text" | "email" | "password" | "number" | "date"
    step?: string
    placeholder?: string
    className?: string
    value?: string
    maxLength?: number
    onChange?: ChangeEventHandler<HTMLInputElement>
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}

const Input = forwardRef<HTMLInputElement, Props>(
    (
        {
            label,
            icon,
            type,
            step,
            placeholder,
            className,
            value,
            maxLength,
            onChange,
            ...props
        },
        ref
    ) => {
        return (
            <div className="flex flex-col gap-2">
                {label && (
                    <label className="text-text-muted text-xs font-semibold">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-placeholder/10">
                            {icon}
                        </span>
                    )}
                    <input
                        {...props}
                        type={type}
                        step={step}
                        placeholder={placeholder}
                        ref={ref}
                        maxLength={maxLength}
                        className={cn(
                            "bg-input border border-border text-placeholder/30 text-sm rounded-2xl py-2.5 w-full font-light",
                            "outline-none focus:ring-[0.5px] focus:ring-neon-cyan transition-shadow duration-200",
                            icon ? "pl-10 pr-3" : "px-3",
                            className
                        )}
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </div>
        )
    }
)

export { Input }
