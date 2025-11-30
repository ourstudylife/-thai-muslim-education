"use client"

import { useEffect, useState } from "react"
import { Globe } from "lucide-react"

export default function GoogleTranslate() {
    const [selectedLang, setSelectedLang] = useState("")

    useEffect(() => {
        // Initialize Google Translate script
        const initGoogleTranslate = () => {
            if ((window as any).google && (window as any).google.translate) {
                new (window as any).google.translate.TranslateElement(
                    {
                        pageLanguage: "th",
                        includedLanguages: "th,en,ar,ms,tr,zh-CN",
                        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
                        autoDisplay: false,
                    },
                    "google_translate_element"
                )
            }
        }

            ; (window as any).googleTranslateElementInit = initGoogleTranslate

        if (document.querySelector('script[src*="translate.google.com"]')) {
            setTimeout(initGoogleTranslate, 100)
        } else {
            const script = document.createElement("script")
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            script.async = true
            document.body.appendChild(script)
        }

        // Read current language from cookie
        const match = document.cookie.match(new RegExp('(^| )googtrans=([^;]+)'))
        if (match) {
            const lang = match[2].split('/')[2]
            setSelectedLang(lang)
        }
    }, [])

    const handleLanguageChange = (langCode: string) => {
        // Set cookie for Google Translate
        // Format: /source/target (e.g., /auto/en)
        const domain = window.location.hostname
        document.cookie = `googtrans=/auto/${langCode}; path=/; domain=${domain}`
        document.cookie = `googtrans=/auto/${langCode}; path=/;` // Fallback

        setSelectedLang(langCode)
        window.location.reload() // Reload to apply translation
    }

    return (
        <div className="flex items-center gap-2">
            {/* Hidden Google Translate Element - Use absolute positioning instead of display:none to ensure it renders */}
            <div
                id="google_translate_element"
                className="absolute opacity-0 w-0 h-0 overflow-hidden pointer-events-none"
            />

            {/* Custom UI */}
            <div className="relative flex items-center bg-background border rounded-full px-3 py-1.5 hover:bg-muted/50 transition-colors shadow-sm">
                <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                <select
                    value={selectedLang}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm font-medium appearance-none cursor-pointer pr-2 text-foreground"
                >
                    <option value="" disabled>เลือกภาษา</option>
                    <option value="th">🇹🇭 ไทย</option>
                    <option value="en">🇬🇧 English</option>
                    <option value="ar">🇸🇦 Arabic</option>
                    <option value="ms">🇲🇾 Malay</option>
                    <option value="tr">🇹🇷 Turkish</option>
                    <option value="zh-CN">🇨🇳 Chinese</option>
                </select>
            </div>
        </div>
    )
}
