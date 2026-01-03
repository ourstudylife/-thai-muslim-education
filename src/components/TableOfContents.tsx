"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TableOfContentsProps {
    className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
    const [headings, setHeadings] = React.useState<{ id: string; text: string; level: number }[]>([])
    const [activeId, setActiveId] = React.useState<string>("")

    React.useEffect(() => {
        // Find all H2 and H3 in the prose container
        const elements = Array.from(document.querySelectorAll(".prose h2, .prose h3"))
        const items = elements.map((elem) => {
            let id = elem.id
            if (!id) {
                // Generate ID from text content
                const text = elem.textContent || ""
                id = text
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\u0E00-\u0E7F\w-]/g, '') // Keep Thai chars, english chars, numbers, and hyphens. Remove others.

                // Fallback for empty ID (e.g. only special chars) or duplicates (simple handling)
                if (!id) id = `heading-${Math.random().toString(36).substr(2, 9)}`

                elem.id = id
            }

            return {
                id: id,
                text: elem.textContent || "",
                level: Number(elem.tagName.substring(1)),
            }
        })
        setHeadings(items)

        // Intersection Observer for active state
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: "0px 0px -80% 0px" }
        )

        elements.forEach((elem) => observer.observe(elem))

        return () => observer.disconnect()
    }, [])

    if (headings.length === 0) return null

    return (
        <div className={cn("space-y-2", className)}>
            <h3 className="font-serif text-lg font-bold mb-4">สารบัญ</h3>
            <nav className="space-y-1">
                {headings.map((heading) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={cn(
                            "block text-sm transition-colors hover:text-primary py-1",
                            heading.level === 3 && "pl-4",
                            activeId === heading.id
                                ? "text-primary font-medium border-l-2 border-primary pl-3 -ml-[14px]" // Adjust for border width if level 2
                                : "text-muted-foreground"
                        )}
                        onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(heading.id)?.scrollIntoView({
                                behavior: "smooth",
                            })
                            setActiveId(heading.id)
                        }}
                    >
                        {heading.text}
                    </a>
                ))}
            </nav>
        </div>
    )
}
