import { Heart, CreditCard, QrCode, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                        <Heart className="w-6 h-6 text-emerald-300" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                        ร่วมบริจาคสนับสนุน
                    </h1>
                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
                        "การบริจาคทาน (ศอดะเกาะห์) ไม่ได้ทำให้ทรัพย์สินพร่องลง แต่กลับจะเพิ่มพูนความจำเริญ"
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

                    {/* Donation Methods */}
                    <div className="space-y-8">
                        <div className="bg-card border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-emerald-600" />
                                โอนเงินผ่านบัญชีธนาคาร
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl border">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        {/* Bank Icon Placeholder */}
                                        <span className="font-bold text-emerald-700 text-xs">KBANK</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">ธนาคารกสิกรไทย</p>
                                        <p className="text-xl font-mono font-bold text-emerald-700">XXX-X-XXXXX-X</p>
                                        <p className="text-sm font-medium">ชื่อบัญชี: XXX-X-XXXXX-X</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl border">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        {/* Bank Icon Placeholder */}
                                        <span className="font-bold text-blue-700 text-xs">BBL</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">ธนาคารกรุงเทพ</p>
                                        <p className="text-xl font-mono font-bold text-blue-700">XXX-X-XXXXX-X</p>
                                        <p className="text-sm font-medium">ชื่อบัญชี: XXX-X-XXXXX-X</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <QrCode className="w-6 h-6 text-emerald-600" />
                                สแกน QR Code
                            </h2>
                            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border-2 border-dashed border-emerald-200">
                                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                    <QrCode className="w-16 h-16 text-gray-400" />
                                </div>
                                <p className="text-sm text-muted-foreground text-center">
                                    รองรับทุกธนาคาร และ PromptPay
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Impact & Info */}
                    <div className="space-y-8">
                        <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
                            <h3 className="text-xl font-bold text-emerald-900 mb-4">
                                เงินบริจาคของท่านจะถูกนำไปใช้เพื่อ:
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "พัฒนาและปรับปรุงเว็บไซต์ให้ดียิ่งขึ้น",
                                    "ผลิตสื่อการเรียนรู้คุณภาพสูง",
                                    "จัดกิจกรรมอบรมและสัมมนา",
                                    "สนับสนุนค่าใช้จ่ายในการดำเนินงาน"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-emerald-800">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="prose prose-emerald">
                            <h3>ทำไมต้องบริจาค?</h3>
                            <p>
                                การสนับสนุนของท่านช่วยให้เราสามารถดำเนินงานเผยแพร่ความรู้ศาสนาอิสลามต่อไปได้อย่างยั่งยืน ทุกบาททุกสตางค์ของท่านมีส่วนช่วยสร้างสังคมแห่งการเรียนรู้
                            </p>
                            <p>
                                ขออัลลอฮ์ทรงตอบแทนความดีงามของท่าน และเพิ่มพูนริสกีที่ฮาลาลและบารอกัตให้แก่ท่านและครอบครัว
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
