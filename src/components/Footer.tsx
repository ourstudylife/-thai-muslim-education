import Link from "next/link"
import { Facebook, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FooterProps {
    lang?: 'th' | 'en'
}

export function Footer({ lang = 'th' }: FooterProps) {
    const isTh = lang === 'th'

    return (
        <footer className="bg-muted/50 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: About */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-lg font-bold text-primary">
                            {isTh ? "เกี่ยวกับเรา" : "About Us"}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {isTh
                                ? "เว็บไซต์เผยแพร่ความรู้ศาสนาอิสลามที่ถูกต้อง ตามแนวทางอัลกุรอานและซุนนะห์ เพื่อความเข้าใจที่ถูกต้องและการปฏิบัติที่สมบูรณ์"
                                : "A website dedicated to spreading authentic Islamic knowledge based on the Quran and Sunnah, fostering correct understanding and practice."
                            }
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-lg font-bold text-primary">
                            {isTh ? "หมวดหมู่แนะนำ" : "Categories"}
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {isTh ? (
                                <>
                                    <li><Link href="/category/aqidah" className="hover:text-primary transition-colors">อะกีเดาะห์ (หลักศรัทธา)</Link></li>
                                    <li><Link href="/category/fiqh" className="hover:text-primary transition-colors">ฟิกฮ์ (นิติศาสตร์)</Link></li>
                                    <li><Link href="/category/tafsir" className="hover:text-primary transition-colors">ตัฟซีรฺ (อรรถกถา)</Link></li>
                                    <li><Link href="/category/hadith" className="hover:text-primary transition-colors">ฮะดีษ (วจนะศาสดา)</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link href="/eng/category/aqidah" className="hover:text-primary transition-colors">Aqidah (Faith)</Link></li>
                                    <li><Link href="/eng/category/fiqh" className="hover:text-primary transition-colors">Fiqh (Jurisprudence)</Link></li>
                                    <li><Link href="/eng/category/tafsir" className="hover:text-primary transition-colors">Tafsir (Exegesis)</Link></li>
                                    <li><Link href="/eng/category/hadith" className="hover:text-primary transition-colors">Hadith (Traditions)</Link></li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Column 3: Newsletter & Contact */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-lg font-bold text-primary">
                            {isTh ? "ติดตามข่าวสาร" : "Follow Us"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {isTh ? "ติดตามเราผ่านช่องทางโซเชียลมีเดีย" : "Follow us on social media"}
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Mail className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} {isTh ? "เว็บไซต์สอนศาสนา" : "Islamic Education Website"}. {isTh ? "สงวนลิขสิทธิ์" : "All rights reserved"}.</p>
                </div>
            </div>
        </footer>
    )
}
