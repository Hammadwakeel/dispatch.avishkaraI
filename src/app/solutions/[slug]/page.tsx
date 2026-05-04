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
    return { title: "Solution | Avishkar AI" };
  }
  const pageDoc = solutionDocPages[slug];
  if (!pageDoc) {
    return { title: "Solution | Avishkar AI" };
  }
  return {
    title: `${pageDoc.heroTitle} | Avishkar AI`,
    description: pageDoc.heroSubtitle,
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isSolutionSlug(slug)) notFound();
  const pageDoc = solutionDocPages[slug];
  if (!pageDoc) notFound();
  const navItem = solutionLinks.find((l) => l.href === `/solutions/${slug}`);
  if (!navItem) notFound();

  return (
    <SolutionMarketingPage doc={pageDoc} slug={slug} navItem={navItem} />
  );
}
