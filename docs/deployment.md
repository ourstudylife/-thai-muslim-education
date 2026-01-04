# Deployment & Subdomain Setup Guide

## 1. Deploy to Vercel
1.  **Push to GitHub**: Ensure your project is in a GitHub repository.
2.  **Import to Vercel**:
    - Go to [vercel.com](https://vercel.com).
    - Click "Add New" > "Project".
    - Select your GitHub repo.
    - Keep default settings and click "Deploy".

## 2. Setup Subdomain in Cloudflare
1.  **Access Cloudflare**: Go to your domain settings in Cloudflare.
2.  **Add DNS Record**:
    - **Type**: `CNAME`
    - **Name**: `prayer` (this creates `prayer.yourdomain.com`)
    - **Content**: `cname.vercel-dns.com`
    - **Proxy status**: Proxied (Orange cloud) or DNS only (Grey cloud). *Vercel recommends Grey cloud for initial setup to verify SSL, then you can turn on Orange cloud.*

## 3. Connect Domain in Vercel
1.  Go to your project in Vercel.
2.  Navigate to **Settings** > **Domains**.
3.  Add `prayer.yourdomain.com`.
4.  Vercel will check the DNS records and issue an SSL certificate.
