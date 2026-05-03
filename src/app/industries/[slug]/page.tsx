import { notFound } from "next/navigation";
import { MarketingDocPage } from "@/components/layout/marketing-doc-page";
import {
  INDUSTRY_SLUGS,
  isIndustrySlug,
} from "@/config/site-navigation";
import { industryDocPages } from "@/content/doc-industries";

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isIndustrySlug(slug)) notFound();
  const pageDoc = industryDocPages[slug];
  if (!pageDoc) notFound();
  return <MarketingDocPage doc={pageDoc} />;
}
