import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/layout/blog-article-page";
import { BlogCategoryPostList } from "@/components/layout/blog-post-grid";
import { MarketingDocPage } from "@/components/layout/marketing-doc-page";
import {
  BLOG_SLUGS,
  isBlogSlug,
} from "@/config/site-navigation";
import { blogCategoryDocPages } from "@/content/doc-blog-categories";
import {
  blogPostsBySlug,
  getPostsByCategory,
  isBlogPostSlug,
} from "@/content/blog-posts";

export function generateStaticParams() {
  const categoryParams = BLOG_SLUGS.map((slug) => ({ slug }));
  const articleParams = Object.keys(blogPostsBySlug).map((slug) => ({ slug }));
  return [...categoryParams, ...articleParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (isBlogSlug(slug)) {
    const pageDoc = blogCategoryDocPages[slug];
    if (!pageDoc) return { title: "Blog | Avishkar AI" };
    return {
      title: `${pageDoc.heroTitle} | Avishkar AI Blog`,
      description: pageDoc.heroSubtitle,
    };
  }

  if (isBlogPostSlug(slug)) {
    const post = blogPostsBySlug[slug];
    return {
      title: `${post.title} | Avishkar AI Blog`,
      description: post.excerpt,
    };
  }

  return { title: "Blog | Avishkar AI" };
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (isBlogSlug(slug)) {
    const pageDoc = blogCategoryDocPages[slug];
    if (!pageDoc) notFound();
    const posts = getPostsByCategory(slug);
    return (
      <MarketingDocPage
        doc={pageDoc}
        afterSections={
          <div className="max-w-none space-y-12">
            <BlogCategoryPostList categorySlug={slug} posts={posts} />
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-light-steel pt-10 font-mono text-[14px]">
              <Link href="/resources/blog" className="text-amber-glow hover:underline">
                ← All posts
              </Link>
              <Link href="/" className="text-muted-stone hover:text-deep-graphite hover:underline">
                Home
              </Link>
            </div>
          </div>
        }
      />
    );
  }

  if (isBlogPostSlug(slug)) {
    return <BlogArticlePage post={blogPostsBySlug[slug]} />;
  }

  notFound();
}
