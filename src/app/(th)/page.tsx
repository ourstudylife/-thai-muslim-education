import { Hero } from "@/components/Hero"
import { PostCard } from "@/components/PostCard"
import { CategoryBadge } from "@/components/CategoryBadge"


import { Newsletter } from "@/components/Newsletter"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getRecentPosts, getCategories } from "@/lib/api"

export default async function Home() {
  const [posts, categories] = await Promise.all([
    getRecentPosts(),
    getCategories()
  ])

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Category Quick Links */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-primary mb-2">หมวดหมู่บทความ</h2>
            <p className="text-muted-foreground">เลือกอ่านตามหัวข้อที่คุณสนใจ</p>
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-3xl font-bold text-foreground">บทความล่าสุด</h2>
          <Button variant="outline" asChild>
            <Link href="/blog">ดูทั้งหมด</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <PostCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt.replace(/<[^>]+>/g, '')} // Strip HTML tags
              date={new Date(post.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
              readTime="5 นาที" // Placeholder as WP doesn't provide read time by default
              category={post.categories.nodes[0]?.name || "ทั่วไป"}
              imageUrl={post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1000&auto=format&fit=crop"}
              slug={post.slug}
            />
          ))}
        </div>
      </section>

      {/* Featured Section (Optional) */}
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
              <span className="text-primary font-bold tracking-wider uppercase text-sm">บทความแนะนำ</span>
              <h2 className="font-serif text-4xl font-bold text-foreground">ความสำคัญของการศึกษาหาความรู้ในอิสลาม</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                อิสลามให้ความสำคัญกับการศึกษาหาความรู้เป็นอย่างมาก ท่านนบีมุฮัมมัด (ซ.ล.) ได้กล่าวว่า "การแสวงหาความรู้เป็นหน้าที่จำเป็นสำหรับมุสลิมทุกคน" มาร่วมเรียนรู้ถึงความประเสริฐและวิธีการแสวงหาความรู้ที่ถูกต้อง
              </p>
              <Button size="lg" className="rounded-full px-8">
                อ่านบทความนี้
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  )
}
