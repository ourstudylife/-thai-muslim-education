import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function calculateReadingTime(content: string): string {
    const cleanContent = content.replace(/<[^>]*>/g, '') // Remove HTML tags
    const charCount = cleanContent.length
    const readingSpeed = 500 // Characters per minute for Thai
    const minutes = Math.ceil(charCount / readingSpeed)
    return `${minutes} นาที`
}

export function calculateReadingTimeEn(content: string): string {
    const cleanContent = content.replace(/<[^>]*>/g, '') // Remove HTML tags
    const wordCount = cleanContent.trim().split(/\s+/).length
    const readingSpeed = 200 // Words per minute for English
    const minutes = Math.ceil(wordCount / readingSpeed)
    return `${minutes} min read`
}
