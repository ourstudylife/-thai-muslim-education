import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"
import { CategoryBadge } from "@/components/CategoryBadge"
import { TableOfContents } from "@/components/TableOfContents"
import { calculateReadingTime } from "@/lib/utils"
import { getPostBySlug, getRelatedPosts, getAllPosts } from "@/lib/api"
import { ShareButtons, MobileShareButtons } from "@/components/ShareButtons"
import { notFound } from "next/navigation"

interface Post {
    title: string
    slug: string
    content: string
    date: string
    author?: { node?: { name?: string } }
    categories: { nodes: Array<{ name?: string; slug?: string }> }
    featuredImage?: { node?: { sourceUrl?: string } }
}

interface RelatedPost {
    slug: string
    title: string
    date: string
    featuredImage?: { node?: { sourceUrl?: string } }
}

export default async function SinglePost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    const relatedPosts = await getRelatedPosts(post.categories.nodes[0]?.slug || "general", slug)

    return (
        <article className="min-h-screen bg-background pb-20">
            {/* Header / Breadcrumb */}
            <div className="bg-muted/30 border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Link href="/" className="hover:text-primary">หน้าแรก</Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-primary">บทความ</Link>
                        <span>/</span>
                        <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
                    </div>

                    <CategoryBadge
                        name={post.categories.nodes[0]?.name || "ทั่วไป"}
                        slug={post.categories.nodes[0]?.slug || "general"}
                        className="mb-4"
                    />

                    <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-6 max-w-4xl">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <User className="h-4 w-4" />
                            </div>
                            <span className="font-medium text-foreground">แอดมิน</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <time>{new Date(post.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{"อ่าน " + calculateReadingTime(post.content)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="flex-1 max-w-3xl">
                        {/* Feature Image */}
                        {post.featuredImage?.node?.sourceUrl && (
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-10 shadow-lg">
                                <Image
                                    src={post.featuredImage.node.sourceUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div
                            className="prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Tags & Share */}
                        <div className="mt-12 pt-8 border-t">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <ShareButtons title={post.title} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / TOC */}
                    <aside className="hidden lg:block w-80">
                        <div className="sticky top-24 space-y-8">
                            {/* Table of Contents */}
                            <div className="bg-card border rounded-lg p-6 shadow-sm">
                                <TableOfContents />
                            </div>

                            {/* Related Posts */}
                            <div>
                                <h3 className="font-serif text-lg font-bold mb-4">บทความที่เกี่ยวข้อง</h3>
                                <div className="space-y-4">
                                    {relatedPosts.length > 0 ? (
                                        relatedPosts.map((relatedPost: RelatedPost) => (
                                            <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group flex gap-3 items-start">
                                                <div className="relative w-20 h-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                                    <Image
                                                        src={relatedPost.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=200&auto=format&fit=crop"}
                                                        alt={relatedPost.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                        {relatedPost.title}
                                                    </h4>
                                                    <span className="text-xs text-muted-foreground mt-1 block">
                                                        {new Date(relatedPost.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">ไม่มีบทความที่เกี่ยวข้อง</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <MobileShareButtons title={post.title} />
        </article>
    )
}

export async function generateStaticParams() {
    const posts = await getAllPosts("th")

    return posts.map((post: any) => ({
        slug: post.slug,
    }))
}

