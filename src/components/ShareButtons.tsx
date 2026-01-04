"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Link as LinkIcon, Printer, Check } from "lucide-react"
import { useState, useEffect } from "react"

interface ShareButtonsProps {
    title: string
}

export function ShareButtons({ title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)
    const [currentUrl, setCurrentUrl] = useState("")

    useEffect(() => {
        setCurrentUrl(window.location.href)
    }, [])

    const handleShare = (platform: string) => {
        const url = encodeURIComponent(currentUrl)
        const encodedTitle = encodeURIComponent(title)

        if (platform === "facebook") {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "width=600,height=400")
        } else if (platform === "twitter") {
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`, "_blank", "width=600,height=400")
        }
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="flex items-center gap-2">
            <span className="font-bold text-sm">แชร์บทความ:</span>
            <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:text-[#1877F2] hover:border-[#1877F2]"
                onClick={() => handleShare("facebook")}
            >
                <Facebook className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:text-[#1DA1F2] hover:border-[#1DA1F2]"
                onClick={() => handleShare("twitter")}
            >
                <Twitter className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${copied ? "text-green-500 border-green-500" : ""}`}
                onClick={handleCopyLink}
            >
                {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={handlePrint}
            >
                <Printer className="h-4 w-4" />
            </Button>

            {/* Mobile Sticky Bar - Only visible on small screens handled by CSS media queries if needed, 
                but here we are porting the desktop/inline buttons. 
                The page had a separate sticky bar. I should probably handle that too. 
                Let's keep this simple first. */}
        </div>
    )
}

export function MobileShareButtons({ title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)
    const [currentUrl, setCurrentUrl] = useState("")

    useEffect(() => {
        setCurrentUrl(window.location.href)
    }, [])

    const handleShare = (platform: string) => {
        const url = encodeURIComponent(currentUrl)
        const encodedTitle = encodeURIComponent(title)

        if (platform === "facebook") {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "width=600,height=400")
        } else if (platform === "twitter") {
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`, "_blank", "width=600,height=400")
        }
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-around items-center md:hidden z-40 print:hidden">
            <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 text-xs" onClick={() => handleShare("facebook")}>
                <Facebook className="h-5 w-5" />
                <span>แชร์</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 text-xs" onClick={() => handleShare("twitter")}>
                <Twitter className="h-5 w-5" />
                <span>ทวีต</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 text-xs" onClick={handleCopyLink}>
                {copied ? <Check className="h-5 w-5 text-green-500" /> : <LinkIcon className="h-5 w-5" />}
                <span>{copied ? "คัดลอกแล้ว" : "คัดลอก"}</span>
            </Button>
        </div>
    )
}
