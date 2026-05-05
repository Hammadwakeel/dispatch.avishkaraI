import type { Metadata } from "next";
import Link from "next/link";
import { solutionLinks, type NavLink } from "@/config/site-navigation";
import { posterDisplay } from "@/lib/poster-font";

const cardPosterSize = "text-[clamp(1.25rem,3vw,2rem)] leading-[0.95]";
const cardDescClass =
  "mt-4 flex-1 font-sans text-[clamp(0.95rem,1.85vw,1.08rem)] font-bold leading-[1.45] text-deep-graphite md:text-[15px]";

function SolutionCardHeading({ item }: { item: NavLink }) {
  const c = `${posterDisplay.className} uppercase tracking-[-0.02em]`;
  const { href } = item;
  if (href === "/solutions/atm") {
    return (
      <h3 className={c}>
        <span className={`block ${cardPosterSize}`}>
          <span className="text-amber-glow">ATM</span>{" "}
          <span className="text-deep-graphite">Networks</span>
        </span>
      </h3>
    );
  }
  if (href === "/solutions/towers") {
    return (
      <h3 className={c}>
        <span className={`block ${cardPosterSize}`}>
          <span className="text-amber-glow">Telecom</span>{" "}
          <span className="text-deep-graphite">Towers</span>
        </span>
      </h3>
    );
  }
  if (href === "/solutions/medical-devices") {
    return (
      <h3 className={c}>
        <span className={`block ${cardPosterSize}`}>
          <span className="text-amber-glow">Medical</span>{" "}
          <span className="text-deep-graphite">Devices</span>
        </span>
      </h3>
    );
  }
  if (href === "/solutions/hvac") {
    return (
      <h3 className={c}>
        <span className={`block ${cardPosterSize}`}>
          <span className="text-amber-glow">HVAC</span>
          <span className="text-deep-graphite"> — Critical Facilities</span>
        </span>
      </h3>
    );
  }
  return (
    <h3 className="font-serif text-[22px] font-normal leading-snug tracking-[-0.02em] text-deep-graphite md:text-[24px]">
      {item.label}
    </h3>
  );
}

function SolutionCardBlurb({ item }: { item: NavLink }) {
  const { href } = item;
  if (href === "/solutions/atm") {
    return (
      <p className={cardDescClass}>
        <span className="text-amber-glow">~5 vs ~45 min</span>
        <span className="text-deep-graphite"> — cash-out &amp; uptime SLAs.</span>
      </p>
    );
  }
  if (href === "/solutions/towers") {
    return (
      <p className={cardDescClass}>
        <span className="text-amber-glow">Before SLA breach</span>
        <span className="text-deep-graphite"> — certified field crews.</span>
      </p>
    );
  }
  if (href === "/solutions/medical-devices") {
    return (
      <p className={cardDescClass}>
        <span className="text-amber-glow">Audit-ready close</span>
        <span className="text-deep-graphite"> — regulated device paths.</span>
      </p>
    );
  }
  if (href === "/solutions/hvac") {
    return (
      <p className={cardDescClass}>
        <span className="text-amber-glow">Priority dispatch</span>
        <span className="text-deep-graphite"> — DC, hospital, cold chain (soon).</span>
      </p>
    );
  }
  if (item.description) {
    return (
      <p className="mt-4 flex-1 font-sans text-[14px] leading-[1.55] text-deep-graphite/80 md:text-[15px]">{item.description}</p>
    );
  }
  return <span className="flex-1" aria-hidden />;
}

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "ATM, telecom, medical — dispatch playbooks fault to closure. India production.",
};

export default function SolutionsHubPage() {
  const cards = solutionLinks;

  const cardFace =
    "group relative flex h-full min-h-[20rem] w-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/70 bg-white/25 p-6 shadow-[0_8px_40px_-12px_rgba(228,86,42,0.22),inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-xl transition-[border-color,box-shadow,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/85 hover:bg-white/32 hover:shadow-[0_14px_48px_-10px_rgba(228,86,42,0.3),inset_0_1px_0_0_rgba(255,255,255,0.95)] md:min-h-[22rem] md:p-7";

  return (
    <main className="relative flex-1 overflow-x-clip border-t border-light-steel bg-harvest-cream">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_85%_55%_at_15%_20%,rgba(228,86,42,0.09)_0%,transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_35%,rgba(197,208,200,0.45)_0%,transparent_50%),radial-gradient(ellipse_60%_45%_at_50%_100%,rgba(212,168,75,0.08)_0%,transparent_45%)]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto max-w-[var(--page-max-width)] px-6 py-14 md:px-8 md:py-20">
        <div className="flex flex-col gap-6 md:gap-7">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
            Solutions
          </p>
          <h1 className={`min-w-0 text-left ${posterDisplay.className} uppercase tracking-[-0.02em]`}>
            <span className="block text-[clamp(2rem,7vw,5.25rem)] leading-[0.9]">
              <span className="text-amber-glow">Solutions</span>{" "}
              <span className="text-deep-graphite">for uptime-critical</span>
            </span>
            <span className="mt-1 block text-[clamp(2rem,7vw,5.25rem)] leading-[0.9] text-deep-graphite md:mt-2">
              infrastructure.
            </span>
          </h1>
          <p className="max-w-[48ch] text-left font-sans text-[clamp(1.05rem,2.4vw,1.65rem)] font-bold leading-[1.45] text-deep-graphite md:text-[clamp(1.08rem,2.2vw,1.55rem)]">
            <span className="text-amber-glow">ATM, telecom, medical</span>
            <span className="text-deep-graphite"> — fault to closure. Production playbooks.</span>
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-[56rem] list-none grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:mt-12">
          {cards.map((p) => (
            <li key={p.href} className="flex min-h-0">
              <Link href={p.href} className={cardFace}>
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(155deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.18)_38%,rgba(255,255,255,0.03)_52%,transparent_56%)]" />
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95)_45%,rgba(255,255,255,0.95)_55%,transparent)] opacity-90 md:inset-x-6" />

                <span className="relative flex min-h-0 flex-1 flex-col">
                  <SolutionCardHeading item={p} />
                  <SolutionCardBlurb item={p} />
                  <span className="mt-auto pt-6">
                    <span className="inline-flex h-11 min-w-[9.5rem] items-center justify-center gap-2 rounded-[var(--radius-ui)] border border-white/60 bg-white/35 px-5 font-sans text-[13px] font-semibold tracking-wide text-deep-graphite shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),inset_0_-2px_8px_rgba(228,86,42,0.08)] backdrop-blur-md transition-[background-color,border-color,color,box-shadow] duration-200 group-hover:border-amber-glow/50 group-hover:bg-amber-glow group-hover:text-canvas-white group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)] md:h-12 md:min-w-[10.5rem] md:text-[14px]">
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
      </div>
    </main>
  );
}
