"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import GoogleTranslate from "@/components/GoogleTranslate"

interface HeaderProps {
    lang?: 'th' | 'en'
}

export function Header({ lang = 'th' }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const navItems = {
        th: [
            { name: "หน้าหลัก", href: "https://thaimuslimeducation.com/" },
            { name: "หน้าแรก", href: "/" },
            { name: "บทความ", href: "/blog" },
            { name: "หมวดหมู่", href: "/categories" },
            { name: "เกี่ยวกับเรา", href: "/about" },
            { name: "ติดต่อ", href: "/contact" },
        ],
        en: [
            { name: "Main Site", href: "/eng" },
            { name: "Home", href: "/eng" },
            { name: "Articles", href: "/eng/blog" },
            { name: "Categories", href: "/eng/categories" },
            { name: "About Us", href: "/eng/about" },
            { name: "Contact", href: "/eng/contact" },
        ]
    }

    const currentNav = navItems[lang]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href={lang === 'en' ? "/eng" : "/"} className="flex items-center space-x-2">
                        <Image src="/logo.jpg" alt="Islamic Study Logo" width={50} height={50} className="object-contain" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {currentNav.map((item) => (
                        <Link key={item.href} href={item.href} className="transition-colors hover:text-primary">
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <div className="hidden md:block">
                        {/* We hide GoogleTranslate on EN site, or keep it? Maybe redundant if we have manual EN site. Let's keep it for now but maybe just language switcher is better for th/en toggle */}
                        {lang === 'th' && <GoogleTranslate />}
                    </div>

                    {/* Language Switcher */}
                    <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex gap-1">
                        <Link href={lang === 'th' ? "/eng" : "/"}>
                            <Globe className="h-4 w-4" />
                            {lang === 'th' ? "English" : "ไทย"}
                        </Link>
                    </Button>

                    <Button variant="ghost" size="icon" aria-label="ค้นหา">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button className="hidden md:inline-flex" asChild>
                        <Link href={lang === 'en' ? "/eng/donate" : "/donate"}>
                            {lang === 'en' ? "Support Us" : "สนับสนุน"}
                        </Link>
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
                        {currentNav.map((item) => (
                            <Link key={item.href} href={item.href} className="p-2 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="pt-4 border-t space-y-4">
                        <div className="flex justify-center flex-col gap-2">
                            <Button variant="outline" className="w-full" asChild>
                                <Link href={lang === 'th' ? "/eng" : "/"} onClick={() => setIsMenuOpen(false)}>
                                    <Globe className="h-4 w-4 mr-2" />
                                    {lang === 'th' ? "Switch to English" : "สลับเป็นภาษาไทย"}
                                </Link>
                            </Button>
                            {lang === 'th' && <GoogleTranslate />}
                        </div>
                        <Button className="w-full" asChild>
                            <Link href={lang === 'en' ? "/eng/donate" : "/donate"} onClick={() => setIsMenuOpen(false)}>
                                {lang === 'en' ? "Support Us" : "สนับสนุน"}
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}
