// src/lib/seo-config.ts
// SEO Configuration - All settings can be overridden via environment variables

export const SEO_CONFIG = {
    // Toggle SEO authority transfer features
    enabled: process.env.NEXT_PUBLIC_SEO_TRANSFER_ENABLED === 'true',

    // WordPress authority sites (where SEO should point)
    wordpress: {
        th: process.env.NEXT_PUBLIC_WP_URL_TH || 'https://thaimuslimeducation.com',
        en: process.env.NEXT_PUBLIC_WP_URL_EN || 'https://en.thaimuslimeducation.com',
    },

    // Vercel site (this site)
    vercel: {
        url: process.env.NEXT_PUBLIC_VERCEL_URL || 'https://thai-muslim-education.vercel.app',
    },

    // Control individual features
    features: {
        noindex: process.env.NEXT_PUBLIC_SEO_NOINDEX !== 'false', // Default: true when enabled
        canonical: process.env.NEXT_PUBLIC_SEO_CANONICAL !== 'false', // Default: true when enabled
        hreflang: process.env.NEXT_PUBLIC_SEO_HREFLANG !== 'false', // Default: true when enabled
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
