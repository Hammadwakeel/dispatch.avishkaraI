import Link from "next/link";
import type { BlogPost } from "@/content/blog-posts";
import { blogCategoryLabel } from "@/content/blog-posts";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function BlogPostCard({ post, showCategory }: { post: BlogPost; showCategory?: boolean }) {
  const catLabel = blogCategoryLabel(post.category);

  return (
    <Link
      href={`/resources/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-light-steel bg-canvas-white p-6 shadow-[0_14px_44px_-36px_rgba(29,30,28,0.16)] transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-amber-glow/35 hover:shadow-[0_20px_52px_-36px_rgba(228,86,42,0.18)] md:p-7"
    >
      {showCategory ? (
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-glow">
          {catLabel}
        </p>
      ) : null}
      <h3 className={`font-serif text-[20px] font-normal leading-snug tracking-[-0.02em] text-deep-graphite group-hover:text-amber-glow md:text-[22px] ${showCategory ? "mt-3" : ""}`}>
        {post.title}
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 font-sans text-[14px] leading-[1.55] text-muted-stone md:text-[15px]">
        {post.excerpt}
      </p>
      <div className="mt-5 flex items-center justify-between gap-3 font-mono text-[12px] text-muted-stone md:text-[13px]">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span>{post.readMinutes} min</span>
      </div>
    </Link>
  );
}

export function BlogPostGridSection({
  title,
  posts,
  showCategoryOnCards,
}: {
  title: string;
  posts: BlogPost[];
  showCategoryOnCards?: boolean;
}) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby={`blog-grid-${title.replace(/\s+/g, "-").toLowerCase()}`}>
      <h2
        id={`blog-grid-${title.replace(/\s+/g, "-").toLowerCase()}`}
        className="font-serif text-[22px] font-normal text-deep-graphite md:text-[24px]"
      >
        {title}
      </h2>
      <ul className="mt-6 grid list-none gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug} className="flex min-h-0">
            <BlogPostCard post={post} showCategory={showCategoryOnCards} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BlogCategoryPostList({
  categorySlug,
  posts,
}: {
  categorySlug: string;
  posts: BlogPost[];
}) {
  if (posts.length === 0) {
    return (
      <section className="rounded-[var(--radius-card)] border border-dashed border-light-steel bg-canvas-white/60 p-8 text-center">
        <p className="font-mono text-[14px] leading-relaxed text-muted-stone">
          Articles in{" "}
          <span className="text-deep-graphite">{blogCategoryLabel(categorySlug)}</span> will appear
          here as we publish. Browse{" "}
          <Link href="/resources/blog" className="text-amber-glow hover:underline">
            all posts
          </Link>
          .
        </p>
      </section>
    );
  }

  return (
    <BlogPostGridSection title="Articles in this category" posts={posts} showCategoryOnCards={false} />
  );
}
