"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Dispatch capability copy — keep aligned with product/marketing when text changes. */
const DISPATCH_FEATURE_ROWS = [
  {
    key: "fault-ingestion",
    headline: "Fault in. Ticket open. Instantly.",
    body: "The moment your monitoring system fires a fault event — SCADA, NOC, telemetry, legacy software — Avishkar picks it up via API. No human triage. No queue. Instant classification by fault type, asset, severity, and location.",
  },
  {
    key: "engineer-assignment",
    headline: "Right engineer. Right skills. Seconds.",
    body: "Avishkar scans your field engineer network in real time — availability, location, certification, current workload — and assigns the best match. The engineer gets full fault context on mobile before they leave.",
  },
  {
    key: "parts",
    headline: "Parts ordered before the engineer arrives.",
    body: "Avishkar checks inventory in real time, reserves required parts, and coordinates delivery to the site — automatically. Engineers arrive ready to fix, not to diagnose.",
  },
  {
    key: "follow-up",
    headline: "AI follows up. You don't have to.",
    body: "Avishkar tracks every open ticket in real time. If a repair is delayed, it follows up with the engineer automatically. If there's an escalation — the engineer talks directly back to the AI. No phone tag. No missed updates.",
  },
  {
    key: "closure",
    headline: "Closed loop. Every time.",
    body: "When the fix is confirmed, Avishkar closes the ticket, logs the resolution, updates your CRM and reporting, and generates compliance documentation automatically. Nothing falls through the cracks.",
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
    "text-[22px] font-bold leading-snug md:text-[24px]";
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
        <h2 className="text-[clamp(1.25rem,2.6vw,1.65rem)] font-bold leading-snug">
          <span className="text-deep-graphite">The AI that runs the </span>
          <span className="text-amber-glow">entire</span>
          <span className="text-deep-graphite"> dispatch loop. </span>
          <span className="text-amber-glow">End to end.</span>
        </h2>
      ),
      description: (
        <p className="font-semibold leading-[1.65] text-deep-graphite">
          <span className="text-deep-graphite">One autonomous layer: </span>
          <span className="font-bold text-amber-glow">fault ingestion</span>
          <span className="text-deep-graphite">, </span>
          <span className="font-bold text-amber-glow">engineer assignment</span>
          <span className="text-deep-graphite">, </span>
          <span className="font-bold text-amber-glow">parts</span>
          <span className="text-deep-graphite">, </span>
          <span className="font-bold text-amber-glow">follow-up</span>
          <span className="text-deep-graphite">, </span>
          <span className="font-bold text-amber-glow">closure</span>
          <span className="text-deep-graphite">, and </span>
          <span className="font-bold text-amber-glow">analytics</span>
          <span className="text-deep-graphite"> — continuously, without handoffs.</span>
        </p>
      ),
    },
    ...featureCards,
    {
      key: "analytics",
      wide: true,
      heading: (
        <h3 className="text-[clamp(1.2rem,2.4vw,1.55rem)] font-bold leading-snug">
          <span className="text-amber-glow">Analytics</span>
          <span className="text-deep-graphite"> — </span>
          <span className="text-amber-glow">Full visibility</span>
          <span className="text-deep-graphite"> across your network.</span>
        </h3>
      ),
      description: (
        <p className="font-semibold leading-[1.65] text-deep-graphite">
          <span className="text-deep-graphite">Every engineer, every ticket, every asset — </span>
          <span className="font-bold text-amber-glow">live.</span>{" "}
          <span className="font-bold text-amber-glow">SLA risk</span>
          <span className="text-deep-graphite"> flagged before breach. Resolution times, first-fix rates, and engineer performance tracked </span>
          <span className="font-bold text-amber-glow">automatically.</span>{" "}
          <span className="text-deep-graphite">Operations managers finally have the </span>
          <span className="font-bold text-amber-glow">dashboard they needed.</span>
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
