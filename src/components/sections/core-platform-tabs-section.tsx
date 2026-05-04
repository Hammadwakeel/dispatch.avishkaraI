"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CalendarClock,
  Cpu,
  LayoutDashboard,
  Mic,
  Package,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useReducer } from "react";

const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";
const ease = [0.16, 1, 0.3, 1] as const;

type TabNavState = { active: number; dir: 0 | 1 | -1 };

function tabNavReducer(_state: TabNavState, next: number): TabNavState {
  if (next === _state.active) return _state;
  return { active: next, dir: next > _state.active ? 1 : -1 };
}

/**
 * `dir`: +1 = moving to a later tab (content exits left, new enters from right).
 * -1 = moving to an earlier tab (content exits right, new enters from left).
 */
const slideVariants = {
  initial: (dir: 0 | 1 | -1) =>
    dir === 0
      ? { opacity: 0, y: 18 }
      : { opacity: 0, x: dir > 0 ? "100%" : "-100%" },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.38, ease },
  },
  exit: (dir: 0 | 1 | -1) =>
    dir === 0
      ? { opacity: 0, y: -14, transition: { duration: 0.22, ease } }
      : {
          opacity: 0,
          x: dir > 0 ? "-100%" : "100%",
          transition: { duration: 0.32, ease },
        },
};

type Tab = {
  id: string;
  short: string;
  Icon: LucideIcon;
  headline: string;
  teaser: string;
  imageSrc: string;
  imageAlt: string;
  learnMoreHref: string;
};

const TABS: Tab[] = [
  {
    id: "scheduling",
    short: "Scheduling",
    Icon: CalendarClock,
    headline: "Never miss a slot. Never overload a tech.",
    teaser:
      "Neural scheduling weighs traffic, skills, parts, and preferences—see the full breakdown on the platform page.",
    imageSrc:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Planning notes and calendar on a desk",
    learnMoreHref: "/products/fsm-platform?focus=scheduling-engine",
  },
  {
    id: "voice",
    short: "Voice agent",
    Icon: Mic,
    headline: "Your 24/7 AI receptionist that actually books jobs",
    teaser: "AI that answers, qualifies, and books—explore conversation and booking flows on the Voice Agent product page.",
    imageSrc:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Smartphone on a desk representing customer voice channels",
    learnMoreHref: "/products/ai-voice-agent?focus=conversation-intelligence",
  },
  {
    id: "mobile",
    short: "Field app",
    Icon: Smartphone,
    headline: "Everything your tech needs in their pocket",
    teaser: "Job context, photos, parts, and sync—dispatch and field workflows are covered in the platform product page.",
    imageSrc:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Hand holding a phone showing a mobile field app",
    learnMoreHref: "/products/fsm-platform?focus=dispatch-board",
  },
  {
    id: "portal",
    short: "Customer portal",
    Icon: LayoutDashboard,
    headline: "Delight customers before, during, and after the job",
    teaser: "Tracking, reminders, payments, and history—details live under customer and job management on the platform page.",
    imageSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Customer using a laptop for self-service and account access",
    learnMoreHref: "/products/fsm-platform?focus=customer-and-job-management",
  },
  {
    id: "inventory",
    short: "Inventory",
    Icon: Package,
    headline: "Never lose time to missing parts again",
    teaser: "Parts intelligence, vans, and vendors—read the same story in context with jobs and customers on the platform page.",
    imageSrc:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Warehouse logistics and pallet inventory",
    learnMoreHref: "/products/fsm-platform?focus=customer-and-job-management",
  },
  {
    id: "predictive",
    short: "Predictive",
    Icon: Cpu,
    headline: "Know what's going to break before it breaks",
    teaser: "Health scores, alerts, and contract upsides pair with reporting—open analytics on the platform page for the full list.",
    imageSrc:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Technician inspecting industrial equipment for predictive maintenance",
    learnMoreHref: "/products/fsm-platform?focus=reporting-and-analytics",
  },
  {
    id: "bi",
    short: "Analytics",
    Icon: BarChart3,
    headline: "See everything. Optimize everything.",
    teaser: "Dashboards, KPIs, and AI nudges—every metric and example is documented on the platform page.",
    imageSrc:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Analytics dashboard on a screen",
    learnMoreHref: "/products/fsm-platform?focus=reporting-and-analytics",
  },
];

