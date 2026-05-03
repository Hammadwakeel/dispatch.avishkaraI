import { notFound } from "next/navigation";
import { MarketingDocPage } from "@/components/layout/marketing-doc-page";
import {
  SOLUTION_SLUGS,
  isSolutionSlug,
} from "@/config/site-navigation";
import { solutionDocPages } from "@/content/doc-solutions";

export function generateStaticParams() {
  return SOLUTION_SLUGS.map((slug) => ({ slug }));
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
  return <MarketingDocPage doc={pageDoc} />;
}
