import Link from "next/link"
import Image from "next/image"
import { Clock, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface PostCardProps {
    title: string
    excerpt: string
    date: string
    readTime: string
    category: string
    imageUrl: string
    slug: string
    className?: string
    basePath?: string
    readMoreText?: string
}

export function PostCard({
    title,
    excerpt,
    date,
    readTime,
    category,
    imageUrl,
    slug,
    className,
    basePath = "/blog",
    readMoreText = "อ่านต่อ"
}: PostCardProps) {
    const postUrl = `${basePath}/${slug}`;

    return (
        <article className={cn("group flex flex-col bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow", className)}>
            {/* Image */}
            <Link href={postUrl} className="relative aspect-[16/9] overflow-hidden bg-muted">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center rounded-full bg-primary/90 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
                        {category}
                    </span>
                </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={date}>{date}</time>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{readTime}</span>
                    </div>
                </div>

                <h3 className="font-serif text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                    <Link href={postUrl}>
                        {title}
                    </Link>
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                    {excerpt}
                </p>

                <div className="mt-auto pt-4 border-t flex items-center justify-between">
                    <Link href={postUrl} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
                        {readMoreText}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </Link>
                </div>
            </div>
        </article>
    )
}
