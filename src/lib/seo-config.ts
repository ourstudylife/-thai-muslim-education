// src/lib/seo-config.ts
// SEO Configuration - All settings can be overridden via environment variables

export const SEO_CONFIG = {
    // Toggle SEO authority transfer features
    // FOR THIS SITE TO RANK: Set this to false so we don't redirect authority away
    enabled: process.env.NEXT_PUBLIC_SEO_TRANSFER_ENABLED === 'true',

    // WordPress authority sites (used for data fetching now, not SEO redirection)
    wordpress: {
        th: process.env.NEXT_PUBLIC_WP_URL_TH || 'https://thaimuslimeducation.com',
        en: process.env.NEXT_PUBLIC_WP_URL_EN || 'https://en.thaimuslimeducation.com',
    },

    // Main site URL (deployed on Hostinger - blog subdomain)
    site: {
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.thaimuslimeducation.com',
    },

    // Control individual features
    features: {
        noindex: false, // We WANT to index this site
        canonical: true, // We want canonical tags pointing to self usually
        hreflang: true,
    },
} as const;

// Helper to get WordPress URL for a given path
export function getCanonicalUrl(path: string, lang: 'th' | 'en' = 'th'): string {
    if (!SEO_CONFIG.enabled || !SEO_CONFIG.features.canonical) {
        return ''; // Return empty if disabled
    }

    const baseUrl = lang === 'en' ? SEO_CONFIG.wordpress.en : SEO_CONFIG.wordpress.th;

    // Map Vercel paths to WordPress paths
    // /blog/slug -> /slug (WordPress uses root-level posts)
    // /eng/blog/slug -> /slug
    const wpPath = path
        .replace(/^\/eng/, '')
        .replace(/^\/blog/, '')
        .replace(/^\/categories/, '/category');

    return `${baseUrl}${wpPath}`;
}

// Helper to check if noindex should be applied
export function shouldNoindex(): boolean {
    return SEO_CONFIG.enabled && SEO_CONFIG.features.noindex;
}
