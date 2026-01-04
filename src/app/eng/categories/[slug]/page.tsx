import { PostCard } from "@/components/PostCard"
import { getCategoryBySlug, getPostsByCategory } from "@/lib/api"
import { notFound } from "next/navigation"
import { calculateReadingTimeEn } from "@/lib/utils"

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function EnglishCategoryPage({ params }: PageProps) {
    const { slug } = await params
    const [category, posts] = await Promise.all([
        getCategoryBySlug(slug, 'en'),
        getPostsByCategory(slug, 'en')
    ])

    if (!category) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
                    <span className="text-3xl">📚</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{category.name}</h1>
                {category.description && (
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {category.description}
                    </p>
                )}
                <div className="mt-4 inline-block bg-secondary px-3 py-1 rounded-full text-sm font-medium">
                    {posts.length} Articles
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                    <PostCard
                        key={post.slug}
                        title={post.title}
                        excerpt={(post.excerpt || "").replace(/<[^>]+>/g, '')}
                        date={new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        readTime={calculateReadingTimeEn(post.content || "")}
                        category={category.name} // We know the category
                        imageUrl={post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1000&auto=format&fit=crop"}
                        slug={post.slug}
                        basePath="/eng/blog"
                        readMoreText="Read More"
                    />
                ))}
            </div>

            {posts.length === 0 && (
                <div className="text-center py-20 bg-muted/30 rounded-xl">
                    <h3 className="text-xl font-bold mb-2">No articles found</h3>
                    <p className="text-muted-foreground">
                        There are no articles in this category yet.
                    </p>
                </div>
            )}
        </div>
    )
}

export async function generateStaticParams() {
    const { getCategories } = await import("@/lib/api")
    const categories = await getCategories("en")

    return categories.map((cat: any) => ({
        slug: cat.slug,
    }))
}
