import * as React from 'react'
import { cn } from '@/lib/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
    size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: 'bg-linear-to-br from-primary to-primary-dark text-white shadow-lg shadow-primary/20 hover:opacity-90',
            secondary: 'bg-linear-to-br from-accent to-accent-dark text-white shadow-lg shadow-accent/20 hover:opacity-90',
            outline: 'border-2 border-primary/20 bg-transparent hover:bg-primary/10 text-primary',
            ghost: 'bg-transparent hover:bg-white/5 text-foreground/80 hover:text-foreground',
            danger: 'bg-error text-white hover:bg-error/90',
        }

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg',
        }

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-2xl font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'
