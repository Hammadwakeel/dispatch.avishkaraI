import { notFound } from "next/navigation";
import { MarketingDocPage } from "@/components/layout/marketing-doc-page";
import {
  PRODUCT_SLUGS,
  isProductSlug,
} from "@/config/site-navigation";
import { productDocPages } from "@/content/doc-products";

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isProductSlug(slug)) notFound();
  const pageDoc = productDocPages[slug];
  if (!pageDoc) notFound();
  return <MarketingDocPage doc={pageDoc} boxedSections hideBackLink />;
}
