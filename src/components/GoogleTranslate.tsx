"use client"

import { useEffect, useState } from "react"

export default function GoogleTranslate() {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)

    useEffect(() => {
        // Check if script is already added to avoid duplicates
        if (document.querySelector('script[src*="translate.google.com"]')) {
            setIsScriptLoaded(true)
            return
        }

        // Define the callback function globally
        ; (window as any).googleTranslateElementInit = () => {
            new (window as any).google.translate.TranslateElement(
                {
                    pageLanguage: "th",
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

    return (
        <div className="flex items-center">
            <div id="google_translate_element" className="google-translate-container" />
            <style jsx global>{`
                .google-translate-container .goog-te-gadget-simple {
                    background-color: transparent !important;
                    border: none !important;
                    padding: 0 !important;
                    font-size: 14px !important;
                    display: flex !important;
                    align-items: center !important;
                }
                .google-translate-container .goog-te-gadget-simple .goog-te-menu-value {
                    color: inherit !important;
                }
                .google-translate-container .goog-te-gadget-simple .goog-te-menu-value span {
                    color: inherit !important;
                    border-left: none !important;
                }
                .google-translate-container .goog-te-gadget-simple .goog-te-menu-value span:last-child {
                    display: none !important;
                }
                .goog-te-banner-frame.skiptranslate {
                    display: none !important;
                }
                body {
                    top: 0px !important;
                }
            `}</style>
        </div>
    )
}
