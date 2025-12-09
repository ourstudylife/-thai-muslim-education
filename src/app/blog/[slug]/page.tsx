"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, Facebook, Twitter, Link as LinkIcon, Printer, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryBadge } from "@/components/CategoryBadge"
import { TableOfContents } from "@/components/TableOfContents"
import { useState, useEffect } from "react"

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

export default function SinglePost({ params }: { params: Promise<{ slug: string }> }) {
    const [post, setPost] = useState<Post | null>(null)
    const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([])
    const [loading, setLoading] = useState(true)
    const [copied, setCopied] = useState(false)
    const [currentUrl, setCurrentUrl] = useState("")

    useEffect(() => {
        setCurrentUrl(window.location.href)

        async function loadData() {
            const { slug } = await params
            const { getPostBySlug, getRelatedPosts } = await import("@/lib/api")
            const postData = await getPostBySlug(slug)

            if (postData) {
                setPost(postData)
                const related = await getRelatedPosts(postData.categories.nodes[0]?.slug || "general", slug)
                setRelatedPosts(related)
            }
            setLoading(false)
        }
        loadData()
    }, [params])

    const handleShare = (platform: string) => {
        const url = encodeURIComponent(currentUrl)
        const title = encodeURIComponent(post?.title || "")

        if (platform === "facebook") {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "width=600,height=400")
        } else if (platform === "twitter") {
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, "_blank", "width=600,height=400")
        }
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    const handlePrint = () => {
        window.print()
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p>ไม่พบบทความ</p>
            </div>
        )
    }

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
                            <span className="font-medium text-foreground">{post.author?.node?.name || "Admin"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <time>{new Date(post.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>อ่าน 5 นาที</span>
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
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm">แชร์บทความ:</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full hover:text-[#1877F2] hover:border-[#1877F2]"
                                        onClick={() => handleShare("facebook")}
                                    >
                                        <Facebook className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full hover:text-[#1DA1F2] hover:border-[#1DA1F2]"
                                        onClick={() => handleShare("twitter")}
                                    >
                                        <Twitter className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className={`rounded-full ${copied ? "text-green-500 border-green-500" : ""}`}
                                        onClick={handleCopyLink}
                                    >
                                        {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full"
                                        onClick={handlePrint}
                                    >
                                        <Printer className="h-4 w-4" />
                                    </Button>
                                </div>
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
            {/* Sticky Share Bar for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-around items-center md:hidden z-40 print:hidden">
                <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 text-xs" onClick={() => handleShare("facebook")}>
                    <Facebook className="h-5 w-5" />
                    <span>แชร์</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 text-xs" onClick={() => handleShare("twitter")}>
                    <Twitter className="h-5 w-5" />
                    <span>ทวีต</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2 text-xs" onClick={handleCopyLink}>
                    {copied ? <Check className="h-5 w-5 text-green-500" /> : <LinkIcon className="h-5 w-5" />}
                    <span>{copied ? "คัดลอกแล้ว" : "คัดลอก"}</span>
                </Button>
            </div>
        </article>
    )
}

