"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";

const TESTIMONIALS = [
  {
    quote:
      "We went from 12 people doing dispatch to 2. The AI does the rest. Utilization up 41%, customers happier, techs earning more. It's not software—it's a workforce.",
    name: "Sarah Chen",
    role: "COO",
    org: "HVAC company",
    meta: "450 techs",
  },
  {
    quote:
      "Our AI voice agent booked ₹4.5 Crore in new business last year through after-hours calls we were completely missing. It answers 100% of calls, never takes a day off, never has a bad day. I can't hire enough humans to do what this AI does.",
    name: "Mike Rodriguez",
    role: "CEO",
    org: "Plumbing franchise",
    meta: "120 techs",
  },
  {
    quote:
      "The predictive maintenance feature turned 200 reactive customers into proactive service contracts. That's ₹8 Crore in annualized recurring revenue we didn't have before.",
    name: "Jennifer Park",
    role: "VP Operations",
    org: "Commercial services",
    meta: "800 techs",
  },
  {
    quote:
      "Our first-time fix rate went from 72% to 91% because the tech has everything they need on their phone. Photos, history, parts availability—all there. No more return trips.",
    name: "David Kim",
    role: "Director",
    org: "Electrical services",
    meta: "200 techs",
  },
] as const;

export function TestimonialsCarouselSection() {
  const [index, setIndex] = useState(0);
  const n = TESTIMONIALS.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + n) % n), [n]);
  const next = useCallback(() => setIndex((i) => (i + 1) % n), [n]);

  useEffect(() => {
    const t = setInterval(next, 9000);
    return () => clearInterval(t);
  }, [next]);

  const t = TESTIMONIALS[index]!;

  return (
    <section
      className="border-t border-light-steel bg-gradient-to-b from-canvas-white to-warm-linen/50 py-[80px] md:py-[96px]"
      aria-labelledby="testimonials-heading"
    >
      <div className={containerPx}>
        <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
          Testimonials
        </p>
        <h2
          id="testimonials-heading"
          className="mt-4 text-center font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.04em] text-deep-graphite md:text-[44px]"
        >
          What our customers say
        </h2>

        <div className="relative mx-auto mt-12 max-w-[52rem] md:mt-14">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease }}
              className="rounded-[var(--radius-card)] border border-light-steel bg-canvas-white px-6 py-10 text-center shadow-[0_18px_48px_-28px_rgba(29,30,28,0.12)] md:px-12 md:py-12"
            >
              <blockquote className="font-serif text-[20px] font-normal leading-snug tracking-[-0.02em] text-deep-graphite md:text-[24px] md:leading-[1.35]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 font-mono text-[14px] leading-relaxed text-muted-stone md:text-[15px]">
                <span className="font-semibold text-deep-graphite">{t.name}</span>, {t.role},{" "}
                {t.org}
                <span className="mt-1 block text-[13px] text-muted-stone">{t.meta}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="inline-flex size-11 items-center justify-center rounded-full border border-light-steel bg-canvas-white text-deep-graphite shadow-sm transition-colors hover:border-amber-glow/50 hover:bg-warm-linen/50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Testimonial index">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i === index ? "bg-amber-glow" : "bg-light-steel hover:bg-soft-fog"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="inline-flex size-11 items-center justify-center rounded-full border border-light-steel bg-canvas-white text-deep-graphite shadow-sm transition-colors hover:border-amber-glow/50 hover:bg-warm-linen/50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
