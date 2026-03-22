# Deca Digital Consulting Website

Static marketing website for Deca Digital Consulting.

**Live site:** [decadigitalconsulting.com](https://decadigitalconsulting.com)

## Project Structure

```
├── index.html          # Homepage
├── about.html          # About page
├── services.html       # Services page
├── contact.html        # Contact page
├── blog.html           # Blog listing page
├── blog/               # Individual blog posts
├── 404.html            # Custom 404 page
├── css/style.css       # Styles
├── js/main.js          # JavaScript (GSAP scroll animations)
├── assets/             # Logo, OG image, etc.
├── CNAME               # Custom domain config for GitHub Pages
├── robots.txt          # Search engine crawling rules
└── sitemap.xml         # Sitemap for SEO
```

## Tech Stack

- **HTML/CSS/JS** — no frameworks or build step
- **GSAP** — scroll-triggered animations
- **GitHub Pages** — hosting (auto-deploys from `master` branch)

## Hosting & Domain Setup

- **Domain:** `decadigitalconsulting.com` (registered via OpenSRS)
- **DNS:** managed through the domain registrar's DNS zone editor
- **Hosting:** GitHub Pages — any push to `master` auto-deploys
- **Email:** Zoho Mail (MX, SPF, DKIM records configured in DNS — do not modify)
- **SSL:** provided automatically by GitHub Pages (Enforce HTTPS enabled)

## Local Development

No build tools required. Just open `index.html` in a browser, or use any local server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

## Deployment

Push to `master` — GitHub Pages deploys automatically within a few minutes.

```bash
git add .
git commit -m "Your commit message"
git push origin master
```

## Important Notes

- **Do not modify MX, SPF, DKIM, or mail CNAME records** in the domain's DNS zone — these are for Zoho Mail.
- The `CNAME` file in the repo root must contain `decadigitalconsulting.com` for the custom domain to work.
- Update `sitemap.xml` when adding new pages.
