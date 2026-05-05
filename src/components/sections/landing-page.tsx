"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { posterDisplay } from "@/lib/poster-font";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { DispatchGlobeSection } from "@/components/sections/dispatch-globe-section";
import { bookDemoHref } from "@/config/site-navigation";
import { TestimonialsCarouselSection } from "./testimonials-carousel-section";

/** Public asset — filename contains a space (`public/hero image.jpeg`). */
const HERO_IMAGE_SRC = "/hero%20image.jpeg";

type IndustryBullet = { accent: string; rest: string };

type IndustryCardItem = {
  title: string;
  badge: string;
  body: ReactNode;
  detail: ReactNode;
  bullets: readonly IndustryBullet[];
  stat1: string;
  stat2: string;
};

const industryCards: readonly IndustryCardItem[] = [
  {
    title: "ATM Networks",
    badge: "Live",
    body: (
      <>
        <span className="text-deep-graphite">Offline ATMs bleed revenue. Route alert → field without a </span>
        <span className="text-amber-glow">manual queue</span>
        <span className="text-deep-graphite">.</span>
      </>
    ),
    detail: (
      <>
        <span className="text-deep-graphite">Alerts, assets, crew, parts — </span>
        <span className="text-amber-glow">no call-center triage</span>
        <span className="text-deep-graphite">.</span>
      </>
    ),
    bullets: [
      { accent: "Routing", rest: " OEM estates & acquirers, India." },
      { accent: "Parts", rest: " reserved before roll." },
      { accent: "Closure", rest: " audit-ready." },
    ],
    stat1: "~5 min dispatch",
    stat2: "vs ~45 min manual",
  },
  {
    title: "Telecom Towers",
    badge: "Live",
    body: (
      <>
        <span className="text-deep-graphite">When a tower drops, </span>
        <span className="text-amber-glow">subscribers</span>
        <span className="text-deep-graphite"> go dark fast — not phone trees and inboxes.</span>
      </>
    ),
    detail: (
      <>
        <span className="text-deep-graphite">Right crew, live SLA, escalate early — </span>
        <span className="text-amber-glow">no coordinator</span>
        <span className="text-deep-graphite">.</span>
      </>
    ),
    bullets: [
      { accent: "Assign", rest: " geo, certs, load." },
      { accent: "Status", rest: " NOC & carriers." },
      { accent: "OSS", rest: " visits + notes." },
    ],
    stat1: "Live SLA",
    stat2: "Zero-human dispatch",
  },
  {
    title: "Medical Devices",
    badge: "Deploying",
    body: (
      <>
        <span className="text-deep-graphite">Downtime is </span>
        <span className="text-amber-glow">patient safety</span>
        <span className="text-deep-graphite"> — fast, documented, compliant.</span>
      </>
    ),
    detail: (
      <>
        <span className="text-deep-graphite">BioMed engineers + context → </span>
        <span className="text-amber-glow">audit-ready close</span>
        <span className="text-deep-graphite">.</span>
      </>
    ),
    bullets: [
      { accent: "Certs", rest: " modality-matched." },
      { accent: "Evidence", rest: " auto from field events." },
      { accent: "Paths", rest: " bioMed + facilities." },
    ],
    stat1: "Full audit trail",
    stat2: "Compliance exports",
  },
  {
    title: "HVAC — Critical Facilities",
    badge: "Coming Soon",
    body: (
      <>
        <span className="text-deep-graphite">DC, hospital, cold chain — HVAC failure means </span>
        <span className="text-amber-glow">crisis</span>
        <span className="text-deep-graphite">, not next-week visits.</span>
      </>
    ),
    detail: (
      <>
        <span className="text-deep-graphite">Facility SLAs: BMS, parts, vendors on </span>
        <span className="text-amber-glow">one timeline</span>
        <span className="text-deep-graphite">.</span>
      </>
    ),
    bullets: [
      { accent: "Escalations", rest: " Tier III tuned." },
      { accent: "Kit", rest: " vendor + parts aligned." },
      { accent: "Exec view", rest: " critical incidents." },
    ],
    stat1: "Priority dispatch",
    stat2: "Facility SLAs",
  },
];

