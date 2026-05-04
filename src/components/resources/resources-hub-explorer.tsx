"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogCategorySlug, BlogPost } from "@/content/blog-posts";
import { blogCategoryLabel, blogPostsAll } from "@/content/blog-posts";
import { documentationDocPage } from "@/content/doc-resource-pages";

type TabId = "featured" | BlogCategorySlug | "tools";

const TABS: { id: TabId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "industry-trends", label: "Industry trends" },
  { id: "case-studies", label: "Success stories" },
  { id: "product-updates", label: "Product updates" },
  { id: "tools", label: "Tools & guides" },
];

type ExplorerItem =
  | { kind: "post"; post: BlogPost }
  | {
      kind: "tool";
      href: string;
      title: string;
      excerpt: string;
      categoryLabel: string;
      badge?: string;
    };

const TOOL_ITEMS: ExplorerItem[] = [
  {
    kind: "tool",
    href: "/resources/documentation",
    title: documentationDocPage.heroTitle,
    excerpt: documentationDocPage.heroSubtitle,
    categoryLabel: "Documentation hub",
    badge: "Guide",
  },
];

function slugVariant(seed: string): number {
  let n = 0;
  for (let i = 0; i < seed.length; i++) n = (n + seed.charCodeAt(i) * (i + 1)) % 997;
  return n % 5;
}

const bannerGradients = [
  "bg-gradient-to-br from-[#1c2e45] via-[#234a78] to-[#3d7cbc]",
  "bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#64748b]",
  "bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0ea5e9]",
  "bg-gradient-to-br from-[#292524] via-[#78350f] to-[#ea580c]",
  "bg-gradient-to-br from-[#134e4a] via-[#0f766e] to-[#14b8a6]",
];

function itemCategoryUpper(item: ExplorerItem): string {
  if (item.kind === "tool") return item.categoryLabel.toUpperCase();
  return blogCategoryLabel(item.post.category).toUpperCase();
}

function itemHref(item: ExplorerItem): string {
  return item.kind === "tool" ? item.href : `/resources/blog/${item.post.slug}`;
}

function itemTitle(item: ExplorerItem): string {
  return item.kind === "tool" ? item.title : item.post.title;
}

function itemExcerpt(item: ExplorerItem): string {
  return item.kind === "tool" ? item.excerpt : item.post.excerpt;
}

function itemBadge(item: ExplorerItem): string | undefined {
  if (item.kind === "tool") return item.badge?.toUpperCase();
  if (item.post.category === "case-studies") return "CASE STUDY";
  if (item.post.category === "product-updates") return "UPDATE";
  return "ARTICLE";
}

function collectForTab(tab: TabId): ExplorerItem[] {
  if (tab === "featured") {
    return blogPostsAll.slice(0, 6).map((post) => ({ kind: "post", post }));
  }
  if (tab === "tools") {
    return [...TOOL_ITEMS];
  }
  return blogPostsAll.filter((p) => p.category === tab).map((post) => ({ kind: "post", post }));
}

function matchesSearch(item: ExplorerItem, q: string): boolean {
  if (!q.trim()) return true;
  const s = q.trim().toLowerCase();
  const blob = `${itemTitle(item)} ${itemExcerpt(item)} ${itemCategoryUpper(item)}`.toLowerCase();
  return blob.includes(s);
}

