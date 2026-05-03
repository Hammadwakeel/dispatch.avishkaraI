import { notFound } from "next/navigation";
import { MarketingDocPage } from "@/components/layout/marketing-doc-page";
import {
  BLOG_SLUGS,
  isBlogSlug,
} from "@/config/site-navigation";
import { blogCategoryDocPages } from "@/content/doc-blog-categories";

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isBlogSlug(slug)) notFound();
  const pageDoc = blogCategoryDocPages[slug];
  if (!pageDoc) notFound();
  return <MarketingDocPage doc={pageDoc} />;
}
