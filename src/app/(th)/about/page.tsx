import Image from "next/image"
import { Building2, Users, Heart, BookOpen } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative h-[400px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-800/80 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=2070&auto=format&fit=crop"
                    alt="Islamic Architecture"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                            เกี่ยวกับเรา
                        </h1>
                        <p className="text-xl text-emerald-50 max-w-2xl mx-auto">
                            มุ่งมั่นเผยแพร่องค์ความรู้อิสลามที่ถูกต้อง เพื่อสร้างสังคมแห่งการเรียนรู้และสันติสุข
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                            <Building2 className="w-4 h-4" />
                            <span>วิสัยทัศน์ของเรา</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                            สร้างสรรค์สังคมแห่งปัญญา ด้วยหลักธรรมอิสลาม
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            เราเชื่อว่าการศึกษาคือรากฐานสำคัญของการพัฒนาชีวิตและสังคม เว็บไซต์นี้จึงถูกจัดทำขึ้นเพื่อเป็นแหล่งรวบรวมความรู้อิสลามที่ครอบคลุม ถูกต้อง และเข้าถึงได้ง่ายสำหรับทุกคน ไม่ว่าจะเป็นมุสลิมหรือผู้ที่สนใจศึกษาศาสนาอิสลาม
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                                <BookOpen className="w-8 h-8 text-emerald-600 mb-3" />
                                <h3 className="font-semibold mb-2">ความรู้ที่ถูกต้อง</h3>
                                <p className="text-sm text-muted-foreground">อ้างอิงจากอัลกุรอานและซุนนะห์</p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                                <Users className="w-8 h-8 text-emerald-600 mb-3" />
                                <h3 className="font-semibold mb-2">เพื่อทุกคน</h3>
                                <p className="text-sm text-muted-foreground">เนื้อหาเข้าใจง่าย เหมาะกับทุกวัย</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop"
                            alt="Learning Islam"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Team Section (Placeholder) */}
            <div className="bg-muted/30 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif font-bold mb-12">ทีมงานของเรา</h2>
                    <div className="flex justify-center max-w-4xl mx-auto">
                        <div className="bg-background p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow max-w-sm w-full">
                            <div className="w-24 h-24 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                                <Users className="w-10 h-10" />
                            </div>
                            <h3 className="font-bold text-lg mb-1">ทีมงานคุณภาพ</h3>
                            <p className="text-emerald-600 text-sm mb-3">ผู้เชี่ยวชาญด้านศาสนา</p>
                            <p className="text-sm text-muted-foreground">
                                มุ่งมั่นคัดสรรและตรวจสอบเนื้อหาเพื่อความถูกต้องแม่นยำที่สุด
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="max-w-2xl mx-auto bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-10 text-white shadow-xl">
                    <Heart className="w-12 h-12 mx-auto mb-6 text-emerald-200" />
                    <h2 className="text-3xl font-bold mb-4">ร่วมเป็นส่วนหนึ่งกับเรา</h2>
                    <p className="text-emerald-100 mb-8">
                        สนับสนุนการเผยแพร่ความรู้อิสลาม เพื่อให้แสงสว่างแห่งปัญญาได้เข้าถึงผู้คนมากยิ่งขึ้น
                    </p>
                    <a
                        href="/donate"
                        className="inline-block bg-white text-emerald-700 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors"
                    >
                        ร่วมสนับสนุน
                    </a>
                </div>
            </div>
        </div>
    )
}
