"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function Newsletter() {
    return (
        <section className="bg-[#1a5d44] text-white py-16 relative overflow-hidden">
            {/* Background Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold">
                            ไม่พลาดทุกบทความใหม่
                        </h2>
                        <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                            สมัครรับข่าวสารเพื่อรับบทความสอนศาสนา กิจกรรม และข่าวสารประชาสัมพันธ์ส่งตรงถึงอีเมลของคุณ
                        </p>
                    </div>

                    <form
                        action="https://formsubmit.co/ourstudylife2022@gmail.com"
                        method="POST"
                        className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                    >
                        {/* Formsubmit Configuration */}
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_next" value="https://thaimuslimeducation.com/?newsletter_success=true" />
                        <input type="hidden" name="_subject" value="มีผู้ติดตาม Newsletter ใหม่" />
                        <input type="hidden" name="_autoresponse" value="ขอบคุณที่ติดตามข่าวสารจากเรา เราจะส่งบทความดีๆ ให้คุณเร็วๆ นี้" />

                        <Input
                            type="email"
                            name="email"
                            placeholder="อีเมลของคุณ"
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-emerald-200/70 h-12"
                        />
                        <Button
                            type="submit"
                            className="bg-[#e8f5e9] text-[#1a5d44] hover:bg-white font-bold h-12 px-8"
                        >
                            สมัครรับข่าวสาร
                        </Button>
                    </form>

                    <p className="text-xs text-emerald-200/60">
                        เราเคารพความเป็นส่วนตัวของคุณ จะไม่มีการส่งสแปม
                    </p>
                </div>
            </div>
        </section>
    )
}
