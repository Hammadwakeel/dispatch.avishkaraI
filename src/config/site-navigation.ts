/**
 * Single source of truth for marketing header routes.
 * See docs/FOLDER_STRUCTURE.md for the full site map diagram.
 */

/** Lucide icon keys mapped in `SiteHeader` for mega-menu tiles. */
export type MegaMenuIconId =
  | "layout-dashboard"
  | "phone"
  | "camera"
  | "gauge"
  | "waypoints"
  | "layout-grid"
  | "thermometer"
  | "droplets"
  | "zap"
  | "home"
  | "building-2"
  | "siren"
  | "factory"
  | "landmark"
  | "book-open"
  | "sparkles"
  | "trending-up"
  | "file-text"
  | "megaphone"
  | "book-marked"
  | "calculator"
  | "scale"
  | "video"
  | "building"
  | "users"
  | "briefcase"
  | "handshake"
  | "newspaper"
  | "mail";

export type NavLink = {
  label: string;
  href: string;
  /** e.g. “View all” row */
  emphasis?: boolean;
  /** Short blurb for hub cards and mega-menu tiles */
  description?: string;
  icon?: MegaMenuIconId;
};

export type NavDropdown = {
  label: string;
  href?: string;
  children: NavLink[];
  /** Mega panel header (primary line). */
  megaTitle: string;
  /** Mega panel subline under the title. */
  megaSubtitle: string;
  /** Optional “hub” link for the header row (arrow). */
  megaHref?: string;
};

export const productLinks: NavLink[] = [
  {
    label: "FSM Platform",
    href: "/products/fsm-platform",
    icon: "layout-dashboard",
    description:
      "Scheduling, dispatch, customers, jobs, and analytics—one intelligent core that learns your operation.",
  },
  {
    label: "AI Voice Agent",
    href: "/products/ai-voice-agent",
    icon: "phone",
    description:
      "Answers calls 24/7, qualifies intent, checks availability, and books jobs without waiting on a human line.",
  },
  {
    label: "Vision Inspection",
    href: "/products/vision-inspection",
    icon: "camera",
    description:
      "Turns site photos into proof: before/after, damage detection, compliance packs, and QA you can defend.",
  },
  {
    label: "Predictive Maintenance",
    href: "/products/predictive-maintenance",
    icon: "gauge",
    description:
      "Equipment health scores and failure signals so you sell proactive service instead of chasing emergencies.",
  },
  {
    label: "Field Intelligence Suite",
    href: "/products/field-intelligence-suite",
    icon: "waypoints",
    description:
      "Route, parts, pricing, and performance intelligence that makes every technician and truck run smarter.",
  },
  {
    label: "View all products",
    href: "/products",
    emphasis: true,
    icon: "layout-grid",
    description: "See the full suite on one page—ideal for stakeholder walkthroughs.",
  },
];

export const solutionLinks: NavLink[] = [
  {
    label: "HVAC",
    href: "/solutions/hvac",
    icon: "thermometer",
    description: "Seasonal demand, tune-ups, and install workflows tuned for residential and light commercial.",
  },
  {
    label: "Plumbing",
    href: "/solutions/plumbing",
    icon: "droplets",
    description: "Emergency triage, dispatch, and follow-up that keeps crews moving and customers informed.",
  },
  {
    label: "Electrical",
    href: "/solutions/electrical",
    icon: "zap",
    description: "Permits, safety checks, and multi-day jobs coordinated from first call to invoice.",
  },
  {
    label: "Home Services",
    href: "/solutions/home-services",
    icon: "home",
    description: "Bundled trades and memberships with one schedule of record across your brands.",
  },
  {
    label: "Commercial",
    href: "/solutions/commercial",
    icon: "building-2",
    description: "SLAs, recurring maintenance, and multi-site coordination built for facility teams.",
  },
  {
    label: "Emergency Services",
    href: "/solutions/emergency-services",
    icon: "siren",
    description: "After-hours routing, on-call rotations, and rapid response without burning out dispatch.",
  },
];

export const industryLinks: NavLink[] = [
  {
    label: "Residential",
    href: "/industries/residential",
    icon: "home",
    description: "High-volume homeowner jobs, reviews, and repeat business at scale.",
  },
  {
    label: "Commercial",
    href: "/industries/commercial",
    icon: "building-2",
    description: "Contracts, compliance, and multi-location service programs.",
  },
  {
    label: "Industrial",
    href: "/industries/industrial",
    icon: "factory",
    description: "Asset-heavy sites, inspections, and technician certifications in one place.",
  },
  {
    label: "Government / Municipal",
    href: "/industries/government-municipal",
    icon: "landmark",
    description: "Public-sector procurement, documentation, and audit-ready reporting.",
  },
];

export const blogCategoryLinks: NavLink[] = [
  { label: "AI Insights", href: "/resources/blog/ai-insights" },
  { label: "Industry Trends", href: "/resources/blog/industry-trends" },
  { label: "Case Studies", href: "/resources/blog/case-studies" },
  { label: "Product Updates", href: "/resources/blog/product-updates" },
];

