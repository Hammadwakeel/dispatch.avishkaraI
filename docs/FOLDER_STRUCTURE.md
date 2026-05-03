# Avishkar.ai — site map & repository structure

This document is the source of truth for the **marketing header information architecture** and how it maps to the **Next.js App Router** and **`src/` folders**.

---

## Site information architecture (header)

```
avishkar.ai/
│
├── [HEADER - Fixed Navigation]
│   ├── Logo: Avishkar AI (SVG)
│   │
│   ├── Nav Items:
│   │   ├── Products ▼
│   │   │   ├── FSM Platform
│   │   │   ├── AI Voice Agent
│   │   │   ├── Vision Inspection
│   │   │   ├── Predictive Maintenance
│   │   │   ├── Field Intelligence Suite
│   │   │   └── [View All Products →]
│   │   │
│   │   ├── Solutions ▼
│   │   │   ├── HVAC
│   │   │   ├── Plumbing
│   │   │   ├── Electrical
│   │   │   ├── Home Services
│   │   │   ├── Commercial
│   │   │   └── Emergency Services
│   │   │
│   │   ├── Industries ▼
│   │   │   ├── Residential
│   │   │   ├── Commercial
│   │   │   ├── Industrial
│   │   │   └── Government/Municipal
│   │   │
│   │   ├── Pricing
│   │   │   └── [Scrolls to pricing section]
│   │   │
│   │   ├── Resources ▼
│   │   │   ├── Blog
│   │   │   │   ├── AI Insights
│   │   │   │   ├── Industry Trends
│   │   │   │   ├── Case Studies
│   │   │   │   └── Product Updates
│   │   │   ├── Documentation Hub
│   │   │   ├── ROI Calculator
│   │   │   ├── Comparison Guide
│   │   │   └── Webinars & Events
│   │   │
│   │   └── Company ▼
│   │       ├── About Us
│   │       ├── Leadership
│   │       ├── Careers
│   │       ├── Partners
│   │       ├── Press/Media
│   │       └── Contact
│   │
│   └── CTAs:
│       ├── [Book Demo] ← Primary Button (Blue Gradient)
│       └── [Get Started] ← Secondary Button (Outline)
```

---

## Repository folder structure (implemented)

```text
avishkar.ai/
├── docs/
│   └── FOLDER_STRUCTURE.md          ← This file
├── public/
│   ├── logo-avishkar.svg            ← Wordmark / logo asset (header)
│   └── … (images, favicon, etc.)
├── src/
│   ├── app/                         ← Next.js App Router
│   │   ├── layout.tsx               ← Root layout + <SiteHeader />
│   │   ├── page.tsx                 ← Home (landing)
│   │   ├── globals.css
│   │   ├── products/
│   │   │   ├── page.tsx             ← Product hub (“View all”)
│   │   │   └── [slug]/page.tsx      ← Product detail placeholders
│   │   ├── solutions/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── industries/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── pricing/
│   │   │   └── page.tsx             ← Tiers + FAQ from content doc
│   │   ├── resources/
│   │   │   ├── page.tsx             ← Resources hub
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx  ← Blog category placeholders
│   │   │   ├── documentation/page.tsx
│   │   │   ├── roi-calculator/page.tsx
│   │   │   ├── comparison-guide/page.tsx
│   │   │   └── webinars/page.tsx
│   │   └── company/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   ├── config/
│   │   └── site-navigation.ts       ← Nav tree + slugs + hrefs (single source)
│   ├── content/                     ← Page copy derived from avishkar-ai-website-content.docx
│   │   ├── types.ts
│   │   ├── doc-products.ts
│   │   ├── doc-solutions.ts
│   │   ├── doc-industries.ts
│   │   ├── doc-company.ts
│   │   ├── doc-blog-categories.ts
│   │   └── doc-resource-pages.ts
│   └── components/
│       ├── layout/
│       │   ├── site-header.tsx      ← Fixed glass header + mega menus
│       │   ├── marketing-doc-page.tsx ← Renders DocPage sections
│       │   └── pricing-from-doc.tsx   ← Pricing tiers + FAQ from doc
│       └── sections/                ← Home page sections
│           ├── landing-page.tsx
│           ├── comparison-section.tsx
│           ├── hero-embedded-visual.tsx
│           ├── hero-lead-form.tsx
│           ├── platform-stack-section.tsx
│           └── trusted-marquee.tsx
├── theme guide/                     ← Design tokens / reference (existing)
├── package.json
└── …
```

---

## Route map (URLs ↔ files)

| IA label | URL |
|----------|-----|
| FSM Platform | `/products/fsm-platform` |
| AI Voice Agent | `/products/ai-voice-agent` |
| Vision Inspection | `/products/vision-inspection` |
| Predictive Maintenance | `/products/predictive-maintenance` |
| Field Intelligence Suite | `/products/field-intelligence-suite` |
| View all products | `/products` |
| HVAC … Emergency Services | `/solutions/{slug}` |
| Residential … Government/Municipal | `/industries/{slug}` |
| Pricing | `/pricing` (full page from doc). Home still exposes `id="pricing"` for deep links. |
| Blog categories | `/resources/blog/{slug}` |
| Documentation Hub | `/resources/documentation` |
| ROI Calculator | `/resources/roi-calculator` |
| Comparison Guide | `/resources/comparison-guide` |
| Webinars & Events | `/resources/webinars` |
| Company items | `/company/{slug}` |

Slug lists and labels live in **`src/config/site-navigation.ts`**.

---

## CTAs (header)

| Label | Style | Target |
|-------|--------|--------|
| Book Demo | Primary (blue gradient) | `/` + scroll `#demo` |
| Get Started | Secondary (outline) | `/` + scroll `#demo` |

---

## Content source (Word doc)

- Master copy: **`docs/avishkar-ai-website-content.docx`**
- App pages read structured TypeScript under **`src/content/`** (`doc-*.ts`), curated from that document.
- To re-extract plain text locally:  
  `pandoc -f docx -t plain docs/avishkar-ai-website-content.docx -o docs/avishkar-ai-website-content.plain.txt`  
  (Generated `*.plain.txt` is gitignored.)

## Maintenance

- Update nav labels or URLs in **`src/config/site-navigation.ts`** only; the header reads from that module.
- When the Word doc changes, update the matching **`src/content/doc-*.ts`** module (and **`pricing-from-doc.tsx`** for pricing tables), then run **`npm run build`**.
