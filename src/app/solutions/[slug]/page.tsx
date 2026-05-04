import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionMarketingPage } from "@/components/layout/solution-marketing-page";
import {
  isSolutionSlug,
  solutionLinks,
} from "@/config/site-navigation";
import { solutionDocPages } from "@/content/doc-solutions";

export function generateStaticParams() {
  return solutionLinks.map((l) => ({
    slug: l.href.replace("/solutions/", ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isSolutionSlug(slug)) {
    return { title: "Solution" };
  }
  const pageDoc = solutionDocPages[slug];
  if (!pageDoc) {
    return { title: "Solution" };
  }
  const ogTitle = `${pageDoc.heroTitle} | Avishkar AI`;
  return {
    title: pageDoc.heroTitle,
    description: pageDoc.heroSubtitle,
    openGraph: { title: ogTitle, description: pageDoc.heroSubtitle },
    twitter: { title: ogTitle, description: pageDoc.heroSubtitle },
  };
}

export default async function SolutionDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ focus?: string | string[] }>;
}) {
  const { slug } = await params;
  if (!isSolutionSlug(slug)) notFound();
  const pageDoc = solutionDocPages[slug];
  if (!pageDoc) notFound();
  const navItem = solutionLinks.find((l) => l.href === `/solutions/${slug}`);
  if (!navItem) notFound();
  const sp = searchParams ? await searchParams : {};
  const focusRaw = sp.focus;
  const initialMacFocus = typeof focusRaw === "string" ? focusRaw : undefined;

  return (
    <SolutionMarketingPage
      doc={pageDoc}
      slug={slug}
      navItem={navItem}
      initialMacFocus={initialMacFocus}
    />
  );
}