"use client"

import { PostCard } from "@/components/PostCard"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, FormEvent, Suspense } from "react"
import { searchPosts } from "@/lib/api"
import { calculateReadingTimeEn } from "@/lib/utils"

function SearchPageContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const query = searchParams.get("q") || ""
    const [searchQuery, setSearchQuery] = useState(query)
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchResults = async () => {
            if (query) {
                try {
                    setLoading(true)
                    const data = await searchPosts(query, 'en')
                    setResults(data)
                } catch (error) {
                    console.error("Search error:", error)
                } finally {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }
        fetchResults()
    }, [query])

    const handleSearch = (e: FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/eng/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Search Header */}
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl font-bold mb-4">Search Articles</h1>
                    {query && (
                        <p className="text-muted-foreground">
                            Results for: <span className="font-medium text-foreground">"{query}"</span>
                        </p>
                    )}
                </div>

                {/* Search Box */}
                <form onSubmit={handleSearch} className="relative mb-12">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-14 pl-6 pr-14 rounded-full border border-input bg-background text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                    >
                        <Search className="h-5 w-5" />
                    </button>
                </form>

                {/* Results */}
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Searching...</p>
                    </div>
                ) : results.length > 0 ? (
                    <>
                        <p className="text-sm text-muted-foreground mb-6">
                            Found {results.length} articles
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {results.map((post: any) => (
                                <PostCard
                                    key={post.slug}
                                    title={post.title}
                                    excerpt={post.excerpt.replace(/<[^>]+>/g, '')}
                                    date={new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    readTime={calculateReadingTimeEn(post.content)}
                                    category={post.categories.nodes[0]?.name || "General"}
                                    imageUrl={post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1000&auto=format&fit=crop"}
                                    slug={post.slug}
                                    basePath="/eng/blog"
                                    readMoreText="Read more"
                                />
                            ))}
                        </div>
                    </>
                ) : query ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">No articles found matching your search.</p>
                        <Button onClick={() => router.push('/eng/blog')}>
                            View All Articles
                        </Button>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Please enter a search term.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading...</div>}>
            <SearchPageContent />
        </Suspense>
    )
}
