# Deployment & Configuration Guide

Follow these steps to take your Premium Muslim Prayer Times website live.

## 1. Cloudflare DNS Setup
To host your site on a subdomain (e.g., `prayertimes.thaimuslimeducation.com`):

1.  **Log in** to your Cloudflare dashboard.
2.  Go to the **DNS** tab for your domain.
3.  Click **Add Record**:
    - **Type**: `A`
    - **Name**: `prayertimes`
    - **IPv4 address**: Your server's public IP address.
    - **Proxy status**: Proxied (Orange cloud on).
4.  Go to **SSL/TLS** settings:
    - Set to **Full (strict)** for maximum security.

## 2. Web Server Deployment (Apache/Nginx)
Upload the contents of the `prayertimes/` folder to your server's web root (e.g., `/var/www/prayertimes`).

### Nginx Configuration Example
```nginx
server {
    listen 80;
    server_name prayertimes.thaimuslimeducation.com;
    root /var/www/prayertimes;
    index index.html;

    # SEO friendly URLs
    location / {
        try_files $uri $uri.html $uri/index.html =404;
    }

    # Cache static assets
    location ~* \.(css|js|json|png|jpg|ico)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

## 3. Data Update Strategy
Since there is no public API, use one of these methods:
- **Manual**: Update the `.json` files in `data/cities/` once a month.
- **Scripted**: Create a small Python/Node script that runs as a cron job to fetch times from Fazilet Takvimi and overwrite the JSON files.

## 4. Final Production Checklist
- [ ] **Attribution**: "Prayer times based on Fazilet Takvimi" is visible.
- [ ] **SEO**: Every page has a unique `<title>` and `meta description`.
- [ ] **Icons**: `favicon.ico` and apple-touch-icons are added.
- [ ] **Analytics**: Google Analytics 4 (GA4) or similar is installed.
- [ ] **Caching**: Verify `localStorage` is working as expected.
- [ ] **Mobile**: Test on iOS/Android browsers.
- [ ] **HTTPS**: Verify the SSL padlock appears in the browser.
