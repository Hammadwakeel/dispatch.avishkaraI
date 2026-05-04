"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { posterDisplay } from "@/lib/poster-font";

const QUOTE_TYPE =
  "We are live with an ATM manufacturer and a telecom tower company in India. We’re not showing you what we could do — we’re showing you what we’ve done.";

const TYPE_MS = 22;

function TypewriterQuote() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "0px 0px -10% 0px" });
  const [count, setCount] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setCount(QUOTE_TYPE.length);
      setFinished(true);
      return;
    }
    if (!inView) return;

    setCount(0);
    setFinished(false);
    let cancelled = false;
    let pos = 0;
    let tid: number | undefined;

    const tick = () => {
      tid = window.setTimeout(() => {
        if (cancelled) return;
        pos += 1;
        setCount(pos);
        if (pos >= QUOTE_TYPE.length) {
          setFinished(true);
          return;
        }
        tick();
      }, TYPE_MS);
    };

    tick();
    return () => {
      cancelled = true;
      if (tid !== undefined) window.clearTimeout(tid);
    };
  }, [inView, reduceMotion]);

  const slice = QUOTE_TYPE.slice(0, count);

  return (
    <div ref={wrapRef}>
      <blockquote className="font-sans text-[clamp(0.95rem,2.15vw,1.28rem)] font-bold leading-[1.55] text-deep-graphite md:text-[clamp(1.02rem,1.95vw,1.48rem)] lg:text-[clamp(1.06rem,1.75vw,1.58rem)]">
        <span aria-hidden className="text-deep-graphite">
          “
        </span>
        {finished ? (
          <span className="text-deep-graphite">
            We are <span className="text-amber-glow">live</span> with an{" "}
            <span className="text-amber-glow">ATM manufacturer</span> and a{" "}
            <span className="text-amber-glow">telecom tower company</span> in{" "}
            <span className="text-amber-glow">India</span>. We’re not showing you{" "}
            <span className="text-amber-glow">what we could do</span>
            {" — "}we’re showing you <span className="text-amber-glow">what we’ve done.</span>
          </span>
        ) : (
          <span className="text-deep-graphite">
            {slice}
            <span className="ml-0.5 inline-block h-[1em] w-px animate-pulse bg-deep-graphite/35 align-[-0.1em]" aria-hidden />
          </span>
        )}
        <span aria-hidden className="text-deep-graphite">
          ”
        </span>
      </blockquote>
    </div>
  );
}

export function TestimonialsCarouselSection() {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-28 border-t border-light-steel bg-canvas-white py-16 md:scroll-mt-32 md:py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-deep-graphite md:text-[12px]">Proof</p>
        <h2
          id="testimonials-heading"
          className={`${posterDisplay.className} mt-4 max-w-[min(100%,42rem)] text-left uppercase tracking-[-0.02em] text-deep-graphite md:mt-5`}
        >
          <span className="block text-[clamp(1.35rem,3.8vw,2.65rem)] leading-[0.98]">
            <span className="text-deep-graphite">What we have done,</span>
          </span>
          <span className="mt-1 block text-[clamp(1.35rem,3.8vw,2.65rem)] leading-[0.98] text-amber-glow md:mt-2">
            not what we might do
          </span>
        </h2>

        <figure className="mt-10 rounded-[var(--radius-card)] border-2 border-deep-graphite bg-canvas-white px-6 py-8 shadow-[0_14px_44px_-34px_rgba(29,30,28,0.16)] md:mt-12 md:px-10 md:py-11">
          <TypewriterQuote />
          <figcaption className="mt-6 font-sans text-[13px] font-normal leading-snug text-deep-graphite md:mt-8 md:text-[14px]">
            Avishkar AI — founded in India, building for the world.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
