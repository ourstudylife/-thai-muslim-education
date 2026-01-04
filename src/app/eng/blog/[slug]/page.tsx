import { getPostBySlug } from "@/lib/api"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar, User, Clock } from "lucide-react"
import { calculateReadingTimeEn } from "@/lib/utils"


interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function EnglishBlogPostPage({ params }: PageProps) {
    const { slug } = await params
    const post = await getPostBySlug(slug, 'en')

    if (!post) {
        notFound()
    }

    return (
        <article className="min-h-screen bg-background pb-16">
            {/* Header / Featured Image */}
            <div className="relative h-[400px] md:h-[500px] w-full">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <Image
                    src={post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1000&auto=format&fit=crop"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-16">
                    <div className="max-w-4xl mx-auto w-full text-white">
                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm md:text-base">
                            <span className="bg-primary/90 px-3 py-1 rounded-full font-semibold">
                                {post.categories.nodes[0]?.name || "General"}
                            </span>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <time>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{calculateReadingTimeEn(post.content || "")}</span>
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-2 text-white/90">
                            <User className="w-4 h-4" />
                            <span>Admin</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 mt-12">
                <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-a:text-primary prose-blockquote:text-foreground prose-blockquote:border-primary prose-img:rounded-lg">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </div>
        </article>
    )
}

export async function generateStaticParams() {
    const { getAllPosts } = await import("@/lib/api")
    const posts = await getAllPosts("en")

    return posts.map((post: any) => ({
        slug: post.slug,
    }))
}
