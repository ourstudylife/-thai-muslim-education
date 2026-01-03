import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, BookOpen, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLessonBySlug, getLessonsByCategory } from "@/lib/api"
import { notFound } from "next/navigation"
import { TableOfContents } from "@/components/TableOfContents"
import { calculateReadingTime } from "@/lib/utils"

export default async function FaithLessonPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const lesson = await getLessonBySlug(slug, "faith-lessons")

    if (!lesson) {
        notFound()
    }

    // Get related lessons
    const allLessons = await getLessonsByCategory("faith-lessons")
    const currentIndex = allLessons.findIndex((l: any) => l.slug === slug)
    const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null

    return (
        <article className="min-h-screen bg-background">
            {/* Header / Breadcrumb */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center gap-2 text-sm mb-4">
                        <Link href="/" className="hover:underline opacity-80">หน้าแรก</Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/categories" className="hover:underline opacity-80">หมวดหมู่</Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/categories/faith" className="hover:underline opacity-80">หลักการศรัทธา</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-blue-200">บทเรียน</span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/categories/faith"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        กลับไปหลักการศรัทธา
                    </Link>

                    {/* Title */}
                    <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        {lesson.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <time>{new Date(lesson.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{calculateReadingTime(lesson.content)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>แอดมิน</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                หลักการศรัทธา
                            </span>
                        </div>
                    </div>

                    {/* Feature Image */}
                    {lesson.featuredImage?.node?.sourceUrl && (
                        <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-12">
                            <Image
                                src={lesson.featuredImage.node.sourceUrl}
                                alt={lesson.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Content Area with TOC */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
                        {/* Main Content */}
                        <div
                            className="prose prose-lg max-w-none
                                prose-headings:font-serif prose-headings:font-bold
                                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                                prose-p:leading-relaxed prose-p:mb-6
                                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-foreground prose-strong:font-semibold
                                prose-ul:my-6 prose-li:my-2
                                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic"
                            dangerouslySetInnerHTML={{ __html: lesson.content }}
                        />

                        {/* Table of Contents - Sticky */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-24">
                                <TableOfContents />
                            </div>
                        </aside>
                    </div>

                    {/* Navigation Between Lessons */}
                    <div className="mt-16 pt-8 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {prevLesson && (
                                <Link
                                    href={`/categories/faith/lessons/${prevLesson.slug}`}
                                    className="group p-6 border rounded-xl hover:shadow-lg transition-all duration-300 hover:border-primary"
                                >
                                    <div className="text-sm text-muted-foreground mb-2">← บทก่อนหน้า</div>
                                    <div className="font-semibold group-hover:text-primary transition-colors">
                                        {prevLesson.title}
                                    </div>
                                </Link>
                            )}
                            {nextLesson && (
                                <Link
                                    href={`/categories/faith/lessons/${nextLesson.slug}`}
                                    className="group p-6 border rounded-xl hover:shadow-lg transition-all duration-300 hover:border-primary md:text-right"
                                >
                                    <div className="text-sm text-muted-foreground mb-2">บทถัดไป →</div>
                                    <div className="font-semibold group-hover:text-primary transition-colors">
                                        {nextLesson.title}
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* CTA - Back to Timeline */}
                    <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
                        <h3 className="font-serif text-2xl font-bold mb-4">เสร็จสิ้นบทเรียนนี้แล้ว?</h3>
                        <p className="text-muted-foreground mb-6">กลับไปดูบทเรียนทั้งหมดและเลือกบทถัดไปที่สนใจ</p>
                        <Button asChild size="lg">
                            <Link href="/categories/faith">
                                ดูบทเรียนทั้งหมด
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    )
}