export const resourcesMegaLinks: NavLink[] = [
  {
    label: "Blog",
    href: "/resources/blog",
    emphasis: true,
    icon: "book-open",
    description: "Guides, announcements, and deep dives from the Avishkar team.",
  },
  {
    label: "AI Insights",
    href: "/resources/blog/ai-insights",
    icon: "sparkles",
    description: "How AI changes scheduling, voice, and field operations in practice.",
  },
  {
    label: "Industry Trends",
    href: "/resources/blog/industry-trends",
    icon: "trending-up",
    description: "Market moves, labor, and technology shaping trades and services.",
  },
  {
    label: "Case Studies",
    href: "/resources/blog/case-studies",
    icon: "file-text",
    description: "Real outcomes from teams who modernized dispatch and customer experience.",
  },
  {
    label: "Product Updates",
    href: "/resources/blog/product-updates",
    icon: "megaphone",
    description: "What shipped, what’s next, and how to get the most from each release.",
  },
  {
    label: "Documentation Hub",
    href: "/resources/documentation",
    icon: "book-marked",
    description: "Reference material for admins, integrators, and power users.",
  },
  {
    label: "ROI Calculator",
    href: "/resources/roi-calculator",
    icon: "calculator",
    description: "Estimate time and revenue impact before you roll out.",
  },
  {
    label: "Comparison Guide",
    href: "/resources/comparison-guide",
    icon: "scale",
    description: "How Avishkar stacks up on the criteria buyers actually care about.",
  },
  {
    label: "Webinars & Events",
    href: "/resources/webinars",
    icon: "video",
    description: "Live sessions, replays, and field meetups.",
  },
];

export const companyLinks: NavLink[] = [
  {
    label: "About Us",
    href: "/company#about",
    icon: "building",
    description: "Mission, story, and why we build for field service first.",
  },
  {
    label: "Leadership",
    href: "/company#leadership",
    icon: "users",
    description: "The team guiding product, partnerships, and customer success.",
  },
  {
    label: "Careers",
    href: "/company#careers",
    icon: "briefcase",
    description: "Open roles across engineering, go-to-market, and operations.",
  },
  {
    label: "Partners",
    href: "/company#partners",
    icon: "handshake",
    description: "Integrators, resellers, and technology partners we grow with.",
  },
  {
    label: "Press / Media",
    href: "/company#press",
    icon: "newspaper",
    description: "Brand assets, newsroom contacts, and recent coverage.",
  },
  {
    label: "Contact",
    href: "/company#contact",
    icon: "mail",
    description: "Sales, support, and general inquiries— we respond quickly.",
  },
];

/** Top-level link (not a dropdown). */
export const pricingNavItem = {
  label: "Pricing",
  href: "/pricing",
} as const;

export const headerDropdowns: NavDropdown[] = [
  {
    label: "Products",
    megaTitle: "Product suite",
    megaSubtitle: "AI-native tools for dispatch, voice, vision, and intelligence",
    megaHref: "/products",
    children: productLinks,
  },
  {
    label: "Solutions",
    megaTitle: "Solutions",
    megaSubtitle: "Playbooks tailored to how you run jobs today",
    megaHref: "/solutions",
    children: solutionLinks,
  },
  {
    label: "Industries",
    megaTitle: "Industries",
    megaSubtitle: "Segments we support out of the box",
    megaHref: "/industries",
    children: industryLinks,
  },
  {
    label: "Resources",
    megaTitle: "Resource center",
    megaSubtitle: "Learn, compare, and plan your rollout",
    megaHref: "/resources",
    children: resourcesMegaLinks,
  },
  {
    label: "Company",
    megaTitle: "Company",
    megaSubtitle: "People, partners, and how to reach us",
    megaHref: "/company",
    children: companyLinks,
  },
];

export const PRODUCT_SLUGS = productLinks
  .filter((l) => !l.emphasis)
  .map((l) => l.href.replace("/products/", "")) as readonly string[];

export const SOLUTION_SLUGS = solutionLinks.map(
  (l) => l.href.replace("/solutions/", ""),
) as readonly string[];

export const INDUSTRY_SLUGS = industryLinks.map(
  (l) => l.href.replace("/industries/", ""),
) as readonly string[];

export const BLOG_SLUGS = blogCategoryLinks.map(
  (l) => l.href.replace("/resources/blog/", ""),
) as readonly string[];

export const COMPANY_SLUGS = companyLinks.map(
  (l) => l.href.replace("/company/", ""),
) as readonly string[];

export function isProductSlug(slug: string): slug is (typeof PRODUCT_SLUGS)[number] {
  return (PRODUCT_SLUGS as readonly string[]).includes(slug);
}

export function isSolutionSlug(slug: string): slug is (typeof SOLUTION_SLUGS)[number] {
  return (SOLUTION_SLUGS as readonly string[]).includes(slug);
}

export function isIndustrySlug(slug: string): slug is (typeof INDUSTRY_SLUGS)[number] {
  return (INDUSTRY_SLUGS as readonly string[]).includes(slug);
}

export function isBlogSlug(slug: string): slug is (typeof BLOG_SLUGS)[number] {
  return (BLOG_SLUGS as readonly string[]).includes(slug);
}

export function isCompanySlug(slug: string): slug is (typeof COMPANY_SLUGS)[number] {
  return (COMPANY_SLUGS as readonly string[]).includes(slug);
}

export function labelForProductSlug(slug: string): string | undefined {
  return productLinks.find((l) => l.href === `/products/${slug}`)?.label;
}

export function labelForSolutionSlug(slug: string): string | undefined {
  return solutionLinks.find((l) => l.href === `/solutions/${slug}`)?.label;
}

export function labelForIndustrySlug(slug: string): string | undefined {
  return industryLinks.find((l) => l.href === `/industries/${slug}`)?.label;
}

export function labelForBlogSlug(slug: string): string | undefined {
  return blogCategoryLinks.find((l) => l.href === `/resources/blog/${slug}`)?.label;
}

export function labelForCompanySlug(slug: string): string | undefined {
  return companyLinks.find((l) => l.href === `/company/${slug}`)?.label;
}
