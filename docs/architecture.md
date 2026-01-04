# Prayer Times Website Architecture

## 1. Frontend: Next.js (App Router)
- **Framework**: We use Next.js for its speed and SEO capabilities.
- **Dynamic Routing**: URLs like `prayer.com/en/bangkok` are handled dynamically.
- **Data Fetching**: We use **Static Site Generation (SSG)**. This means the HTML for each city is generated at build time, making the site extremely fast.
- **ISR (Incremental Static Regeneration)**: We refresh the data once a day automatically without needing to re-deploy.

## 2. SEO Strategy
- **Localized Paths**: `/th/bangkok` for Thai and `/en/bangkok` for English.
- **Dynamic Meta Tags**: Every city page will have a unique Title and Description (e.g., "Prayer Times in Bangkok - Dec 19").
- **Structured Data (JSON-LD)**: We embed "Schema.org" data so Google can show prayer times directly in search results.

## 3. Deployment: Vercel
- **CI/CD**: Every time code is pushed to GitHub, Vercel automatically builds and deploys the site.
- **Edge Network**: The site is cached globally, so it's fast regardless of where the user is.

## 4. DNS Structure (Cloudflare)
- **Subdomain**: We use a CNAME record in Cloudflare to point `prayer.yourdomain.com` to Vercel's servers.
- **SSL/TLS**: Cloudflare provides a free SSL certificate for the subdomain.
- **Proxy**: Cloudflare acts as a firewall and cache layer before traffic hits Vercel.
