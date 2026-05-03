"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";
const ease = [0.16, 1, 0.3, 1] as const;

type Tab = {
  id: string;
  short: string;
  headline: string;
  description: string;
  bullets: string[];
  quote?: string;
  /** Optional second list with small heading */
  bulletsB?: { title: string; items: string[] };
};

const TABS: Tab[] = [
  {
    id: "scheduling",
    short: "Scheduling",
    headline: "Never miss a slot. Never overload a tech.",
    description:
      "Avishkar AI's neural scheduler considers 47+ variables—traffic, skill match, job duration, parts availability, customer preference, technician location—to create the perfect route in real time.",
    bullets: [
      "Dynamic multi-day scheduling",
      "Real-time route optimization",
      "Technician skill matching",
      "Customer preference learning",
      "Traffic-aware ETA updates",
      "Conflict auto-resolution",
      "Overtime alerts",
      "Buffer time intelligence",
    ],
    quote:
      "We went from 4-hour dispatch windows to 30-minute precision. Our tech utilization jumped 34%. — Operations Director, HVAC company",
  },
  {
    id: "voice",
    short: "Voice agent",
    headline: "Your 24/7 AI receptionist that actually books jobs",
    description:
      "AI answers calls, understands intent, extracts job details, checks availability, and books appointments—without human intervention. It handles objections, qualifies urgency, and escalates only when needed.",
    bullets: [
      "Natural conversation with customers",
      "Job type identification & classification",
      "Address & contact capture",
      "Availability & slot selection",
      "Service agreement explanations",
      "Rescheduling & cancellation handling",
      "Payment collection",
      "After-hours emergency routing",
    ],
    quote:
      "Our AI voice agent handles 68% of inbound calls and books 12% more jobs than our human team. — CEO, plumbing franchise",
  },
  {
    id: "mobile",
    short: "Field app",
    headline: "Everything your tech needs in their pocket",
    description:
      "A native mobile experience that puts job details, customer history, parts availability, and real-time guidance at technicians' fingertips.",
    bullets: [
      "Job card with full context",
      "Customer & property details",
      "Photo documentation (before/after)",
      "Parts lookup & request",
      "e-signature capture",
      "Real-time customer updates",
      "Route navigation integration",
      "Offline mode with sync",
      "Voice-to-note transcription",
      "One-tap video call to back-office",
    ],
  },
  {
    id: "portal",
    short: "Customer portal",
    headline: "Delight customers before, during, and after the job",
    description:
      "Give customers transparency, convenience, and communication they expect in 2026.",
    bullets: [
      "Real-time technician tracking",
      "Automated appointment reminders (email, SMS, WhatsApp)",
      "Service history & invoices",
      "Online payment",
      "Review & feedback collection",
      "Service plan management",
      "Quote approval workflow",
      "Document upload & sharing",
    ],
    bulletsB: {
      title: "Communication automation",
      items: [
        "Appointment confirmation",
        "Day-of reminder with tech info & ETA",
        "En-route notification",
        "Job completion summary",
        "Follow-up & rebooking prompts",
      ],
    },
  },
  {
    id: "inventory",
    short: "Inventory",
    headline: "Never lose time to missing parts again",
    description:
      "AI predicts part requirements based on job type, equipment age, seasonal patterns, and historical data—ensuring the right parts are on the truck before the tech leaves.",
    bullets: [
      "Smart parts suggestions based on job",
      "Low-stock alerts & reorder triggers",
      "Van inventory management",
      "Parts-to-job matching",
      "Vendor integration",
      "Cost tracking & margin optimization",
      "Obsolete inventory flagging",
    ],
  },
  {
    id: "predictive",
    short: "Predictive",
    headline: "Know what's going to break before it breaks",
    description:
      "Avishkar AI analyzes equipment data, service history, usage patterns, and environmental factors to predict failures before they happen—turning reactive customers into proactive service contracts.",
    bullets: [
      "Equipment health scores",
      "Failure prediction alerts",
      "Maintenance scheduling automation",
      "Warranty tracking",
      "Replacement timing recommendations",
      "Upsell opportunity identification",
      "Service contract health monitoring",
    ],
  },
  {
    id: "bi",
    short: "Analytics",
    headline: "See everything. Optimize everything.",
    description:
      "Real-time dashboards and AI-generated insights that help you make better decisions about pricing, staffing, marketing, and service delivery.",
    bullets: [
      "Revenue & profitability by tech, job type, region",
      "Service agreement utilization",
      "First-time fix rate",
      "Average job duration",
      "Customer satisfaction trends",
      "Technician performance scoring",
      "Inventory turnover",
      "Marketing attribution",
    ],
    bulletsB: {
      title: "AI insights (examples)",
      items: [
        "Your Monday morning no-show rate is 23% higher than other days",
        "Jobs in a hot ZIP take longer—consider adding a tech",
        "Churn risk: customers who haven't booked in 90+ days",
      ],
    },
  },
];

export function CorePlatformTabsSection() {
  const [active, setActive] = useState(0);
  const tab = TABS[active]!;

  return (
    <section
      id="platform-features"
      className="scroll-mt-28 border-t border-light-steel bg-canvas-white py-[80px] md:scroll-mt-32 md:py-[96px]"
      aria-labelledby="platform-tabs-heading"
    >
      <div className={containerPx}>
        <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
          Core platform features
        </p>
        <h2
          id="platform-tabs-heading"
          className="mt-4 text-center font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.04em] text-deep-graphite md:text-[44px]"
        >
          Everything your field service business needs. Powered by AI.
        </h2>

        <div
          className="mt-10 flex gap-2 overflow-x-auto pb-2 md:mt-12 md:flex-wrap md:justify-center md:overflow-visible md:pb-0"
          role="tablist"
          aria-label="Platform capability areas"
        >
          {TABS.map((t, i) => {
            const selected = i === active;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[12px] font-medium transition-colors md:text-[13px] ${
                  selected
                    ? "border-amber-glow bg-amber-glow text-canvas-white shadow-sm"
                    : "border-light-steel bg-warm-linen/40 text-link-gray hover:border-amber-glow/40 hover:text-deep-graphite"
                }`}
              >
                {t.short}
              </button>
            );
          })}
        </div>

        <div className="mt-10 rounded-[var(--radius-card)] border border-light-steel bg-warm-linen/25 p-6 md:mt-12 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease }}
            >
              <h3 className="font-serif text-[24px] font-normal leading-snug tracking-[-0.03em] text-deep-graphite md:text-[28px]">
                {tab.headline}
              </h3>
              <p className="mt-4 max-w-[68ch] font-mono text-[15px] leading-[1.55] text-muted-stone md:text-[16px]">
                {tab.description}
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-2">
                {tab.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2 font-mono text-[14px] leading-snug text-link-gray md:text-[15px]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-glow" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              {tab.bulletsB ? (
                <div className="mt-8 border-t border-light-steel pt-8">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-stone">
                    {tab.bulletsB.title}
                  </p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {tab.bulletsB.items.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 font-mono text-[14px] leading-snug text-link-gray md:text-[15px]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-glow/80" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {tab.quote ? (
                <blockquote className="mt-8 border-l-[3px] border-amber-glow pl-5 font-mono text-[14px] italic leading-relaxed text-deep-graphite/90 md:text-[15px]">
                  {tab.quote}
                </blockquote>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
