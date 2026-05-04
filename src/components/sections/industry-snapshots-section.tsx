"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";
const ease = [0.16, 1, 0.3, 1] as const;

const industries: { title: string; items: string[] }[] = [
  {
    title: "HVAC",
    items: [
      "Seasonal demand forecasting",
      "Refrigerant tracking & compliance",
      "Maintenance contract automation",
      "Energy efficiency recommendations",
    ],
  },
  {
    title: "Plumbing",
    items: [
      "Emergency prioritization",
      "Water heater & fixture intelligence",
      "Permit requirement detection",
      "Sewer & drain service optimization",
    ],
  },
  {
    title: "Electrical",
    items: [
      "Code compliance documentation",
      "Panel capacity analysis",
      "Permit tracking",
      "Safety protocol enforcement",
    ],
  },
  {
    title: "Home services",
    items: [
      "Multi-trade coordination",
      "Warranty tracking",
      "Home inspection integration",
      "Preventive maintenance campaigns",
    ],
  },
  {
    title: "Commercial",
    items: [
      "Multi-site management",
      "SLAs & compliance tracking",
      "Vendor coordination",
      "Budget tracking & forecasting",
    ],
  },
  {
    title: "Emergency services",
    items: [
      "Priority dispatch",
      "24/7 AI answering",
      "Rapid response optimization",
      "Insurance coordination",
    ],
  },
];

const INDUSTRY_CARD_COUNT = industries.length;

/**
 * Maps section scroll progress (0→1) to horizontal offset. Each card gets an equal
 * horizontal leg, with a short flat "break" after it before the next leg starts.
 */
function scrollProgressToX(progress: number, range: number, n: number, pauseBetween: number): number {
  if (range <= 0 || n <= 0) return 0;
  const p = Math.min(1, Math.max(0, progress));
  const pauses = Math.max(0, n - 1);
  const moveTotal = 1 - pauseBetween * pauses;
  if (moveTotal <= 0) return -p * range;
  const moveSlice = moveTotal / n;
  let cursor = 0;
  for (let i = 0; i < n; i++) {
    const moveStart = cursor;
    const moveEnd = cursor + moveSlice;
    if (p <= moveEnd) {
      const u = moveSlice > 0 ? (p - moveStart) / moveSlice : 1;
      const x0 = (-range * i) / n;
      const x1 = (-range * (i + 1)) / n;
      return x0 + u * (x1 - x0);
    }
    cursor = moveEnd;
    if (i < n - 1) {
      const pauseEnd = cursor + pauseBetween;
      if (p <= pauseEnd) return (-range * (i + 1)) / n;
      cursor = pauseEnd;
    }
  }
  return -range;
}

function IndustryCard({
  ind,
  index,
}: {
  ind: (typeof industries)[number];
  index: number;
}) {
  const n = String(index + 1).padStart(2, "0");
  return (
    <article
      className="relative flex h-[min(58vh,520px)] w-[min(82vw,420px)] shrink-0 flex-col justify-between border border-light-steel bg-canvas-white px-6 py-7 shadow-[0_1px_0_rgba(15,23,42,0.06)] md:h-[min(60vh,540px)] md:w-[min(72vw,440px)] md:px-8 md:py-8"
      aria-labelledby={`ind-card-${index}`}
    >
      <span
        className="select-none font-mono text-[clamp(2.75rem,9vw,4.25rem)] font-bold leading-none tabular-nums tracking-tight text-[var(--color-amber-glow)]"
        aria-hidden
      >
        {n}
      </span>
      <div className="min-w-0 pt-6">
        <h3
          id={`ind-card-${index}`}
          className="font-mono text-[13px] font-bold uppercase leading-snug tracking-[0.14em] text-deep-graphite md:text-[14px] md:tracking-[0.16em]"
        >
          {ind.title}
        </h3>
        <ul className="mt-4 flex flex-col gap-2.5">
          {ind.items.map((item) => (
            <li
              key={item}
              className="flex gap-2 font-mono text-[13px] leading-snug text-link-gray md:text-[14px] md:leading-relaxed"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-glow/85" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function IndustrySnapshotsSection() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const portRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /** Fraction of total section scroll spent "holding" between cards (~4% each). */
  const pauseBetweenCards = 0.042;

  const x = useTransform(scrollYProgress, (p) =>
    scrollProgressToX(p, range, INDUSTRY_CARD_COUNT, pauseBetweenCards),
  );

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const measure = () => {
      const row = rowRef.current;
      const port = portRef.current;
      if (!row || !port) return;
      setRange(Math.max(0, row.scrollWidth - port.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    if (portRef.current) ro.observe(portRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <section
        className="border-t border-light-steel bg-canvas-white py-[80px] md:py-[96px]"
        aria-labelledby="industry-snapshots-heading"
      >
        <div className={containerPx}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
              Industry solutions
            </p>
            <h2
              id="industry-snapshots-heading"
              className="mt-4 font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.04em] md:text-[44px]"
            >
              Built for{" "}
              <span className="bg-gradient-to-b from-amber-glow from-[25%] via-[color-mix(in_srgb,var(--color-amber-glow)_85%,var(--color-deep-graphite)_15%)] to-canvas-white bg-clip-text text-transparent [background-size:100%_240%]">
                every
              </span>{" "}
              type of field service
            </h2>
          </div>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
            {industries.map((ind, i) => (
              <li key={ind.title}>
                <IndustryCard ind={ind} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      className="border-t border-light-steel bg-canvas-white"
      aria-labelledby="industry-snapshots-heading"
    >
      <div className={`${containerPx} py-[72px] pb-10 md:py-[88px] md:pb-12`}>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
            Industry solutions
          </p>
          <h2
            id="industry-snapshots-heading"
            className="mt-4 font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.04em] text-deep-graphite md:text-[44px]"
          >
            Built for every type of field service
          </h2>
        </motion.div>
      </div>

      <div
        ref={trackRef}
        className="relative min-h-[260vh] md:min-h-[300vh]"
        aria-label="Horizontal industry cards — scroll vertically to scrub"
      >
        <div
          ref={portRef}
          className="sticky top-20 flex h-[min(100dvh,880px)] min-h-[480px] w-full flex-col justify-center overflow-hidden py-6 md:top-24 md:py-10 lg:top-28"
        >
          <motion.div
            ref={rowRef}
            style={{ x }}
            className="flex w-max items-stretch gap-4 px-6 will-change-transform md:gap-6 md:px-10 lg:px-12"
          >
            {industries.map((ind, i) => (
              <IndustryCard key={ind.title} ind={ind} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
