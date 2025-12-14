import Link from "next/link"
import Image from "next/image"
import { BookOpen, Heart, Building, BookMarked } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CategoriesPage() {
    const categories = [
        {
            id: 1,
            title: "หลักการศรัทธา",
            titleEn: "Aqidah",
            description: "ศึกษาหลักการศรัทธา หลักความเชื่อในอิสลาม การรู้จักพระเจ้า ศาสดา วันอาคิเราะห์ และองค์ประกอบของความเชื่อที่ถูกต้อง",
            icon: "heart",
            color: "from-blue-500 to-blue-600",
            iconBg: "bg-blue-100 text-blue-600",
            imageUrl: "/faith-card-bg-v2.png",
            topics: [
                "เสาหลักของศรัทธา",
                "ความเชื่อในพระเจ้าองค์เดียว",
                "ศาสดาและผู้นำทางศาสนา",
                "วันอาคิเราะห์และชีวิตหลังความตาย"
            ],
            href: "/categories/faith"
        },
        {
            id: 2,
            title: "หลักการปฏิบัติ",
            titleEn: "Fiqh",
            description: "ศึกษาหลักการปฏิบัติศาสนกิจในอิสลาม การละหมาด การถือศีลอด การบริจาคทาน และรูปแบบการดำเนินชีวิตตามหลักศาสนา",
            icon: "building",
            color: "from-green-500 to-green-600",
            iconBg: "bg-green-100 text-green-600",
            imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop",
            topics: [
                "การละหมาด",
                "การถือศีลอด",
                "การบริจาคทาน",
                "การประกอบพิธีฮัจย์"
            ],
            href: "/categories/practice"
        }
    ]

    const renderIcon = (iconName: string, className: string) => {
        switch (iconName) {
            case "heart":
                return <Heart className={className} />
            case "building":
                return <Building className={className} />
            default:
                return <BookOpen className={className} />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 bg-gradient-to-r from-primary to-primary/80 text-white">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528123981681-b516d9629971?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
                <div className="relative container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <BookMarked className="h-5 w-5" />
                        <span className="text-sm font-medium">ศึกษาศาสนา</span>
                    </div>
                    <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
                        หมวดหมู่
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
                        แหล่งรวมความรู้ศาสนาอิสลามที่ถูกต้อง ครบถ้วน
                        ตามแนวทางอัลกุรอานและซุนนะห์ เพื่อความเข้าใจที่ถูกต้อง
                    </p>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group relative bg-card rounded-2xl overflow-hidden border shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image Header */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={category.imageUrl}
                                    alt={category.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className={`${category.iconBg} p-4 rounded-full shadow-lg`}>
                                        {renderIcon(category.icon, "h-10 w-10")}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="mb-4">
                                    <h2 className="font-serif text-3xl font-bold mb-2">{category.title}</h2>
                                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{category.titleEn}</p>
                                </div>

                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    {category.description}
                                </p>

                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-primary" />
                                        หัวข้อที่ครอบคลุม
                                    </h3>
                                    <ul className="space-y-2">
                                        {category.topics.map((topic, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <span className="text-primary mt-1">•</span>
                                                <span>{topic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button
                                    asChild
                                    className="w-full group-hover:shadow-lg transition-shadow"
                                >
                                    <Link href={category.href} className="flex items-center justify-center">
                                        เรียนรู้เพิ่มเติม
                                        <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center border border-primary/20">
                    <h2 className="font-serif text-3xl font-bold mb-4">มีคำถามเกี่ยวกับศาสนา?</h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        สามารถติดต่อสอบถามหรือขอคำแนะนำเกี่ยวกับศาสนาอิสลามได้ทุกเมื่อ
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg">
                            <Link href="/contact">ติดต่อเรา</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/blog">อ่านบทความ</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
