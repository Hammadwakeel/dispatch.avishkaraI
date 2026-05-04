"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { Anton } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const poster = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

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
      <blockquote className="font-sans text-[clamp(1.15rem,2.8vw,1.65rem)] font-bold leading-[1.55] text-deep-graphite md:text-[clamp(1.25rem,2.5vw,1.85rem)]">
        <span aria-hidden className="text-deep-graphite">
          “
        </span>
        {finished ? (
          <span className="text-deep-graphite">
            <span>
              We are live with an ATM manufacturer and a telecom tower company in India.{" "}
            </span>
            <span>We’re not showing you </span>
            <span className="text-amber-glow">what we could do</span>
            <span> — we’re showing you </span>
            <span className="text-amber-glow">what we’ve done.</span>
          </span>
        ) : (
          <span className="text-deep-graphite">
            {slice}
            <span className="ml-0.5 inline-block h-[1.1em] w-0.5 animate-pulse bg-amber-glow align-[-0.15em]" aria-hidden />
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
        <p className={`${poster.className} text-[clamp(2rem,5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em]`}>
          <span className="text-amber-glow">Proof</span>
        </p>
        <h2
          id="testimonials-heading"
          className={`${poster.className} mt-5 text-left text-[clamp(1.35rem,3.5vw,2.25rem)] font-bold uppercase leading-[1.08] tracking-[-0.02em] md:mt-6`}
        >
          <span className="text-amber-glow">What we have done</span>
          <span className="text-deep-graphite">, not </span>
          <span className="text-amber-glow">what we might do</span>
        </h2>

        <figure className="mt-10 rounded-[var(--radius-card)] border-2 border-deep-graphite bg-canvas-white px-6 py-8 shadow-[0_14px_44px_-34px_rgba(29,30,28,0.16)] md:mt-12 md:px-10 md:py-11">
          <TypewriterQuote />
          <figcaption className="mt-8 font-sans text-[clamp(1rem,2vw,1.2rem)] font-bold leading-snug md:mt-9 md:text-[clamp(1.05rem,2vw,1.3rem)]">
            <span className="text-amber-glow">Avishkar AI</span>
            <span className="text-deep-graphite"> — founded in India, building for the world.</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
