"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CorePlatformTabsSection } from "./core-platform-tabs-section";
import { HeroEmbeddedVisual } from "./hero-embedded-visual";
import { HeroLeadForm } from "./hero-lead-form";
import { IndustrySnapshotsSection } from "./industry-snapshots-section";
import { IntegrationsPartnersSection } from "./integrations-partners-section";
import { MetricsRoiSection } from "./metrics-roi-section";
import { TestimonialsCarouselSection } from "./testimonials-carousel-section";
import { companyLinks, pricingNavItem, productLinks, solutionLinks } from "@/config/site-navigation";

/** Route-level code split: social proof chunk loads separately from the main landing bundle. */
const TrustedMarqueeSection = dynamic(
  () => import("./trusted-marquee").then((mod) => mod.TrustedMarqueeSection),
  {
    loading: () => <SocialProofSectionSkeleton />,
  },
);

function SocialProofSectionSkeleton() {
  return (
    <section
      className="border-y border-light-steel bg-gradient-to-b from-canvas-white to-[color-mix(in_srgb,var(--color-harvest-cream)_70%,var(--color-warm-linen)_30%)] py-[72px] md:py-[88px]"
      aria-hidden={true}
      aria-busy="true"
    >
      <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="mx-auto h-3 w-24 animate-pulse rounded bg-amber-glow/25" />
          <div className="mx-auto h-10 max-w-md animate-pulse rounded-md bg-light-steel/40" />
          <div className="mx-auto h-16 max-w-xl animate-pulse rounded-md bg-light-steel/30" />
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl justify-center gap-6 border-y border-light-steel/50 py-8">
          {["a", "b", "c"].map((k) => (
            <div key={k} className="flex flex-col items-center gap-2">
              <div className="h-6 w-16 animate-pulse rounded bg-light-steel/45" />
              <div className="h-3 w-24 animate-pulse rounded bg-light-steel/30" />
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {["s1", "s2", "s3", "s4", "s5", "s6", "s7"].map((k) => (
            <div key={k} className="h-9 w-24 animate-pulse rounded-full bg-light-steel/35" />
          ))}
        </div>
      </div>
    </section>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

const staggerParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";

const problemItems = [
  {
    id: "dispatch",
    title: "The dispatch chaos",
    body: "Manual scheduling creates conflicts, missed windows, and wasted drive time—technicians lose 2–3 hours daily to poor routing. Average Indian field businesses lose ₹35+ lakh/year to dispatch inefficiency.",
  },
  {
    id: "communication",
    title: "The communication gap",
    body: "Customers wait for updates, miss appointments, and call constantly. About 40% of inbound calls are status updates AI can handle—68% of Indian customers rate field service experiences as frustrating.",
  },
  {
    id: "knowledge",
    title: "The knowledge leak",
    body: "Best practices live in technicians’ heads, not systems—inconsistent quality and repeated mistakes follow. 73% of field service knowledge walks out the door when people leave.",
  },
  {
    id: "inventory",
    title: "The inventory blind spot",
    body: "Parts gaps cause return trips and delays; return trips average about ₹8,000 per occurrence in India. 23% of scheduled jobs need a revisit because of parts issues.",
  },
] as const;

function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-canvas-white via-canvas-white to-[color-mix(in_srgb,var(--color-canvas-white)_88%,var(--color-amber-glow)_12%)]">
      <div className={`${containerPx} py-[80px] md:py-[96px]`}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="flex min-w-0 flex-col text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={staggerParent}
          >
            <motion.p
              variants={staggerChild}
              className="font-mono text-[12px] font-normal uppercase tracking-[0.14em] text-muted-stone"
            >
              AI-native field service
            </motion.p>
            <motion.h1
              variants={staggerChild}
              className="font-serif mt-8 text-balance text-[clamp(2.25rem,5.5vw,4rem)] font-normal leading-[0.94] tracking-[-0.045em] text-deep-graphite md:text-[64px]"
            >
              The AI-native field service platform that runs itself
            </motion.h1>
            <motion.p
              variants={staggerChild}
              className="mx-auto mt-10 max-w-[52ch] text-pretty font-mono text-[16px] leading-[1.5] text-muted-stone lg:mx-0 md:text-[20px] md:leading-[1.41] md:tracking-[-0.025px]"
            >
              Avishkar AI transforms reactive field service into autonomous operations.
              AI handles scheduling, dispatch, customer communication, inventory, and
              predictive maintenance—so your team focuses on the work, not the logistics.
            </motion.p>
            <motion.div
              variants={staggerChild}
              className="mx-auto mt-10 w-full max-w-md lg:hidden"
            >
              <HeroEmbeddedVisual />
            </motion.div>
            <motion.div
              variants={staggerChild}
              className="mt-10 flex justify-center lg:mt-12 lg:justify-start"
            >
              <HeroLeadForm />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative hidden min-w-0 lg:flex lg:justify-end"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease, delay: 0.28 }}
          >
            <HeroEmbeddedVisual className="max-w-[min(100%,520px)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const [active, setActive] = useState(0);
  const activeItem = problemItems[active];
  const sectionRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  const syncActiveFromScroll = useCallback((l: Lenis) => {
    const el = sectionRef.current;
    if (!el) return;
    const scroll = l.scroll;
    const innerH = window.innerHeight;
    const top = el.getBoundingClientRect().top + scroll;
    const height = el.offsetHeight;
    const travel = Math.max(1, height - innerH);
    let p = (scroll - top) / travel;
    p = Math.max(0, Math.min(1, p));
    const idx = Math.min(problemItems.length - 1, Math.floor(p * problemItems.length));
    setActive((prev) => (prev === idx ? prev : idx));
  }, []);

  useLenis(syncActiveFromScroll, []);

  useEffect(() => {
    if (lenis) syncActiveFromScroll(lenis);
  }, [lenis, syncActiveFromScroll]);

  const scrollToPanel = (i: number) => {
    const el = sectionRef.current;
    if (!lenis || !el) return;
    const scroll = lenis.scroll;
    const innerH = window.innerHeight;
    const top = el.getBoundingClientRect().top + scroll;
    const height = el.offsetHeight;
    const travel = Math.max(1, height - innerH);
    const target = top + ((i + 0.5) / problemItems.length) * travel;
    lenis.scrollTo(target, { duration: 0.85 });
  };

  return (
    <section
      ref={sectionRef}
      id="pain"
      className="relative scroll-mt-28 bg-gradient-to-b from-canvas-white via-harvest-cream to-[color-mix(in_srgb,var(--color-harvest-cream)_86%,var(--color-amber-glow)_14%)] md:scroll-mt-32"
      style={{ minHeight: `${problemItems.length * 92}svh` }}
      aria-labelledby="problem-heading"
    >
      <div className="sticky top-20 z-10 py-[80px] md:top-24 md:py-[96px] lg:top-28">
        <div className={containerPx}>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.22fr)] lg:gap-16 xl:gap-20">
          <div className="min-w-0">
            <motion.h2
              id="problem-heading"
              className="font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.05px] text-deep-graphite md:text-[48px] md:leading-none"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease }}
            >
              Field service is broken. Here&apos;s why.
            </motion.h2>
            <motion.p
              className="mt-4 max-w-[52ch] font-mono text-[16px] leading-[1.5] text-muted-stone md:mt-5 md:text-[20px] md:leading-[1.41] md:tracking-[-0.025px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease, delay: 0.06 }}
            >
              Avishkar AI is built for intelligence-first operations: autonomous scheduling,
              voice, customer comms, and inventory—so coordinators stop firefighting and start
              steering outcomes.
            </motion.p>

            <div
              className="mt-6 flex flex-col gap-0.5 border-t border-light-steel pt-5 md:mt-7 md:pt-6"
              role="tablist"
              aria-label="Field service challenges"
            >
              {problemItems.map((item, i) => {
                const selected = i === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="problem-mac-screen"
                    id={`problem-tab-${item.id}`}
                    className={`group py-1 text-left transition-colors duration-200 md:py-1.5 ${
                      selected
                        ? "border-l-[3px] border-amber-glow pl-4"
                        : "border-l-[3px] border-transparent pl-4 hover:border-soft-fog"
                    }`}
                    onClick={() => {
                      setActive(i);
                      scrollToPanel(i);
                    }}
                  >
                    <span
                      className={`block font-serif text-[22px] font-normal leading-snug tracking-[-0.025px] transition-colors md:text-[26px] md:leading-[1.25] ${
                        selected
                          ? "text-deep-graphite"
                          : "text-link-gray group-hover:text-deep-graphite"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="mt-0.5 block font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-muted-stone md:text-[12px]">
                      {selected ? "On screen" : "Show in preview"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-[min(100%,700px)] lg:mx-0 lg:max-w-none lg:justify-self-stretch"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease, delay: 0.08 }}
          >
            <div
              className="relative rounded-[1.2rem] bg-gradient-to-b from-[#d8d6d3] via-[#b9b7b4] to-[#9c9a97] p-2 shadow-[0_32px_64px_-24px_rgba(29,30,28,0.35),0_14px_28px_-16px_rgba(29,30,28,0.2),inset_0_1px_0_rgba(255,255,255,0.55)] ring-1 ring-black/10 md:rounded-[1.45rem] md:p-[10px]"
              aria-label="Preview window"
            >
              <div className="overflow-hidden rounded-[1rem] bg-[#2a2a2a] p-2 shadow-[inset_0_2px_8px_rgba(0,0,0,0.45)] md:rounded-[1.12rem] md:p-2.5">
                <div className="grid h-8 grid-cols-[3rem_1fr_3rem] items-center rounded-t-lg bg-[#3d3d3d] px-2.5 md:h-9 md:grid-cols-[3.5rem_1fr_3.5rem] md:px-3.5">
                  <span className="flex justify-start gap-1.5" aria-hidden>
                    <span className="size-2.5 rounded-full bg-[#ff5f57] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.25)]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)]" />
                    <span className="size-2.5 rounded-full bg-[#28c840] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)]" />
                  </span>
                  <span className="truncate text-center font-mono text-[11px] font-medium text-white/75">
                    Operations preview
                  </span>
                  <span aria-hidden className="block" />
                </div>
                <div
                  id="problem-mac-screen"
                  role="tabpanel"
                  aria-labelledby={`problem-tab-${activeItem.id}`}
                  className="relative min-h-[220px] rounded-b-lg rounded-t-none border border-t-0 border-light-steel bg-canvas-white px-4 py-4 shadow-inner sm:min-h-[240px] md:min-h-[280px] md:px-6 md:py-6 lg:min-h-[300px]"
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-glow md:text-[11px]">
                    {activeItem.title}
                  </p>
                  <div className="relative mt-3 min-h-[7.5rem] md:mt-4 md:min-h-[8.5rem] lg:min-h-[9rem]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeItem.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease }}
                        className="absolute inset-0"
                      >
                        <p className="font-mono text-[14px] leading-[1.55] text-link-gray md:text-[15px] md:leading-[1.58] lg:text-[16px]">
                          {activeItem.body}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-deep-graphite/10 md:bottom-3"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
}

type HowItWorksStep = {
  step: string;
  title: string;
  body: string;
};

/** Lenis-style fan: each step shifts right and down; scroll scrubs in from the left. */
const HOW_IT_WORKS_STAGGER_X = 46;
const HOW_IT_WORKS_STAGGER_Y = 22;
const HOW_IT_WORKS_OFF_LEFT_PX = 520;
const HOW_IT_WORKS_CARD_W = 272;
const HOW_IT_WORKS_CARD_H = Math.round((HOW_IT_WORKS_CARD_W * 5) / 4);

function smoothstep01(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

/** Scroll segment (0–1) when each card flies in and settles on the stack. */
const HOW_IT_WORKS_ENTER: Record<number, readonly [number, number]> = {
  0: [0.05, 0.2],
  1: [0.26, 0.4],
  2: [0.46, 0.6],
  3: [0.66, 0.8],
};

function HowItWorksStackCard({
  s,
  index,
  scrollYProgress,
}: {
  s: HowItWorksStep;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const restX = index * HOW_IT_WORKS_STAGGER_X;
  const restY = index * HOW_IT_WORKS_STAGGER_Y;
  const offLeft = HOW_IT_WORKS_OFF_LEFT_PX;

  const x = useTransform(scrollYProgress, (p) => {
    const range = HOW_IT_WORKS_ENTER[index];
    if (!range) return restX;
    const [start, end] = range;
    if (p <= start) return restX - offLeft;
    if (p >= end) return restX;
    const raw = (p - start) / (end - start);
    return restX - offLeft * (1 - smoothstep01(raw));
  });

  return (
    <motion.article
      style={{
        x,
        y: restY,
        zIndex: 10 + index,
        width: HOW_IT_WORKS_CARD_W,
        height: HOW_IT_WORKS_CARD_H,
      }}
      className="absolute left-0 top-0 will-change-transform rounded-xl border border-white/55 bg-gradient-to-br from-white/45 via-white/22 to-white/14 shadow-[0_20px_48px_-18px_rgba(42,35,32,0.18),inset_0_1px_0_rgba(255,255,255,0.7)] ring-1 ring-inset ring-white/50 backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/[0.12] md:rounded-2xl"
      role="listitem"
    >
      <div className="flex h-full flex-col justify-between gap-4 overflow-y-auto p-6 md:gap-5 md:p-7">
        <span className="select-none font-mono text-[clamp(2.35rem,6.5vw,3.2rem)] font-bold leading-none tabular-nums tracking-tight text-amber-glow md:text-[3.25rem]">
          {s.step}
        </span>
        <div className="min-w-0">
          <h3 className="font-sans text-[11px] font-bold uppercase leading-snug tracking-[0.14em] text-deep-graphite md:text-[12px] md:tracking-[0.16em]">
            {s.title}
          </h3>
          <p className="mt-2 line-clamp-6 font-mono text-[12px] leading-[1.5] text-muted-stone md:mt-2.5 md:text-[13px] md:leading-[1.45]">
            {s.body}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function HowItWorks() {
  const steps: HowItWorksStep[] = [
    {
      step: "01",
      title: "Connect your business",
      body: "Import customers, jobs, technicians, and inventory; integrate accounting, CRM, and ERP; configure workflows and train AI on your business rules.",
    },
    {
      step: "02",
      title: "AI learns your operations",
      body: "Historical patterns, technician capabilities, customer preferences, and optimization opportunities become your unique operational model.",
    },
    {
      step: "03",
      title: "AI takes over the routine",
      body: "Scheduling runs automatically, calls get answered instantly, dispatch optimizes in real time, customers get proactive updates, and inventory stays intelligent.",
    },
    {
      step: "04",
      title: "Continuous improvement",
      body: "Every outcome is measured, improvements are identified and tested, wins are reported, and the system evolves as you grow.",
    },
  ];

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });

  const n = steps.length;
  const fanW = (n - 1) * HOW_IT_WORKS_STAGGER_X + HOW_IT_WORKS_CARD_W;
  const fanH = (n - 1) * HOW_IT_WORKS_STAGGER_Y + HOW_IT_WORKS_CARD_H;

  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 overflow-x-visible bg-warm-linen pb-10 pt-[80px] md:scroll-mt-32 md:pb-16 md:pt-[88px]"
    >
      <div className={containerPx}>
        <motion.h2
          className="max-w-[20ch] font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.05px] text-deep-graphite md:max-w-none md:text-[48px] md:leading-none"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease }}
        >
          From chaos to clarity in four steps
        </motion.h2>
      </div>

      <div ref={scrollTrackRef} className="relative mt-14 min-h-[300svh] md:mt-16 md:min-h-[320svh]">
        <div className="sticky top-20 flex min-h-[calc(100svh-5.5rem)] items-center justify-center px-4 py-8 sm:px-6 md:top-24 md:min-h-[calc(100svh-6rem)] lg:top-28 lg:min-h-[calc(100svh-7rem)] md:px-8">
          <div
            className="relative isolate mx-auto max-w-[min(100%,var(--page-max-width))] overflow-x-auto overflow-y-visible sm:overflow-x-visible"
            style={{ width: fanW, height: fanH }}
            role="list"
            aria-label="Four steps to clarity"
          >
            {steps.map((s, i) => (
              <HowItWorksStackCard key={s.step} s={s} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const trust = [
    "No credit card required",
    "Setup in 1 day",
    "Cancel anytime",
    "SOC 2 compliant",
    "99.9% uptime SLA",
  ] as const;

  return (
    <motion.section
      className="relative border-t border-light-steel bg-gradient-to-b from-warm-linen to-[color-mix(in_srgb,var(--color-warm-linen)_78%,var(--color-amber-glow)_22%)] py-[80px]"
      initial={{ opacity: 0, scale: 0.99 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease }}
    >
      <span
        id="pricing"
        className="pointer-events-none absolute left-0 top-0 block h-px w-px scroll-mt-28"
        aria-hidden
      />
      <div className={`${containerPx} text-center`}>
        <h2 className="font-serif text-[36px] font-normal leading-[1] tracking-[-0.05px] text-deep-graphite md:text-[48px]">
          Ready to run your business on AI?
        </h2>
        <p className="mx-auto mt-8 max-w-[48ch] font-mono text-[16px] leading-[1.5] text-muted-stone md:text-[20px] md:leading-[1.41]">
          Join 500+ service businesses already on Avishkar AI. See how AI-native field
          service management can transform your operations, increase revenue, and make
          everyone—your team and your customers—happier.
        </p>
        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-[12px] text-muted-stone md:text-[13px]">
          {trust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-amber-glow/90" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease, delay: 0.12 }}
        >
          <motion.a
            href="#demo"
            className="inline-flex min-h-[52px] items-center justify-center rounded-[var(--radius-ui)] bg-amber-glow px-10 font-mono text-[14px] font-semibold text-canvas-white shadow-[var(--shadow-sm)] hover:brightness-[1.03]"
            style={{ transitionDuration: "var(--transition-interactive)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book your demo
          </motion.a>
          <Link
            href="/company/contact"
            className="inline-flex min-h-[52px] items-center justify-center rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white px-8 font-mono text-[14px] font-semibold text-deep-graphite shadow-sm transition-colors hover:border-amber-glow/40"
          >
            Start free trial
          </Link>
          <Link
            href="/resources/roi-calculator"
            className="inline-flex min-h-[52px] items-center justify-center font-mono text-[14px] font-semibold text-amber-glow underline-offset-4 hover:underline"
          >
            ROI calculator
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

const footerResourceLinks: { label: string; href: string }[] = [
  { label: "Blog", href: "/resources/blog" },
  { label: "Documentation", href: "/resources/documentation" },
  { label: "API docs", href: "/resources/documentation" },
  { label: "ROI calculator", href: "/resources/roi-calculator" },
  { label: "Comparison guide", href: "/resources/comparison-guide" },
  { label: "Webinars & events", href: "/resources/webinars" },
  { label: "Case studies", href: "/resources/blog/case-studies" },
];

const footerLegal: { label: string }[] = [
  { label: "Privacy Policy" },
  { label: "Terms of Service" },
  { label: "Cookie Policy" },
  { label: "GDPR compliance" },
  { label: "Security" },
];

function Footer() {
  const productCol = productLinks.filter((l) => !l.emphasis);

  return (
    <motion.footer
      id="footer"
      className="border-t border-light-steel bg-canvas-white py-12 text-deep-graphite md:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease }}
    >
      <div className={`${containerPx} grid gap-12 lg:grid-cols-12 lg:gap-10`}>
        <div className="lg:col-span-3">
          <p className="font-mono text-[15px] font-semibold text-deep-graphite">Avishkar AI</p>
          <p className="mt-3 max-w-[32ch] font-mono text-[13px] leading-relaxed text-muted-stone">
            Flagship brand of Anjaneya AI Technologies Pvt Ltd—AI-native field service
            management.
          </p>
          <p className="mt-4 font-mono text-[13px] text-link-gray">
            <a href="mailto:hello@avishkar.ai" className="text-amber-glow hover:underline">
              hello@avishkar.ai
            </a>
          </p>
          <div className="mt-5 flex flex-wrap gap-4 font-mono text-[12px] text-muted-stone">
            <a href="https://www.linkedin.com" className="hover:text-deep-graphite" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://twitter.com" className="hover:text-deep-graphite" rel="noreferrer">
              X / Twitter
            </a>
            <a href="https://www.youtube.com" className="hover:text-deep-graphite" rel="noreferrer">
              YouTube
            </a>
            <a href="https://www.facebook.com" className="hover:text-deep-graphite" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>

        <nav className="lg:col-span-2" aria-label="Footer products">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-stone">
            Products
          </p>
          <ul className="mt-4 flex flex-col gap-2.5 font-mono text-[13px]">
            {productCol.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-link-gray hover:text-amber-glow hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="font-medium text-amber-glow hover:underline">
                View all products →
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="lg:col-span-2" aria-label="Footer solutions">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-stone">
            Solutions
          </p>
          <ul className="mt-4 flex flex-col gap-2.5 font-mono text-[13px]">
            {solutionLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-link-gray hover:text-amber-glow hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-2" aria-label="Footer resources">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-stone">
            Resources
          </p>
          <ul className="mt-4 flex flex-col gap-2.5 font-mono text-[13px]">
            {footerResourceLinks.map((l) => (
              <li key={`${l.label}-${l.href}`}>
                <Link href={l.href} className="text-link-gray hover:text-amber-glow hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-2" aria-label="Footer company">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-stone">
            Company
          </p>
          <ul className="mt-4 flex flex-col gap-2.5 font-mono text-[13px]">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-link-gray hover:text-amber-glow hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={pricingNavItem.href} className="text-link-gray hover:text-amber-glow hover:underline">
                {pricingNavItem.label}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-stone">
            Newsletter
          </p>
          <p className="mt-2 font-serif text-[18px] text-deep-graphite">Get AI insights for field service</p>
          <form
            className="mt-4 flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="footer-email" className="sr-only">
              Email
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              placeholder="Email address"
              className="min-h-[44px] flex-1 rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white px-4 font-mono text-[13px] text-deep-graphite placeholder:text-text-gray"
            />
            <button
              type="submit"
              className="min-h-[44px] shrink-0 rounded-[var(--radius-ui)] bg-amber-glow px-5 font-mono text-[13px] font-semibold text-canvas-white hover:brightness-[1.03]"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-8 border-t border-light-steel pt-6">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-stone">
              Legal
            </p>
            <ul className="mt-3 flex flex-col gap-2 font-mono text-[12px] text-muted-stone">
              {footerLegal.map((l) => (
                <li key={l.label}>
                  <span className="cursor-default">{l.label} — coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[var(--page-max-width)] border-t border-light-steel px-6 pt-8 text-center font-mono text-[12px] text-muted-stone md:px-8 md:text-[13px]">
        <p>
          © {new Date().getFullYear()} Avishkar AI. All rights reserved. A product of Anjaneya AI Technologies Pvt
          Ltd.
        </p>
        <p className="mt-3">
          <a href="#platform-features" className="text-link-gray hover:text-deep-graphite hover:underline">
            Platform features
          </a>
          <span className="mx-2 text-light-steel" aria-hidden>
            ·
          </span>
          <a href="#how-it-works" className="text-link-gray hover:text-deep-graphite hover:underline">
            How it works
          </a>
          <span className="mx-2 text-light-steel" aria-hidden>
            ·
          </span>
          <a href="#pain" className="text-link-gray hover:text-deep-graphite hover:underline">
            Problem we solve
          </a>
        </p>
      </div>
    </motion.footer>
  );
}

export function LandingPage() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <TrustedMarqueeSection />
        <Problem />
        <CorePlatformTabsSection />
        <HowItWorks />
        <IndustrySnapshotsSection />
        <MetricsRoiSection />
        <TestimonialsCarouselSection />
        <IntegrationsPartnersSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
