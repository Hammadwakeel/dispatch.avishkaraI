/**
 * Single source of truth for marketing header routes.
 * See docs/FOLDER_STRUCTURE.md for the full site map diagram.
 */

export type NavLink = {
  label: string;
  href: string;
  /** e.g. “View all” row */
  emphasis?: boolean;
  /** Short blurb for hub cards (e.g. products page) */
  description?: string;
};

export type NavDropdown = {
  label: string;
  href?: string;
  children: NavLink[];
};

export const productLinks: NavLink[] = [
  {
    label: "FSM Platform",
    href: "/products/fsm-platform",
    description:
      "Scheduling, dispatch, customers, jobs, and analytics—one intelligent core that learns your operation.",
  },
  {
    label: "AI Voice Agent",
    href: "/products/ai-voice-agent",
    description:
      "Answers calls 24/7, qualifies intent, checks availability, and books jobs without waiting on a human line.",
  },
  {
    label: "Vision Inspection",
    href: "/products/vision-inspection",
    description:
      "Turns site photos into proof: before/after, damage detection, compliance packs, and QA you can defend.",
  },
  {
    label: "Predictive Maintenance",
    href: "/products/predictive-maintenance",
    description:
      "Equipment health scores and failure signals so you sell proactive service instead of chasing emergencies.",
  },
  {
    label: "Field Intelligence Suite",
    href: "/products/field-intelligence-suite",
    description:
      "Route, parts, pricing, and performance intelligence that makes every technician and truck run smarter.",
  },
  {
    label: "View all products",
    href: "/products",
    emphasis: true,
    description: "See the full suite on one page—ideal for stakeholder walkthroughs.",
  },
];

export const solutionLinks: NavLink[] = [
  { label: "HVAC", href: "/solutions/hvac" },
  { label: "Plumbing", href: "/solutions/plumbing" },
  { label: "Electrical", href: "/solutions/electrical" },
  { label: "Home Services", href: "/solutions/home-services" },
  { label: "Commercial", href: "/solutions/commercial" },
  { label: "Emergency Services", href: "/solutions/emergency-services" },
];

export const industryLinks: NavLink[] = [
  { label: "Residential", href: "/industries/residential" },
  { label: "Commercial", href: "/industries/commercial" },
  { label: "Industrial", href: "/industries/industrial" },
  { label: "Government / Municipal", href: "/industries/government-municipal" },
];

export const blogCategoryLinks: NavLink[] = [
  { label: "AI Insights", href: "/resources/blog/ai-insights" },
  { label: "Industry Trends", href: "/resources/blog/industry-trends" },
  { label: "Case Studies", href: "/resources/blog/case-studies" },
  { label: "Product Updates", href: "/resources/blog/product-updates" },
];

export const resourcesMegaLinks: NavLink[] = [
  { label: "Blog", href: "/resources/blog", emphasis: true },
  { label: "AI Insights", href: "/resources/blog/ai-insights" },
  { label: "Industry Trends", href: "/resources/blog/industry-trends" },
  { label: "Case Studies", href: "/resources/blog/case-studies" },
  { label: "Product Updates", href: "/resources/blog/product-updates" },
  { label: "Documentation Hub", href: "/resources/documentation" },
  { label: "ROI Calculator", href: "/resources/roi-calculator" },
  { label: "Comparison Guide", href: "/resources/comparison-guide" },
  { label: "Webinars & Events", href: "/resources/webinars" },
];

export const companyLinks: NavLink[] = [
  { label: "About Us", href: "/company/about" },
  { label: "Leadership", href: "/company/leadership" },
  { label: "Careers", href: "/company/careers" },
  { label: "Partners", href: "/company/partners" },
  { label: "Press / Media", href: "/company/press" },
  { label: "Contact", href: "/company/contact" },
];

/** Top-level link (not a dropdown). */
export const pricingNavItem = {
  label: "Pricing",
  href: "/pricing",
} as const;

export const headerDropdowns: NavDropdown[] = [
  { label: "Products", children: productLinks },
  { label: "Solutions", children: solutionLinks },
  { label: "Industries", children: industryLinks },
  { label: "Resources", children: resourcesMegaLinks },
  { label: "Company", children: companyLinks },
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
