import { notFound } from "next/navigation";
import { MarketingDocPage } from "@/components/layout/marketing-doc-page";
import {
  COMPANY_SLUGS,
  isCompanySlug,
} from "@/config/site-navigation";
import { companyDocPages } from "@/content/doc-company";

export function generateStaticParams() {
  return COMPANY_SLUGS.map((slug) => ({ slug }));
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isCompanySlug(slug)) notFound();
  const pageDoc = companyDocPages[slug];
  if (!pageDoc) notFound();
  return <MarketingDocPage doc={pageDoc} />;
}
