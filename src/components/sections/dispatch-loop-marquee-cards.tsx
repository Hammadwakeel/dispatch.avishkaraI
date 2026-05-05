"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Dispatch capability copy — keep aligned with product/marketing when text changes. */
const DISPATCH_FEATURE_ROWS = [
  {
    key: "fault-ingestion",
    headline: "Fault in. Ticket open.",
    body: "Monitoring fires (SCADA, NOC, telemetry, legacy) → ingested via API. Classified by type, asset, severity, site — no triage queue.",
  },
  {
    key: "engineer-assignment",
    headline: "Best match. Seconds.",
    body: "Scores crew by availability, location, certs, load. Full fault context on mobile before roll.",
  },
  {
    key: "parts",
    headline: "Parts before arrival.",
    body: "Checks stock, reserves parts, coordinates delivery — crew arrives to fix, not hunt parts.",
  },
  {
    key: "follow-up",
    headline: "AI nags so you don't.",
    body: "Tracks open tickets; pings on delays; escalations go engineer ↔ AI — fewer missed updates.",
  },
  {
    key: "closure",
    headline: "Close clean.",
    body: "Confirms fix → closes ticket → CRM/reporting updates → compliance docs generated.",
  },
] as const;

/** Glossy liquid glass — matches fault-step liquid cards; reads over harvest-cream bands. */
const dispatchLiquidGlassShell =
  "relative overflow-hidden rounded-[22px] border border-white/55 bg-gradient-to-br from-white/[0.52] via-white/[0.2] to-amber-glow/[0.09] shadow-[0_18px_56px_-14px_rgba(29,30,28,0.22),inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-[26px] ring-1 ring-deep-graphite/[0.08] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-white/70 hover:shadow-[0_22px_64px_-14px_rgba(29,30,28,0.26),inset_0_1px_0_rgba(255,255,255,0.9)]";

type MarqueeCardDef = {
  key: string;
  heading: ReactNode;
  description: ReactNode;
  /** Wider card for hero / analytics strips in the marquee. */
  wide?: boolean;
};

function featureHeadingFor(key: (typeof DISPATCH_FEATURE_ROWS)[number]["key"]): ReactNode {
  const titleClass =
    "font-sans text-[22px] font-bold leading-snug md:text-[24px]";
  switch (key) {
    case "fault-ingestion":
      return (
        <h3 className={titleClass}>
          <span className="text-amber-glow">Fault</span> <span className="text-deep-graphite">Ingestion</span>
        </h3>
      );
    case "engineer-assignment":
      return (
        <h3 className={titleClass}>
          <span className="text-amber-glow">Engineer</span> <span className="text-deep-graphite">Assignment</span>
        </h3>
      );
    case "parts":
      return (
        <h3 className={titleClass}>
          <span className="text-amber-glow">Parts</span> <span className="text-deep-graphite">Orchestration</span>
        </h3>
      );
    case "follow-up":
      return (
        <h3 className={titleClass}>
          <span className="text-amber-glow">Real-Time</span> <span className="text-deep-graphite">Follow-Up</span>
        </h3>
      );
    case "closure":
      return (
        <h3 className={titleClass}>
          <span className="text-amber-glow">Ticket</span> <span className="text-deep-graphite">Closure</span>
        </h3>
      );
    default:
      return null;
  }
}

