// src/app/robots.ts
import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo-config';

export default function robots(): MetadataRoute.Robots {
    // If SEO transfer is disabled, allow indexing (existing behavior)
    if (!SEO_CONFIG.enabled) {
        return {
            rules: {
                userAgent: '*',
                allow: '/',
            },
        };
    }

    // When enabled: block indexing, point to WordPress sitemaps
    return {
        rules: {
            userAgent: '*',
            disallow: '/', // Block all pages from indexing
        },
        sitemap: [
            `${SEO_CONFIG.wordpress.th}/sitemap.xml`,
            `${SEO_CONFIG.wordpress.en}/sitemap.xml`,
        ],
    };
}
