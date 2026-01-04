import { PostCard } from "@/components/PostCard"
import { getAllPosts } from "@/lib/api"

// Force dynamic rendering to get fresh content on navigation


export default async function EnglishBlogPage() {
    const posts = await getAllPosts('en')

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Articles</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Explore our collection of articles on Islamic knowledge.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                    <PostCard
                        key={post.slug}
                        title={post.title}
                        excerpt={post.excerpt.replace(/<[^>]+>/g, '')}
                        date={new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        readTime="5 min read"
                        category={post.categories.nodes[0]?.name || "General"}
                        imageUrl={post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1000&auto=format&fit=crop"}
                        slug={post.slug}
                        basePath="/eng/blog"
                        readMoreText="Read More"
                    />
                ))}
            </div>
        </div>
    )
}
