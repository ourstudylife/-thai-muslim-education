"use client"

import { Button } from "@/components/ui/button"

export function SubscriptionBlock() {
    return (
        <section className="w-full py-16 bg-primary text-primary-foreground relative overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

            <div className="container relative mx-auto px-4 text-center">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                    ไม่พลาดทุกบทความใหม่
                </h2>
                <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg">
                    สมัครรับข่าวสารเพื่อรับบทความสอนศาสนา กิจกรรม และข่าวสารประชาสัมพันธ์ส่งตรงถึงอีเมลของคุณ
                </p>

                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="อีเมลของคุณ"
                        className="flex h-12 w-full rounded-md border-0 bg-white/10 px-4 py-2 text-white placeholder:text-white/60 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        required
                    />
                    <Button variant="secondary" size="lg" className="font-bold whitespace-nowrap">
                        สมัครรับข่าวสาร
                    </Button>
                </form>

                <p className="text-xs text-primary-foreground/60 mt-4">
                    เราเคารพความเป็นส่วนตัวของคุณ จะไม่มีการส่งสแปม
                </p>
            </div>
        </section>
    )
}
