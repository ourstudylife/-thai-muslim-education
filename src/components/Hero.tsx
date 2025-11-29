"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

interface HeroProps {
    title?: string
    description?: string
    backgroundImage?: string
}

export function Hero({
    title = "บทความสอนศาสนา",
    description = "แหล่งรวบรวมความรู้ศาสนาอิสลามที่ถูกต้อง ตามแนวทางอัลกุรอานและซุนนะห์ เพื่อความเข้าใจที่ถูกต้องและการปฏิบัติที่สมบูรณ์",
    backgroundImage = "/mosque-bg.jpg"
}: HeroProps) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (e: FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-primary/10">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center text-white">
                <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 drop-shadow-md">
                    {title}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90 leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <form onSubmit={handleSearch} className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="ค้นหาบทความ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-4 pr-12 rounded-full text-foreground bg-white/95 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                        />
                        <button
                            type="submit"
                            className="absolute right-1 top-1 h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </button>
                    </form>
                </div>

                <div className="mt-8">
                    <Button asChild variant="secondary" size="lg" className="rounded-full font-bold">
                        <Link href="/blog">อ่านบทความล่าสุด</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
