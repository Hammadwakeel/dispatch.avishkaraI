import Link from "next/link";
import { blogCategoryLabel, type BlogPost } from "@/content/blog-posts";
import type { DocBlock } from "@/content/types";
import { DocListItemBody, docListItemKey } from "@/lib/doc-list-item";

function renderBlock(b: DocBlock, key: string) {
  if (b.kind === "p") {
    return (
      <p
        key={key}
        className="font-sans text-[15px] leading-[1.65] text-link-gray md:text-[17px]"
      >
        {b.text}
      </p>
    );
  }
  if (b.kind === "contactChannels") {
    return null;
  }

  const list = (
    <ul className="list-none space-y-3 font-sans text-[15px] leading-[1.55] text-deep-graphite md:text-[16px]">
      {b.items.map((item, i) => (
        <li key={docListItemKey(item, i)} className="flex gap-3">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-glow/90" aria-hidden />
          <span>
            <DocListItemBody item={item} bodyClassName="text-deep-graphite" />
          </span>
        </li>
      ))}
    </ul>
  );

  if (b.title) {
    return (
      <div key={key} className="space-y-3">
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-stone">
          {b.title}
        </p>
        {list}
      </div>
    );
  }

  return <div key={key}>{list}</div>;
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function BlogArticlePage({ post }: { post: BlogPost }) {
  const catLabel = blogCategoryLabel(post.category);
  const catHref = `/resources/blog/${post.category}`;

  return (
    <main className="relative flex-1 overflow-x-clip border-t border-light-steel bg-harvest-cream">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_12%_18%,rgba(228,86,42,0.07)_0%,transparent_52%),radial-gradient(ellipse_65%_45%_at_92%_28%,rgba(197,208,200,0.38)_0%,transparent_48%)]"
        aria-hidden
      />

      <article className="relative z-[1] mx-auto max-w-[var(--page-max-width)] px-6 py-12 md:px-8 md:py-16 lg:py-20">
        <nav aria-label="Breadcrumb" className="font-mono text-[12px] text-muted-stone md:text-[13px]">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link href="/" className="text-amber-glow hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-light-steel">
              /
            </li>
            <li>
              <Link href="/resources/blog" className="text-amber-glow hover:underline">
                Blog
              </Link>
            </li>
            <li aria-hidden className="text-light-steel">
              /
            </li>
            <li>
              <Link href={catHref} className="text-amber-glow hover:underline">
                {catLabel}
              </Link>
            </li>
            <li aria-hidden className="text-light-steel">
              /
            </li>
            <li className="line-clamp-1 text-deep-graphite">{post.title}</li>
          </ol>
        </nav>

        <header className="mt-8 max-w-[65ch] md:mt-10">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
            {catLabel}
          </p>
          <h1 className="mt-3 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-normal leading-[1.12] tracking-[-0.04em] text-deep-graphite md:text-[44px]">
            {post.title}
          </h1>
          <p className="mt-5 font-sans text-[17px] leading-[1.55] text-muted-stone md:text-[18px]">
            {post.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[13px] text-muted-stone">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden className="text-light-steel">
              ·
            </span>
            <span>{post.readMinutes} min read</span>
          </div>
        </header>

        <div className="mt-12 flex max-w-[65ch] flex-col gap-14 md:mt-14 md:gap-16">
          {post.sections.map((sec) => (
            <section key={sec.heading}>
              <h2 className="font-serif text-[22px] font-normal leading-snug tracking-[-0.02em] text-deep-graphite md:text-[26px]">
                {sec.heading}
              </h2>
              <div className="mt-5 flex flex-col gap-6">
                {sec.blocks.map((b, i) => renderBlock(b, `${sec.heading}-${i}`))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-14 flex flex-col gap-4 border-t border-light-steel pt-10 md:mt-16 md:flex-row md:items-center md:justify-between md:pt-12">
          <Link href={catHref} className="font-mono text-[14px] font-medium text-amber-glow hover:underline">
            ← More in {catLabel}
          </Link>
          <Link
            href="/resources/blog"
            className="font-sans text-[14px] text-muted-stone hover:text-deep-graphite hover:underline"
          >
            All posts
          </Link>
        </footer>
      </article>
    </main>
  );
}
