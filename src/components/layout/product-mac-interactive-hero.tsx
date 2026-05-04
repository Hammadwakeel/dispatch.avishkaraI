"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { DocBlock, DocPage, DocSection } from "@/content/types";
import { headingToFocusParam } from "@/lib/heading-to-focus-param";

function activeIndexForFocus(sections: DocSection[], focus: string | undefined): number {
  if (!focus || sections.length === 0) return 0;
  const i = sections.findIndex((s) => headingToFocusParam(s.heading) === focus);
  return i >= 0 ? i : 0;
}

function indexFromScrollProgress(p: number, n: number): number {
  if (n <= 0) return 0;
  return Math.min(n - 1, Math.max(0, Math.floor(p * n)));
}

function MacSectionBody({ section }: { section: DocSection }) {
  return (
    <div className="space-y-5">
      <h2 className="border-b border-light-steel pb-2 font-serif text-[16px] font-normal leading-snug tracking-[-0.02em] text-deep-graphite md:text-[17px] lg:text-[18px]">
        {section.heading}
      </h2>
      <div className="space-y-5">
        {section.blocks.map((b, i) => (
          <MacBlock key={`${section.heading}-${i}`} block={b} />
        ))}
      </div>
    </div>
  );
}

function MacBlock({ block }: { block: DocBlock }) {
  if (block.kind === "p") {
    return (
      <p className="font-sans text-[11px] leading-relaxed text-link-gray md:text-[12px] lg:text-[13px]">
        {block.text}
      </p>
    );
  }
  if (block.kind === "contactChannels") {
    return null;
  }

  const list = (
    <ul className="list-none space-y-2.5 font-sans text-[10px] leading-snug text-link-gray md:text-[11px] lg:text-[12px]">
      {block.items.map((item, li) => (
        <li key={`${li}-${item.slice(0, 24)}`} className="flex gap-2">
          <span
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-glow/90"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  if (block.title) {
    return (
      <div className="rounded-lg border border-light-steel/80 bg-harvest-cream/40 p-3 md:p-3.5">
        <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-deep-graphite md:text-[10px]">
          {block.title}
        </p>
        <div className="mt-2.5 border-t border-light-steel/50 pt-2.5">{list}</div>
      </div>
    );
  }

  return list;
}

export function ProductMacInteractiveHero({
  doc,
  initialMacFocus,
}: {
  doc: DocPage;
  initialMacFocus?: string;
}) {
  const sections = doc.sections;
  const reduceMotion = useReducedMotion();
  const scrollTrackRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(() => activeIndexForFocus(sections, initialMacFocus));
  const scrollLockRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduceMotion || scrollLockRef.current || sections.length === 0) return;
    const idx = indexFromScrollProgress(p, sections.length);
    setActive((prev) => (prev === idx ? prev : idx));
  });

  useEffect(() => {
    if (reduceMotion || sections.length === 0) return;
    const p = scrollYProgress.get();
    const idx = indexFromScrollProgress(p, sections.length);
    setActive((prev) => (prev === idx ? prev : idx));
  }, [reduceMotion, scrollYProgress, sections.length]);

  const safeIndex = sections.length > 0 ? Math.min(active, sections.length - 1) : 0;
  const activeSection = sections[safeIndex] ?? null;

  const windowTitle = useMemo(() => {
    const t = activeSection?.heading ?? doc.heroTitle;
    return t.length > 56 ? `${t.slice(0, 54)}…` : t;
  }, [activeSection, doc.heroTitle]);

  if (sections.length === 0) {
    return null;
  }

  const n = sections.length;
  const scrollTrackMinHeight =
    n <= 1 ? "auto" : `${Math.max(n * 72, 280)}svh`;

  const tabNav = (
    <nav className="mt-6" aria-label="Product feature areas">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-stone">
        Explore
      </p>
      <div
        className="mt-3 flex flex-col gap-1.5"
        role="tablist"
        aria-orientation="vertical"
      >
        {sections.map((sec, i) => {
          const selected = safeIndex === i;
          return (
            <button
              key={sec.heading}
              type="button"
              role="tab"
              id={`product-mac-tab-${i}`}
              aria-selected={selected}
              aria-controls="product-mac-panel"
              onClick={() => {
                scrollLockRef.current = true;
                setActive(i);
                window.setTimeout(() => {
                  scrollLockRef.current = false;
                }, 600);
              }}
              className={`w-full rounded-[var(--radius-ui)] border px-3 py-2.5 text-left font-sans text-[13px] leading-snug transition-colors md:text-[14px] lg:py-3 lg:text-[15px] ${
                selected
                  ? "border-amber-glow/40 bg-harvest-cream font-semibold text-deep-graphite shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)]"
                  : "border-transparent text-link-gray hover:border-light-steel hover:bg-white/50 hover:text-deep-graphite"
              }`}
            >
              {sec.heading}
            </button>
          );
        })}
      </div>
    </nav>
  );

  const mac = (
    <div className="relative w-full min-w-0 max-w-[min(100%,38rem)] shrink-0 sm:max-w-[min(100%,44rem)] lg:max-w-[min(100%,50rem)] xl:max-w-[min(100%,58rem)]">
      <div className="pointer-events-none absolute -inset-x-[6%] -inset-y-6 rounded-[40%] bg-deep-graphite/[0.06] blur-3xl" />
      <div
        className="relative overflow-hidden rounded-2xl bg-[#2c2c2c] shadow-[0_32px_80px_-28px_rgba(29,30,28,0.45),0_12px_32px_-16px_rgba(29,30,28,0.2)] ring-1 ring-black/15 md:rounded-[1.35rem]"
        role="presentation"
      >
        <div className="grid h-11 grid-cols-[3.75rem_1fr_3.75rem] items-center border-b border-white/[0.06] bg-[#3d3d3d] px-3 sm:h-12 sm:px-4 md:h-[3.25rem] md:px-5">
          <span className="flex justify-start gap-2" aria-hidden>
            <span className="size-3 rounded-full bg-[#ff5f57] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.25)] sm:size-[13px]" />
            <span className="size-3 rounded-full bg-[#febc2e] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)] sm:size-[13px]" />
            <span className="size-3 rounded-full bg-[#28c840] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)] sm:size-[13px]" />
          </span>
          <span className="truncate text-center font-sans text-[12px] font-medium text-white/80 sm:text-[13px] md:text-[14px]">
            {windowTitle}
          </span>
          <span aria-hidden className="block" />
        </div>
        <div
          id="product-mac-panel"
          role="tabpanel"
          aria-labelledby={`product-mac-tab-${safeIndex}`}
          className="max-h-[min(78vh,720px)] min-h-[min(50vh,480px)] overflow-y-auto overscroll-contain bg-canvas-white px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] sm:max-h-[min(82vh,820px)] sm:min-h-[min(52vh,520px)] sm:px-8 sm:py-8 md:max-h-[min(86vh,920px)] md:min-h-[min(54vh,560px)] md:px-10 md:py-10 lg:max-h-[min(88vh,980px)] lg:min-h-[min(56vh,600px)]"
        >
          <div className="mb-5 flex items-center justify-between border-b border-light-steel pb-3.5 md:mb-6 md:pb-4">
            <span className="font-sans text-[12px] font-semibold text-deep-graphite md:text-[13px]">
              Avishkar AI
            </span>
            <span className="rounded-md bg-harvest-cream px-2.5 py-1 font-sans text-[11px] text-muted-stone md:text-[12px]">
              Preview
            </span>
          </div>
          {activeSection ? <MacSectionBody section={activeSection} /> : null}
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={scrollTrackRef}
      style={{ minHeight: scrollTrackMinHeight }}
      className="relative w-full overflow-visible"
      aria-label="Product overview and interactive preview"
    >
      <div className="sticky top-20 z-[1] pb-10 pt-0 md:top-24 md:pb-14 lg:top-28 lg:pb-16">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-x-16 lg:gap-y-0 xl:gap-x-20 2xl:gap-x-28">
          <div className="flex min-h-0 w-full min-w-0 max-w-[min(100%,26rem)] flex-col justify-center justify-self-start text-left xl:max-w-[28rem]">
            {doc.eyebrow ? (
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
                {doc.eyebrow}
              </p>
            ) : null}
            <h1
              className={`font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-normal leading-[1.12] tracking-[-0.04em] text-deep-graphite md:text-[44px] lg:text-[48px] ${doc.eyebrow ? "mt-4" : ""}`}
            >
              {doc.heroTitle}
            </h1>
            <p className="mt-5 max-w-[52ch] font-sans text-[16px] leading-[1.55] text-muted-stone md:text-[17px] lg:text-[18px]">
              {doc.heroSubtitle}
            </p>
            {tabNav}
          </div>
          <div className="flex min-h-0 w-full min-w-0 items-center justify-center lg:justify-end">
            {mac}
          </div>
        </div>
      </div>
    </section>
  );
}
