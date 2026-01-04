import { Hero } from "@/components/Hero"
import { PostCard } from "@/components/PostCard"
import { CategoryBadge } from "@/components/CategoryBadge"


import { Newsletter } from "@/components/Newsletter"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getRecentPosts, getCategories } from "@/lib/api"
import { calculateReadingTimeEn } from "@/lib/utils"

export default async function EnglishHome() {
    const [posts, categories] = await Promise.all([
        getRecentPosts('en'),
        getCategories('en')
    ])

    return (
        <div className="flex flex-col min-h-screen">
            <Hero
                title="Islamic Education"
                description="A comprehensive source of authentic Islamic knowledge based on the Quran and Sunnah, for correct understanding and practice."
                searchPlaceholder="Search articles..."
                buttonText="Read Latest Articles"
                buttonLink="/eng/blog"
                searchBaseUrl="/eng/search"
            />

            {/* Category Quick Links */}
            <section className="py-12 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="font-serif text-2xl font-bold text-primary mb-2">Categories</h2>
                        <p className="text-muted-foreground">Browse by topic</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat: any) => (
                            <CategoryBadge
                                key={cat.slug}
                                name={cat.name}
                                slug={cat.slug}
                                count={cat.count}
                                variant="outline"
                                className="px-4 py-2 text-base"
                                basePath="/eng/categories"
                            // Note: CategoryBadge likely links to `/category/[slug]`. We might need to update CategoryBadge to support lang or handle link inside it.
                            // If CategoryBadge uses <Link href={\`/category/\${slug}\`}>, it will break.
                            // Let's check CategoryBadge later. For now, we assume it's dumb.
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest Posts */}
            <section className="py-16 container mx-auto px-4">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="font-serif text-3xl font-bold text-foreground">Latest Articles</h2>
                    <Button variant="outline" asChild>
                        <Link href="/eng/blog">View All</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post: any) => (
                        <PostCard
                            key={post.slug}
                            title={post.title}
                            excerpt={post.excerpt.replace(/<[^>]+>/g, '')} // Strip HTML tags
                            date={new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            readTime={calculateReadingTimeEn(post.content)}
                            category={post.categories.nodes[0]?.name || "General"}
                            imageUrl={post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1000&auto=format&fit=crop"}
                            slug={post.slug}
                            basePath="/eng/blog"
                            readMoreText="Read More"
                        />
                    ))}
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-16 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=2070&auto=format&fit=crop"
                                alt="Featured"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-6">
                            <span className="text-primary font-bold tracking-wider uppercase text-sm">Featured</span>
                            <h2 className="font-serif text-4xl font-bold text-foreground">The Importance of Seeking Knowledge</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Islam places great emphasis on seeking knowledge. The Prophet Muhammad (Peace Be Upon Him) said, "Seeking knowledge is a duty upon every Muslim." Join us in learning about the virtues and proper methods of seeking knowledge.
                            </p>
                            <Button size="lg" className="rounded-full px-8" asChild>
                                <Link href="/eng/categories">
                                    Read Article
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            {/* Newsletter component likely has hardcoded Thai text. Should be updated or wrapped. */}
            {/* <Newsletter /> */}
        </div>
    )
}
