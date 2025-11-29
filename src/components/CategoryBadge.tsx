import Link from "next/link"
import { cn } from "@/lib/utils"

interface CategoryBadgeProps {
    name: string
    slug: string
    count?: number
    className?: string
    variant?: 'default' | 'outline' | 'pill' | 'ghost'
}

export function CategoryBadge({
    name,
    slug,
    count,
    className,
    variant = 'default'
}: CategoryBadgeProps) {
    const variants = {
        default: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        pill: "rounded-full bg-primary/10 text-primary hover:bg-primary/20",
        ghost: "hover:bg-accent hover:text-accent-foreground"
    }

    return (
        <Link
            href={`/category/${slug}`}
            className={cn(
                "inline-flex items-center justify-between gap-2 px-3 py-1 text-sm font-medium transition-colors rounded-md",
                variants[variant],
                className
            )}
        >
            <span>{name}</span>
            {count !== undefined && (
                <span className="text-xs opacity-70 bg-black/5 px-1.5 py-0.5 rounded-full">
                    {count}
                </span>
            )}
        </Link>
    )
}
