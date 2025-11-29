"use client"

import { PostCard } from "@/components/PostCard"
import { CategoryBadge } from "@/components/CategoryBadge"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useState, useEffect, FormEvent } from "react"
import { getAllPosts, getCategories } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function BlogIndex() {
    const router = useRouter()
    const [posts, setPosts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 6

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    const totalPages = Math.ceil(posts.length / postsPerPage)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsData, categoriesData] = await Promise.all([
                    getAllPosts(),
                    getCategories()
                ])
                setPosts(postsData)
                setCategories(categoriesData)
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleSearch = (e: FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <p className="text-center">กำลังโหลด...</p>
            </div>
        )
    }



    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="flex-1">
                    <div className="mb-8">
                        <h1 className="font-serif text-4xl font-bold mb-4">บทความทั้งหมด</h1>
                        <p className="text-muted-foreground">รวมบทความสอนศาสนาอิสลาม เพื่อความเข้าใจที่ถูกต้อง</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {currentPosts.map((post: any) => (
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

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2">
                            <Button
                                variant="outline"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                ก่อนหน้า
                            </Button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                <Button
                                    key={number}
                                    variant={currentPage === number ? "secondary" : "ghost"}
                                    onClick={() => paginate(number)}
                                >
                                    {number}
                                </Button>
                            ))}

                            <Button
                                variant="outline"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                ถัดไป
                            </Button>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="w-full lg:w-80 space-y-8">
                    {/* Search */}
                    <div className="bg-muted/30 p-6 rounded-lg border">
                        <h3 className="font-serif text-lg font-bold mb-4">ค้นหา</h3>
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="คำค้นหา..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 pl-3 pr-10 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                            <button type="submit" className="absolute right-3 top-2.5">
                                <Search className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                            </button>
                        </form>
                    </div>

                    {/* Categories */}
                    <div className="bg-muted/30 p-6 rounded-lg border">
                        <h3 className="font-serif text-lg font-bold mb-4">หมวดหมู่</h3>
                        <div className="flex flex-col gap-2">
                            {categories.map((cat: any) => (
                                <CategoryBadge
                                    key={cat.slug}
                                    name={cat.name}
                                    slug={cat.slug}
                                    count={cat.count}
                                    variant="ghost"
                                    className="justify-between w-full hover:bg-background"
                                />
                            ))}
                        </div>
                    </div>


                </aside>
            </div>
        </div>
    )
}
