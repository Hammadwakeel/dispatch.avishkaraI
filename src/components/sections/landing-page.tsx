"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import { Anton } from "next/font/google";
import Link from "next/link";
import { type ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ChallengesStickyScrollSection } from "@/components/sections/challenges-sticky-scroll-section";
import { DispatchLoopMarqueeCards } from "@/components/sections/dispatch-loop-marquee-cards";
import { TestimonialsCarouselSection } from "./testimonials-carousel-section";

/** Homepage problem tabs — update/avishkar_complete_copy_replacement.md.pdf */
const problemNarratives = [
  {
    title: "The fault fires. Nobody acts.",
    body: "A fault event hits your monitoring system. An alert fires in the NOC. Then a human picks it up — maybe. They call around to find an engineer. Check if parts are available. Dispatch. The clock has been running for 20 minutes already.",
  },
  {
    title: "The engineer arrives unprepared.",
    body: "Without the right context — fault type, asset history, required parts — engineers arrive and diagnose from scratch. First-fix rates drop. Return visits pile up. SLAs breach.",
  },
  {
    title: "No visibility. No accountability.",
    body: "Operations managers have no real-time view of what's happening in the field. Ticket status is a phone call away. Escalations get lost. Nobody knows if the SLA clock is running out.",
  },
  {
    title: "Legacy systems don't talk to each other.",
    body: "Your monitoring system, your ERP, your parts inventory — siloed. Connecting them requires a human. Every time. That human is the bottleneck.",
  },
] as const;

const challengesSectionHeading = (
  <>
    <span className="block text-left">
      Every minute of downtime costs&nbsp;
      <span className="text-amber-glow">thousands</span>.
    </span>
    <span className="mt-[0.15em] block text-left md:mt-2">
      The fix took&nbsp;
      <span className="text-amber-glow">45&nbsp;minutes</span>.
    </span>
  </>
);

/** Intro copy for challenges — base color comes from `challengesIntroClassName` (light vs dark surface). */
const challengesSectionIntro = (
  <>
    <span className="block text-left">
      ATM operators, tower companies, and medical device teams have accepted{" "}
      <span className="text-amber-glow">slow,</span>
    </span>
    <span className="mt-4 block text-left md:mt-5">
      <span className="text-amber-glow">manual dispatch</span> as a{" "}
      <span className="text-amber-glow">fact of life.</span> We proved it{" "}
      <span className="text-amber-glow">isn&apos;t</span>.
    </span>
  </>
);

