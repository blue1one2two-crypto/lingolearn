import { cn } from '@/lib/utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    glass?: boolean
}

export const Card = ({ className, glass = true, ...props }: CardProps) => {
    return (
        <div
            className={cn(
                'rounded-3xl p-6 transition-all',
                glass ? 'glass' : 'bg-card border border-white/5 shadow-xl',
                className
            )}
            {...props}
        />
    )
}
