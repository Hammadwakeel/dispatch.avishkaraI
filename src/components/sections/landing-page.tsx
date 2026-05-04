"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ChallengeScrollRevealCard } from "@/components/ui/challenge-scroll-reveal-card";
import { ScrollRevealDropCard } from "@/components/ui/scroll-reveal-drop-card";
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

const dispatchFeatureTabs = [
  {
    id: "fault-ingestion",
    label: "Fault Ingestion",
    headline: "Fault in. Ticket open. Instantly.",
    body: "The moment your monitoring system fires a fault event — SCADA, NOC, telemetry, legacy software — Avishkar picks it up via API. No human triage. No queue. Instant classification by fault type, asset, severity, and location.",
  },
  {
    id: "engineer-assignment",
    label: "Engineer Assignment",
    headline: "Right engineer. Right skills. Seconds.",
    body: "Avishkar scans your field engineer network in real time — availability, location, certification, current workload — and assigns the best match. The engineer gets full fault context on mobile before they leave.",
  },
  {
    id: "parts",
    label: "Parts Orchestration",
    headline: "Parts ordered before the engineer arrives.",
    body: "Avishkar checks inventory in real time, reserves required parts, and coordinates delivery to the site — automatically. Engineers arrive ready to fix, not to diagnose.",
  },
  {
    id: "follow-up",
    label: "Real-Time Follow-Up",
    headline: "AI follows up. You don't have to.",
    body: "Avishkar tracks every open ticket in real time. If a repair is delayed, it follows up with the engineer automatically. If there's an escalation — the engineer talks directly back to the AI. No phone tag. No missed updates.",
  },
  {
    id: "closure",
    label: "Ticket Closure",
    headline: "Closed loop. Every time.",
    body: "When the fix is confirmed, Avishkar closes the ticket, logs the resolution, updates your CRM and reporting, and generates compliance documentation automatically. Nothing falls through the cracks.",
  },
  {
    id: "analytics",
    label: "Analytics",
    headline: "Full visibility across your network.",
    body: "Every engineer, every ticket, every asset — live. SLA risk flagged before breach. Resolution times, first-fix rates, and engineer performance tracked automatically. Operations managers finally have the dashboard they needed.",
  },
] as const;

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