/** Condensed poster caps (Anton) — fault section + challenges headline. */
const posterDisplay = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fromFaultToFix = [
  {
    step: "01",
    title: "Fault detected and normalized",
    body: "Events from monitoring tools, OEM feeds, and call-center channels are merged into one priority queue with SLA context.",
  },
  {
    step: "02",
    title: "Right engineer dispatched",
    body: "Avishkar AI assigns based on skill, territory, parts readiness, and active commitments to avoid rework and missed windows.",
  },
  {
    step: "03",
    title: "Repair execution tracked live",
    body: "Stakeholders receive real-time status from acceptance to on-site progress, including ETA, parts movement, and escalation notes.",
  },
  {
    step: "04",
    title: "Closure, proof, and learning",
    body: "Every ticket closes with documented actions, compliance-ready evidence, and analytics that improve future dispatch decisions.",
  },
] as const;

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
        <span className="text-deep-graphite">Every minute an ATM is </span>
        <span className="text-amber-glow">offline</span>
        <span className="text-deep-graphite"> is revenue walking away and a customer sent elsewhere. Legacy routing still averages </span>
        <span className="text-amber-glow">45 minutes</span>
        <span className="text-deep-graphite"> from fault to dispatch — Avishkar runs the full loop in </span>
        <span className="text-amber-glow">under 5 minutes</span>
        <span className="text-deep-graphite">, automatically.</span>
      </>
    ),
    detail: (
      <>
        <span className="text-deep-graphite">Our AI ingests NOC alerts, matches asset history, picks the right field tech, and coordinates parts — </span>
        <span className="text-amber-glow">no call-center queue</span>
        <span className="text-deep-graphite"> and no spreadsheet handoffs.</span>
      </>
    ),
    bullets: [
      { accent: "Live routing", rest: " across manufacturer-led ATM estates and acquirer networks in India." },
      { accent: "Parts-aware dispatch", rest: " checks inventory and ETA before the engineer rolls." },
      { accent: "Ticket to closure", rest: " with audit-ready timestamps for banking partners." },
    ],
    stat1: "5 min avg dispatch",
    stat2: "vs 45 min industry standard",
  },
  {
    title: "Telecom Towers",
    badge: "Live",
    body: (
      <>
        <span className="text-deep-graphite">When a tower drops, </span>
        <span className="text-amber-glow">thousands of subscribers</span>
        <span className="text-deep-graphite"> go dark in seconds — but traditional dispatch still races the clock with phone trees and shared inboxes.</span>
      </>
    ),
    detail: (
      <>
        <span className="text-deep-graphite">Avishkar assigns </span>
        <span className="text-amber-glow">certified climbers</span>
        <span className="text-deep-graphite"> by geography and skill, tracks SLA burn-down live, and escalates before the breach — </span>
        <span className="text-amber-glow">zero human coordinator</span>
        <span className="text-deep-graphite">.</span>
      </>
    ),
    bullets: [
      { accent: "SLA-aware assignment", rest: " weights distance, certification, and active jobs." },
      { accent: "Real-time status", rest: " for NOC, regional ops, and carrier stakeholders." },
      { accent: "Proof of visit", rest: " and closure notes synced back to your OSS stack." },
    ],
    stat1: "Real-time SLA tracking",
    stat2: "Zero-human dispatch",
  },
  {
    title: "Medical Devices",
    badge: "Deploying",
    body: (
      <>
        <span className="text-deep-graphite">Biomedical downtime is not an IT ticket — it is </span>
        <span className="text-amber-glow">patient safety</span>
        <span className="text-deep-graphite">. Response has to be fast, documented, and compliant.</span>
      </>
    ),
    detail: (
      <>
        <span className="text-deep-graphite">We dispatch </span>
        <span className="text-amber-glow">qualified biomedical engineers</span>
        <span className="text-deep-graphite">, attach device history and parts context, and generate </span>
        <span className="text-amber-glow">regulator-ready evidence</span>
        <span className="text-deep-graphite"> at closure.</span>
      </>
    ),
    bullets: [
      { accent: "Credential match", rest: " ensures OEM-trained techs on the right modality." },
      { accent: "Compliance pack", rest: " auto-built from field actions and timestamps." },
      { accent: "Hospital workflows", rest: " aligned with biomedical and facilities escalation paths." },
    ],
    stat1: "100% audit trail",
    stat2: "Auto compliance docs",
  },
  {
    title: "HVAC — Critical Facilities",
    badge: "Coming Soon",
    body: (
      <>
        <span className="text-deep-graphite">Data centers, hospitals, cold chain — when HVAC fails, the facility is in </span>
        <span className="text-amber-glow">crisis mode</span>
        <span className="text-deep-graphite">, not “schedule a visit next week.”</span>
      </>
    ),
    detail: (
      <>
        <span className="text-deep-graphite">Avishkar will prioritize </span>
        <span className="text-amber-glow">facility-grade SLAs</span>
        <span className="text-deep-graphite">, bundle BMS signals with parts and vendor contracts, and keep operations leadership on </span>
        <span className="text-amber-glow">one live timeline</span>
        <span className="text-deep-graphite">.</span>
      </>
    ),
    bullets: [
      { accent: "Escalation ladders", rest: " tuned for Tier III / healthcare environments." },
      { accent: "Vendor + parts orchestration", rest: " so the right crew arrives with the right kit." },
      { accent: "Executive visibility", rest: " into critical incidents without chasing updates." },
    ],
    stat1: "Priority dispatch",
    stat2: "Facility-grade SLAs",
  },
];

