import { PostCard } from "@/components/PostCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPostsByCategory, getCategoryBySlug } from "@/lib/api"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const [posts, category] = await Promise.all([
        getPostsByCategory(slug),
        getCategoryBySlug(slug)
    ])

    if (!category) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header / Breadcrumb */}
            <div className="bg-muted/30 border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Link href="/" className="hover:text-primary">หน้าแรก</Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/blog" className="hover:text-primary">บทความ</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground">{category.name}</span>
                    </div>

                    <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-4">
                        {category.name}
                    </h1>

                    {category.description && (
                        <p className="text-lg text-muted-foreground max-w-3xl">
                            {category.description}
                        </p>
                    )}

                    <p className="text-sm text-muted-foreground mt-4">
                        {category.count} บทความ
                    </p>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="container mx-auto px-4 py-12">
                {posts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {posts.map((post: any) => (
                                <PostCard
                                    key={post.slug}
                                    title={post.title}
                                    excerpt={post.excerpt.replace(/<[^>]+>/g, '')}
                                    date={new Date(post.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    readTime="5 นาที"
                                    category={post.categories.nodes[0]?.name || "ทั่วไป"}
                                    imageUrl={post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1000&auto=format&fit=crop"}
                                    slug={post.slug}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <Button variant="outline" asChild>
                                <Link href="/blog">ดูบทความทั้งหมด</Link>
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <h2 className="font-serif text-2xl font-bold mb-4">ยังไม่มีบทความในหมวดหมู่นี้</h2>
                        <p className="text-muted-foreground mb-8">กลับไปดูบทความอื่นๆ</p>
                        <Button asChild>
                            <Link href="/blog">ดูบทความทั้งหมด</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
