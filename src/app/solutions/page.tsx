import Link from "next/link";
import { solutionLinks } from "@/config/site-navigation";

export default function SolutionsHubPage() {
  const cards = solutionLinks;

  const cardFace =
    "group relative flex h-full min-h-[19rem] w-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/70 bg-white/25 p-6 shadow-[0_8px_40px_-12px_rgba(228,86,42,0.22),inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-xl transition-[border-color,box-shadow,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/85 hover:bg-white/32 hover:shadow-[0_14px_48px_-10px_rgba(228,86,42,0.3),inset_0_1px_0_0_rgba(255,255,255,0.95)] md:min-h-[20rem] md:p-7";

  return (
    <main className="relative flex-1 overflow-x-clip border-t border-light-steel bg-harvest-cream">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_85%_55%_at_15%_20%,rgba(228,86,42,0.09)_0%,transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_35%,rgba(197,208,200,0.45)_0%,transparent_50%),radial-gradient(ellipse_60%_45%_at_50%_100%,rgba(212,168,75,0.08)_0%,transparent_45%)]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto max-w-[var(--page-max-width)] px-6 py-14 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:items-start lg:gap-x-12 lg:gap-y-4 xl:gap-x-16">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
            Solutions
          </p>
          <div className="hidden lg:block" aria-hidden />
          <h1 className="min-w-0 text-left font-serif text-[clamp(1.85rem,4vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.04em] text-deep-graphite md:text-[44px]">
            AI solutions for every field service operation
          </h1>
          <p className="min-w-0 text-left font-sans text-[16px] leading-[1.55] text-muted-stone md:text-[17px]">
            Whether you&apos;re running a five-truck operation or a five-hundred-tech
            enterprise, Avishkar AI applies the same intelligence stack—tuned for your
            trade, your contracts, and how your teams actually work.
          </p>
        </div>

        <h2 className="mt-14 text-center font-serif text-[22px] font-normal text-deep-graphite md:mt-16 md:text-[24px]">
          By trade & program
        </h2>
        <p className="mx-auto mt-4 max-w-[56ch] text-center font-mono text-[14px] leading-relaxed text-muted-stone">
          Content on each page is aligned with our core website brief—challenges, AI
          capabilities, and how Avishkar AI fits your workflows.
        </p>

        <ul className="mt-10 grid list-none grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cards.map((p) => (
            <li key={p.href} className="flex min-h-0">
              <Link href={p.href} className={cardFace}>
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(155deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.18)_38%,rgba(255,255,255,0.03)_52%,transparent_56%)]" />
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95)_45%,rgba(255,255,255,0.95)_55%,transparent)] opacity-90 md:inset-x-6" />

                <span className="relative flex min-h-0 flex-1 flex-col">
                  <h3 className="font-serif text-[22px] font-normal leading-snug tracking-[-0.02em] text-deep-graphite md:text-[24px]">
                    {p.label}
                  </h3>
                  {p.description ? (
                    <p className="mt-4 line-clamp-5 flex-1 font-sans text-[14px] leading-[1.55] text-deep-graphite/80 md:text-[15px]">
                      {p.description}
                    </p>
                  ) : (
                    <span className="flex-1" aria-hidden />
                  )}
                  <span className="mt-auto pt-6">
                    <span className="inline-flex h-11 min-w-[9.5rem] items-center justify-center gap-2 rounded-[var(--radius-ui)] border border-white/60 bg-white/35 px-5 font-mono text-[13px] font-semibold tracking-wide text-deep-graphite shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),inset_0_-2px_8px_rgba(228,86,42,0.08)] backdrop-blur-md transition-[background-color,border-color,color,box-shadow] duration-200 group-hover:border-amber-glow/50 group-hover:bg-amber-glow group-hover:text-canvas-white group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)] md:h-12 md:min-w-[10.5rem] md:text-[14px]">
                      View solution
                      <span
                        className="text-amber-glow transition-colors duration-200 group-hover:text-canvas-white"
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="mt-14 inline-block font-sans text-[14px] font-semibold text-amber-glow underline decoration-soft-fog underline-offset-[6px] hover:text-deep-graphite md:mt-16"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
