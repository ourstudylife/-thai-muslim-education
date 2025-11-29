"use client"

import { PostCard } from "@/components/PostCard"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, FormEvent } from "react"
import { searchPosts } from "@/lib/api"

export default function SearchPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const query = searchParams.get("q") || ""
    const [searchQuery, setSearchQuery] = useState(query)
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchResults = async () => {
            if (query) {
                setLoading(true)
                try {
                    const posts = await searchPosts(query)
                    setResults(posts)
                } catch (error) {
                    console.error("Search error:", error)
                    setResults([])
                } finally {
                    setLoading(false)
                }
            } else {
                setResults([])
                setLoading(false)
            }
        }
        fetchResults()
    }, [query])

    const handleSearch = (e: FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center mb-12">
                <h1 className="font-serif text-3xl font-bold mb-6">ผลการค้นหา</h1>
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        placeholder="ค้นหาบทความ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-4 pr-12 rounded-lg border border-input bg-background text-lg shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 h-8 w-8 bg-primary text-white rounded-md flex items-center justify-center hover:bg-primary/90 transition-colors"
                    >
                        <Search className="h-4 w-4" />
                    </button>
                </form>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">กำลังค้นหา...</p>
                </div>
            ) : (
                <>
                    <div className="mb-8">
                        <p className="text-muted-foreground">
                            {query && `พบ ${results.length} บทความสำหรับคำว่า "${query}"`}
                            {!query && "กรุณาใส่คำค้นหา"}
                        </p>
                    </div>

                    {results.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {results.map((post: any) => (
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
                    ) : query ? (
                        <div className="text-center py-12">
                            <h2 className="font-serif text-2xl font-bold mb-4">ไม่พบผลการค้นหา</h2>
                            <p className="text-muted-foreground mb-8">ลองใช้คำค้นหาอื่น หรือดูบทความทั้งหมด</p>
                            <Button asChild>
                                <a href="/blog">ดูบทความทั้งหมด</a>
                            </Button>
                        </div>
                    ) : null}
                </>
            )}
        </div>
    )
}
