"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Factory,
  Home,
  Landmark,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { DocBlock, DocPage, DocSection } from "@/content/types";

const slugIcon: Record<string, LucideIcon> = {
  residential: Home,
  commercial: Building2,
  industrial: Factory,
  "government-municipal": Landmark,
};

function activeIndexForFocus(sections: DocSection[], focus: string | undefined): number {
  if (!focus || sections.length === 0) return 0;
  const i = sections.findIndex((s) => s.heading.toLowerCase().replace(/\s+/g, "-") === focus);
  return i >= 0 ? i : 0;
}

function indexFromScrollProgress(p: number, n: number): number {
  if (n <= 0) return 0;
  return Math.min(n - 1, Math.max(0, Math.floor(p * n)));
}

function IOSSectionBody({ section, Icon }: { section: DocSection; Icon: LucideIcon }) {
  return (
    <div className="space-y-4">
      {section.blocks.map((b, i) => (
        <IOSBlock key={`${section.heading}-${i}`} block={b} />
      ))}
    </div>
  );
}

function IOSBlock({ block }: { block: DocBlock }) {
  if (block.kind === "p") {
    return (
      <p className="font-sans text-[14px] leading-[1.5] text-[#1c1c1e]">
        {block.text}
      </p>
    );
  }
  if (block.kind === "contactChannels") {
    return null;
  }

  const list = (
    <ul className="space-y-3">
      {block.items.map((item, li) => (
        <li key={`${li}-${item.slice(0, 24)}`} className="flex items-start gap-3">
          <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff9500]" />
          <span className="font-sans text-[14px] leading-[1.45] text-[#1c1c1e]">{item}</span>
        </li>
      ))}
    </ul>
  );

  if (block.title) {
    return (
      <div className="rounded-[12px] bg-[#f2f2f7] p-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.02em] text-[#8e8e93]">
          {block.title}
        </p>
        <div className="mt-3 space-y-2.5">{list}</div>
      </div>
    );
  }

  return list;
}