/** Warm-tinted frosted glass panel — visually aligned with Apple-style glass (e.g. Nyx UI glass container). */
function ChallengeGlassArticle({
  className,
  children,
  hoverLift = true,
}: {
  className?: string;
  children: ReactNode;
  hoverLift?: boolean;
}) {
  const lift = hoverLift ? "hover:-translate-y-0.5" : "";
  return (
    <article
      className={`group relative isolate overflow-hidden rounded-[var(--radius-card)] border border-black bg-canvas-white/14 p-6 shadow-[0_22px_44px_-24px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.68),inset_0_-1px_0_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150 transition-[transform,box-shadow] duration-300 supports-[backdrop-filter]:bg-canvas-white/[0.08] ${lift} hover:shadow-[0_28px_52px_-24px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.78),inset_0_-1px_0_rgba(0,0,0,0.13)] md:p-7 ${className ?? ""}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,color-mix(in_srgb,var(--color-harvest-cream)_30%,transparent)_0%,rgba(255,255,255,0.42)_30%,rgba(255,255,255,0.14)_55%,rgba(255,255,255,0.04)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_14%_0%,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.08)_42%,transparent_72%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-65 [background:linear-gradient(118deg,transparent_26%,rgba(255,255,255,0.56)_46%,rgba(255,255,255,0.14)_58%,transparent_76%)] transition-opacity duration-300 group-hover:opacity-95"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-95"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </article>
  );
}

/** Lenis-synced 0–1 progress while this section moves through the viewport (matches fault-steps timing). */
function challengeCardsSectionProgress(lenis: Lenis, sectionEl: HTMLElement): number {
  const scroll = lenis.scroll;
  const innerH = window.innerHeight;
  const top = sectionEl.getBoundingClientRect().top + scroll;
  const height = sectionEl.offsetHeight;
  const travel = Math.max(1, height - innerH * 0.45);
  let p = (scroll - top + innerH * 0.72) / travel;
  return Math.max(0, Math.min(1, p));
}

function DispatchLoopFeaturesSection() {
  const [active, setActive] = useState(0);
  const tab = dispatchFeatureTabs[active];

  return (
    <section
      className="border-b border-light-steel bg-harvest-cream/35 py-16 md:py-20"
      aria-labelledby="dispatch-loop-features-heading"
    >
      <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
        <h2
          id="dispatch-loop-features-heading"
          className="text-center font-sans text-[clamp(1.55rem,3.2vw,2.35rem)] font-semibold leading-tight text-deep-graphite"
        >
          The AI that runs the entire dispatch loop. End to end.
        </h2>

        <div
          className="mt-8 flex flex-wrap justify-center gap-2 md:gap-2.5"
          role="tablist"
          aria-label="Dispatch capabilities"
        >
          {dispatchFeatureTabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              id={`dispatch-tab-${t.id}`}
              aria-controls={`dispatch-tabpanel-${t.id}`}
              onClick={() => setActive(i)}
              className={`rounded-full border px-3 py-2 font-mono text-[12px] font-semibold uppercase tracking-wide transition-colors md:px-4 md:text-[13px] ${
                i === active
                  ? "border-amber-glow bg-amber-glow text-canvas-white"
                  : "border-light-steel bg-canvas-white/80 text-deep-graphite hover:border-amber-glow/45"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`dispatch-tabpanel-${tab.id}`}
          aria-labelledby={`dispatch-tab-${tab.id}`}
          className="mx-auto mt-8 max-w-3xl rounded-[var(--radius-card)] border border-light-steel bg-canvas-white p-6 shadow-[0_10px_36px_-22px_rgba(29,30,28,0.18)] md:p-8"
        >
          <h3 className="font-sans text-[20px] font-semibold leading-snug text-deep-graphite md:text-[22px]">{tab.headline}</h3>
          <p className="mt-4 font-sans text-[15px] leading-[1.65] text-muted-stone md:text-[16px]">{tab.body}</p>
        </div>
      </div>
    </section>
  );
}

function ChallengesBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(168deg,var(--color-canvas-white)_0%,color-mix(in_srgb,var(--color-harvest-cream)_72%,white)_42%,color-mix(in_srgb,var(--color-harvest-cream)_42%,var(--color-deep-graphite))_118%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[22%] top-[10%] h-[min(380px,58vw)] w-[min(380px,58vw)] rounded-full bg-[radial-gradient(circle_at_center,rgba(228,86,42,0.11)_0%,transparent_68%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-[38%] -left-[18%] h-[min(360px,55vw)] w-[min(360px,55vw)] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,168,75,0.09)_0%,transparent_62%)] blur-3xl"
        aria-hidden
      />
    </>
  );
}

function FaultResponseChallengesSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useMotionValue(0);

  const syncFromLenis = useCallback(
    (l: Lenis) => {
      const el = sectionRef.current;
      if (!el || reduceMotion) return;
      scrollProgress.set(challengeCardsSectionProgress(l, el));
    },
    [reduceMotion, scrollProgress],
  );

  useLenis(syncFromLenis, [reduceMotion]);

  const lenisInstance = useLenis();
  useEffect(() => {
    if (lenisInstance && !reduceMotion) syncFromLenis(lenisInstance);
  }, [lenisInstance, reduceMotion, syncFromLenis]);

  const total = problemNarratives.length;

  const cardInner = (item: (typeof problemNarratives)[number], i: number) => (
    <>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-glow">
        Challenge {String(i + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-3 font-sans text-[22px] font-semibold leading-snug text-deep-graphite">{item.title}</h3>
      <p className="mt-3 font-sans text-[15px] leading-[1.62] text-muted-stone">{item.body}</p>
    </>
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-light-steel py-16 md:py-20"
      aria-labelledby="fault-response-challenges-heading"
    >
      <ChallengesBackdrop />

      <div className="relative mx-auto min-h-[min(105vh,840px)] w-full max-w-[var(--page-max-width)] px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="fault-response-challenges-heading"
            className="font-sans text-[clamp(1.55rem,3.2vw,2.35rem)] font-semibold leading-tight text-deep-graphite"
          >
            Every minute of downtime costs thousands. The fix took 45 minutes.
          </h2>
          <p className="mt-5 font-sans text-[15px] leading-[1.65] text-muted-stone md:text-[16px]">
            ATM operators, tower companies, and medical device teams have accepted slow, manual dispatch as a fact of life.
            We proved it isn’t.
          </p>
        </div>

        <div className="mt-10 grid gap-5 overflow-x-clip md:grid-cols-2">
          {problemNarratives.map((item, i) =>
            reduceMotion ? (
              <ChallengeGlassArticle key={item.title}>{cardInner(item, i)}</ChallengeGlassArticle>
            ) : (
              <ChallengeScrollRevealCard
                key={item.title}
                index={i}
                total={total}
                scrollProgress={scrollProgress}
                className="will-change-transform"
              >
                <ChallengeGlassArticle>{cardInner(item, i)}</ChallengeGlassArticle>
              </ChallengeScrollRevealCard>
            ),
          )}
        </div>

        <p className="mx-auto mt-12 max-w-[52ch] text-center font-sans text-[15px] font-medium leading-relaxed text-deep-graphite md:text-[16px]">
          The ATM industry’s average fault response time: 45 minutes. Avishkar’s: 5 minutes.
        </p>
      </div>
    </section>
  );
}

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

/** 0–1 progress through the fault-steps section using Lenis scroll (smooth-scroll sync). */
function faultStepsSectionProgress(lenis: Lenis, sectionEl: HTMLElement): number {
  const scroll = lenis.scroll;
  const innerH = window.innerHeight;
  const top = sectionEl.getBoundingClientRect().top + scroll;
  const height = sectionEl.offsetHeight;
  const travel = Math.max(1, height - innerH * 0.45);
  let p = (scroll - top + innerH * 0.72) / travel;
  return Math.max(0, Math.min(1, p));
}

function FaultEventToFixedSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useMotionValue(0);

  const syncFromLenis = useCallback(
    (l: Lenis) => {
      const el = sectionRef.current;
      if (!el || reduceMotion) return;
      scrollProgress.set(faultStepsSectionProgress(l, el));
    },
    [reduceMotion, scrollProgress],
  );

  useLenis(syncFromLenis, [reduceMotion]);

  const lenisInstance = useLenis();
  useEffect(() => {
    if (lenisInstance && !reduceMotion) syncFromLenis(lenisInstance);
  }, [lenisInstance, reduceMotion, syncFromLenis]);

  const total = fromFaultToFix.length;
  const cardClass =
    "rounded-[var(--radius-card)] border border-light-steel bg-canvas-white p-6 shadow-[0_8px_30px_-24px_rgba(29,30,28,0.3)]";

  return (
    <section
      ref={sectionRef}
      className="border-b border-light-steel bg-canvas-white py-16 md:py-20"
      aria-labelledby="fault-event-to-fixed-heading"
    >
      <div className="mx-auto min-h-[min(118vh,900px)] w-full max-w-[var(--page-max-width)] px-6 md:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-10 lg:gap-14">
          <div className="md:col-span-4 lg:col-span-3">
            <h2
              id="fault-event-to-fixed-heading"
              className="max-w-[18ch] font-sans text-[clamp(1.55rem,3.2vw,2.35rem)] font-semibold leading-tight text-deep-graphite"
            >
              From fault event to fixed — in 5 minutes.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 md:col-span-8 lg:col-span-9">
            {fromFaultToFix.map((item, index) =>
              reduceMotion ? (
                <article key={item.step} className={cardClass}>
                  <p className="font-mono text-[12px] font-semibold tabular-nums text-amber-glow">
                    Step {item.step}
                  </p>
                  <h3 className="mt-2 font-sans text-[20px] font-semibold text-deep-graphite">{item.title}</h3>
                  <p className="mt-3 font-sans text-[15px] leading-[1.62] text-muted-stone">{item.body}</p>
                </article>
              ) : (
                <ScrollRevealDropCard
                  key={item.step}
                  index={index}
                  total={total}
                  scrollProgress={scrollProgress}
                  className={`${cardClass} will-change-transform`}
                  dropFromPx={40}
                  initialOpacity={0.12}
                >
                  <p className="font-mono text-[12px] font-semibold tabular-nums text-amber-glow">
                    Step {item.step}
                  </p>
                  <h3 className="mt-2 font-sans text-[20px] font-semibold text-deep-graphite">{item.title}</h3>
                  <p className="mt-3 font-sans text-[15px] leading-[1.62] text-muted-stone">{item.body}</p>
                </ScrollRevealDropCard>
              ),
            )}
          </div>
        </div>
      </div>
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

/** Two cards in one column: bottom stays anchored; top translates up over it (scroll-synced). */
function IndustryStackPair({
  bottomCard,
  topCard,
  scrollYProgress,
  rangeStart,
  rangeEnd,
}: {
  bottomCard: IndustryCardItem;
  topCard: IndustryCardItem;
  scrollYProgress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
}) {
  const reduceMotion = useReducedMotion();
  const stackProgress = useTransform(scrollYProgress, [rangeStart, rangeEnd], [0, 1]);

  const topY = useTransform(stackProgress, [0, 1], [132, 2]);
  const bottomScale = useTransform(stackProgress, [0, 0.5, 1], [1, 0.986, 0.972]);
  const topScale = useTransform(stackProgress, [0, 1], [0.92, 1]);

  const shell =
    "rounded-[var(--radius-card)] border border-light-steel bg-canvas-white p-6 md:p-7 will-change-transform";

  if (reduceMotion) {
    return (
      <div className="mx-auto flex w-full max-w-[440px] flex-col gap-4">
        <article className={`${shell} shadow-[0_22px_50px_-22px_rgba(29,30,28,0.34)]`}>
          <IndustryCardFace item={topCard} />
        </article>
        <article className={`${shell} shadow-[0_12px_36px_-20px_rgba(29,30,28,0.22)]`}>
          <IndustryCardFace item={bottomCard} />
        </article>
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-[min(380px,62vw)] w-full max-w-[440px] md:h-[420px]">
      <motion.article
        className={`absolute bottom-0 left-0 right-0 z-[1] origin-bottom ${shell} shadow-[0_16px_48px_-22px_rgba(29,30,28,0.26)]`}
        style={{ scale: bottomScale }}
      >
        <IndustryCardFace item={bottomCard} />
      </motion.article>

      <motion.article
        className={`absolute bottom-[52px] left-0 right-0 z-[2] origin-bottom ${shell} shadow-[0_32px_70px_-18px_rgba(29,30,28,0.42)] ring-1 ring-black/[0.07]`}
        style={{
          y: topY,
          scale: topScale,
        }}
      >
        <IndustryCardFace item={topCard} />
      </motion.article>
    </div>
  );
}

function IndustrySegmentStacksSection() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (reduceMotion) {
    return (
      <section className="border-b border-light-steel bg-harvest-cream/30 py-16 md:py-20">
        <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
          <h2
            id="industry-segments-heading"
            className="font-sans text-[clamp(1.55rem,3.2vw,2.35rem)] font-semibold leading-tight text-deep-graphite"
          >
            Built for infrastructure that cannot fail.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {industryCards.map((item) => (
              <article
                key={item.title}
                className="rounded-[var(--radius-card)] border border-light-steel bg-canvas-white p-6 shadow-[0_10px_36px_-22px_rgba(29,30,28,0.22)]"
              >
                <IndustryCardFace item={item} />
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative border-b border-light-steel bg-harvest-cream/30"
      style={{ height: "clamp(220vh, 340vw, 2800px)" }}
      aria-labelledby="industry-segments-heading"
    >
      <div className="sticky top-0 z-10 mx-auto flex min-h-[100dvh] max-w-[var(--page-max-width)] flex-col justify-center px-6 py-14 md:px-8 md:py-20">
        <h2
          id="industry-segments-heading"
          className="max-w-[22ch] font-sans text-[clamp(1.55rem,3.2vw,2.35rem)] font-semibold leading-tight text-deep-graphite"
          aria-describedby="industry-segments-desc"
        >
          Built for infrastructure that cannot fail.
        </h2>
        <p id="industry-segments-desc" className="sr-only">
          While you scroll through this section, paired segment cards stack and overlap to show depth.
        </p>

        <div
          className="mt-12 grid grid-cols-1 gap-14 md:mt-14 md:grid-cols-2 md:gap-10 lg:gap-14"
          aria-describedby="industry-segments-desc"
        >
          <IndustryStackPair
            bottomCard={industryCards[0]}
            topCard={industryCards[1]}
            scrollYProgress={scrollYProgress}
            rangeStart={0.05}
            rangeEnd={0.46}
          />
          <IndustryStackPair
            bottomCard={industryCards[2]}
            topCard={industryCards[3]}
            scrollYProgress={scrollYProgress}
            rangeStart={0.54}
            rangeEnd={0.96}
          />
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
        className="scroll-mt-28 border-b border-light-steel bg-gradient-to-b from-canvas-white to-harvest-cream/45 md:scroll-mt-32"
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

      <FaultResponseChallengesSection />

      <DispatchLoopFeaturesSection />

      <FaultEventToFixedSection />

      <IndustrySegmentStacksSection />

      <OperatingProofPointsSection />

      <TestimonialsCarouselSection />

      <section className="relative overflow-hidden border-b border-light-steel py-16 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(168deg,var(--color-canvas-white)_0%,color-mix(in_srgb,var(--color-harvest-cream)_78%,white)_38%,color-mix(in_srgb,var(--color-harvest-cream)_48%,var(--color-deep-graphite))_115%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-[22%] -top-[18%] h-[min(580px,78vw)] w-[min(580px,78vw)] rounded-full bg-[radial-gradient(circle_at_center,rgba(228,86,42,0.24)_0%,rgba(228,86,42,0.08)_42%,transparent_70%)] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-[36%] -left-[18%] h-[min(460px,62vw)] w-[min(460px,62vw)] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,168,75,0.14)_0%,transparent_62%)] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          aria-hidden
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                -16deg,
                transparent 0px,
                transparent 72px,
                rgba(228, 86, 42, 0.028) 72px,
                rgba(228, 86, 42, 0.028) 73px
              ),
              repeating-linear-gradient(
                74deg,
                transparent 0px,
                transparent 96px,
                rgba(29, 30, 28, 0.022) 96px,
                rgba(29, 30, 28, 0.022) 97px
              )
            `,
          }}
        />
        <div className="relative mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
          <h2 className="font-sans text-[clamp(1.55rem,3.2vw,2.35rem)] font-semibold leading-tight text-deep-graphite">
            Sits on top of your existing monitoring stack. No rip-and-replace.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {integrationTaxonomy.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-[var(--radius-card)] border border-black/90 bg-canvas-white/10 p-6 shadow-[0_22px_44px_-24px_rgba(29,30,28,0.55),inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-1px_0_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_54px_-24px_rgba(29,30,28,0.58),inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-1px_0_rgba(0,0,0,0.14)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.2)_34%,rgba(255,255,255,0.08)_62%,rgba(255,255,255,0.03)_100%)]" />
                <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.52)_0%,rgba(255,255,255,0.06)_42%,transparent_72%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-70 [background:linear-gradient(115deg,transparent_28%,rgba(255,255,255,0.62)_45%,rgba(255,255,255,0.16)_57%,transparent_74%)] transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/95 to-transparent" />
                <div className="relative">
                  <h3 className="font-sans text-[19px] font-semibold text-deep-graphite">{item.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {item.items.map((line) => (
                      <li key={line} className="flex items-start gap-2 font-sans text-[14px] text-muted-stone">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-glow" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas-white py-16 md:py-20">
        <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
          <div className="rounded-[var(--radius-card)] border border-light-steel bg-gradient-to-br from-canvas-white to-harvest-cream/40 p-8 text-center md:p-10">
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
