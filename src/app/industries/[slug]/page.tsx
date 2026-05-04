import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryMarketingPage } from "@/components/layout/industry-marketing-page";
import {
  INDUSTRY_SLUGS,
  isIndustrySlug,
  industryLinks,
} from "@/config/site-navigation";
import { industryDocPages } from "@/content/doc-industries";

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isIndustrySlug(slug)) {
    return { title: "Industry | Avishkar AI" };
  }
  const pageDoc = industryDocPages[slug];
  if (!pageDoc) {
    return { title: "Industry | Avishkar AI" };
  }
  return {
    title: `${pageDoc.heroTitle} | Avishkar AI`,
    description: pageDoc.heroSubtitle,
  };
}

export default async function IndustryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ focus?: string | string[] }>;
}) {
  const { slug } = await params;
  if (!isIndustrySlug(slug)) notFound();
  const pageDoc = industryDocPages[slug];
  if (!pageDoc) notFound();
  const navItem = industryLinks.find((l) => l.href === `/industries/${slug}`);
  if (!navItem) notFound();
  const sp = searchParams ? await searchParams : {};
  const focusRaw = sp.focus;
  const initialFocus = typeof focusRaw === "string" ? focusRaw : undefined;

  return (
    <IndustryMarketingPage
      doc={pageDoc}
      slug={slug}
      navItem={navItem}
      initialFocus={initialFocus}
    />
  );
}