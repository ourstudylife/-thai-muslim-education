import { CategoryBadge } from "@/components/CategoryBadge"
import { getCategories } from "@/lib/api"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function EnglishCategoriesPage() {
    const categories = await getCategories('en')

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Categories</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Browse articles by topic to find exactly what you're looking for.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((cat: any) => (
                        <Link
                            key={cat.slug}
                            href={`/eng/categories/${cat.slug}`}
                            className="flex flex-col items-center justify-center p-8 rounded-xl border bg-card hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:shadow-md group"
                        >
                            <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                📚
                            </span>
                            <h3 className="text-lg font-bold mb-2">{cat.name}</h3>
                            <span className="text-sm text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full">
                                {cat.count} Articles
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-muted-foreground mb-6">
                        Looking for something specific? Try searching instead.
                    </p>
                    <Button variant="outline" size="lg" className="gap-2" asChild>
                        <Link href="/eng/search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            Search Articles
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
