"use client"

import { PostCard } from "@/components/PostCard"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, FormEvent, Suspense } from "react"
import { searchPosts } from "@/lib/api"

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
                    const data = await searchPosts(query)
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
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Search Header */}
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl font-bold mb-4">ค้นหาบทความ</h1>
                    {query && (
                        <p className="text-muted-foreground">
                            ผลการค้นหาสำหรับ: <span className="font-medium text-foreground">"{query}"</span>
                        </p>
                    )}
                </div>

                {/* Search Box */}
                <form onSubmit={handleSearch} className="relative mb-12">
                    <input
                        type="text"
                        placeholder="ค้นหาบทความ..."
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
                        <p className="text-muted-foreground">กำลังค้นหา...</p>
                    </div>
                ) : results.length > 0 ? (
                    <>
                        <p className="text-sm text-muted-foreground mb-6">
                            พบ {results.length} บทความ
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    </>
                ) : query ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">ไม่พบบทความที่ตรงกับคำค้นหา</p>
                        <Button onClick={() => router.push('/blog')}>
                            ดูบทความทั้งหมด
                        </Button>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">กรุณากรอกคำค้นหา</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">กำลังโหลด...</div>}>
            <SearchPageContent />
        </Suspense>
    )
}
