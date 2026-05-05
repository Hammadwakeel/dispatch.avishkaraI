"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { posterDisplay } from "@/lib/poster-font";

const QUOTE_TYPE =
  "Live in India with an ATM OEM and a telecom operator — proof, not slideware.";

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
      <blockquote
        className={`${posterDisplay.className} text-[clamp(1.05rem,2.8vw,1.45rem)] font-normal leading-[1.45] tracking-[-0.02em] text-deep-graphite md:text-[clamp(1.08rem,2.4vw,1.55rem)]`}
      >
        <span aria-hidden className="text-deep-graphite">
          “
        </span>
        {finished ? (
          <span className="text-deep-graphite">
            <span className="text-amber-glow">Live</span> in{" "}
            <span className="text-amber-glow">India</span> with an{" "}
            <span className="text-amber-glow">ATM OEM</span> and a{" "}
            <span className="text-amber-glow">telecom operator</span>
            {" — "}
            <span className="text-amber-glow">proof</span>, not slideware.
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
        <p
          className={`${posterDisplay.className} text-[11px] font-normal uppercase tracking-[0.14em] text-deep-graphite md:text-[12px]`}
        >
          Proof
        </p>
        <h2
          id="testimonials-heading"
          className={`${posterDisplay.className} mt-4 max-w-[min(100%,42rem)] text-left font-normal uppercase tracking-[-0.02em] text-deep-graphite md:mt-5`}
        >
          <span className="block text-[clamp(1.35rem,4.5vw,3.35rem)] leading-[0.9] text-deep-graphite">
            Shipped,
          </span>
          <span className="mt-1 block text-[clamp(1.35rem,4.5vw,3.35rem)] leading-[0.9] text-amber-glow md:mt-2">
            not slideware
          </span>
        </h2>

        <figure className="mt-10 rounded-[var(--radius-card)] border-2 border-deep-graphite bg-canvas-white px-6 py-8 shadow-[0_14px_44px_-34px_rgba(29,30,28,0.16)] md:mt-12 md:px-10 md:py-11">
          <TypewriterQuote />
          <figcaption className="mt-6 max-w-[52ch] font-sans text-[15px] font-normal leading-[1.6] text-muted-stone md:mt-8 md:text-[16px]">
            Avishkar AI — India-born, global deployments.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
