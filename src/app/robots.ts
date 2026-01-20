import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo-config';

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.thaimuslimeducation.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/api/'], // Protect private folders if any
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
