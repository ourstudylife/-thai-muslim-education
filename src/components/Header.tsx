"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import GoogleTranslate from "@/components/GoogleTranslate"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/logo.jpg" alt="Islamic Study Logo" width={50} height={50} className="object-contain" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="https://thaimuslimeducation.com/" className="transition-colors hover:text-primary">หน้าหลัก</Link>
                    <Link href="/" className="transition-colors hover:text-primary">หน้าแรก</Link>
                    <Link href="/blog" className="transition-colors hover:text-primary">บทความ</Link>
                    <Link href="/categories" className="transition-colors hover:text-primary">หมวดหมู่</Link>
                    <Link href="/about" className="transition-colors hover:text-primary">เกี่ยวกับเรา</Link>
                    <Link href="/contact" className="transition-colors hover:text-primary">ติดต่อ</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <div className="hidden md:block">
                        <GoogleTranslate />
                    </div>
                    <Button variant="ghost" size="icon" aria-label="ค้นหา">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button className="hidden md:inline-flex" asChild>
                        <Link href="/donate">สนับสนุน</Link>
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="เมนู">
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
                    <nav className="flex flex-col gap-4 text-sm font-medium">
                        <Link href="https://thaimuslimeducation.com/" className="p-2 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>หน้าหลัก</Link>
                        <Link href="/" className="p-2 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>หน้าแรก</Link>
                        <Link href="/blog" className="p-2 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>บทความ</Link>
                        <Link href="/categories" className="p-2 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>หมวดหมู่</Link>
                        <Link href="/about" className="p-2 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>เกี่ยวกับเรา</Link>
                        <Link href="/contact" className="p-2 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>ติดต่อ</Link>
                    </nav>
                    <div className="pt-4 border-t space-y-4">
                        <div className="flex justify-center">
                            <GoogleTranslate />
                        </div>
                        <Button className="w-full" asChild>
                            <Link href="/donate" onClick={() => setIsMenuOpen(false)}>สนับสนุน</Link>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}
