import Link from "next/link"
import { ArrowLeft, Check, BookOpen, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLessonsByCategory } from "@/lib/api"

export default async function EnglishFiqhPage() {
    const lessons = await getLessonsByCategory("fiqh", "en")

    // Colors for timeline steps to cycle through
    const colors = [
        "bg-emerald-500",
        "bg-teal-500",
        "bg-cyan-500",
        "bg-green-500",
        "bg-lime-500"
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-green-50/30 to-background">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-8">
                <div className="container mx-auto px-4">
                    <Link href="/eng/categories" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Categories
                    </Link>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Principles of Practice</h1>
                    <p className="text-xl text-green-100 max-w-3xl">
                        A step-by-step path to learning Islamic practices and daily religious life.
                    </p>
                </div>
            </div>

            {/* Timeline */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Progress Indicator */}
                    <div className="mb-12 flex items-center justify-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium text-muted-foreground">
                            {lessons.length} Lessons Total
                        </span>
                    </div>

                    {lessons.length === 0 ? (
                        <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
                            <p className="text-muted-foreground">No lessons available yet. Stay tuned for updates.</p>
                        </div>
                    ) : (
                        /* Timeline Items */
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-200 via-teal-200 to-green-200" />

                            <div className="space-y-12">
                                {lessons.map((lesson: any, index: number) => (
                                    <div
                                        key={lesson.slug}
                                        className="relative pl-20 group animate-in fade-in slide-in-from-left-8 duration-500"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        {/* Timeline Dot */}
                                        <div className={`absolute left-0 w-16 h-16 rounded-full ${colors[index % colors.length]} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                            <span className="text-white font-bold text-xl">{index + 1}</span>
                                        </div>

                                        {/* Content Card */}
                                        <div className="bg-card border rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group-hover:translate-x-2">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="font-serif text-2xl font-bold group-hover:text-primary transition-colors">
                                                    {lesson.title}
                                                </h3>
                                                <span className="text-muted-foreground"><BookOpen className="h-6 w-6" /></span>
                                            </div>

                                            <div
                                                className="text-muted-foreground mb-4 leading-relaxed line-clamp-3"
                                                dangerouslySetInnerHTML={{ __html: lesson.excerpt }}
                                            />

                                            <Button asChild className="w-full sm:w-auto" variant="outline">
                                                <Link href={`/eng/categories/fiqh/lessons/${lesson.slug}`}>
                                                    Start Learning
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Completion Card */}
                    {lessons.length > 0 && (
                        <div className="mt-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                                <Star className="h-8 w-8 fill-white" />
                            </div>
                            <h3 className="font-serif text-2xl font-bold mb-2">Learning Complete</h3>
                            <p className="text-green-100 mb-6 max-w-md mx-auto">
                                Check back regularly for new lessons and updates.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
