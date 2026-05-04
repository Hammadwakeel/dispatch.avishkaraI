/**
 * Single source of truth for marketing header routes.
 * Aligned with update/avishkar_complete_copy_replacement.md.pdf
 */

/** Lucide icon keys mapped in `SiteHeader` for mega-menu tiles. */
export type MegaMenuIconId =
  | "layout-dashboard"
  | "camera"
  | "gauge"
  | "waypoints"
  | "layout-grid"
  | "factory"
  | "landmark"
  | "thermometer"
  | "book-open"
  | "trending-up"
  | "file-text"
  | "megaphone"
  | "book-marked"
  | "building"
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
    label: "AI-Native Dispatch",
    href: "/products/fsm-platform",
    icon: "layout-dashboard",
    description:
      "Fault ingestion through closure — autonomous AI dispatch loop for ATM, telecom, and medical-device fleets.",
  },
  {
    label: "Vision Inspection",
    href: "/products/vision-inspection",
    icon: "camera",
    description:
      "Vision evidence and compliance capture that feeds the same dispatch loop.",
  },
  {
    label: "Field Intelligence Suite",
    href: "/products/field-intelligence-suite",
    icon: "waypoints",
    description:
      "Live visibility across engineers, tickets, assets, and SLAs.",
  },
  {
    label: "View all products",
    href: "/products",
    emphasis: true,
    icon: "layout-grid",
    description: "See every module on one page for stakeholder walkthroughs.",
  },
];

export const solutionLinks: NavLink[] = [
  {
    label: "ATM Networks",
    href: "/solutions/atm",
    icon: "landmark",
    description:
      "5 min avg dispatch vs 45 min industry standard — cash-out and uptime SLAs.",
  },
  {
    label: "Telecom Towers",
    href: "/solutions/towers",
    icon: "factory",
    description:
      "Certified engineers dispatched before your SLA clock runs out.",
  },
  {
    label: "Medical Devices",
    href: "/solutions/medical-devices",
    icon: "gauge",
    description:
      "Biomedical response speed with audit-ready closure.",
  },
  {
    label: "HVAC — Critical Facilities",
    href: "/solutions/hvac",
    icon: "thermometer",
    description:
      "Data centers, hospitals, cold chain — priority dispatch (coming soon).",
  },
];

export const blogCategoryLinks: NavLink[] = [
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
    label: "Industry Trends",
    href: "/resources/blog/industry-trends",
    icon: "trending-up",
    description: "Benchmarks and operating lessons from critical infrastructure teams.",
  },
  {
    label: "Case Studies",
    href: "/resources/blog/case-studies",
    icon: "file-text",
    description: "Measured outcomes from modernized dispatch and field evidence workflows.",
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
];

/** PDF: Company ▾ — About Us | Contact only (no Leadership/Careers/Partners/Press in nav). */
export const companyLinks: NavLink[] = [
  {
    label: "About Us",
    href: "/company#about",
    icon: "building",
    description: "Our story, platform layers, and how we operate.",
  },
  {
    label: "Contact",
    href: "/company/contact",
    icon: "mail",
    description: "Sales, support, and general inquiries.",
  },
];

/** Legacy: top-bar contact link removed per PDF (Book Demo only). Kept for footer label reuse. */
export const pricingNavItem = {
  label: "Contact",
  href: "/company/contact",
} as const;

export const headerDropdowns: NavDropdown[] = [
  {
    label: "Products",
    megaTitle: "Products",
    megaSubtitle: "AI-Native Dispatch · Vision Inspection · Field Intelligence Suite",
    megaHref: "/products",
    children: productLinks,
  },
  {
    label: "Solutions",
    megaTitle: "Solutions",
    megaSubtitle: "ATM Networks · Telecom Towers · Medical Devices · HVAC — Critical Facilities",
    megaHref: "/solutions",
    children: solutionLinks,
  },
  {
    label: "Company",
    megaTitle: "Company",
    megaSubtitle: "Our story and contact",
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

export const BLOG_SLUGS = blogCategoryLinks.map(
  (l) => l.href.replace("/resources/blog/", ""),
) as readonly string[];

/** Keys of `companyDocPages` — `/company/[slug]` detail routes */
export const COMPANY_SLUGS = [
  "about",
  "leadership",
  "careers",
  "partners",
  "press",
  "contact",
] as const;

export function isProductSlug(slug: string): slug is (typeof PRODUCT_SLUGS)[number] {
  return (PRODUCT_SLUGS as readonly string[]).includes(slug);
}

export function isSolutionSlug(slug: string): slug is (typeof SOLUTION_SLUGS)[number] {
  return (SOLUTION_SLUGS as readonly string[]).includes(slug);
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

export function labelForBlogSlug(slug: string): string | undefined {
  return blogCategoryLinks.find((l) => l.href === `/resources/blog/${slug}`)?.label;
}

export function labelForCompanySlug(slug: string): string | undefined {
  const labels: Record<(typeof COMPANY_SLUGS)[number], string> = {
    about: "About Us",
    leadership: "Leadership",
    careers: "Careers",
    partners: "Partners",
    press: "Press / Media",
    contact: "Contact",
  };
  return (COMPANY_SLUGS as readonly string[]).includes(slug)
    ? labels[slug as (typeof COMPANY_SLUGS)[number]]
    : undefined;
}
