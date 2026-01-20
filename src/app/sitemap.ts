import { MetadataRoute } from 'next';
import { getAllPosts, getCategories } from '@/lib/api';

export const dynamic = "force-static";

// Define static category pages that exist on this site
const STATIC_CATEGORIES_TH = ['faith', 'practice', 'fiqh', 'history'];
const STATIC_CATEGORIES_EN = ['faith', 'practice', 'fiqh', 'history'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'https://thai-muslim-education.vercel.app';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/categories`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        // English static pages
        {
            url: `${baseUrl}/eng`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/eng/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/eng/categories`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ];

    // Category pages (Thai)
    const categoryPagesTh: MetadataRoute.Sitemap = STATIC_CATEGORIES_TH.map((slug) => ({
        url: `${baseUrl}/categories/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Category pages (English)
    const categoryPagesEn: MetadataRoute.Sitemap = STATIC_CATEGORIES_EN.map((slug) => ({
        url: `${baseUrl}/eng/categories/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // Fetch all posts for Thai
    let postPagesTh: MetadataRoute.Sitemap = [];
    try {
        const postsTh = await getAllPosts('th');
        postPagesTh = postsTh.map((post: { slug: string; date: string }) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }));
    } catch (error) {
        console.error('Error fetching Thai posts for sitemap:', error);
    }

    // Fetch all posts for English
    let postPagesEn: MetadataRoute.Sitemap = [];
    try {
        const postsEn = await getAllPosts('en');
        postPagesEn = postsEn.map((post: { slug: string; date: string }) => ({
            url: `${baseUrl}/eng/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        }));
    } catch (error) {
        console.error('Error fetching English posts for sitemap:', error);
    }

    return [
        ...staticPages,
        ...categoryPagesTh,
        ...categoryPagesEn,
        ...postPagesTh,
        ...postPagesEn,
    ];
}
