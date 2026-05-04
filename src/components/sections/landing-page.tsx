"use client";

import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import { Anton } from "next/font/google";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChallengesStickyScrollSection } from "@/components/sections/challenges-sticky-scroll-section";
import { DispatchLoopMarqueeCards } from "@/components/sections/dispatch-loop-marquee-cards";
import { HeroEmbeddedVisual } from "./hero-embedded-visual";
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

const challengesSectionIntro = (
  <>
    <span className="block text-left text-deep-graphite">
      ATM operators, tower companies, and medical device teams have accepted{" "}
      <span className="text-amber-glow">slow,</span>
    </span>
    <span className="mt-4 block text-left text-deep-graphite md:mt-5">
      <span className="text-amber-glow">manual dispatch</span>{" "}
      <span className="text-deep-graphite">as a</span>{" "}
      <span className="text-amber-glow">fact of life.</span>{" "}
      <span className="text-deep-graphite">We proved it</span>{" "}
      <span className="text-amber-glow">isn&apos;t</span>
      <span className="text-deep-graphite">.</span>
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

const industryCards = [
  {
    title: "ATM Networks",
    badge: "Live",
    body: "Every minute an ATM is offline is lost revenue and a customer turned away. Avishkar cuts dispatch from 45 minutes to 5 — automatically, without a human dispatcher.",
    stat1: "5 min avg dispatch",
    stat2: "vs 45 min industry standard",
  },
  {
    title: "Telecom Towers",
    badge: "Live",
    body: "Tower downtime means thousands of subscribers go dark. Avishkar dispatches the right certified engineer before your SLA clock runs out — every time.",
    stat1: "Real-time SLA tracking",
    stat2: "Zero-human dispatch",
  },
  {
    title: "Medical Devices",
    badge: "Deploying",
    body: "When biomedical equipment fails, response speed is patient safety. Avishkar dispatches certified biomedical engineers and generates compliance documentation automatically.",
    stat1: "100% audit trail",
    stat2: "Auto compliance docs",
  },
  {
    title: "HVAC — Critical Facilities",
    badge: "Coming Soon",
    body: "Data centers, hospitals, cold chain — HVAC failure in these environments is a crisis, not an inconvenience. Avishkar treats it that way.",
    stat1: "Priority dispatch",
    stat2: "Facility-grade SLAs",
  },
] as const;

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

function OperatingProofStatCard({
  index,
  metric,
  label,
}: {
  index: number;
  metric: string;
  label: string;
}) {
  const metricDisplay = metric.includes("->") ? metric.replace(/\s*->\s*/, " → ") : metric;

  return (
    <article className="rounded-[var(--radius-card)] border border-light-steel bg-canvas-white p-6 shadow-[0_8px_30px_-24px_rgba(29,30,28,0.22)]">
      <p className="font-mono text-[13px] font-semibold text-amber-glow tabular-nums">{String(index).padStart(2, "0")}</p>
      <p className="mt-3 font-sans text-[22px] font-semibold leading-snug text-deep-graphite">{metricDisplay}</p>
      <p className="mt-3 font-sans text-[14px] leading-[1.55] text-muted-stone">{label}</p>
    </article>
  );
}

function OperatingProofPointsSection() {
  return (
    <section className="border-b border-light-steel bg-canvas-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
        <h2 className="font-sans text-[clamp(1.55rem,3.2vw,2.35rem)] font-semibold leading-tight text-deep-graphite">
          Operating proof points
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {realStats.map((item, i) => (
            <OperatingProofStatCard key={item.label} index={i + 1} metric={item.metric} label={item.label} />
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

type IndustryCardItem = (typeof industryCards)[number];

function IndustryCardFace({ item }: { item: IndustryCardItem }) {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-sans text-[19px] font-semibold text-deep-graphite md:text-[20px]">{item.title}</h3>
        <span className="shrink-0 rounded-full border border-amber-glow/35 bg-amber-glow/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-amber-glow">
          {item.badge}
        </span>
      </div>
      <p className="mt-3 font-sans text-[15px] leading-[1.6] text-muted-stone">{item.body}</p>
      <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-deep-graphite/85 md:text-[13px]">
        <span>{item.stat1}</span>
        <span className="text-light-steel" aria-hidden>
          ·
        </span>
        <span>{item.stat2}</span>
      </p>
    </>
  );
}

function IndustrySegmentStacksSection() {
  const segmentCardClass =
    "flex h-full flex-col rounded-2xl border border-light-steel bg-canvas-white p-7 shadow-[0_2px_28px_-12px_rgba(29,30,28,0.12)] md:p-8";

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
            <span className="block text-[clamp(2.75rem,9.5vw,6.75rem)] leading-[0.9] sm:whitespace-nowrap">
              <span className="text-amber-glow">Built</span>{" "}
              <span className="text-deep-graphite">for infrastructure that</span>{" "}
              <span className="text-amber-glow">cannot fail.</span>
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

        <div className="mx-auto mt-14 grid max-w-6xl gap-8 md:mt-16 md:grid-cols-2 md:gap-x-10 md:gap-y-10">
          {industryCards.map((item) => (
            <article key={item.title} className={segmentCardClass}>
              <IndustryCardFace item={item} />
              <div className="mt-6 flex flex-1 flex-col justify-end pt-2">
                <Link
                  href="/solutions"
                  className="inline-flex w-fit items-center justify-center rounded-full border border-light-steel bg-canvas-white px-5 py-2.5 font-sans text-[14px] font-medium text-deep-graphite shadow-[0_2px_12px_-4px_rgba(29,30,28,0.14)] transition-[box-shadow,background-color] hover:bg-harvest-cream/40 hover:shadow-[0_4px_18px_-6px_rgba(29,30,28,0.18)]"
                >
                  Learn more
                </Link>
              </div>
            </article>
          ))}
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
        className="scroll-mt-28 border-b border-light-steel bg-canvas-white md:scroll-mt-32"
      >
        <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 py-16 md:px-8 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-glow">
                Built for critical infrastructure
              </p>
              <h1 className="mt-5 font-sans text-[clamp(2rem,5vw,3.55rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-deep-graphite">
                Critical infrastructure fails in seconds.
                <br />
                The response used to take 45 minutes.
              </h1>
              <p className="mt-6 max-w-[58ch] font-sans text-[16px] leading-[1.6] text-muted-stone md:text-[17px]">
                Avishkar is an AI-native dispatch layer for ATM networks, telecom towers, and medical devices. When a fault fires,
                our AI picks the ticket, finds the right engineer, orders parts, follows up, and closes the loop — in under{" "}
                <strong className="text-deep-graphite">5 minutes</strong>. No human in the middle.
              </p>
              <div className="mt-9">
                <Link
                  href="/company/contact"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-[var(--radius-ui)] bg-amber-glow px-8 font-mono text-[14px] font-semibold text-canvas-white shadow-[var(--shadow-sm)] transition-[filter] hover:brightness-[1.04]"
                >
                  Book a Demo
                </Link>
              </div>
              <p className="mt-4 font-sans text-[14px] text-muted-stone md:text-[15px]">
                Live with ATM manufacturers and tower operators across India.
              </p>
            </div>
            <div className="mx-auto w-full max-w-[min(100%,540px)] lg:mx-0 lg:ml-auto">
              <HeroEmbeddedVisual />
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