function HubCard({ item }: { item: ExplorerItem }) {
  const href = itemHref(item);
  const v = slugVariant(item.kind === "post" ? item.post.slug : item.href);
  const badge = itemBadge(item);

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-light-steel/90 bg-canvas-white shadow-[0_12px_40px_-28px_rgba(29,30,28,0.18)] transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-amber-glow/35 hover:shadow-[0_20px_52px_-32px_rgba(228,86,42,0.22)]"
    >
      <div className={`relative aspect-[16/10] overflow-hidden ${bannerGradients[v]}`}>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.14)_0%,transparent_42%,rgba(0,0,0,0.12)_100%)]" />
        <div className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/12 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 left-6 h-28 w-44 rounded-full bg-black/15 blur-3xl" />

        {badge ? (
          <span className="absolute left-3 top-3 rounded-md bg-white/92 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-deep-graphite shadow-sm sm:left-4 sm:top-4 sm:text-[10px]">
            {badge}
          </span>
        ) : null}

        {/* Abstract chart / editorial shapes */}
        <div className="pointer-events-none absolute bottom-4 left-4 flex gap-1 opacity-40">
          {[16, 22, 12, 28, 18].map((h, i) => (
            <div
              key={`bar-${i}`}
              className="w-2 rounded-t-sm bg-white/85 sm:w-[9px]"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-deep-graphite/55 sm:text-[11px]">
          {itemCategoryUpper(item)}
        </p>
        <h3 className="mt-2 font-sans text-[17px] font-semibold leading-snug tracking-[-0.02em] text-deep-graphite decoration-transparent underline-offset-[5px] transition-colors group-hover:underline group-hover:decoration-amber-glow sm:text-[18px] md:text-[19px]">
          {itemTitle(item)}
        </h3>
        <p className="mt-3 line-clamp-2 flex-1 font-sans text-[13px] leading-[1.52] text-muted-stone sm:text-[14px]">
          {itemExcerpt(item)}
        </p>
      </div>
    </Link>
  );
}

export function ResourcesHubExplorer() {
  const [tab, setTab] = useState<TabId>("featured");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const pool = collectForTab(tab);
    return pool.filter((item) => matchesSearch(item, query));
  }, [tab, query]);

  return (
    <section
      id="browse-resources"
      className="scroll-mt-28 border-b border-light-steel/70 bg-canvas-white md:scroll-mt-32"
      aria-labelledby="resources-explorer-heading"
    >
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 py-16 md:px-8 md:py-20 lg:py-24">
        {/* Centered hub intro — Dispatch-style */}
        <div className="mx-auto max-w-[76ch] text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-glow md:text-[12px]">
            All resources
          </p>
          <h2
            id="resources-explorer-heading"
            className="mt-4 font-sans text-[clamp(1.65rem,3.8vw,2.65rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-deep-graphite md:text-[clamp(1.85rem,3.4vw,2.85rem)]"
          >
            Avishkar&apos;s hub for{" "}
            <span className="text-amber-glow">field operations insights</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[62ch] font-sans text-[16px] leading-[1.62] text-muted-stone md:text-[17px]">
            Articles, release notes, benchmarks, and documentation—filter by topic or search to find what
            matters for your rollout.
          </p>
        </div>

        {/* Tabs + search */}
        <div className="mt-12 flex flex-col gap-6 border-b border-light-steel/80 pb-4 md:mt-14 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div
            className="-mx-1 flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] md:flex-wrap md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Filter resources"
          >
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.id)}
                  className={`relative shrink-0 whitespace-nowrap rounded-t-lg px-3 py-2.5 font-sans text-[14px] font-medium transition-colors md:px-4 md:text-[15px] ${
                    active ? "text-deep-graphite" : "text-muted-stone hover:text-deep-graphite/85"
                  }`}
                >
                  {t.label}
                  {active ? (
                    <span
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-amber-glow md:left-3 md:right-3"
                      aria-hidden
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="relative w-full shrink-0 lg:max-w-[280px]">
            <label htmlFor="resources-hub-search" className="sr-only">
              Search resources
            </label>
            <input
              id="resources-hub-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full rounded-[10px] border border-light-steel bg-white py-2.5 pl-4 pr-11 font-sans text-[14px] text-deep-graphite shadow-[inset_0_1px_2px_rgba(29,30,28,0.04)] placeholder:text-subtle-gray focus:border-amber-glow/45 focus:outline-none focus:ring-2 focus:ring-amber-glow/15"
            />
            <Search
              className="pointer-events-none absolute right-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-stone"
              aria-hidden
            />
          </div>
        </div>

        {/* Card grid */}
        {visible.length === 0 ? (
          <p className="mt-12 text-center font-sans text-[15px] text-muted-stone">
            Nothing matches your search in this tab. Try another topic or clear the search field.
          </p>
        ) : (
          <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8">
            {visible.map((item) => (
              <li key={item.kind === "post" ? item.post.slug : item.href} className="flex min-h-0">
                <HubCard item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