export function IndustryIPhoneHero({
  doc,
  slug,
  initialFocus,
}: {
  doc: DocPage;
  slug: string;
  initialFocus?: string;
}) {
  const sections = doc.sections;
  const reduceMotion = useReducedMotion();
  const scrollTrackRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(() => activeIndexForFocus(sections, initialFocus));
  const scrollLockRef = useRef(false);

  const Icon = slugIcon[slug] ?? Building2;

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

  if (sections.length === 0) {
    return null;
  }

  const n = sections.length;
  const scrollTrackMinHeight =
    n <= 1 ? "auto" : `${Math.max(n * 68, 300)}svh`;

  const tabNav = (
    <nav className="mt-5" aria-label="Industry feature areas">
      <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.04em] text-[#8e8e93]">
        Features
      </p>
      <div className="flex flex-col gap-1.5" role="tablist" aria-orientation="vertical">
        {sections.map((sec, i) => {
          const selected = safeIndex === i;
          return (
            <button
              key={sec.heading}
              type="button"
              role="tab"
              id={`industry-tab-${i}`}
              aria-selected={selected}
              aria-controls="industry-panel"
              onClick={() => {
                scrollLockRef.current = true;
                setActive(i);
                window.setTimeout(() => {
                  scrollLockRef.current = false;
                }, 600);
              }}
              className={`w-full flex items-center gap-2.5 rounded-[10px] px-3.5 py-3 text-left font-sans text-[14px] transition-all duration-200 ${
                selected
                  ? "bg-[#ff9500] font-medium text-white shadow-[0_4px_12px_rgba(255,149,0,0.35)]"
                  : "bg-white/80 text-[#1c1c1e] hover:bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 ${selected ? "text-white" : "text-[#ff9500]"}`}
                strokeWidth={selected ? 2 : 1.5}
                aria-hidden
              />
              <span>{sec.heading}</span>
              <svg
                className={`ml-auto h-4 w-4 ${selected ? "text-white/80" : "text-[#c7c7cc]"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          );
        })}
      </div>
    </nav>
  );

  // Half iPhone floating display
  const iphone = (
    <div className="relative">
      {/* Floating iPhone frame - only upper half */}
      <div className="relative w-full max-w-[240px] sm:max-w-[260px]">
        {/* Shadow underneath */}
        <div className="absolute bottom-[-30px] left-1/2 h-[40px] w-[80%] -translate-x-1/2 rounded-full bg-black/20 blur-[20px]" />

        {/* iPhone frame - light theme */}
        <div className="relative rounded-[40px] border-[12px] border-[#d1d1d6] bg-[#d1d1d6] p-[3px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25),0_30px_60px_-15px_rgba(0,0,0,0.15)]">
          {/* Screen - light background */}
          <div className="relative overflow-hidden rounded-[32px] bg-[#ffffff]">
            {/* Status bar - iOS light style */}
            <div className="flex items-center justify-between px-6 py-2.5">
              <span className="font-sans text-[13px] font-semibold text-[#000000]">9:41</span>
              <div className="flex items-center gap-1.5">
                {/* Signal bars */}
                <div className="flex items-end gap-[2px]">
                  <div className="h-2 w-[3px] rounded-[1px] bg-[#000000]/80" />
                  <div className="h-3 w-[3px] rounded-[1px] bg-[#000000]/80" />
                  <div className="h-4 w-[3px] rounded-[1px] bg-[#000000]/80" />
                  <div className="h-5 w-[3px] rounded-[1px] bg-[#000000]/80" />
                </div>
                {/* WiFi */}
                <svg className="h-4 w-5 fill-[#000000]/80" viewBox="0 0 24 16">
                  <path d="M12 10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm8-5c-1.1 0-2.1.4-2.8 1.1L12 10.5 6.8 6.1C6.1 5.4 5.1 5 4 5 2.9 5 2 5.9 2 7c0 .4.1.8.3 1.1L12 18l9.7-9.9c.2-.3.3-.7.3-1.1 0-1.1-.9-2-2-2zm0-4.5L12 6.5 4 0 2 2l8 4.8 8-4.8-2-2z"/>
                </svg>
                {/* Battery */}
                <div className="flex items-center gap-[2px]">
                  <div className="h-[9px] w-[18px] rounded-[2px] border border-[#000000]/80 bg-transparent">
                    <div className="h-full w-[80%] rounded-[1px] bg-[#000000]" />
                  </div>
                  <div className="h-[4px] w-[2px] rounded-r-[1px] bg-[#000000]/80" />
                </div>
              </div>
            </div>

            {/* App content - light theme */}
            <div className="bg-[#ffffff]">
              {/* App header */}
              <div className="px-4 pb-3 pt-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#ff9500] to-[#cc7700] shadow-[0_4px_12px_rgba(255,149,0,0.4)]">
                      <Icon className="h-6 w-6 text-white" strokeWidth={1.5} aria-hidden />
                    </div>
                    <div>
                      <p className="font-sans text-[15px] font-semibold text-[#1c1c1e]">Avishkar AI</p>
                      <p className="font-sans text-[11px] text-[#8e8e93]">Field Operations</p>
                    </div>
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#34c759]">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                </div>
              </div>

              {/* Section title */}
              <div className="px-4 pb-2">
                <div className="inline-flex items-center gap-2 rounded-[20px] bg-[#f2f2f7] px-3 py-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#ff9500]" />
                  <span className="font-sans text-[11px] font-medium text-[#8e8e93]">
                    {activeSection?.heading}
                  </span>
                </div>
              </div>

              {/* Scrollable content */}
              <div
                id="industry-panel"
                role="tabpanel"
                aria-labelledby={`industry-tab-${safeIndex}`}
                className="h-[320px] overflow-y-auto px-4 pb-4"
              >
                <div className="space-y-3">
                  {activeSection?.blocks.map((b, i) => (
                    <IOSBlock key={`block-${i}`} block={b} />
                  ))}
                </div>
              </div>

              {/* Bottom indicator - cut off, so just show it */}
              <div className="h-[24px]" />
            </div>

            {/* Bottom home indicator - light style */}
            <div className="absolute bottom-1 left-1/2 w-[120px] -translate-x-1/2 rounded-full bg-black/20 py-[3px]" />
          </div>
        </div>

        {/* Side buttons - light style */}
        <div className="absolute -left-[14px] top-[80px] h-[28px] w-[3px] rounded-l-sm bg-[#c7c7cc]" />
        <div className="absolute -left-[14px] top-[120px] h-[50px] w-[3px] rounded-l-sm bg-[#c7c7cc]" />
        <div className="absolute -left-[14px] top-[175px] h-[50px] w-[3px] rounded-l-sm bg-[#c7c7cc]" />
        <div className="absolute -right-[14px] top-[90px] h-[60px] w-[3px] rounded-r-sm bg-[#c7c7cc]" />
      </div>
    </div>
  );

  return (
    <section
      ref={scrollTrackRef}
      style={{ minHeight: scrollTrackMinHeight }}
      className="relative w-full overflow-visible"
      aria-label="Industry overview and interactive preview"
    >
      <div className="sticky top-20 z-[1] py-10 md:top-24 md:py-12 lg:top-28 lg:py-14">
        <div className="mx-auto w-full max-w-[var(--page-max-width)] px-4 sm:px-6 md:px-8">
          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
            {/* Left side - Text and tabs */}
            <div className="flex min-h-0 w-full min-w-0 flex-col justify-center text-left lg:max-w-xl xl:max-w-2xl">
              {doc.eyebrow ? (
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff9500]">
                  {doc.eyebrow}
                </p>
              ) : null}
              <h1
                className={`font-sans text-[clamp(1.6rem,3.5vw,2.2rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1c1c1e] md:text-[36px] lg:text-[40px] ${doc.eyebrow ? "mt-3" : ""}`}
              >
                {doc.heroTitle}
              </h1>
              <p className="mt-3 max-w-[46ch] font-sans text-[15px] leading-[1.55] text-[#636366] md:text-[16px]">
                {doc.heroSubtitle}
              </p>
              {tabNav}
            </div>

            {/* Right side - Half iPhone (centered in column for symmetry) */}
            <div className="flex min-h-0 w-full items-center justify-center">
              {iphone}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}