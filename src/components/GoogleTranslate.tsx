"use client"

import { useEffect, useState } from "react"
import { Globe } from "lucide-react"

export default function GoogleTranslate() {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)

    useEffect(() => {
        // Check if script is already added
        if (document.querySelector('script[src*="translate.google.com"]')) {
            setIsScriptLoaded(true)
            return
        }

        // Define the callback function globally
        ; (window as any).googleTranslateElementInit = () => {
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

        // Create and append the script
        const script = document.createElement("script")
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        script.async = true
        script.onload = () => setIsScriptLoaded(true)
        document.body.appendChild(script)
    }, [])

    const handleLanguageChange = (langCode: string) => {
        const select = document.querySelector(".goog-te-combo") as HTMLSelectElement
        if (select) {
            select.value = langCode
            select.dispatchEvent(new Event("change"))
        }
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
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm font-medium appearance-none cursor-pointer pr-2 text-foreground"
                    defaultValue=""
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
