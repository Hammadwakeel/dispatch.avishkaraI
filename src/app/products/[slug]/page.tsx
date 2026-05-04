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
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ focus?: string | string[] }>;
}) {
  const { slug } = await params;
  if (!isProductSlug(slug)) notFound();
  const pageDoc = productDocPages[slug];
  if (!pageDoc) notFound();
  const sp = searchParams ? await searchParams : {};
  const focusRaw = sp.focus;
  const initialMacFocus = typeof focusRaw === "string" ? focusRaw : undefined;
  return (
    <MarketingDocPage
      doc={pageDoc}
      boxedSections
      hideBackLink
      initialMacFocus={initialMacFocus}
    />
  );
}