function IndustryCardFace({ item }: { item: IndustryCardItem }) {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3
          className={`${posterDisplay.className} text-[clamp(1rem,2.4vw,1.55rem)] font-normal uppercase leading-[1.05] tracking-[-0.02em] text-deep-graphite`}
        >
          {item.title}
        </h3>
        <span className="shrink-0 rounded-full border-2 border-amber-glow/45 bg-amber-glow/12 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-amber-glow md:text-[12px]">
          {item.badge}
        </span>
      </div>
      <div className="mt-6 space-y-5">
        <p className="max-w-[52ch] font-sans text-[16px] font-normal leading-[1.6] text-deep-graphite md:text-[17px]">
          {item.body}
        </p>
        <p className="max-w-[52ch] font-sans text-[16px] font-normal leading-[1.6] text-deep-graphite md:text-[17px]">
          {item.detail}
        </p>
        <ul className="space-y-3.5 border-t border-deep-graphite/12 pt-6">
          {item.bullets.map((b) => (
            <li
              key={`${item.title}-${b.accent}`}
              className="flex gap-3 font-sans text-[15px] font-normal leading-snug text-deep-graphite md:text-[16px]"
            >
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-glow" aria-hidden />
              <span>
                <span className="text-amber-glow">{b.accent}</span>
                <span className="text-deep-graphite">{b.rest}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-[13px] font-normal tabular-nums text-deep-graphite/90 md:text-[14px]">
        <span>{item.stat1}</span>
        <span className="text-light-steel" aria-hidden>
          ·
        </span>
        <span>{item.stat2}</span>
      </p>
    </>
  );
}

/** Framed carousel: segment dots + drag / keyboard (no decorative Mac traffic lights). */
function IndustrySegmentsCarousel({ items }: { items: readonly IndustryCardItem[] }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = items.length;
  const panelRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (index: number) => {
      setActive(((index % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((i) => (i - 1 + count) % count);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((i) => (i + 1) % count);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [count]);

  const item = items[active] ?? items[0];

  return (
    <div
      ref={panelRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Industry segments"
      tabIndex={0}
      className="rounded-[22px] border-2 border-deep-graphite bg-canvas-white shadow-[0_22px_64px_-28px_rgba(29,30,28,0.22)] outline-none ring-deep-graphite focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-deep-graphite/15 bg-gradient-to-b from-harvest-cream/50 to-canvas-white/90 px-5 py-4 md:gap-6 md:px-8 md:py-5">
        <p
          className={`${posterDisplay.className} text-[12px] font-normal uppercase tracking-[0.1em] text-deep-graphite md:text-[13px]`}
        >
          Industry segments
        </p>
        <div
          className="flex min-h-[1.25rem] flex-1 flex-wrap items-center justify-end gap-2.5 sm:justify-end md:gap-3"
          role="tablist"
          aria-label="Choose industry segment"
        >
          {items.map((row, i) => (
            <button
              key={row.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              id={`industry-tab-${i}`}
              aria-controls="industry-panel"
              className={`h-3 w-3 rounded-full transition-[transform,background-color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-graphite md:h-3.5 md:w-3.5 ${
                i === active
                  ? "scale-110 bg-amber-glow shadow-[0_0_0_2px_rgba(29,30,28,0.08)]"
                  : "bg-deep-graphite/22 hover:bg-deep-graphite/38"
              }`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>

      <motion.div
        id="industry-panel"
        role="tabpanel"
        aria-labelledby={`industry-tab-${active}`}
        drag={reduceMotion ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        dragSnapToOrigin
        onDragEnd={(_, info) => {
          const vx = info.velocity.x ?? 0;
          if (info.offset.x < -56 || vx < -420) setActive((i) => (i + 1) % count);
          else if (info.offset.x > 56 || vx > 420) setActive((i) => (i - 1 + count) % count);
        }}
        className={`min-h-[min(380px,52vh)] touch-pan-y md:min-h-[min(420px,56vh)] ${reduceMotion ? "" : "cursor-grab active:cursor-grabbing"}`}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={item.title}
            initial={reduceMotion ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -14 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
            className="px-6 py-8 pt-7 md:px-10 md:py-10 md:pt-8 lg:px-12 lg:py-12"
          >
            <div aria-live="polite" aria-atomic="true">
              <IndustryCardFace item={item} />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="border-t border-light-steel px-6 pb-8 pt-6 md:px-10 md:pb-10 lg:px-12">
        <Link
          href="/solutions"
          className="inline-flex min-h-[50px] w-fit items-center justify-center rounded-full border-2 border-deep-graphite/20 bg-canvas-white px-7 py-3 font-mono text-[14px] font-semibold text-deep-graphite shadow-[0_2px_12px_-4px_rgba(29,30,28,0.14)] transition-[box-shadow,background-color] hover:border-amber-glow/45 hover:bg-harvest-cream/35 hover:shadow-[0_4px_18px_-6px_rgba(29,30,28,0.18)]"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}

function IndustrySegmentStacksSection() {
  return (
    <section
      className="border-b border-light-steel bg-canvas-white py-20 md:py-28"
      aria-labelledby="industry-segments-heading"
    >
      <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
        <div className="w-full text-left">
          <h2
            id="industry-segments-heading"
            className={`${posterDisplay.className} text-left font-normal uppercase tracking-[-0.02em]`}
          >
            <span className="block text-[clamp(1.35rem,4.5vw,3.35rem)] leading-[0.9]">
              <span className="text-amber-glow">Built</span>
              <span className="text-deep-graphite"> for</span>
            </span>
            <span className="mt-1 block text-[clamp(1.35rem,4.5vw,3.35rem)] leading-[0.9] text-deep-graphite md:mt-2">
              infrastructure
            </span>
            <span className="mt-1 block text-[clamp(1.35rem,4.5vw,3.35rem)] leading-[0.9] md:mt-2">
              <span className="text-deep-graphite">that </span>
              <span className="text-amber-glow">cannot fail.</span>
            </span>
          </h2>
          <p className="mt-7 max-w-[52ch] font-sans text-[16px] font-normal leading-[1.6] text-muted-stone md:mt-9 md:text-[17px]">
            <span className="text-amber-glow">Four segments</span>
            <span className="text-deep-graphite">, one dispatch core.</span>
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl md:mt-16 xl:max-w-6xl">
          <IndustrySegmentsCarousel items={industryCards} />
        </div>
      </div>
    </section>
  );
}

export function LandingPage() {
  return (
    <main className="flex-1 overflow-x-clip bg-canvas-white">
      <section
        id="demo"
        className="relative scroll-mt-28 overflow-hidden border-b border-light-steel bg-canvas-white md:scroll-mt-32"
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-harvest-cream/40 via-canvas-white to-canvas-white"
          aria-hidden
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[var(--page-max-width)] grid-cols-1 gap-10 px-6 py-16 md:gap-12 md:px-8 md:py-20 lg:min-h-[min(72vh,820px)] lg:grid-cols-2 lg:items-start lg:gap-12 lg:py-24 xl:gap-16">
          <div className="order-1 min-w-0">
            <h1 className={`${posterDisplay.className} text-left uppercase tracking-[-0.02em]`}>
              <span className="block text-[clamp(1.35rem,4.5vw,3.35rem)] leading-[0.9]">
                <span className="text-amber-glow">Built</span>
                <span className="text-deep-graphite"> for</span>
              </span>
              <span className="mt-1 block text-[clamp(1.35rem,4.5vw,3.35rem)] leading-[0.9] text-deep-graphite md:mt-2">
                infrastructure
              </span>
              <span className="mt-1 block text-[clamp(1.35rem,4.5vw,3.35rem)] leading-[0.9] md:mt-2">
                <span className="text-deep-graphite">that </span>
                <span className="text-amber-glow">cannot fail.</span>
              </span>
            </h1>
            <p className="mt-7 max-w-[52ch] font-sans text-[16px] font-normal leading-[1.6] text-muted-stone md:mt-9 md:text-[17px]">
              AI dispatch for ATM, telecom, and medical — assignment in minutes, no coordinator.
            </p>
            <div className="mt-9">
              <Link
                href={bookDemoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center rounded-[var(--radius-ui)] bg-amber-glow px-8 font-mono text-[14px] font-semibold text-canvas-white shadow-[var(--shadow-sm)] transition-[filter] hover:brightness-[1.04]"
              >
                Book a Demo
              </Link>
            </div>
          </div>

          <div className="relative order-2 mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] border border-light-steel/80 bg-canvas-white shadow-[0_20px_48px_-24px_rgba(29,30,28,0.22)] ring-1 ring-deep-graphite/[0.06] lg:aspect-[5/4]">
              <Image
                src={HERO_IMAGE_SRC}
                alt="Avishkar AI dispatch for critical infrastructure"
                fill
                priority
                sizes="(max-width: 1024px) min(100vw - 3rem, 28rem), 50vw"
                className="object-contain object-center p-2 sm:p-3 md:p-4"
              />
            </div>
          </div>
        </div>
      </section>

      <DispatchGlobeSection />

      <IndustrySegmentStacksSection />

      <TestimonialsCarouselSection />
    </main>
  );
}
