"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";

const categories: { title: string; items: string[] }[] = [
  {
    title: "Accounting",
    items: ["QuickBooks", "Xero", "Sage", "Wave"],
  },
  {
    title: "CRM",
    items: ["Salesforce", "HubSpot", "Zoho", "Microsoft Dynamics"],
  },
  {
    title: "Payment processing",
    items: ["Stripe", "Square", "PayPal", "Chase"],
  },
  {
    title: "Communication",
    items: ["Twilio", "RingCentral", "Zoom"],
  },
  {
    title: "Field equipment",
    items: ["HVAC manufacturers", "IoT sensors", "Fleet tracking"],
  },
  {
    title: "Marketing",
    items: ["Google Ads", "Facebook", "Mailchimp", "HubSpot Marketing"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
};

/** Maps Lenis scroll position to 0–1 progress through this section (no slide / carousel). */
function sectionScrollProgress(lenis: Lenis, sectionEl: HTMLElement): number {
  const scroll = lenis.scroll;
  const innerH = window.innerHeight;
  const top = sectionEl.getBoundingClientRect().top + scroll;
  const height = sectionEl.offsetHeight;
  const travel = Math.max(1, height - innerH);
  let p = (scroll - top) / travel;
  return Math.max(0, Math.min(1, p));
}

export function IntegrationsPartnersSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useMotionValue(0);

  const syncProgressFromLenis = useCallback(
    (l: Lenis) => {
      const el = sectionRef.current;
      if (!el || reduceMotion) return;
      scrollProgress.set(sectionScrollProgress(l, el));
    },
    [reduceMotion, scrollProgress],
  );

  useLenis(syncProgressFromLenis, [reduceMotion]);

  const lenisInstance = useLenis();
  useEffect(() => {
    if (lenisInstance && !reduceMotion) syncProgressFromLenis(lenisInstance);
  }, [lenisInstance, reduceMotion, syncProgressFromLenis]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.92", "end 0.12"],
  });

  /** Opens like a viewport iris — not used elsewhere on the landing page. */
  const gridClipPath = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [
      "inset(7% 6% 12% 6% round 32px)",
      "inset(3% 2% 5% 2% round 22px)",
      "inset(0% 0% 0% 0% round 18px)",
    ],
  );

  const gridBlur = useTransform(scrollYProgress, [0, 0.35], ["blur(10px)", "blur(0px)"]);

  return (
    <section
      ref={sectionRef}
      id="integrations"
      className="relative scroll-mt-28 overflow-hidden border-t border-light-steel bg-gradient-to-b from-canvas-white via-[color-mix(in_srgb,var(--color-harvest-cream)_35%,var(--color-canvas-white)_65%)] to-canvas-white py-[80px] md:scroll-mt-32 md:py-[96px]"
      aria-labelledby="integrations-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 20% 10%, rgba(245, 158, 11, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 80% 60%, rgba(120, 113, 108, 0.06) 0%, transparent 40%)`,
        }}
      />

      <div className={`relative ${containerPx}`}>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
            Integration partners
          </p>
          <h2
            id="integrations-heading"
            className="mt-4 font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.04em] text-deep-graphite md:text-[44px]"
          >
            Works with what you have
          </h2>

          {/* Fills from Lenis scroll position through this section (not carousel scrubbing) */}
          <div
            className="mx-auto mt-6 h-[3px] max-w-[min(100%,280px)] overflow-hidden rounded-full bg-light-steel/80"
            aria-hidden
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-glow/90 to-amber-glow"
              style={{
                scaleX: scrollProgress,
                transformOrigin: "left center",
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-12 lg:mt-14"
          style={
            reduceMotion
              ? undefined
              : {
                  clipPath: gridClipPath,
                  filter: gridBlur,
                  willChange: "clip-path, filter",
                }
          }
        >
          <motion.ul
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-48px" }}
            aria-label="Integration categories"
          >
            {categories.map((cat) => (
              <motion.li key={cat.title} variants={cardVariants} className="group relative h-full">
                <div
                  className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-light-steel bg-canvas-white/80 p-5 shadow-[0_12px_40px_-24px_rgba(29,30,28,0.12)] backdrop-blur-[2px] transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform group-hover:-translate-y-1 group-hover:border-amber-glow/35 group-hover:shadow-[0_20px_48px_-28px_rgba(245,158,11,0.18)] md:p-6"
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-amber-glow/[0.07] blur-2xl transition-opacity duration-300 group-hover:opacity-100 md:opacity-70"
                    aria-hidden
                  />
                  <h3 className="relative font-serif text-[18px] font-normal text-deep-graphite md:text-[19px]">
                    {cat.title}
                  </h3>
                  <ul className="relative mt-4 flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <li key={item}>
                        <span className="inline-flex rounded-full border border-light-steel/90 bg-harvest-cream/25 px-2.5 py-1 font-sans text-[12px] leading-tight text-deep-graphite/90 transition-colors duration-200 group-hover:border-amber-glow/25 group-hover:bg-amber-glow/[0.06] md:text-[13px]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="mx-auto mt-12 max-w-2xl md:mt-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease, delay: 0.08 }}
        >
          <p className="rounded-2xl border border-amber-glow/25 bg-gradient-to-r from-amber-glow/[0.08] via-harvest-cream/40 to-amber-glow/[0.06] px-6 py-4 text-center font-sans text-[14px] font-semibold leading-relaxed text-deep-graphite md:text-[15px]">
            <span className="text-amber-glow">MagicPlug</span> integration—connect anything in minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
