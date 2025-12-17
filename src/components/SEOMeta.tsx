// src/components/SEOMeta.tsx
'use client';

import { usePathname } from 'next/navigation';
import { SEO_CONFIG, getCanonicalUrl, shouldNoindex } from '@/lib/seo-config';

interface SEOMetaProps {
    lang?: 'th' | 'en';
}

export function SEOMeta({ lang = 'th' }: SEOMetaProps) {
    const pathname = usePathname();

    // If SEO transfer is disabled, render nothing
    if (!SEO_CONFIG.enabled) {
        return null;
    }

    const canonicalUrl = getCanonicalUrl(pathname, lang);
    const alternateLang = lang === 'th' ? 'en' : 'th';
    const alternateUrl = getCanonicalUrl(
        lang === 'th' ? `/eng${pathname}` : pathname.replace(/^\/eng/, ''),
        alternateLang
    );

    return (
        <>
            {/* Noindex - Tell search engines not to index this page */}
            {shouldNoindex() && (
                <meta name="robots" content="noindex, nofollow" />
            )}

            {/* Canonical - Point to WordPress as the authority */}
            {canonicalUrl && SEO_CONFIG.features.canonical && (
                <link rel="canonical" href={canonicalUrl} />
            )}

            {/* Hreflang - Link language versions */}
            {SEO_CONFIG.features.hreflang && (
                <>
                    <link rel="alternate" hrefLang={lang} href={canonicalUrl} />
                    <link rel="alternate" hrefLang={alternateLang} href={alternateUrl} />
                    <link rel="alternate" hrefLang="x-default" href={SEO_CONFIG.wordpress.th} />
                </>
            )}
        </>
    );
}
