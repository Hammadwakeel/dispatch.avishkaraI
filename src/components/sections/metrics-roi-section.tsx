"use client";

import { ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";

function useCountUp(target: number, enabled: boolean, durationMs = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - t) ** 3;
      setV(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, target, durationMs]);
  return v;
}

const groups: {
  title: string;
  metrics: ({ type: "count"; n: number; suffix: string } | { type: "text"; text: string })[];
  labels: string[];
}[] = [
  {
    title: "Efficiency gains",
    metrics: [
      { type: "count", n: 42, suffix: "%" },
      { type: "count", n: 28, suffix: "%" },
      { type: "count", n: 15, suffix: "%" },
      { type: "count", n: 67, suffix: "%" },
    ],
    labels: [
      "reduction in scheduling time",
      "improvement in tech utilization",
      "decrease in fuel costs",
      "faster invoice collection",
    ],
  },
  {
    title: "Customer impact",
    metrics: [
      { type: "count", n: 94, suffix: "%" },
      { type: "count", n: 38, suffix: "%" },
      { type: "count", n: 45, suffix: "%" },
      { type: "text", text: "4.8★" },
    ],
    labels: [
      "customer satisfaction score",
      "increase in repeat bookings",
      "reduction in inbound status calls",
      "average rating",
    ],
  },
  {
    title: "Revenue impact",
    metrics: [
      { type: "count", n: 23, suffix: "%" },
      { type: "count", n: 31, suffix: "%" },
      { type: "count", n: 19, suffix: "%" },
      { type: "count", n: 12, suffix: "%" },
    ],
    labels: [
      "increase in bookings",
      "boost in service agreement revenue",
      "higher average ticket size",
      "more jobs per day per tech",
    ],
  },
];

type TimelineItem =
  | { kind: "heading"; title: string }
  | {
      kind: "metric";
      seq: number;
      display:
        | { type: "count"; n: number; suffix: string }
        | { type: "text"; text: string };
      label: string;
    };

function buildTimeline(): TimelineItem[] {
  const out: TimelineItem[] = [];
  let seq = 0;
  for (const g of groups) {
    out.push({ kind: "heading", title: g.title });
    for (let i = 0; i < g.metrics.length; i++) {
      out.push({
        kind: "metric",
        seq: seq++,
        display: g.metrics[i]!,
        label: g.labels[i]!,
      });
    }
  }
  return out;
}

function MetricRow({
  display,
  label,
}: {
  display:
    | { type: "count"; n: number; suffix: string }
    | { type: "text"; text: string };
  label: string;
}) {
  const rowRef = useRef(null);
  const inView = useInView(rowRef, { once: true, amount: 0.35, margin: "-5% 0px -5% 0px" });
  const n = display.type === "count" ? display.n : 0;
  const count = useCountUp(n, display.type === "count" && inView);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.48, ease }}
      className="border-b border-light-steel/70 py-7 last:border-b-0 md:py-8"
    >
      <p className="font-serif text-[clamp(2.25rem,5vw,3.25rem)] font-normal tabular-nums leading-none tracking-tight text-deep-graphite">
        {display.type === "count" ? (
          <>
            {count}
            {display.suffix}
          </>
        ) : (
          display.text
        )}
      </p>
      <p className="mt-3 max-w-[42ch] font-mono text-[14px] leading-snug text-muted-stone md:text-[15px]">
        {label}
      </p>
    </motion.div>
  );
}

