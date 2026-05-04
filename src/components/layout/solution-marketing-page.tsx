import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Droplets,
  Home,
  Siren,
  Thermometer,
  Zap,
} from "lucide-react";
import Link from "next/link";
import type { DocBlock, DocPage } from "@/content/types";
import { solutionLinks, type NavLink } from "@/config/site-navigation";

const slugIcon: Record<string, LucideIcon> = {
  hvac: Thermometer,
  plumbing: Droplets,
  electrical: Zap,
  "home-services": Home,
  commercial: Building2,
  "emergency-services": Siren,
};

function renderBlock(b: DocBlock, key: string) {
  if (b.kind === "p") {
    return (
      <p
        key={key}
        className="font-sans text-[15px] leading-[1.65] text-link-gray md:text-[16px]"
      >
        {b.text}
      </p>
    );
  }

  const list = (
    <ul className="list-none space-y-3 font-sans text-[15px] leading-[1.55] text-deep-graphite md:text-[16px]">
      {b.items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-glow/90"
            aria-hidden
          />
          <span>{item}</span>
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

type SolutionMarketingPageProps = {
  doc: DocPage;
  slug: string;
  navItem: NavLink;
};

export function SolutionMarketingPage({ doc, slug, navItem }: SolutionMarketingPageProps) {
  const Icon = slugIcon[slug] ?? Building2;
  const others = solutionLinks.filter((l) => !l.href.endsWith(slug));

  return (
    <main className="relative flex-1 overflow-x-clip border-t border-light-steel bg-harvest-cream">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_12%_18%,rgba(228,86,42,0.08)_0%,transparent_52%),radial-gradient(ellipse_65%_45%_at_92%_28%,rgba(197,208,200,0.42)_0%,transparent_48%),radial-gradient(ellipse_55%_40%_at_48%_100%,rgba(212,168,75,0.07)_0%,transparent_46%)]"
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
              <Link href="/solutions" className="text-amber-glow hover:underline">
                Solutions
              </Link>
            </li>
            <li aria-hidden className="text-light-steel">
              /
            </li>
            <li className="text-deep-graphite">{navItem.label}</li>
          </ol>
        </nav>

        <header className="mt-8 md:mt-10 lg:grid lg:grid-cols-[auto_1fr] lg:gap-x-10 lg:gap-y-6">
          <div className="flex justify-center lg:justify-start">
            <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-2xl border border-amber-glow/30 bg-canvas-white shadow-[0_18px_44px_-28px_rgba(228,86,42,0.35)] md:h-[88px] md:w-[88px]">
              <Icon className="h-10 w-10 text-amber-glow md:h-11 md:w-11" strokeWidth={1.35} aria-hidden />
            </div>
          </div>
          <div className="mt-8 min-w-0 text-center lg:mt-0 lg:text-left">
            {doc.eyebrow ? (
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
                {doc.eyebrow}
              </p>
            ) : null}
            <h1 className="mt-3 font-serif text-[clamp(1.85rem,4.2vw,3rem)] font-normal leading-[1.08] tracking-[-0.04em] text-deep-graphite md:text-[48px]">
              {doc.heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-[62ch] font-sans text-[16px] leading-[1.55] text-muted-stone md:text-[17px] lg:mx-0">
              {doc.heroSubtitle}
            </p>
            {navItem.description ? (
              <p className="mx-auto mt-5 max-w-[62ch] border-l-2 border-amber-glow/50 pl-5 font-mono text-[14px] leading-relaxed text-deep-graphite/85 lg:mx-0">
                {navItem.description}
              </p>
            ) : null}
          </div>
        </header>

        <div className="mt-12 flex flex-col gap-8 md:mt-14 md:gap-10 lg:mt-16">
          {doc.sections.map((sec) => (
            <section
              key={sec.heading}
              className="rounded-[var(--radius-card)] border border-light-steel bg-canvas-white p-6 shadow-[0_16px_48px_-36px_rgba(29,30,28,0.14)] md:p-9 lg:p-10"
            >
              <h2 className="font-serif text-[22px] font-normal leading-snug tracking-[-0.02em] text-deep-graphite md:text-[28px]">
                {sec.heading}
              </h2>
              <div className="mt-6 flex flex-col gap-6 md:mt-8 md:gap-7">
                {sec.blocks.map((b, i) => renderBlock(b, `${sec.heading}-${i}`))}
              </div>
            </section>
          ))}
        </div>

        <section
          aria-labelledby="related-solutions-heading"
          className="mt-14 md:mt-16"
        >
          <h2
            id="related-solutions-heading"
            className="font-serif text-[22px] font-normal text-deep-graphite md:text-[24px]"
          >
            Other solutions
          </h2>
          <ul className="mt-6 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex h-full min-h-[5.5rem] flex-col justify-center rounded-[var(--radius-card)] border border-light-steel bg-[color-mix(in_srgb,var(--color-canvas-white)_92%,var(--color-harvest-cream)_8%)] px-5 py-4 transition-colors hover:border-amber-glow/45 hover:bg-canvas-white"
                >
                  <span className="font-serif text-[17px] text-deep-graphite group-hover:text-amber-glow md:text-[18px]">
                    {l.label}
                  </span>
                  {l.description ? (
                    <span className="mt-1 line-clamp-2 font-mono text-[12px] leading-snug text-muted-stone">
                      {l.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14 rounded-[var(--radius-card)] border border-amber-glow/25 bg-gradient-to-br from-canvas-white via-[color-mix(in_srgb,var(--color-harvest-cream)_55%,var(--color-canvas-white)_45%)] to-canvas-white p-8 text-center shadow-[0_20px_56px_-40px_rgba(228,86,42,0.28)] md:mt-16 md:p-10">
          <p className="font-serif text-[22px] text-deep-graphite md:text-[26px]">
            See Avishkar AI on your operation
          </p>
          <p className="mx-auto mt-3 max-w-[46ch] font-mono text-[14px] leading-relaxed text-muted-stone">
            Book a walkthrough, start a trial conversation, or estimate ROI for your fleet.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/#demo"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[var(--radius-ui)] bg-amber-glow px-8 font-mono text-[14px] font-semibold text-canvas-white shadow-[var(--shadow-sm)] hover:brightness-[1.03]"
            >
              Book your demo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/company/contact"
              className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white px-7 font-mono text-[14px] font-semibold text-deep-graphite shadow-sm hover:border-amber-glow/40"
            >
              Contact sales
            </Link>
            <Link
              href="/resources/roi-calculator"
              className="inline-flex min-h-[48px] items-center justify-center font-mono text-[14px] font-semibold text-amber-glow underline-offset-4 hover:underline"
            >
              ROI calculator
            </Link>
          </div>
        </div>

        <footer className="mt-12 border-t border-light-steel pt-10 md:mt-14 md:pt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/solutions"
              className="font-mono text-[14px] font-medium text-amber-glow hover:underline"
            >
              ← All solutions
            </Link>
            <Link href="/" className="font-sans text-[14px] text-muted-stone hover:text-deep-graphite hover:underline">
              Back to home
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
