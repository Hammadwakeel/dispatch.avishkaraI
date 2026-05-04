"use client";

/**
 * Social proof — LazyMotion + `m`, MotionConfig, staggered reveals, stat counters,
 * and a gentle segment marquee (disabled when reduced motion is on).
 */

import {
  LazyMotion,
  MotionConfig,
  animate,
  domAnimation,
  useInView,
  useReducedMotion,
} from "framer-motion";
import * as m from "framer-motion/m";
import { useEffect, useRef, useState } from "react";

const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { id: "biz", kind: "int" as const, end: 500, sub: "service businesses" },
  { id: "jobs", kind: "mega" as const, end: 2, sub: "jobs processed" },
  { id: "rate", kind: "pct" as const, end: 98.7, sub: "delivery rate" },
] as const;

const segments = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Home services",
  "Commercial",
  "Industrial",
  "Emergency",
] as const;

function formatStat(kind: (typeof stats)[number]["kind"], v: number): string {
  if (kind === "int") return `${Math.round(v)}+`;
  if (kind === "mega") {
    const clamped = Math.min(Math.max(v, 0), 2);
    return clamped >= 2 ? "2M+" : `${clamped.toFixed(1)}M+`;
  }
  return `${v.toFixed(1)}%`;
}

const headerGroup = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.02 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const lineGrow = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.55, ease, delay: 0.12 },
  },
};

const statsCard = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease },
  },
};

const rowStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.14 },
  },
};

const rowItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.44, ease },
  },
};

const chipStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
  },
};

const chipItem = {
  hidden: { opacity: 0, scale: 0.92, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 28 },
  },
};

const viewportBlock = { once: true, amount: 0.22, margin: "-40px 0px" } as const;

function AnimatedStat({ stat }: { stat: (typeof stats)[number] }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState(() => formatStat(stat.kind, 0));

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, stat.end, {
      duration: 1.05,
      ease,
      onUpdate: (v) => setText(formatStat(stat.kind, v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, stat]);

  const display =
    reduceMotion && inView ? formatStat(stat.kind, stat.end) : text;

  return (
    <m.li
      ref={ref}
      variants={rowItem}
      className="flex flex-col items-center px-3 text-center sm:px-6"
    >
      <span className="font-semibold tabular-nums tracking-tight text-deep-graphite md:text-[18px]">
        {display}
      </span>
      <span className="mt-1 text-[12px] font-normal text-muted-stone md:text-[13px]">
        {stat.sub}
      </span>
    </m.li>
  );
}

function SegmentStrip() {
  const reduceMotion = useReducedMotion();
  const doubled = [...segments, ...segments] as string[];

  if (reduceMotion) {
    return (
      <m.div
        className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5 md:mt-12 md:gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={viewportBlock}
        variants={chipStagger}
      >
        {segments.map((seg) => (
          <m.span
            key={seg}
            variants={chipItem}
            className="rounded-full border border-light-steel bg-canvas-white px-4 py-2 text-[12px] font-medium text-link-gray shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] md:text-[13px]"
          >
            {seg}
          </m.span>
        ))}
      </m.div>
    );
  }

  return (
    <m.div
      className="relative mx-auto mt-10 max-w-full md:mt-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportBlock}
      transition={{ duration: 0.45, ease }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-canvas-white to-transparent md:w-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-canvas-white to-transparent md:w-20"
        aria-hidden
      />
      <div className="overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <m.div
          className="flex w-max gap-3 pr-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 38,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {doubled.map((seg, i) => (
            <span
              key={`${seg}-${i}`}
              className="shrink-0 rounded-full border border-light-steel bg-[color-mix(in_srgb,var(--color-canvas-white)_94%,var(--color-harvest-cream)_6%)] px-4 py-2 text-[12px] font-medium text-link-gray shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] md:text-[13px]"
            >
              {seg}
            </span>
          ))}
        </m.div>
      </div>
    </m.div>
  );
}

function TrustedMarqueeInner() {
  return (
    <section
      id="trust"
      className="border-y border-light-steel bg-canvas-white py-[76px] md:py-[92px]"
      aria-labelledby="trust-heading"
    >
      <div className={containerPx}>
        <m.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportBlock}
          variants={headerGroup}
        >
          <m.p
            variants={fadeUp}
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]"
          >
            Social proof
          </m.p>
          <m.h2
            variants={fadeUp}
            id="trust-heading"
            className="font-serif mt-4 text-[28px] font-normal leading-tight tracking-tight text-deep-graphite md:text-[40px] md:leading-[1.15]"
          >
            Trusted by leading service businesses across North America
          </m.h2>
          <m.div
            variants={lineGrow}
            className="mx-auto mt-6 h-[3px] w-20 max-w-[40%] origin-center rounded-full bg-gradient-to-r from-transparent via-[rgb(var(--rgb-amber-glow)/0.55)] to-transparent md:mt-7 md:w-24"
            aria-hidden
          />
          <m.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-[52ch] font-mono text-[15px] leading-[1.55] text-muted-stone md:mt-7 md:text-[16px]"
          >
            North America and India—teams use Avishkar AI to keep dispatch, voice, and field
            execution aligned when volumes spike and exceptions pile up.
          </m.p>
        </m.div>

        <m.div
          className="mx-auto mt-10 max-w-3xl rounded-2xl border border-light-steel bg-canvas-white px-4 py-8 shadow-[0_1px_3px_rgba(15,23,42,0.06)] md:mt-12 md:rounded-3xl md:px-8 md:py-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportBlock}
          variants={statsCard}
        >
          <m.ul
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 font-mono text-[14px] text-deep-graphite md:gap-x-14 md:text-[15px]"
            initial="hidden"
            whileInView="visible"
            viewport={viewportBlock}
            variants={rowStagger}
            aria-label="Key platform metrics"
          >
            {stats.map((s) => (
              <AnimatedStat key={s.id} stat={s} />
            ))}
          </m.ul>
        </m.div>

        <SegmentStrip />
      </div>
    </section>
  );
}

export function TrustedMarqueeSection() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <TrustedMarqueeInner />
      </MotionConfig>
    </LazyMotion>
  );
}