export function MetricsRoiSection() {
  const timeline = useMemo(buildTimeline, []);

  return (
    <section
      id="roi-metrics"
      className="scroll-mt-28 border-t border-light-steel bg-canvas-white py-[80px] md:scroll-mt-32 md:py-[96px]"
      aria-labelledby="metrics-heading"
    >
      <div className={containerPx}>
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-[minmax(200px,280px)_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-0 xl:gap-x-20">
          {/* Left column: title vertically + horizontally centered in the band (between top/bottom of metrics block) */}
          <aside className="flex min-h-0 flex-col justify-center items-center text-center lg:sticky lg:top-28 lg:h-full lg:max-h-[calc(100vh-8rem)]">
            <div className="w-full max-w-[260px] px-1">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
                ROI & metrics
              </p>
              <h2
                id="metrics-heading"
                className="mt-4 font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.04em] md:text-[40px] xl:text-[44px]"
              >
                The{" "}
                <span className="bg-gradient-to-b from-amber-glow from-[25%] via-[color-mix(in_srgb,var(--color-amber-glow)_85%,var(--color-deep-graphite)_15%)] to-canvas-white bg-clip-text text-transparent [background-size:100%_240%]">
                  numbers
                </span>{" "}
                that matter
              </h2>
            </div>
          </aside>

          {/* Scroll narrative: metrics appear one by one */}
          <div className="min-w-0 lg:border-l lg:border-light-steel/60 lg:pl-10 xl:pl-14">
            {timeline.map((item, idx) => {
              if (item.kind === "heading") {
                return (
                  <motion.h3
                    key={`${item.title}-${idx}`}
                    className={`font-serif text-[20px] font-normal text-deep-graphite md:text-[22px] ${idx === 0 ? "mt-0" : "mt-14"}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, ease }}
                  >
                    {item.title}
                  </motion.h3>
                );
              }

              return (
                <MetricRow key={`${item.seq}-${item.label}`} display={item.display} label={item.label} />
              );
            })}
          </div>
        </div>

        <motion.div
          className="relative mx-auto mt-16 max-w-4xl md:mt-20"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-[calc(var(--radius-card)+2px)] bg-gradient-to-br from-amber-glow/35 via-amber-glow/15 to-transparent opacity-90 blur-[1px]"
          />
          <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-light-steel bg-canvas-white shadow-[0_24px_70px_-40px_rgb(var(--rgb-amber-glow)/0.28),0_0_0_1px_rgba(15,23,42,0.04)]">
            <div className="pointer-events-none absolute -right-[20%] top-1/2 h-[140%] w-[55%] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(var(--rgb-amber-glow)/0.07),transparent_68%)]" />
            <div className="relative grid gap-8 p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10 md:p-10 lg:gap-12">
              <motion.div
                className="mx-auto flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl border border-amber-glow/25 bg-[color-mix(in_srgb,var(--color-canvas-white)_65%,var(--color-harvest-cream)_35%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] md:mx-0"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease, delay: 0.06 }}
              >
                <Calculator className="h-9 w-9 text-[var(--color-amber-glow)]" strokeWidth={1.35} aria-hidden />
              </motion.div>

              <div className="min-w-0 text-center md:text-left">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
                  ROI calculator
                </p>
                <p className="mt-3 font-serif text-[23px] font-normal leading-snug tracking-[-0.03em] text-deep-graphite md:text-[26px] lg:text-[28px]">
                  Calculate your potential savings
                </p>
                <p className="mx-auto mt-3 max-w-[52ch] font-mono text-[14px] leading-[1.6] text-muted-stone md:mx-0 md:text-[15px]">
                  Enter company size, monthly jobs, tech count, and dispatch method—get estimated time
                  saved, revenue gained, and an ROI timeline.
                </p>
              </div>

              <motion.div
                className="flex justify-center md:justify-end"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease, delay: 0.12 }}
              >
                <Link
                  href="/resources/roi-calculator"
                  className="group inline-flex min-h-[52px] min-w-[min(100%,260px)] items-center justify-center gap-2.5 rounded-[var(--radius-ui)] bg-deep-graphite px-8 font-mono text-[14px] font-semibold text-canvas-white shadow-[0_12px_36px_-16px_rgba(29,30,28,0.35)] transition-[transform,filter] hover:brightness-[1.06] md:min-w-0"
                >
                  Open ROI calculator
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
