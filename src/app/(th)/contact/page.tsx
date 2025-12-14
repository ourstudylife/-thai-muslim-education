"use client"

import { Mail, Phone, MapPin, Send, MessageCircle, Smartphone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { submitContactForm } from "@/app/actions/contact"


export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        whatsapp: "",
        lineId: "",
        preferredMethod: "email",
        message: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const result = await submitContactForm(formData)

            if (result.success) {
                setIsSubmitted(true)
            } else {
                alert("เกิดข้อผิดพลาด: " + result.error)
            }
        } catch (error) {
            alert("เกิดข้อผิดพลาดในการส่งข้อมูล")
        } finally {
            setIsSubmitting(false)
        }
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
                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
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
                    <div className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm">
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
                                    onClick={() => {
                                        setIsSubmitted(false)
                                        setFormData({
                                            name: "",
                                            email: "",
                                            phone: "",
                                            whatsapp: "",
                                            lineId: "",
                                            preferredMethod: "email",
                                            message: ""
                                        })
                                    }}
                                >
                                    ส่งข้อความใหม่
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            ชื่อ-นามสกุล <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="กรอกชื่อของคุณ"
                                                className="pl-10"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                อีเมล <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    className="pl-10"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    placeholder="08X-XXX-XXXX"
                                                    className="pl-10"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="whatsapp" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                WhatsApp (ถ้ามี)
                                            </label>
                                            <div className="relative">
                                                <MessageCircle className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                <Input
                                                    id="whatsapp"
                                                    name="whatsapp"
                                                    placeholder="เบอร์ WhatsApp"
                                                    className="pl-10"
                                                    value={formData.whatsapp}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="lineId" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                Line ID (ถ้ามี)
                                            </label>
                                            <div className="relative">
                                                <Smartphone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                <Input
                                                    id="lineId"
                                                    name="lineId"
                                                    placeholder="ไอดี Line"
                                                    className="pl-10"
                                                    value={formData.lineId}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="preferredMethod" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            ช่องทางที่สะดวกให้ติดต่อกลับ <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="preferredMethod"
                                            name="preferredMethod"
                                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={formData.preferredMethod}
                                            onChange={handleChange}
                                        >
                                            <option value="email">อีเมล (Email)</option>
                                            <option value="phone">เบอร์โทรศัพท์ (Phone)</option>
                                            <option value="whatsapp">WhatsApp</option>
                                            <option value="line">Line</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            ข้อความ <span className="text-red-500">*</span>
                                        </label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="พิมพ์ข้อความของคุณที่นี่..."
                                            className="min-h-[120px]"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            กำลังส่งข้อมูล...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            ส่งข้อความ
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