export function CorePlatformTabsSection() {
  const [nav, dispatch] = useReducer(tabNavReducer, { active: 0, dir: 0 });
  const tab = TABS[nav.active]!;

  return (
    <section
      id="platform-features"
      className="scroll-mt-28 border-t border-light-steel bg-canvas-white py-[72px] md:scroll-mt-32 md:py-[88px]"
      aria-labelledby="platform-tabs-heading"
    >
      <div className={containerPx}>
        <p className="text-center font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
          Core platform features
        </p>
        <h2
          id="platform-tabs-heading"
          className="mt-4 text-center font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.04em] text-deep-graphite md:text-[44px]"
        >
          Everything your field service business needs. Powered by AI.
        </h2>

        <div
          className="mx-auto mt-10 flex max-w-5xl snap-x snap-mandatory gap-2 overflow-x-auto pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-12 md:grid md:grid-cols-7 md:gap-3 md:overflow-visible md:pb-0 md:pt-0 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Platform capability areas"
        >
          {TABS.map((t, i) => {
            const selected = i === nav.active;
            const Icon = t.Icon;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                onClick={() => dispatch(i)}
                className={`group flex min-w-[76px] max-w-[100px] flex-1 shrink-0 snap-center flex-col items-center gap-2 rounded-2xl border px-2 py-3 transition-colors md:min-w-0 md:max-w-none md:flex-none md:px-1 md:py-3 ${
                  selected
                    ? "border-amber-glow bg-[color-mix(in_srgb,var(--color-canvas-white)_88%,var(--color-amber-glow)_12%)] shadow-sm shadow-[rgb(var(--rgb-amber-glow)/0.12)]"
                    : "border-light-steel bg-canvas-white hover:border-amber-glow/40 hover:bg-[color-mix(in_srgb,var(--color-canvas-white)_94%,var(--color-amber-glow)_6%)]"
                }`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors md:h-12 md:w-12 ${
                    selected
                      ? "border-amber-glow/45 bg-canvas-white"
                      : "border-amber-glow/15 bg-canvas-white group-hover:border-amber-glow/30"
                  }`}
                  aria-hidden
                >
                  <Icon
                    className="h-[22px] w-[22px] text-[var(--color-amber-glow)] md:h-6 md:w-6"
                    strokeWidth={1.85}
                  />
                </span>
                <span
                  className={`text-center font-sans text-[10px] font-medium leading-tight tracking-tight md:text-[11px] ${
                    selected ? "font-semibold text-deep-graphite" : "text-link-gray"
                  }`}
                >
                  {t.short}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 overflow-x-hidden rounded-3xl border border-light-steel bg-canvas-white p-6 md:mt-10 md:p-10 lg:p-12">
          <div className="relative w-full">
            <AnimatePresence mode="wait" custom={nav.dir}>
              <motion.div
                key={tab.id}
                id={`panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab.id}`}
                custom={nav.dir}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative grid w-full max-w-full items-center gap-10 will-change-transform lg:grid-cols-2 lg:gap-16"
              >
              <div className="min-w-0 space-y-5 lg:space-y-6">
                <h3 className="font-serif text-[26px] font-normal leading-snug tracking-[-0.03em] text-deep-graphite md:text-[30px]">
                  {tab.headline}
                </h3>
                <p className="max-w-[48ch] font-sans text-[15px] leading-[1.6] text-muted-stone md:text-[16px]">
                  {tab.teaser}
                </p>
                <Link
                  href={tab.learnMoreHref}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-ui)] border border-amber-glow bg-canvas-white px-6 font-sans text-[13px] font-semibold text-[var(--color-amber-glow)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-canvas-white)_90%,var(--color-amber-glow)_10%)] md:text-[14px]"
                >
                  Learn more
                </Link>
              </div>

              <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[color-mix(in_srgb,var(--color-canvas-white)_92%,var(--color-harvest-cream)_8%)] ring-1 ring-light-steel md:aspect-[5/4] lg:aspect-[4/3]">
                  <Image
                    key={tab.id}
                    src={tab.imageSrc}
                    alt={tab.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority={nav.active === 0}
                  />
                </div>
              </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
