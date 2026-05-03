"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";

function useCountUp(target: number, enabled: boolean, durationMs = 1400) {
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

function MetricCell({
  display,
  label,
  inView,
}: {
  display: { type: "count"; n: number; suffix: string } | { type: "text"; text: string };
  label: string;
  inView: boolean;
}) {
  const n = display.type === "count" ? display.n : 0;
  const count = useCountUp(n, display.type === "count" && inView);
  return (
    <div className="rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white px-4 py-5 text-center md:px-5 md:py-6">
      <p className="font-serif text-[clamp(1.75rem,4vw,2.35rem)] font-normal tabular-nums tracking-tight text-deep-graphite">
        {display.type === "count" ? (
          <>
            {count}
            {display.suffix}
          </>
        ) : (
          display.text
        )}
      </p>
      <p className="mt-2 font-mono text-[12px] leading-snug text-muted-stone md:text-[13px]">{label}</p>
    </div>
  );
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

export function MetricsRoiSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="border-t border-light-steel bg-canvas-white py-[80px] md:py-[96px]"
      aria-labelledby="metrics-heading"
    >
      <div className={containerPx}>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
            ROI & metrics
          </p>
          <h2
            id="metrics-heading"
            className="mt-4 font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.04em] text-deep-graphite md:text-[44px]"
          >
            The numbers that matter
          </h2>
        </motion.div>

        <div className="mt-14 space-y-14 md:mt-16">
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="text-center font-serif text-[20px] font-normal text-deep-graphite md:text-[22px]">
                {g.title}
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {g.metrics.map((m, i) => (
                  <MetricCell key={g.labels[i]} display={m} label={g.labels[i]!} inView={inView} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-14 max-w-xl rounded-[var(--radius-card)] border border-amber-glow/30 bg-warm-linen/40 p-8 text-center md:mt-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease }}
        >
          <p className="font-serif text-[22px] font-normal text-deep-graphite md:text-[24px]">
            Calculate your potential savings
          </p>
          <p className="mt-3 font-mono text-[14px] leading-relaxed text-muted-stone">
            Enter company size, monthly jobs, tech count, and dispatch method—get estimated time
            saved, revenue gained, and an ROI timeline.
          </p>
          <Link
            href="/resources/roi-calculator"
            className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-[var(--radius-ui)] bg-amber-glow px-8 font-mono text-[14px] font-semibold text-canvas-white shadow-[var(--shadow-sm)] hover:brightness-[1.03]"
          >
            Open ROI calculator
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
