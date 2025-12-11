import { Heart, CheckCircle2, ExternalLink } from "lucide-react"
import Link from "next/link"

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

                    {/* Donation Button Section */}
                    <div className="space-y-8">
                        <div className="bg-card border rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Heart className="w-6 h-6 text-emerald-600" />
                                ร่วมสนับสนุนเรา
                            </h2>

                            <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                                <p className="text-lg text-emerald-800 mb-6 text-center leading-relaxed">
                                    คลิกปุ่มด้านล่างเพื่อร่วมบริจาคสนับสนุนการเผยแพร่ความรู้ศาสนาอิสลาม
                                </p>

                                <Link
                                    href="https://thaimuslimeducation.com/donation/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden"
                                >
                                    {/* Animated background effect */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                                    {/* Shimmer effect */}
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>

                                    <Heart className="w-6 h-6 relative z-10 group-hover:animate-pulse" />
                                    <span className="relative z-10">บริจาคตอนนี้</span>
                                    <ExternalLink className="w-5 h-5 relative z-10 opacity-70" />
                                </Link>

                                <p className="text-sm text-muted-foreground mt-4 text-center">
                                    ระบบบริจาครองรับทุกช่องทางการชำระเงิน
                                </p>
                            </div>
                        </div>

                        {/* Additional encouragement card */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">🤲</span>
                                <h3 className="text-lg font-bold text-amber-900">ดุอาอ์สำหรับผู้บริจาค</h3>
                            </div>
                            <p className="text-amber-800 text-sm leading-relaxed italic">
                                "اللَّهُمَّ اجْعَلْ الْقُرْآنَ رَبِيعَ قَلْبِي"
                                <br />
                                ขออัลลอฮ์ทรงให้อัลกุรอานเป็นความสดชื่นในหัวใจของฉัน
                            </p>
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
