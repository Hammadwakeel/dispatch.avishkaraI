"use client";

import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import { type ReactNode, useCallback, useRef, useState, useSyncExternalStore } from "react";

/** Sticky “active challenge” panel — liquid glass + crisp outer frame (matches list column). */
const challengesSideGlassClass =
  "relative overflow-hidden rounded-[22px] border-2 border-deep-graphite bg-gradient-to-br from-white/[0.48] via-white/[0.18] to-white/[0.07] p-6 shadow-[0_18px_56px_-14px_rgba(29,30,28,0.22),inset_0_1px_0_rgba(255,255,255,0.72)] ring-1 ring-inset ring-white/45 backdrop-blur-[26px] md:p-8";

const challengesSideGlassInsetClass =
  "relative overflow-hidden rounded-[18px] border-2 border-deep-graphite/85 bg-gradient-to-br from-white/[0.38] via-white/[0.12] to-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] ring-1 ring-inset ring-white/35 backdrop-blur-[18px]";

export type ChallengeStickyItem = {
  title: string;
  body: string;
};

function subscribeMedia(query: string, onChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useMediaQueryMatches(query: string, serverFallback: boolean): boolean {
  return useSyncExternalStore(
    (onStoreChange) => subscribeMedia(query, onStoreChange),
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

/** Pick the challenge whose vertical center is closest to the viewport center. */
function pickActiveChallengeIndex(blocks: (HTMLElement | null)[], centerY: number): number {
  let best = 0;
  let bestDist = Number.POSITIVE_INFINITY;
  blocks.forEach((el, i) => {
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.height <= 0) return;
    const mid = r.top + r.height / 2;
    const d = Math.abs(mid - centerY);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
}

type ChallengesStickyScrollSectionProps = {
  sectionId?: string;
  headingId?: string;
  /** Display headline (use block lines + accent spans as needed). */
  heading: ReactNode;
  /** Optional poster font class (e.g. next/font Anton). Enables large bold caps headline. */
  headingFontClassName?: string;
  /** Supporting copy under the headline. */
  intro: ReactNode;
  challenges: readonly ChallengeStickyItem[];
  footer?: string;
  /** Dark section surface (e.g. black band on homepage). */
  darkSurface?: boolean;
};

function challengesHeadlineClassName(headingFontClassName?: string, darkSurface?: boolean) {
  const ink = darkSurface ? "text-canvas-white" : "text-deep-graphite";
  if (headingFontClassName) {
    return `${headingFontClassName} text-left font-bold uppercase tracking-[-0.02em] leading-[0.9] ${ink} text-[clamp(1.95rem,6.5vw,4.85rem)]`;
  }
  return `font-sans text-[clamp(1.65rem,4.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] ${ink}`;
}

function challengesIntroClassName(headingFontClassName?: string, darkSurface?: boolean) {
  const ink = darkSurface ? "text-canvas-white" : "text-deep-graphite";
  if (headingFontClassName) {
    return `${headingFontClassName} mt-7 w-full text-left font-bold uppercase tracking-[-0.02em] text-[clamp(1.05rem,2.6vw,1.65rem)] leading-[1.28] ${ink} md:mt-8`;
  }
  return "mt-7 w-full text-left font-sans text-[18px] font-semibold leading-[1.65] text-muted-stone md:mt-8 md:text-[20px]";
}

/** Match homepage poster (Anton) for challenge titles when `headingFontClassName` is passed. */
function challengeItemTitleClass(
  headingFontClassName: string | undefined,
  sizeClass: string,
  colorClass: string,
) {
  if (headingFontClassName) {
    return `${headingFontClassName} font-normal uppercase tracking-[-0.02em] ${sizeClass} ${colorClass}`;
  }
  return `font-sans font-bold ${sizeClass} ${colorClass}`;
}

export function ChallengesStickyScrollSection({
  sectionId = "fault-response-challenges",
  headingId = "fault-response-challenges-heading",
  heading,
  headingFontClassName,
  intro,
  challenges,
  footer,
  darkSurface = false,
}: ChallengesStickyScrollSectionProps) {
  const reduceMotion = useMediaQueryMatches("(prefers-reduced-motion: reduce)", false);
  const desktop = useMediaQueryMatches("(min-width: 768px)", false);
  const ink = darkSurface ? "text-canvas-white" : "text-deep-graphite";
  const inkMuted = darkSurface ? "text-white/45" : "text-deep-graphite/45";
  const inkSoft = darkSurface ? "text-white/38" : "text-deep-graphite/45";
  const dotMuted = darkSurface ? "bg-white/28" : "bg-deep-graphite/25";
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const syncActiveFromLenis = useCallback(
    (lenis: Lenis) => {
      if (reduceMotion || !desktop) return;
      void lenis.scroll;
      const center = window.innerHeight * 0.46;
      const next = pickActiveChallengeIndex(blockRefs.current, center);
      setActive((prev) => (prev === next ? prev : next));
    },
    [reduceMotion, desktop],
  );

  useLenis(syncActiveFromLenis, [reduceMotion, desktop]);

  const activeChallenge = challenges[active] ?? challenges[0];

  if (reduceMotion) {
    return (
      <section
        id={sectionId}
        className={`border-b py-20 md:py-28 ${darkSurface ? "border-white/10 bg-black" : "border-light-steel bg-canvas-white"}`}
        aria-labelledby={headingId}
      >
        <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
          <div
            className={`w-full border-b-2 pb-12 text-left md:pb-16 ${darkSurface ? "border-white/25" : "border-deep-graphite"}`}
          >
            <h2 id={headingId} className={challengesHeadlineClassName(headingFontClassName, darkSurface)}>
              {heading}
            </h2>
            <div className={challengesIntroClassName(headingFontClassName, darkSurface)}>{intro}</div>
          </div>
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:mt-16 md:gap-6">
            {challenges.map((item, i) => (
              <article
                key={item.title}
                className="grid h-full grid-rows-[auto_auto_1fr] border-2 border-deep-graphite bg-canvas-white p-7 md:p-8"
              >
                <p className="font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-deep-graphite md:text-[13px]">
                  <span className="text-deep-graphite">Challenge</span>{" "}
                  <span className="text-amber-glow">{String(i + 1).padStart(2, "0")}</span>
                </p>
                <h3
                  className={challengeItemTitleClass(
                    headingFontClassName,
                    "mt-4 text-[20px] leading-snug md:text-[22px]",
                    "text-deep-graphite",
                  )}
                >
                  {item.title}
                </h3>
                <p className="mt-4 font-sans text-[18px] font-semibold leading-[1.65] text-deep-graphite md:text-[19px]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
          {footer ? (
            <p
              className={`mx-auto mt-14 max-w-[40rem] text-center font-sans text-[15px] leading-relaxed md:mt-16 md:text-[16px] ${darkSurface ? "text-white/85" : "text-deep-graphite"}`}
            >
              {footer}
            </p>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section
      id={sectionId}
      className={`border-b py-20 md:py-28 ${darkSurface ? "border-white/10 bg-black" : "border-light-steel bg-canvas-white"}`}
      aria-labelledby={headingId}
    >
      <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
        {/* Intro — left-aligned to page content edge, full width */}
        <div className={`border-b-2 pb-12 text-left md:pb-16 ${darkSurface ? "border-white/25" : "border-deep-graphite"}`}>
          <div className="w-full">
            <h2 id={headingId} className={challengesHeadlineClassName(headingFontClassName, darkSurface)}>
              {heading}
            </h2>
            <div className={challengesIntroClassName(headingFontClassName, darkSurface)}>{intro}</div>
          </div>
        </div>

        {/* Mobile: readable stack (no scroll-driven steps). */}
        <div className="mt-10 border-2 border-deep-graphite md:hidden">
          {challenges.map((item, i) => (
            <article
              key={item.title}
              className="grid grid-cols-[2.75rem_1fr] items-start gap-x-4 border-b-2 border-deep-graphite bg-canvas-white p-6 last:border-b-0"
            >
              <span className="pt-0.5 font-mono text-[17px] font-bold tabular-nums leading-none text-amber-glow">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[12px] font-bold uppercase tracking-[0.12em]">
                  <span className="text-deep-graphite">Challenge</span>{" "}
                  <span className="text-amber-glow">{String(i + 1).padStart(2, "0")}</span>
                </p>
                <h3
                  className={challengeItemTitleClass(
                    headingFontClassName,
                    "mt-2 text-[19px] leading-snug md:text-[21px]",
                    "text-deep-graphite",
                  )}
                >
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-[18px] font-semibold leading-[1.65] text-deep-graphite">{item.body}</p>
              </div>
            </article>
          ))}
        </div>

        {/* md+: Glyphic-style sticky narrative left, stepping list right (active index from Lenis scroll). */}
        <div className="mt-10 hidden md:mt-12 md:grid md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-28 md:self-start lg:top-32">
              <div className={challengesSideGlassClass}>
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-glow/18 blur-3xl md:-right-12 md:-top-12 md:h-40 md:w-40"
                  aria-hidden
                />
                <div className="relative">
                  <p className="font-mono text-[15px] font-bold tabular-nums text-amber-glow">
                    {String(active + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-deep-graphite">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-glow" aria-hidden />
                    Challenges
                  </p>
                  <p
                    className={`mt-6 transition-opacity duration-300 ease-out ${challengeItemTitleClass(
                      headingFontClassName,
                      "text-[clamp(1.05rem,2vw,1.35rem)] leading-snug",
                      "text-deep-graphite",
                    )}`}
                  >
                    {activeChallenge?.title}
                  </p>

                  <div
                    className={`mt-8 flex aspect-[4/3] max-h-[220px] items-center justify-center ${challengesSideGlassInsetClass}`}
                    aria-hidden
                  >
                    <span className="select-none font-mono text-[clamp(3rem,10vw,4.5rem)] font-bold leading-none tabular-nums text-amber-glow transition-all duration-300 ease-out">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 md:col-span-7 md:mt-0 lg:col-span-8">
            <div className="border-2 border-deep-graphite">
              {challenges.map((item, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={item.title}
                    ref={(el) => {
                      blockRefs.current[i] = el;
                    }}
                    className="grid min-h-[min(78vh,640px)] grid-cols-[minmax(2.5rem,3rem)_minmax(0,1fr)_1.25rem] items-start gap-x-5 border-b-2 border-deep-graphite py-10 last:border-b-0 md:min-h-[min(82vh,720px)] md:grid-cols-[minmax(2.75rem,3.25rem)_minmax(0,1fr)_1.25rem] md:gap-x-8 md:py-12 lg:gap-x-10 lg:py-14"
                  >
                    <span className="pt-1 font-mono text-[17px] font-bold tabular-nums text-amber-glow md:text-[18px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`font-mono text-[12px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ease-out md:text-[13px] ${
                          isActive ? ink : inkMuted
                        }`}
                      >
                        <span className={isActive ? ink : inkMuted}>Challenge</span>{" "}
                        <span className={isActive ? "text-amber-glow" : "text-amber-glow/70"}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </p>
                      <h3
                        className={`mt-3 transition-colors duration-300 ease-out ${challengeItemTitleClass(
                          headingFontClassName,
                          "text-[clamp(1.15rem,2.35vw,1.72rem)] leading-snug",
                          isActive ? ink : inkSoft,
                        )}`}
                      >
                        {item.title}
                      </h3>
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                          isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className={`mt-4 max-w-[52ch] font-sans text-[18px] font-semibold leading-[1.65] md:text-[19px] ${ink}`}>
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center pt-2" aria-hidden>
                      <span
                        className={`h-2 w-2 rounded-full transition-colors duration-300 ease-out ${
                          isActive ? "bg-amber-glow" : dotMuted
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {footer ? (
          <p
            className={`mx-auto mt-14 max-w-[40rem] text-center font-sans text-[15px] leading-relaxed md:mt-16 md:text-[16px] ${darkSurface ? "text-white/85" : "text-deep-graphite"}`}
          >
            {footer}
          </p>
        ) : null}
      </div>
    </section>
  );
}
