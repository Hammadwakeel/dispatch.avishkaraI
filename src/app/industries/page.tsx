import Link from "next/link";
import { industryLinks } from "@/config/site-navigation";

export default function IndustriesHubPage() {
  return (
    <main className="flex-1 border-t border-light-steel bg-canvas-white">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 py-14 md:px-8 md:py-20">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
          Industries
        </p>
        <h1 className="font-serif mt-4 text-[clamp(1.85rem,4vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.04em] text-deep-graphite md:text-[44px]">
          AI-native field service for every industry
        </h1>
        <p className="mt-6 max-w-[60ch] font-sans text-[16px] leading-[1.55] text-muted-stone md:text-[17px]">
          The technology is the same. The intelligence is adapted to your industry.
        </p>

        <h2 className="mt-14 font-serif text-[22px] font-normal text-deep-graphite md:mt-16 md:text-[24px]">
          Verticals
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {industryLinks.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="block rounded-[var(--radius-card)] border border-light-steel bg-harvest-cream/70 px-5 py-4 font-sans text-[15px] text-deep-graphite transition-colors hover:border-amber-glow/40 hover:bg-harvest-cream"
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="mt-12 inline-block font-sans text-[14px] font-semibold text-amber-glow underline decoration-soft-fog underline-offset-[6px] hover:text-deep-graphite"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
