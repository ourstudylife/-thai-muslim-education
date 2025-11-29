"use client"

import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-emerald-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">ติดต่อเรา</h1>
                    <p className="text-emerald-200 max-w-xl mx-auto">
                        หากมีข้อสงสัย ข้อเสนอแนะ หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเราได้ผ่านช่องทางด้านล่าง
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">ข้อมูลการติดต่อ</h2>
                            <p className="text-muted-foreground mb-8">
                                เรายินดีรับฟังทุกความคิดเห็น เพื่อนำไปพัฒนาเว็บไซต์ให้ดียิ่งขึ้น
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">อีเมล</h3>
                                    <p className="text-muted-foreground">ourstudylife2022@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">เบอร์โทรศัพท์</h3>
                                    <p className="text-muted-foreground">+66 8X XXX XXXX</p>
                                    <p className="text-sm text-muted-foreground">(เวลาทำการ: จันทร์-ศุกร์ 09:00 - 17:00 น.)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">ที่อยู่</h3>
                                    <p className="text-muted-foreground">
                                        กรุงเทพมหานคร, ประเทศไทย
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-card p-8 rounded-2xl border shadow-sm">
                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">ส่งข้อความสำเร็จ!</h3>
                                <p className="text-muted-foreground">
                                    ขอบคุณที่ติดต่อเรา เราจะรีบตอบกลับโดยเร็วที่สุด
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-6"
                                    onClick={() => setIsSubmitted(false)}
                                >
                                    ส่งข้อความใหม่
                                </Button>
                            </div>
                        ) : (
                            <form action="https://formsubmit.co/ourstudylife2022@gmail.com" method="POST" className="space-y-6">
                                <h2 className="text-2xl font-bold mb-6">ส่งข้อความถึงเรา</h2>

                                {/* Formsubmit Configuration */}
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_next" value="https://thaimuslimeducation.com/contact?success=true" />
                                <input type="hidden" name="_subject" value="มีข้อความใหม่จากเว็บไซต์ thaimuslimeducation.com" />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">ชื่อ</label>
                                        <Input name="name" placeholder="ชื่อของคุณ" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">นามสกุล</label>
                                        <Input name="lastname" placeholder="นามสกุล" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">อีเมล</label>
                                    <Input type="email" name="email" placeholder="name@example.com" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">หัวข้อ</label>
                                    <Input name="subject" placeholder="เรื่องที่ต้องการติดต่อ" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">ข้อความ</label>
                                    <Textarea
                                        name="message"
                                        placeholder="รายละเอียดข้อความ..."
                                        className="min-h-[150px]"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                                >
                                    ส่งข้อความ
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
