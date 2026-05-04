"use client";

import { BookMarked, Mail, Newspaper } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { documentationDocPage } from "@/content/doc-resource-pages";

type TabId = "support" | "tools" | "media";

const TABS: { id: TabId; label: string }[] = [
  { id: "support", label: "Product support" },
  { id: "tools", label: "Rollout planning" },
  { id: "media", label: "Media center" },
];

const PANELS: Record<
  TabId,
  {
    body: string;
    ctaLabel: string;
    ctaHref: string;
    secondary?: { label: string; href: string };
  }
> = {
  support: {
    body: documentationDocPage.heroSubtitle,
    ctaLabel: "Documentation hub",
    ctaHref: "/resources/documentation",
  },
  tools: {
    body: "Walk through fleet size, SLA targets, integrations, and evidence policies—we'll share benchmarks from ATM and tower programs and outline a pragmatic rollout.",
    ctaLabel: "Talk to sales",
    ctaHref: "/company/contact",
    secondary: {
      label: "Documentation hub",
      href: "/resources/documentation",
    },
  },
  media: {
    body: "Articles on AI-native dispatch, benchmarks, deployment lessons, and product updates—curated for critical infrastructure teams.",
    ctaLabel: "Blog & insights",
    ctaHref: "/resources/blog",
    secondary: {
      label: "Case studies",
      href: "/resources/blog/case-studies",
    },
  },
};

function EdgeSquarePattern({ side }: { side: "left" | "right" }) {
  const squares: { top: string; size: number; opacity: number; offset: string }[] =
    side === "left"
      ? [
          { top: "8%", size: 14, opacity: 0.12, offset: "12%" },
          { top: "22%", size: 22, opacity: 0.08, offset: "4%" },
          { top: "42%", size: 18, opacity: 0.1, offset: "18%" },
          { top: "58%", size: 12, opacity: 0.06, offset: "8%" },
          { top: "72%", size: 28, opacity: 0.07, offset: "2%" },
          { top: "88%", size: 16, opacity: 0.09, offset: "14%" },
        ]
      : [
          { top: "12%", size: 20, opacity: 0.09, offset: "8%" },
          { top: "28%", size: 14, opacity: 0.11, offset: "20%" },
          { top: "48%", size: 24, opacity: 0.07, offset: "6%" },
          { top: "62%", size: 16, opacity: 0.08, offset: "16%" },
          { top: "78%", size: 12, opacity: 0.05, offset: "10%" },
          { top: "92%", size: 26, opacity: 0.06, offset: "4%" },
        ];

  return (
    <div
      className={`pointer-events-none absolute top-0 h-full w-[min(28vw,200px)] select-none ${side === "left" ? "left-0" : "right-0"}`}
      aria-hidden
    >
      {squares.map((sq, i) => (
        <div
          key={`${side}-${i}`}
          className="absolute rounded-[3px] bg-[color-mix(in_srgb,var(--color-amber-glow)_55%,transparent)]"
          style={{
            top: sq.top,
            width: sq.size,
            height: sq.size,
            opacity: sq.opacity,
            ...(side === "left" ? { left: sq.offset } : { right: sq.offset }),
          }}
        />
      ))}
    </div>
  );
}

