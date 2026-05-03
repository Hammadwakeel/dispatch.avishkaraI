"use client";

import { motion } from "framer-motion";

const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";

/** Trust strip — copy from docs/avishkar-ai-website-content.docx (social proof + segments). */
const stats = [
  { label: "500+", sub: "service businesses" },
  { label: "2M+", sub: "jobs processed" },
  { label: "98.7%", sub: "delivery rate" },
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

export function TrustedMarqueeSection() {
  return (
    <section
      id="trust"
      className="border-y border-light-steel bg-gradient-to-b from-canvas-white to-[color-mix(in_srgb,var(--color-harvest-cream)_70%,var(--color-warm-linen)_30%)] py-[72px] md:py-[88px]"
      aria-labelledby="trust-heading"
    >
      <div className={containerPx}>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
            Social proof
          </p>
          <h2
            id="trust-heading"
            className="font-serif mt-4 text-[28px] font-normal leading-tight tracking-tight text-deep-graphite md:text-[40px] md:leading-[1.15]"
          >
            Trusted by leading service businesses across North America
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] font-mono text-[15px] leading-[1.55] text-muted-stone md:text-[16px]">
            North America and India—teams use Avishkar AI to keep dispatch, voice, and field
            execution aligned when volumes spike and exceptions pile up.
          </p>
        </motion.div>

        <motion.ul
          className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-light-steel/80 py-8 font-mono text-[14px] text-deep-graphite md:mt-12 md:gap-x-10 md:text-[15px]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        >
          {stats.map((s) => (
            <li key={s.label} className="flex flex-col items-center px-2 text-center sm:px-4">
              <span className="font-semibold tabular-nums tracking-tight text-deep-graphite md:text-[17px]">
                {s.label}
              </span>
              <span className="mt-0.5 text-[12px] font-normal text-muted-stone md:text-[13px]">
                {s.sub}
              </span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5 md:mt-12 md:gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {segments.map((seg) => (
            <span
              key={seg}
              className="rounded-full border border-light-steel bg-[color-mix(in_srgb,var(--color-canvas-white)_88%,var(--color-amber-glow)_12%)] px-4 py-2 font-mono text-[12px] font-medium text-link-gray shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] md:text-[13px]"
            >
              {seg}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
