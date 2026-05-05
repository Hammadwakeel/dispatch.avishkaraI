"use client";

import createGlobe from "cobe";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { posterDisplay } from "@/lib/poster-font";

type GlobeBlock = {
  key: string;
  heading: ReactNode;
  body: string;
  tagline?: string;
};

const dispatchLiquidGlassShell =
  "relative overflow-hidden rounded-[22px] border border-white/55 bg-gradient-to-br from-white/[0.52] via-white/[0.2] to-amber-glow/[0.09] shadow-[0_18px_56px_-14px_rgba(29,30,28,0.22),inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-[26px] ring-1 ring-deep-graphite/[0.08]";

/** Dispatch / globe copy — keep aligned with dispatch-loop-marquee-cards when text changes. */
const GLOBE_CONTENT_BLOCKS: GlobeBlock[] = [
  {
    key: "dispatch-loop",
    heading: (
      <>
        <span className="text-deep-graphite">The AI that runs the </span>
        <span className="text-amber-glow">entire</span>
        <span className="text-deep-graphite"> dispatch loop. </span>
        <span className="text-amber-glow">End to end.</span>
      </>
    ),
    body: "One layer: ingest → assign → parts → follow-up → close → analytics. No handoffs.",
  },
  {
    key: "fault-ingestion",
    heading: (
      <>
        <span className="text-amber-glow">Fault</span> <span className="text-deep-graphite">Ingestion</span>
      </>
    ),
    tagline: "Fault in. Ticket open.",
    body: "Monitoring fires (SCADA, NOC, telemetry, legacy) → ingested via API. Classified by type, asset, severity, site — no triage queue.",
  },
  {
    key: "engineer-assignment",
    heading: (
      <>
        <span className="text-amber-glow">Engineer</span> <span className="text-deep-graphite">Assignment</span>
      </>
    ),
    tagline: "Best match. Seconds.",
    body: "Scores crew by availability, location, certs, load. Full fault context on mobile before roll.",
  },
  {
    key: "parts",
    heading: (
      <>
        <span className="text-amber-glow">Parts</span> <span className="text-deep-graphite">Orchestration</span>
      </>
    ),
    tagline: "Parts before arrival.",
    body: "Checks stock, reserves parts, coordinates delivery — crew arrives to fix, not hunt parts.",
  },
  {
    key: "follow-up",
    heading: (
      <>
        <span className="text-amber-glow">Real-Time</span> <span className="text-deep-graphite">Follow-Up</span>
      </>
    ),
    tagline: "AI nags so you don't.",
    body: "Tracks open tickets; pings on delays; escalations go engineer ↔ AI — fewer missed updates.",
  },
  {
    key: "closure",
    heading: (
      <>
        <span className="text-amber-glow">Ticket</span> <span className="text-deep-graphite">Closure</span>
      </>
    ),
    tagline: "Close clean.",
    body: "Confirms fix → closes ticket → CRM/reporting updates → compliance docs generated.",
  },
  {
    key: "analytics",
    heading: (
      <>
        <span className="text-amber-glow">Analytics</span>
        <span className="text-deep-graphite"> — </span>
        <span className="text-amber-glow">Full visibility</span>
        <span className="text-deep-graphite"> across your network.</span>
      </>
    ),
    body: "Live view across engineers, tickets, assets. SLA risk early; resolution and first-fix tracked automatically.",
  },
];

function GlobeCanvas({ paused }: { paused: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [size, setSize] = useState(360);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      setSize(Math.min(520, Math.max(260, Math.floor(w))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 2);

    globeRef.current?.destroy();

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size,
      height: size,
      phi: phiRef.current,
      theta: 0.25,
      dark: 0,
      diffuse: 1.15,
      mapSamples: 20000,
      mapBrightness: 5.5,
      mapBaseBrightness: 0.05,
      baseColor: [0.92, 0.88, 0.82],
      markerColor: [250 / 255, 93 / 255, 0],
      glowColor: [0.99, 0.92, 0.82],
      markers: [
        { location: [20.5937, 78.9629], size: 0.045 },
        { location: [1.3521, 103.8198], size: 0.032 },
        { location: [35.6762, 139.6503], size: 0.028 },
      ],
      arcs: [
        { from: [20.5937, 78.9629], to: [1.3521, 103.8198], color: [1, 0.55, 0.2] },
        { from: [1.3521, 103.8198], to: [35.6762, 139.6503], color: [1, 0.5, 0.15] },
        { from: [20.5937, 78.9629], to: [35.6762, 139.6503], color: [0.95, 0.45, 0.12] },
      ],
      arcColor: [250 / 255, 93 / 255, 0.35],
      arcWidth: 0.35,
      arcHeight: 0.22,
      markerElevation: 0.02,
      scale: 1,
      offset: [0, 0],
      opacity: 1,
    });

    globeRef.current = globe;

    const paint = () => {
      if (!paused) phiRef.current += 0.003;
      globe.update({ phi: phiRef.current, width: size, height: size });
    };

    if (paused) {
      paint();
    } else {
      const tick = () => {
        paint();
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      globe.destroy();
      globeRef.current = null;
    };
  }, [size, paused]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto aspect-square w-full max-w-[min(100%,520px)]"
    >
      <div
        className="pointer-events-none absolute inset-[-18%] rounded-full bg-gradient-to-br from-amber-glow/25 via-transparent to-white/30 blur-3xl"
        aria-hidden
      />
      <canvas
        ref={canvasRef}
        className="relative z-[1] h-full w-full object-contain"
        aria-hidden
      />
    </div>
  );
}

export function DispatchGlobeSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="border-b border-light-steel bg-harvest-cream/25 py-14 md:py-20"
      aria-label="Dispatch platform overview"
    >
      <div className="mx-auto grid w-full max-w-[var(--page-max-width)] gap-12 px-6 md:gap-16 md:px-8 lg:grid-cols-[minmax(260px,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-14">
        <div className="lg:sticky lg:top-28">
          <p className="font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-deep-graphite md:text-[13px]">
            Global dispatch
          </p>
          <GlobeCanvas paused={!!reduceMotion} />
        </div>

        <div className="flex flex-col gap-7 md:gap-8">
          {GLOBE_CONTENT_BLOCKS.map((block) => (
            <article key={block.key} className={`${dispatchLiquidGlassShell} p-6 md:p-7`}>
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-glow/18 blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-white/35 blur-3xl" aria-hidden />
              <div
                className="pointer-events-none absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-80"
                aria-hidden
              />
              <div className="relative z-[1] text-deep-graphite">
                <h3
                  className={`${posterDisplay.className} uppercase leading-snug tracking-[-0.02em] text-[clamp(0.95rem,1.85vw,1.2rem)] font-normal`}
                >
                  {block.heading}
                </h3>
                {block.tagline ? (
                  <p className="mt-3 font-sans font-bold leading-snug text-amber-glow">{block.tagline}</p>
                ) : null}
                <p className="mt-3 font-sans text-[16px] font-semibold leading-[1.65] md:mt-4 md:text-[17px]">
                  {block.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