function PanelVisual({ tab }: { tab: TabId }) {
  const rounded =
    "relative overflow-hidden rounded-[14px] border border-amber-glow/15 shadow-[0_20px_50px_-28px_rgba(var(--rgb-amber-glow)/0.18)]";

  if (tab === "support") {
    return (
      <div className={`aspect-[4/3] ${rounded} bg-gradient-to-br from-[#fff4eb] via-[#ffe8d9] to-[#fddbc4]`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_38%,rgba(255,255,255,0.92)_0%,transparent_52%)]" />
        <div className="absolute left-[14%] top-[48%] h-[38%] w-[52%] rounded-[10px] bg-white shadow-[0_14px_40px_-18px_rgba(228,86,42,0.22)] ring-1 ring-amber-glow/15">
          <div className="absolute left-[14%] right-[14%] top-[18%] h-[10px] rounded-full bg-slate-100" />
          <div className="absolute left-[14%] right-[28%] top-[38%] h-[8px] rounded-full bg-slate-50" />
          <div className="absolute left-[14%] right-[22%] top-[54%] h-[8px] rounded-full bg-slate-50" />
        </div>
        <div className="absolute left-[46%] top-[28%] flex h-[26%] w-[26%] items-center justify-center rounded-full bg-[#fef9c3] shadow-[0_0_40px_12px_rgba(253,224,71,0.55)] ring-4 ring-amber-100/80">
          <BookMarked className="h-[42%] w-[42%] text-amber-glow" strokeWidth={1.35} aria-hidden />
        </div>
      </div>
    );
  }

  if (tab === "tools") {
    return (
      <div className={`aspect-[4/3] ${rounded} bg-gradient-to-br from-[#faf7f4] via-[#f5ebe3] to-[#eddacd]`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgb(var(--rgb-amber-glow)/0.11),transparent_50%)]" />
        <div className="absolute bottom-[14%] left-[10%] right-[10%] top-[22%] flex items-end justify-center gap-3 rounded-xl bg-white/90 px-6 pb-6 pt-10 shadow-inner ring-1 ring-slate-200/70">
          {[44, 72, 52, 88, 56].map((h, i) => (
            <div
              key={i}
              className="w-[13%] max-w-[52px] rounded-t-md bg-gradient-to-t from-[color-mix(in_srgb,var(--color-amber-glow)_90%,#431407_10%)] to-[color-mix(in_srgb,var(--color-amber-glow)_70%,white)]"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
        <div className="absolute right-[12%] top-[14%] flex h-[22%] w-[22%] items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/80">
          <Mail className="h-[46%] w-[46%] text-amber-glow" strokeWidth={1.35} aria-hidden />
        </div>
      </div>
    );
  }

  return (
    <div className={`aspect-[4/3] ${rounded} bg-gradient-to-br from-[#fff8f2] via-[#ffefe4] to-[#fde5d4]`}>
      <div className="absolute inset-0 opacity-[0.4]" style={{
        backgroundImage: `repeating-linear-gradient(-12deg, transparent, transparent 18px, rgb(var(--rgb-amber-glow) / 0.06) 18px, rgb(var(--rgb-amber-glow) / 0.06) 19px)`,
      }} />
      <div className="absolute left-[10%] top-[16%] w-[80%] rounded-xl bg-white/95 p-5 shadow-[0_18px_44px_-24px_rgba(228,86,42,0.2)] ring-1 ring-amber-glow/12">
        <div className="flex gap-3 border-b border-slate-100 pb-4">
          <div className="h-12 w-12 shrink-0 rounded-full bg-slate-200/90" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-2.5 w-[72%] rounded-full bg-slate-100" />
            <div className="h-2 w-[46%] rounded-full bg-slate-50" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2 w-full rounded-full bg-slate-50" />
          <div className="h-2 w-[92%] rounded-full bg-slate-50" />
          <div className="h-2 w-[78%] rounded-full bg-slate-50" />
        </div>
      </div>
      <div className="absolute bottom-[16%] right-[14%] flex h-[20%] w-[20%] items-center justify-center rounded-2xl bg-amber-glow shadow-xl">
        <Newspaper className="h-[48%] w-[48%] text-white" strokeWidth={1.35} aria-hidden />
      </div>
    </div>
  );
}

export function ResourcesHubDestinationTabs() {
  const [active, setActive] = useState<TabId>("support");
  const panel = PANELS[active];

  return (
    <section
      id="resources-support-hub"
      className="relative scroll-mt-28 overflow-hidden border-t border-slate-200/90 bg-white md:scroll-mt-32"
      aria-labelledby="resources-destination-heading"
    >
      <EdgeSquarePattern side="left" />
      <EdgeSquarePattern side="right" />

      <div className="relative mx-auto max-w-[var(--page-max-width)] px-6 py-16 md:px-8 md:py-20 lg:py-24">
        <header className="mx-auto max-w-[56rem] text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-amber-glow md:text-[12px]">
            What you need, all in one place
          </p>
          <h2
            id="resources-destination-heading"
            className="mt-5 font-sans text-[clamp(1.5rem,3.6vw,2.45rem)] font-bold leading-[1.12] tracking-[-0.03em] text-deep-graphite md:mt-6"
          >
            Discover{" "}
            <span className="text-amber-glow">documentation</span>, rollout support, and the{" "}
            <span className="text-amber-glow">media hub</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[54ch] font-sans text-[16px] leading-[1.65] text-muted-stone md:text-[17px]">
            Whether you need implementation guides, a staffed rollout conversation, or field stories—you&apos;re
            in the right place to support your critical infrastructure journey.
          </p>
        </header>

        <div className="relative mx-auto mt-14 max-w-4xl md:mt-16">
          <div
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-b border-slate-200 pb-0 md:gap-x-10 lg:gap-x-14"
            role="tablist"
            aria-label="Resource destinations"
          >
            {TABS.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  id={`tab-${t.id}`}
                  aria-controls="destination-tab-panel"
                  onClick={() => setActive(t.id)}
                  className={`relative pb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors md:text-[12px] ${
                    isActive ? "text-deep-graphite" : "text-muted-stone hover:text-deep-graphite/80"
                  }`}
                >
                  {t.label}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-1 rounded-full bg-amber-glow transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="destination-tab-panel"
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 items-center gap-12 md:mt-14 lg:grid-cols-2 lg:gap-16 xl:gap-20"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
        >
          <div className="order-2 lg:order-1">
            <p className="font-sans text-[16px] leading-[1.7] text-deep-graphite/92 md:text-[17px] md:leading-[1.68]">
              {panel.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={panel.ctaHref}
                className="inline-flex min-h-[48px] items-center justify-center rounded-[8px] bg-amber-glow px-7 font-sans text-[15px] font-semibold text-canvas-white shadow-md transition-colors hover:brightness-[1.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-glow"
              >
                {panel.ctaLabel}
              </Link>
              {panel.secondary ? (
                <Link
                  href={panel.secondary.href}
                  className="font-sans text-[15px] font-semibold text-deep-graphite underline decoration-light-steel underline-offset-[5px] transition-colors hover:text-amber-glow hover:decoration-amber-glow/40"
                >
                  {panel.secondary.label}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <PanelVisual tab={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
