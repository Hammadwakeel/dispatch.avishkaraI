"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";

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

export function IndustrySnapshotsSection() {
  return (
    <section
      className="border-t border-light-steel bg-gradient-to-b from-warm-linen/80 to-canvas-white py-[80px] md:py-[96px]"
      aria-labelledby="industry-snapshots-heading"
    >
      <div className={containerPx}>
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

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {industries.map((ind, i) => (
            <motion.li
              key={ind.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease, delay: i * 0.05 }}
              className="flex flex-col rounded-[var(--radius-card)] border border-light-steel bg-canvas-white p-6 shadow-[0_12px_40px_-24px_rgba(29,30,28,0.12)] md:p-7"
            >
              <h3 className="font-serif text-[22px] font-normal tracking-[-0.02em] text-deep-graphite md:text-[24px]">
                {ind.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {ind.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 font-mono text-[13px] leading-snug text-link-gray md:text-[14px]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-glow/90" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
