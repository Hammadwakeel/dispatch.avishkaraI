import Link from "next/link";
import { solutionLinks } from "@/config/site-navigation";

export default function SolutionsHubPage() {
  return (
    <main className="flex-1 border-t border-light-steel bg-canvas-white">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 py-14 md:px-8 md:py-20">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
          Solutions
        </p>
        <h1 className="font-serif mt-4 text-[clamp(1.85rem,4vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.04em] text-deep-graphite md:text-[44px]">
          AI solutions for every field service operation
        </h1>
        <p className="mt-6 max-w-[60ch] font-mono text-[16px] leading-[1.55] text-muted-stone md:text-[17px]">
          Whether you&apos;re running a five-truck operation or a five-hundred-tech
          enterprise, Avishkar AI has intelligent solutions to help you grow, scale,
          and outperform.
        </p>

        <h2 className="mt-14 font-serif text-[22px] font-normal text-deep-graphite md:mt-16 md:text-[24px]">
          By trade
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {solutionLinks.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="block rounded-[var(--radius-card)] border border-light-steel bg-warm-linen/70 px-5 py-4 font-mono text-[15px] text-deep-graphite transition-colors hover:border-amber-glow/40 hover:bg-warm-linen"
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
