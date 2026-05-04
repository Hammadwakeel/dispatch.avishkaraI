import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isProductSlug(slug)) {
    return { title: "Product" };
  }
  const doc = productDocPages[slug];
  if (!doc) {
    return { title: "Product" };
  }
  const title = `${doc.heroTitle} | Avishkar AI`;
  return {
    title: doc.heroTitle,
    description: doc.heroSubtitle,
    openGraph: { title, description: doc.heroSubtitle },
    twitter: { title, description: doc.heroSubtitle },
  };
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
      initialMacFocus={initialMacFocus}
    />
  );
}