function MarqueeCardShell({ wide, heading, description }: { wide?: boolean; heading: ReactNode; description: ReactNode }) {
  return (
    <article
      className={`shrink-0 ${dispatchLiquidGlassShell} p-6 md:p-7 ${
        wide
          ? "w-[min(92vw,440px)] lg:w-[min(92vw,520px)]"
          : "w-[min(88vw,300px)] sm:w-[min(88vw,340px)] md:w-[380px]"
      }`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-glow/22 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-white/40 blur-3xl" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-5 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/95 to-transparent opacity-80"
        aria-hidden
      />
      <div className="relative z-[1] font-sans text-deep-graphite">
        <div>{heading}</div>
        <div className="mt-4 text-[18px] leading-[1.65] md:mt-5 md:text-[19px]">{description}</div>
      </div>
    </article>
  );
}

function cardDefs(): MarqueeCardDef[] {
  const featureCards: MarqueeCardDef[] = DISPATCH_FEATURE_ROWS.map((row) => ({
    key: row.key,
    heading: featureHeadingFor(row.key),
    description: (
      <>
        <p className="font-bold leading-snug text-amber-glow">{row.headline}</p>
        <p className="mt-3 font-semibold leading-[1.65] text-deep-graphite md:mt-4">{row.body}</p>
      </>
    ),
  }));

  return [
    {
      key: "hero",
      wide: true,
      heading: (
        <h2 className="font-sans text-[clamp(1.25rem,2.6vw,1.65rem)] font-bold leading-snug">
          <span className="text-deep-graphite">The AI that runs the </span>
          <span className="text-amber-glow">entire</span>
          <span className="text-deep-graphite"> dispatch loop. </span>
          <span className="text-amber-glow">End to end.</span>
        </h2>
      ),
      description: (
        <p className="font-sans font-semibold leading-[1.65] text-deep-graphite">
          One layer:{" "}
          <span className="font-bold text-amber-glow">ingest</span>
          <span className="text-deep-graphite"> → </span>
          <span className="font-bold text-amber-glow">assign</span>
          <span className="text-deep-graphite"> → </span>
          <span className="font-bold text-amber-glow">parts</span>
          <span className="text-deep-graphite"> → </span>
          <span className="font-bold text-amber-glow">follow-up</span>
          <span className="text-deep-graphite"> → </span>
          <span className="font-bold text-amber-glow">close</span>
          <span className="text-deep-graphite"> → </span>
          <span className="font-bold text-amber-glow">analytics</span>
          <span className="text-deep-graphite">. No handoffs.</span>
        </p>
      ),
    },
    ...featureCards,
    {
      key: "analytics",
      wide: true,
      heading: (
        <h3 className="font-sans text-[clamp(1.2rem,2.4vw,1.55rem)] font-bold leading-snug">
          <span className="text-amber-glow">Analytics</span>
          <span className="text-deep-graphite"> — </span>
          <span className="text-amber-glow">Full visibility</span>
          <span className="text-deep-graphite"> across your network.</span>
        </h3>
      ),
      description: (
        <p className="font-sans font-semibold leading-[1.65] text-deep-graphite">
          <span className="text-deep-graphite">Live view across engineers, tickets, assets. </span>
          <span className="font-bold text-amber-glow">SLA risk</span>
          <span className="text-deep-graphite"> early; resolution and first-fix </span>
          <span className="font-bold text-amber-glow">tracked automatically.</span>
        </p>
      ),
    },
  ];
}

export function DispatchLoopMarqueeCards() {
  const reduceMotion = useReducedMotion();
  const defs = cardDefs();

  const strip = (suffix: string) =>
    defs.map((d) => (
      <MarqueeCardShell key={`${d.key}${suffix}`} wide={d.wide} heading={d.heading} description={d.description} />
    ));

  if (reduceMotion) {
    return (
      <section
        className="border-b border-light-steel bg-harvest-cream/25 py-12 md:py-14"
        aria-label="Dispatch loop capabilities"
      >
        <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{strip("")}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="border-b border-light-steel bg-harvest-cream/25 py-12 md:py-14"
      aria-label="Dispatch loop capabilities"
    >
      <div className="relative w-full overflow-hidden">
        <div className="dispatch-loop-marquee-track flex w-max">
          <div className="flex shrink-0 gap-6 pr-6 md:gap-7 md:pr-7">{strip("")}</div>
          <div className="flex shrink-0 gap-6 pr-6 md:gap-7 md:pr-7">{strip("-dup")}</div>
        </div>
      </div>
    </section>
  );
}