const realStats = [
  { metric: "5 min", label: "Average dispatch time", sublabel: "From fault event to engineer assigned" },
  { metric: "45 min", label: "Industry average we replaced", sublabel: "Manual dispatch, ATM sector" },
  { metric: "2", label: "Live enterprise customers", sublabel: "ATM manufacturer + telecom tower operator, India" },
  { metric: "APAC", label: "Next expansion region", sublabel: "In advanced conversations with global operators" },
] as const;

const integrationTaxonomy = [
  {
    title: "Fault Monitoring",
    items: ["SCADA Systems", "NOC Software", "Legacy Telemetry", "IoT Sensors"],
  },
  {
    title: "Asset Management",
    items: ["ATM Management Systems", "Tower Management Platforms", "BMS / CMMS"],
  },
  {
    title: "Parts & Inventory",
    items: ["ERP Systems", "Warehouse Management", "Parts Catalog APIs"],
  },
  {
    title: "Reporting & Compliance",
    items: ["CRM Platforms", "Compliance Dashboards", "SLA Tracking Tools"],
  },
] as const;

/** Leading integer + optional suffix (e.g. "5 min", "2"). Returns null for non-numeric metrics like "APAC". */
function parseNumericProofMetric(metric: string): { target: number; suffix: string } | null {
  const m = metric.match(/^(\d+)\s*(.*)$/);
  if (!m) return null;
  return { target: Number.parseInt(m[1], 10), suffix: m[2].trim() };
}

function OperatingProofAnimatedMetric({
  metric,
  start,
  delaySec,
}: {
  metric: string;
  start: boolean;
  delaySec: number;
}) {
  const reduceMotion = useReducedMotion();
  const parsed = useMemo(() => parseNumericProofMetric(metric), [metric]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!parsed || reduceMotion) return;
    if (!start) return;

    setValue(0);
    let playback: ReturnType<typeof animate> | undefined;
    const timer = window.setTimeout(() => {
      playback = animate(0, parsed.target, {
        duration: 1.25,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setValue(Math.round(latest)),
      });
    }, delaySec * 1000);

    return () => {
      window.clearTimeout(timer);
      playback?.stop();
    };
  }, [parsed, start, reduceMotion, delaySec]);

  if (reduceMotion) {
    if (parsed) {
      const text = parsed.suffix.length > 0 ? `${parsed.target}\u00a0${parsed.suffix}` : `${parsed.target}`;
      return <span className="inline-block tabular-nums text-amber-glow">{text}</span>;
    }
    return <span className="inline-block text-amber-glow">{metric}</span>;
  }

  if (!parsed) {
    return (
      <motion.span
        className="inline-block text-amber-glow"
        initial={{ opacity: 0, y: 10 }}
        animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.45, delay: delaySec, ease: "easeOut" }}
      >
        {metric}
      </motion.span>
    );
  }

  const display = parsed.suffix.length > 0 ? `${value}\u00a0${parsed.suffix}` : `${value}`;

  return (
    <motion.span
      className="inline-block tabular-nums text-amber-glow"
      initial={{ opacity: 0.7, scale: 0.94 }}
      animate={start ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 0.94 }}
      transition={{ duration: 0.35, delay: delaySec }}
    >
      {display}
    </motion.span>
  );
}

function OperatingProofPointsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "0px 0px -12% 0px" });

  return (
    <section ref={sectionRef} className="border-b border-light-steel bg-canvas-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
        <h2 className={`${posterDisplay.className} text-left uppercase tracking-[-0.02em]`}>
          <span className="block text-[clamp(2rem,5.5vw,3.5rem)] leading-[0.95]">
            <span className="text-amber-glow">Operating</span>{" "}
            <span className="text-deep-graphite">proof</span>{" "}
            <span className="text-amber-glow">points</span>
          </span>
        </h2>

        <div className="mt-10 flex flex-col gap-8 md:mt-12 lg:mt-14 lg:flex-row lg:items-stretch lg:justify-between lg:gap-6 xl:gap-8">
          {realStats.map((item, i) => (
            <article
              key={item.label}
              className="flex min-w-0 flex-1 flex-col border-b border-deep-graphite/12 pb-8 last:border-b-0 last:pb-0 lg:border-b-0 lg:pb-0"
            >
              <p className="font-mono text-[clamp(1.05rem,2.2vw,1.5rem)] font-bold tabular-nums leading-none text-amber-glow">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 font-sans text-[clamp(1.85rem,4.5vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                <OperatingProofAnimatedMetric metric={item.metric} start={inView} delaySec={i * 0.12} />
              </p>
              <p className="mt-3 font-sans text-[clamp(1rem,1.85vw,1.35rem)] font-bold leading-snug text-deep-graphite">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 0→1 while the tall pin runway scrolls through the viewport (Lenis-smoothed). */
function faultPinSectionProgress(lenis: Lenis, sectionEl: HTMLElement): number {
  const scroll = lenis.scroll;
  const innerH = window.innerHeight;
  const top = sectionEl.getBoundingClientRect().top + scroll;
  const height = sectionEl.offsetHeight;
  const travel = Math.max(1, height - innerH);
  return Math.max(0, Math.min(1, (scroll - top) / travel));
}

const liquidFaultCardClass =
  "relative overflow-hidden rounded-[22px] border-2 border-deep-graphite bg-gradient-to-br from-white/[0.48] via-white/[0.18] to-white/[0.07] p-6 shadow-[0_18px_56px_-14px_rgba(29,30,28,0.22),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-[26px] md:p-7";

function FaultEventToFixedSection() {
  const reduceMotion = useReducedMotion();
  /** Pin runway only (headline scrolls away above this). */
  const pinRunwayRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackWrapRef = useRef<HTMLDivElement>(null);
  const [trackXRange, setTrackXRange] = useState(0);
  const scrollProgress = useMotionValue(0);

  const syncFromLenis = useCallback(
    (l: Lenis) => {
      const el = pinRunwayRef.current;
      if (!el || reduceMotion) return;
      scrollProgress.set(faultPinSectionProgress(l, el));
    },
    [reduceMotion, scrollProgress],
  );

  useLenis(syncFromLenis, [reduceMotion]);

  const lenisInstance = useLenis();
  useEffect(() => {
    if (lenisInstance && !reduceMotion) syncFromLenis(lenisInstance);
  }, [lenisInstance, reduceMotion, syncFromLenis]);

  useEffect(() => {
    lenisInstance?.resize();
  }, [lenisInstance]);

  const measureHorizontalScroll = useCallback(() => {
    const wrap = trackWrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    setTrackXRange(Math.max(0, track.scrollWidth - wrap.clientWidth));
  }, []);

  useLayoutEffect(() => {
    measureHorizontalScroll();
    const ro = new ResizeObserver(() => measureHorizontalScroll());
    if (trackWrapRef.current) ro.observe(trackWrapRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measureHorizontalScroll);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureHorizontalScroll);
    };
  }, [measureHorizontalScroll]);

  /** Vertical scroll progress → horizontal slide (Lenis-style pinned strip). */
  const trackX = useTransform(scrollProgress, (p) => -p * trackXRange);

  useEffect(() => {
    lenisInstance?.resize();
  }, [lenisInstance, trackXRange]);

  const staticLiquidCard =
    `${liquidFaultCardClass} bg-gradient-to-br from-canvas-white/95 via-canvas-white/80 to-harvest-cream/30`;

  const headingBlock = (
    <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 pt-14 pb-10 md:px-8 md:pt-20 md:pb-14">
      <h2
        id="fault-event-to-fixed-heading"
        className={`${posterDisplay.className} text-left uppercase tracking-[-0.02em]`}
      >
        <span className="block text-[clamp(2.75rem,9.5vw,6.75rem)] leading-[0.9] text-deep-graphite">
          From fault event to fixed
        </span>
        <span className="mt-1 block text-[clamp(2.75rem,9.5vw,6.75rem)] leading-[0.9] text-amber-glow md:mt-2">
          In 5 minutes.
        </span>
      </h2>
    </div>
  );

  return (
    <section
      className="border-b border-light-steel bg-gradient-to-b from-canvas-white via-harvest-cream/15 to-canvas-white"
      aria-labelledby="fault-event-to-fixed-heading"
    >
      {headingBlock}

      {reduceMotion ? (
        <div className="mx-auto grid w-full max-w-[var(--page-max-width)] grid-cols-1 gap-5 px-6 pb-20 sm:grid-cols-2 md:px-8">
          {fromFaultToFix.map((item) => (
            <article key={item.step} className={staticLiquidCard}>
              <p className="font-mono text-[clamp(1.25rem,3vw,2rem)] font-bold tabular-nums text-amber-glow">
                Step {item.step}
              </p>
              <h3 className="mt-3 font-sans text-[clamp(1rem,2vw,1.4rem)] font-extrabold uppercase text-deep-graphite">
                {item.title}
              </h3>
              <p className="mt-3 font-sans text-[15px] font-semibold leading-[1.62] text-deep-graphite md:text-[16px]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div
          ref={pinRunwayRef}
          className="relative min-h-[min(280vh,3800px)] w-full"
        >
          <div className="sticky top-0 z-10 flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-gradient-to-b from-canvas-white/95 via-canvas-white/90 to-harvest-cream/25 py-12 md:py-16">
            <div ref={trackWrapRef} className="w-full overflow-hidden">
              <motion.div
                ref={trackRef}
                style={{ x: trackX }}
                className="flex w-max flex-row items-stretch gap-5 px-6 md:gap-8 md:px-8"
                aria-label="Fault to fixed steps"
              >
                {fromFaultToFix.map((item) => (
                  <article
                    key={item.step}
                    className={`shrink-0 ${liquidFaultCardClass} w-[min(86vw,320px)] sm:w-[350px] md:w-[380px]`}
                  >
                    <div
                      className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-glow/15 blur-3xl md:-right-10 md:-top-10 md:h-36 md:w-36"
                      aria-hidden
                    />
                    <p className="font-mono text-[clamp(1.35rem,3.4vw,2.35rem)] font-bold tabular-nums leading-none text-amber-glow">
                      Step {item.step}
                    </p>
                    <h3 className="mt-3 font-sans text-[clamp(1rem,2vw,1.45rem)] font-extrabold uppercase tracking-[-0.02em] text-deep-graphite">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-sans text-[clamp(0.92rem,1.35vw,1rem)] font-semibold leading-[1.62] text-deep-graphite md:text-[16px]">
                      {item.body}
                    </p>
                  </article>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function IndustryCardFace({ item }: { item: IndustryCardItem }) {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-sans text-[clamp(1.45rem,3vw,2.05rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-deep-graphite">
          {item.title}
        </h3>
        <span className="shrink-0 rounded-full border-2 border-amber-glow/45 bg-amber-glow/12 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-amber-glow md:text-[12px]">
          {item.badge}
        </span>
      </div>
      <div className="mt-6 space-y-5">
        <p className="font-sans text-[clamp(1.05rem,2.1vw,1.35rem)] font-bold leading-[1.55]">{item.body}</p>
        <p className="font-sans text-[clamp(0.98rem,1.85vw,1.15rem)] font-bold leading-[1.58]">{item.detail}</p>
        <ul className="space-y-3.5 border-t border-deep-graphite/12 pt-6">
          {item.bullets.map((b) => (
            <li
              key={`${item.title}-${b.accent}`}
              className="flex gap-3 font-sans text-[clamp(0.98rem,1.75vw,1.12rem)] font-bold leading-snug"
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
      <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[13px] font-bold text-deep-graphite md:text-[14px]">
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
        <p className="font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-deep-graphite md:text-[13px]">Industry segments</p>
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
          className="inline-flex min-h-[52px] w-fit items-center justify-center rounded-full border-2 border-deep-graphite/20 bg-canvas-white px-7 py-3 font-sans text-[15px] font-bold text-deep-graphite shadow-[0_2px_12px_-4px_rgba(29,30,28,0.14)] transition-[box-shadow,background-color] hover:border-amber-glow/45 hover:bg-harvest-cream/35 hover:shadow-[0_4px_18px_-6px_rgba(29,30,28,0.18)]"
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
            className={`${posterDisplay.className} text-left uppercase tracking-[-0.02em]`}
          >
            <span className="block whitespace-nowrap text-[clamp(2.75rem,9.5vw,6.75rem)] leading-[0.9]">
              <span className="text-amber-glow">Built</span>{" "}
              <span className="text-deep-graphite">for infrastructure that</span>
            </span>
            <span className="mt-1 block text-[clamp(2.75rem,9.5vw,6.75rem)] leading-[0.9] text-amber-glow md:mt-2">
              cannot fail.
            </span>
          </h2>
          <p className="mt-7 font-sans text-[clamp(1.2rem,2.8vw,1.85rem)] font-bold leading-[1.45] text-justify [text-align-last:left] text-deep-graphite md:mt-9 xl:whitespace-nowrap">
            <span className="text-amber-glow">Four segments</span>{" "}
            <span className="text-deep-graphite">we ship against today, or are </span>
            <span className="text-amber-glow">actively deploying</span>
            <span className="text-deep-graphite">, with the </span>
            <span className="text-amber-glow">same dispatch core</span>
            <span className="text-deep-graphite">.</span>
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
  const reduceHeroMotion = useReducedMotion();

  return (
    <main className="flex-1 overflow-x-clip bg-canvas-white">
      <section
        id="demo"
        className="relative scroll-mt-28 overflow-hidden border-b border-light-steel bg-canvas-white md:scroll-mt-32"
      >
        {!reduceHeroMotion ? (
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
            <video
              className="h-full w-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
            {/* Frosted scrim so headline/body stay readable on any footage */}
            <div className="absolute inset-0 bg-gradient-to-br from-canvas-white/93 via-canvas-white/78 to-harvest-cream/55 backdrop-blur-[2px]" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-harvest-cream/35 to-canvas-white" aria-hidden />
        )}

        <div className="relative z-10 mx-auto w-full max-w-[var(--page-max-width)] px-6 py-16 md:px-8 md:py-20 lg:min-h-[min(72vh,820px)] lg:flex lg:flex-col lg:justify-center lg:py-24">
          <div>
            <h1 className={`${posterDisplay.className} text-left uppercase tracking-[-0.02em]`}>
              {/* Three-line poster: Built for critical / infrastructure fails / response time */}
              <span className="block text-[clamp(2.25rem,8.5vw,6.25rem)] leading-[0.9]">
                <span className="text-amber-glow">Built</span>{" "}
                <span className="text-deep-graphite">for critical</span>
              </span>
              <span className="mt-1 block text-[clamp(2.25rem,8.5vw,6.25rem)] leading-[0.9] md:mt-2">
                <span className="text-deep-graphite">infrastructure </span>
                <span className="text-amber-glow">fails</span>
                <span className="text-deep-graphite"> in seconds.</span>
              </span>
              <span className="mt-1 block text-[clamp(1.85rem,6.5vw,4.75rem)] leading-[0.95] text-deep-graphite md:mt-2">
                The response used to take <span className="text-amber-glow">45 minutes.</span>
              </span>
            </h1>
            <p className="mt-7 max-w-[62ch] font-sans text-[16px] font-normal leading-[1.6] text-muted-stone md:mt-9 md:text-[17px]">
              Avishkar is an AI-native dispatch layer for ATM networks, telecom towers, and medical devices. When a fault fires,
              our AI picks the ticket, finds the right engineer, orders parts, follows up, and closes the loop, in under 5 minutes.
              No human in the middle.
            </p>
            <div className="mt-9">
              <Link
                href="/company/contact"
                className="inline-flex min-h-[50px] items-center justify-center rounded-[var(--radius-ui)] bg-amber-glow px-8 font-mono text-[14px] font-semibold text-canvas-white shadow-[var(--shadow-sm)] transition-[filter] hover:brightness-[1.04]"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ChallengesStickyScrollSection
        heading={challengesSectionHeading}
        headingFontClassName={posterDisplay.className}
        intro={challengesSectionIntro}
        challenges={problemNarratives}
      />

      <DispatchLoopMarqueeCards />

      <FaultEventToFixedSection />

      <IndustrySegmentStacksSection />

      <OperatingProofPointsSection />

      <TestimonialsCarouselSection />

      <section className="border-b border-light-steel bg-canvas-white py-16 md:py-20">
        <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
          <h2 className="font-sans text-[clamp(1.55rem,3.2vw,2.35rem)] font-semibold leading-tight text-deep-graphite">
            Sits on top of your existing monitoring stack. No rip-and-replace.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {integrationTaxonomy.map((item) => (
              <article
                key={item.title}
                className="rounded-[var(--radius-card)] border border-light-steel bg-canvas-white p-6 shadow-[0_10px_36px_-22px_rgba(29,30,28,0.22)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-22px_rgba(29,30,28,0.26)]"
              >
                <h3 className="font-sans text-[19px] font-semibold text-deep-graphite">{item.title}</h3>
                <ul className="mt-3 space-y-2">
                  {item.items.map((line) => (
                    <li key={line} className="flex items-start gap-2 font-sans text-[14px] text-muted-stone">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-glow" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas-white py-16 md:py-20">
        <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
          <div className="rounded-[var(--radius-card)] border border-light-steel bg-canvas-white p-8 text-center md:p-10">
            <h2 className="font-sans text-[clamp(1.55rem,3.2vw,2.3rem)] font-semibold leading-tight text-deep-graphite">
              See a live fault dispatched in under 5 minutes.
            </h2>
            <p className="mx-auto mt-4 max-w-[62ch] font-sans text-[15px] leading-[1.65] text-muted-stone md:text-[16px]">
              We’ll show you exactly how Avishkar detects a fault, assigns an engineer, coordinates parts, and closes the ticket — on your infrastructure type. No slides. No generic demo. Your use case.
            </p>
            <ul className="mx-auto mt-7 flex max-w-xl flex-col gap-2 text-left font-sans text-[13px] text-deep-graphite sm:max-w-lg md:text-[14px]">
              <li className="flex gap-2"><span className="text-amber-glow">✓</span>Live in India today</li>
              <li className="flex gap-2"><span className="text-amber-glow">✓</span>Integrates with your existing monitoring stack</li>
              <li className="flex gap-2"><span className="text-amber-glow">✓</span>Deployed in weeks, not months</li>
              <li className="flex gap-2"><span className="text-amber-glow">✓</span>Founders on every demo call</li>
            </ul>
            <div className="mt-9">
              <Link
                href="/company/contact"
                className="inline-flex min-h-[50px] items-center justify-center rounded-[var(--radius-ui)] bg-amber-glow px-8 font-mono text-[14px] font-semibold text-canvas-white shadow-[var(--shadow-sm)] transition-[filter] hover:brightness-[1.04]"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
