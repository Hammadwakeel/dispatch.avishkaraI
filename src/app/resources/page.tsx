import Link from "next/link";
import { resourcesMegaLinks } from "@/config/site-navigation";

export default function ResourcesHubPage() {
  return (
    <main className="flex-1 border-t border-light-steel bg-canvas-white">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 py-14 md:px-8 md:py-20">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
          Resources
        </p>
        <h1 className="font-serif mt-4 text-[clamp(1.85rem,4vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.04em] text-deep-graphite md:text-[44px]">
          Learn, compare, and plan your rollout
        </h1>
        <p className="mt-6 max-w-[60ch] font-mono text-[16px] leading-[1.55] text-muted-stone md:text-[17px]">
          Blog, documentation, calculators, and events to help you evaluate and ship
          Avishkar AI with confidence.
        </p>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {resourcesMegaLinks.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className={`block rounded-[var(--radius-card)] border border-light-steel bg-warm-linen/70 px-5 py-4 font-mono text-[15px] transition-colors hover:border-amber-glow/40 hover:bg-warm-linen ${
                  p.emphasis ? "font-semibold text-amber-glow" : "text-deep-graphite"
                }`}
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="mt-12 inline-block font-mono text-[14px] font-semibold text-amber-glow underline decoration-soft-fog underline-offset-[6px] hover:text-deep-graphite"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
