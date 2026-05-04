"use client";

import { motion } from "framer-motion";

const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";
const proofBullets = [
  "Live with ATM manufacturers and telecom tower operators in India",
  "45 minutes -> 5 minutes dispatch response pattern",
  "Built for monitoring-stack integration, not rip-and-replace",
  "Expanding APAC conversations with critical-infra operators",
] as const;

function TrustedMarqueeInner() {
  return (
    <section
      id="trust"
      className="border-y border-light-steel bg-canvas-white py-[76px] md:py-[92px]"
      aria-labelledby="trust-heading"
    >
      <div className={containerPx}>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
            Operating proof
          </p>
          <h2
            id="trust-heading"
            className="font-sans mt-4 text-[clamp(1.55rem,3.2vw,2.35rem)] font-semibold leading-tight text-deep-graphite"
          >
            Real deployment evidence, not placeholders
          </h2>
          <p
            className="mx-auto mt-6 max-w-[56ch] font-sans text-[15px] leading-[1.65] text-muted-stone md:text-[16px]"
          >
            The story stays consistent across pages: 45 minutes to 5 minutes, live in India
            today, and built specifically for critical infrastructure dispatch workflows.
          </p>
        </motion.div>

        <ul className="mx-auto mt-8 grid max-w-4xl gap-3 md:mt-10 md:grid-cols-2">
          {proofBullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-[var(--radius-ui)] border border-light-steel bg-harvest-cream/35 px-4 py-3 font-sans text-[14px] leading-snug text-deep-graphite"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-glow" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TrustedMarqueeSection() {
  return <TrustedMarqueeInner />;
}
