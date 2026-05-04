"use client";

import { Search, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { blogCategoryLinks } from "@/config/site-navigation";
import type { BlogPost } from "@/content/blog-posts";
import { blogCategoryLabel, blogPostsAll } from "@/content/blog-posts";

function slugVariant(seed: string): number {
  let n = 0;
  for (let i = 0; i < seed.length; i++) n = (n + seed.charCodeAt(i) * (i + 1)) % 997;
  return n % 5;
}

const bannerGradients = [
  "bg-gradient-to-br from-stone-800 via-stone-700 to-stone-600",
  "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600",
  "bg-gradient-to-br from-zinc-900 via-neutral-800 to-stone-700",
  "bg-gradient-to-br from-stone-900 via-amber-950/80 to-stone-800",
  "bg-gradient-to-br from-neutral-900 via-stone-800 to-neutral-700",
];

/** Black headline with orange on the clause after “:”, or second half of title. */
function TitleWithAccent({ title }: { title: string }) {
  const colon = title.indexOf(":");
  if (colon !== -1) {
    return (
      <>
        <span className="text-deep-graphite">{title.slice(0, colon + 1)}</span>
        <span className="text-amber-glow">{title.slice(colon + 1).trim()}</span>
      </>
    );
  }
  const words = title.trim().split(/\s+/);
  if (words.length <= 3) {
    return <span className="text-deep-graphite">{title}</span>;
  }
  const half = Math.ceil(words.length / 2);
  return (
    <>
      <span className="text-deep-graphite">{words.slice(0, half).join(" ")} </span>
      <span className="text-amber-glow">{words.slice(half).join(" ")}</span>
    </>
  );
}

function BlogArticleCard({ post }: { post: BlogPost }) {
  const v = slugVariant(post.slug);
  const cat = blogCategoryLabel(post.category).toUpperCase();

  return (
    <Link
      href={`/resources/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-light-steel/90 bg-canvas-white shadow-[0_10px_38px_-28px_rgba(29,30,28,0.2)] transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-amber-glow/30 hover:shadow-[0_18px_48px_-28px_rgba(228,86,42,0.18)]"
    >
      <div className={`relative aspect-[16/10] overflow-hidden ${bannerGradients[v]}`}>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.08)_0%,transparent_45%,rgba(0,0,0,0.2)_100%)]" />
        <div className="pointer-events-none absolute bottom-4 left-4 flex gap-1 opacity-35">
          {[14, 22, 11, 26, 17].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-t-sm bg-white/90 sm:w-2"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-glow sm:text-[11px]">
          {cat}
        </p>
        <h2 className="mt-3 font-sans text-[17px] font-semibold leading-snug tracking-[-0.02em] sm:text-[18px] md:text-[19px]">
          <TitleWithAccent title={post.title} />
        </h2>
        <div className="mt-auto flex items-center gap-2 pt-6 font-sans text-[14px] font-semibold text-deep-graphite transition-colors group-hover:text-amber-glow">
          Read more
          <SquareArrowOutUpRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
        </div>
      </div>
    </Link>
  );
}

export function BlogHubArticles() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blogPostsAll;
    return blogPostsAll.filter((p) => {
      const blob = `${p.title} ${p.excerpt} ${blogCategoryLabel(p.category)}`.toLowerCase();
      return blob.includes(q);
    });
  }, [query]);

  return (
    <div className="mx-auto max-w-[var(--page-max-width)] px-6 py-14 md:px-8 md:py-16 lg:py-20">
      {/* Hero — Dispatch articles layout */}
      <header className="mx-auto max-w-[56rem] text-center">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-glow md:text-[12px]">
          Avishkar articles
        </p>
        <h1 className="mt-5 font-sans text-[clamp(1.65rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.035em] text-deep-graphite md:mt-6">
          Catch up on the{" "}
          <span className="text-amber-glow">latest articles</span> by the Avishkar team
        </h1>
        <p className="mx-auto mt-6 max-w-[54ch] font-sans text-[16px] leading-[1.62] text-muted-stone md:text-[17px]">
          Articles and resources on AI-native field service—scheduling, voice and vision in the field,
          adoption, and product updates.
        </p>

        <div className="relative mx-auto mt-10 max-w-xl md:mt-12">
          <label htmlFor="blog-hub-search" className="sr-only">
            Search articles
          </label>
          <input
            id="blog-hub-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full rounded-[11px] border border-light-steel bg-white py-3.5 pl-5 pr-12 font-sans text-[15px] text-deep-graphite shadow-[inset_0_1px_2px_rgba(29,30,28,0.04)] placeholder:text-subtle-gray focus:border-amber-glow/45 focus:outline-none focus:ring-2 focus:ring-amber-glow/15"
          />
          <Search
            className="pointer-events-none absolute right-4 top-1/2 h-[19px] w-[19px] -translate-y-1/2 text-muted-stone"
            aria-hidden
          />
        </div>

        <nav
          className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] md:mt-9 md:gap-x-6 md:text-[14px]"
          aria-label="Browse by topic"
        >
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-stone">
            Topics:
          </span>
          {blogCategoryLinks.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="font-sans font-medium text-deep-graphite underline decoration-light-steel underline-offset-4 transition-colors hover:text-amber-glow hover:decoration-amber-glow/35"
            >
              {c.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Grid */}
      <section className="mt-14 md:mt-16 lg:mt-20" aria-labelledby="blog-articles-grid-heading">
        <h2 id="blog-articles-grid-heading" className="sr-only">
          Articles
        </h2>
        {filtered.length === 0 ? (
          <p className="text-center font-sans text-[15px] text-muted-stone">
            No articles match your search. Try another keyword or browse a topic above.
          </p>
        ) : (
          <ul className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {filtered.map((post) => (
              <li key={post.slug} className="flex min-h-0">
                <BlogArticleCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
