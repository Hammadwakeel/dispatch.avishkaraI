"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  Target,
  Calendar,
  Eye,
  Gift,
  Globe,
  Heart,
  Lightbulb,
  Megaphone,
  MessageSquare,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const coreValues = [
  {
    id: "customer-obsession",
    title: "Customer Obsession",
    icon: Heart,
    description:
      "Everything we build starts with customer problems. We don't build features—we solve pain points.",
    detail:
      "Our product team interviews customers weekly. Every feature request traces back to a specific business outcome. We measure NPS monthly and act on feedback within sprints.",
  },
  {
    id: "outcome-orientation",
    title: "Outcome Orientation",
    icon: Target,
    description:
      "We measure success by our customers' results: revenue, efficiency, satisfaction—not by activity metrics.",
    detail:
      "When a customer's first-time fix rate improves, when their techs complete more jobs per day, when their customers leave 5-star reviews—that's what we're optimizing for.",
  },
  {
    id: "long-term-thinking",
    title: "Long-Term Thinking",
    icon: Globe,
    description:
      "We build relationships, not transactions. Our success is tied to our customers' success.",
    detail:
      "We price honestly, communicate transparently, and never upsell a feature that won't genuinely help. Our enterprise retention rate is our best measure of quality.",
  },
  {
    id: "transparency",
    title: "Transparency",
    icon: BookOpen,
    description:
      "Pricing, terms, performance—we're honest about what we can and can't do.",
    detail:
      "Our pricing page shows exactly what you get. Our status page shows uptime in real-time. When something breaks, we tell you what, why, and when—before you have to ask.",
  },
  {
    id: "humble-execution",
    title: "Humble Execution",
    icon: Lightbulb,
    description:
      "We build what we say we'll build. We deliver what we promise.",
    detail:
      "No vaporware. No roadmap theater. If we say Q2, we mean Q2. If we can't make a deadline, we say so early and explain why.",
  },
];

const workItems = [
  {
    id: "eos",
    title: "Entrepreneurial Operating System® (EOS)",
    icon: BookOpen,
    description:
      "We run on EOS—the same framework thousands of companies use to gain clarity, reach, and traction. Every team has quarterly Rocks, weekly Level 10 meetings, and a shared scorecard.",
    detail:
      "EOS keeps us aligned. Instead of endless planning, we have clear priorities, owners, and deadlines. It means fewer meetings, faster decisions, and everyone knowing what matters most.",
  },
  {
    id: "total-rewards",
    title: "Total Rewards",
    icon: Gift,
    description:
      "Competitive salaries, equity for every full-time employee, health insurance, and a learning budget. We believe your growth should be funded.",
    detail:
      "Every team member gets equity. We want everyone to have a real stake in what we're building. Learning budgets are $1,500/year for books, courses, and conferences.",
  },
  {
    id: "engagement",
    title: "Employee Engagement & Development",
    icon: Users,
    description:
      "Weekly 1:1s, quarterly reviews, and a culture of direct feedback. We invest in managers so they can invest in their teams.",
    detail:
      "Career conversations happen every quarter—not just at review time. We promote from within when possible, and we make internal mobility a first option.",
  },
];

const companyInfo = {
  legalName: "Anjaneya AI Technologies Pvt Ltd",
  flagshipBrand: "Avishkar AI",
  founded: "2024",
  teamSize: "Growing team across engineering, product, and go-to-market",
  email: "hello@avishkar.ai",
};

function sectionScrollProgress(lenis: Lenis, sectionEl: HTMLElement): number {
  const scroll = lenis.scroll;
  const top = sectionEl.getBoundingClientRect().top + scroll;
  const height = sectionEl.offsetHeight;
  const travel = Math.max(1, height - window.innerHeight);
  const p = (scroll - top) / travel;
  return Math.max(0, Math.min(1, p));
}

export function CompanyPage() {
  const reduceMotion = useReducedMotion();
  const coreValuesRef = useRef<HTMLElement>(null);
  const [activeValue, setActiveValue] = useState(0);

  const workRef = useRef<HTMLElement>(null);
  const [activeWork, setActiveWork] = useState(0);

  const syncValueFromLenis = useCallback(
    (l: Lenis) => {
      const el = coreValuesRef.current;
      if (!el || reduceMotion) return;
      const p = sectionScrollProgress(l, el);
      const idx = Math.min(coreValues.length - 1, Math.max(0, Math.floor(p * coreValues.length)));
      setActiveValue(idx);
    },
    [reduceMotion],
  );

  useLenis(syncValueFromLenis, [reduceMotion]);

  const syncWorkFromLenis = useCallback(
    (l: Lenis) => {
      const el = workRef.current;
      if (!el || reduceMotion) return;
      const p = sectionScrollProgress(l, el);
      const idx = Math.min(workItems.length - 1, Math.max(0, Math.floor(p * workItems.length)));
      setActiveWork(idx);
    },
    [reduceMotion],
  );

  useLenis(syncWorkFromLenis, [reduceMotion]);

  const staggerParent = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const staggerChild = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section id="about" className="relative overflow-hidden border-b border-light-steel bg-canvas-white pb-16 pt-20 md:pb-24 md:pt-28">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[#e4562a]/8 blur-[120px]" />
          <div className="absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#d4a84b]/10 blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerParent}
            className="grid gap-12 lg:grid-cols-2 lg:gap-16"
          >
            <motion.div variants={staggerChild} className="flex flex-col justify-center">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
                About Avishkar AI
              </p>
              <h1 className="mt-4 font-serif text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.03em] text-deep-graphite">
                Building the AI-Native Future of Field Service
              </h1>
              <p className="mt-6 max-w-[52ch] font-sans text-[16px] leading-[1.6] text-muted-stone md:text-[17px]">
                Avishkar AI was founded on a simple belief: field service businesses deserve
                intelligent tools that work as hard as they do. We&apos;re the flagship brand of
                Anjaneya AI Technologies Pvt Ltd—building an intelligence-first field service platform
                for operators worldwide.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/company/careers"
                  className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-ui)] bg-gradient-to-r from-amber-glow to-[#c2410c] px-6 py-3 font-sans text-[14px] font-semibold text-canvas-white shadow-[0_8px_24px_-8px_rgba(234,88,12,0.4)] hover:brightness-[1.05]"
                >
                  Join Our Team
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/company/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-ui)] border border-light-steel bg-harvest-cream/70 px-6 py-3 font-sans text-[14px] font-medium text-deep-graphite hover:border-amber-glow/40"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={staggerChild}
              className="relative flex items-center justify-center lg:pl-8"
            >
              <div className="relative aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-harvest-cream to-warm-linen shadow-[0_28px_60px_-20px_rgba(42,35,32,0.15)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-amber-glow/10">
                      <Brain className="size-10 text-amber-glow" />
                    </div>
                    <p className="font-serif text-xl font-semibold text-deep-graphite">
                      Founded 2024
                    </p>
                    <p className="mt-2 font-sans text-[15px] text-muted-stone">
                      Anjaneya AI Technologies Pvt Ltd
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 size-32 rounded-full bg-amber-glow/5 blur-2xl" />
                <div className="absolute -left-4 -top-4 size-24 rounded-full bg-[#d4a84b]/10 blur-2xl" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section - Scroll-triggered vertical reveal, right to left */}
      <section className="relative overflow-hidden border-b border-light-steel bg-gradient-to-br from-harvest-cream via-canvas-white to-warm-linen py-16 md:py-24">
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-glow/10 blur-[80px]" />
          <div className="absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[#d4a84b]/10 blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerParent}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p
              variants={staggerChild}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow"
            >
              Our Story
            </motion.p>
            <motion.h2
              variants={staggerChild}
              className="mt-4 font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.02em] text-deep-graphite"
            >
              Why We Built This
            </motion.h2>
          </motion.div>

          {/* Stacked cards - each reveals on scroll */}
          <div className="mt-16 flex flex-col gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Origin",
                color: "amber-glow",
                iconBg: "bg-amber-glow/20",
                iconColor: "text-amber-glow",
                text: "Avishkar AI was born from a recognition: field service businesses were being sold \"software\" when they needed \"intelligence.\" Traditional FSM tools were databases with calendars—static, reactive, and demanding constant human management.",
                accent: "from-amber-glow/30",
              },
              {
                icon: Eye,
                title: "Vision",
                color: "golden-wash",
                iconBg: "bg-[#d4a84b]/20",
                iconColor: "text-[#d4a84b]",
                text: "A world where every field service business—regardless of size—has access to the same level of intelligent operations that only the largest enterprises could afford.",
                accent: "from-[#d4a84b]/30",
              },
              {
                icon: Zap,
                title: "Mission",
                color: "amber-glow",
                iconBg: "bg-amber-glow/20",
                iconColor: "text-amber-glow",
                text: "To make AI-powered field service operations accessible, practical, and profitable for every service business.",
                accent: "from-amber-glow/30",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 120 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-15% 0px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative mx-auto w-full max-w-2xl"
              >
                {/* Glossy glass card */}
                <div className="relative flex flex-col rounded-3xl border border-white/50 bg-gradient-to-br from-white/50 via-white/30 to-white/10 p-8 backdrop-blur-xl shadow-[0_24px_80px_-24px_rgba(228,86,42,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-500 hover:shadow-[0_32px_100px_-24px_rgba(228,86,42,0.18),inset_0_1px_1px_rgba(255,255,255,0.95)]">
                  {/* Inner glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 via-transparent to-transparent" />

                  {/* Top sheen */}
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

                  {/* Left accent bar */}
                  <div className={`absolute -left-px top-8 h-16 w-1 rounded-full bg-gradient-to-b ${card.accent} to-transparent`} />

                  {/* Content */}
                  <div className="relative flex flex-col sm:flex-row sm:items-start sm:gap-6">
                    {/* Icon container */}
                    <div className={`relative mb-4 flex size-14 shrink-0 items-center justify-center rounded-2xl ${card.iconBg} shadow-lg sm:mb-0`}>
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent" />
                      <card.icon className={`relative z-10 size-7 ${card.iconColor}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-2xl font-semibold text-deep-graphite">
                          {card.title}
                        </h3>
                        <span className="rounded-full bg-amber-glow/10 px-3 py-1 font-sans text-[12px] font-medium text-amber-glow">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-3 font-sans text-[15px] leading-relaxed text-muted-stone">
                        {card.text}
                      </p>
                    </div>
                  </div>

                  {/* Bottom decorative line */}
                  <div className="relative mt-6 pt-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-glow/20 to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll progress indicator */}
          <div className="mt-12 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="size-2 rounded-full bg-amber-glow/30 transition-all duration-500"
              />
            ))}
          </div>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="border-b border-light-steel bg-canvas-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerParent}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p
              variants={staggerChild}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow"
            >
              What We Build
            </motion.p>
            <motion.h2
              variants={staggerChild}
              className="mt-4 font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.02em] text-deep-graphite"
            >
              AI-Native Solutions for Field Service
            </motion.h2>
            <motion.p
              variants={staggerChild}
              className="mt-4 font-sans text-[16px] leading-[1.6] text-muted-stone md:text-[17px]"
            >
              Built from scratch with AI at the core. Not acquired, not integrated—engineered for
              intelligence. Neural networks trained on millions of field service interactions.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerParent}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: Calendar,
                title: "FSM Platform",
                desc: "Intelligent scheduling, dispatch, and operations management",
              },
              {
                icon: MessageSquare,
                title: "AI Voice Agent",
                desc: "24/7 conversational booking and customer service",
              },
              {
                icon: Eye,
                title: "Vision Inspection",
                desc: "AI-powered photo documentation and damage detection",
              },
              {
                icon: Brain,
                title: "Predictive Maintenance",
                desc: "Equipment failure prediction and service opportunity identification",
              },
              {
                icon: Zap,
                title: "Field Intelligence Suite",
                desc: "Tech empowerment tools: routing, parts, pricing",
              },
              {
                icon: Globe,
                title: "MagicPlug Integrations",
                desc: "Connect anything in minutes—accounting, CRM, payments",
              },
            ].map((product) => (
              <motion.article
                key={product.title}
                variants={staggerChild}
                className="group relative rounded-[var(--radius-card)] border border-light-steel/60 bg-harvest-cream/50 p-6 transition-all hover:border-amber-glow/30 hover:shadow-[0_12px_32px_-12px_rgba(234,88,12,0.15)]"
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-amber-glow/10 transition-colors group-hover:bg-amber-glow/20">
                  <product.icon className="size-5 text-amber-glow" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-deep-graphite">
                  {product.title}
                </h3>
                <p className="mt-2 font-sans text-[14px] leading-relaxed text-muted-stone">
                  {product.desc}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section
        ref={coreValuesRef}
        className="relative overflow-hidden border-b border-light-steel bg-harvest-cream/60 py-16 md:py-24"
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute right-0 bottom-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-amber-glow/5 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerParent}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p
              variants={staggerChild}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow"
            >
              Core Values
            </motion.p>
            <motion.h2
              variants={staggerChild}
              className="mt-4 font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.02em] text-deep-graphite"
            >
              What Drives Avishkar AI
            </motion.h2>
            <motion.p
              variants={staggerChild}
              className="mt-4 font-sans text-[16px] leading-[1.6] text-muted-stone md:text-[17px]"
            >
              Our values aren&apos;t just words—they&apos;re the foundation of how we connect, collaborate, and
              create. Click through to see how we define them.
            </motion.p>
          </motion.div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Pillar Selection */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerParent}
              className="order-2 flex flex-col justify-center gap-4 lg:order-1"
            >
              {coreValues.map((value, idx) => {
                const Icon = value.icon;
                const isActive = activeValue === idx;
                return (
                  <motion.button
                    key={value.id}
                    variants={staggerChild}
                    onClick={() => setActiveValue(idx)}
                    className={`group flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all ${
                      isActive
                        ? "border-amber-glow/50 bg-canvas-white shadow-[0_8px_24px_-12px_rgba(234,88,12,0.15)]"
                        : "border-transparent bg-transparent hover:bg-canvas-white/60"
                    }`}
                  >
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isActive ? "bg-amber-glow text-canvas-white" : "bg-amber-glow/10 text-amber-glow"
                      }`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1">
                      <span
                        className={`font-serif text-lg transition-colors ${
                          isActive ? "text-amber-glow" : "text-deep-graphite"
                        }`}
                      >
                        {value.title}
                      </span>
                      <p
                        className={`mt-1 font-sans text-[14px] leading-relaxed transition-colors ${
                          isActive ? "text-muted-stone" : "text-subtle-gray"
                        }`}
                      >
                        {value.description}
                      </p>
                    </div>
                    <span
                      className={`font-sans text-[13px] transition-colors ${
                        isActive ? "text-amber-glow" : "text-text-gray"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Detail Display */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChild}
              className="order-1 flex items-center lg:order-2 lg:pl-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeValue}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease }}
                  className="relative w-full overflow-hidden rounded-[var(--radius-card)] border border-amber-glow/20 bg-canvas-white p-8 shadow-[0_20px_60px_-20px_rgba(234,88,12,0.12)]"
                >
                  <div className="absolute -right-6 -top-6 size-32 rounded-full bg-amber-glow/5 blur-2xl" />
                  <div className="relative">
                    <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-amber-glow/10">
                      {(() => {
                        const Icon = coreValues[activeValue].icon;
                        return <Icon className="size-8 text-amber-glow" />;
                      })()}
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-deep-graphite">
                      {coreValues[activeValue].title}
                    </h3>
                    <p className="mt-4 font-sans text-[15px] leading-relaxed text-muted-stone">
                      {coreValues[activeValue].detail}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Day in the Life Section */}
      <section id="leadership" className="border-b border-light-steel bg-canvas-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerParent}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p
              variants={staggerChild}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow"
            >
              Life at Avishkar AI
            </motion.p>
            <motion.h2
              variants={staggerChild}
              className="mt-4 font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.02em] text-deep-graphite"
            >
              What It Means to Work Here
            </motion.h2>
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-5 lg:gap-12">
            {/* Tab Buttons */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerParent}
              className="flex flex-col gap-3 lg:col-span-2"
            >
              {workItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeWork === idx;
                return (
                  <motion.button
                    key={item.id}
                    variants={staggerChild}
                    onClick={() => setActiveWork(idx)}
                    className={`group flex w-full items-start gap-4 rounded-xl border p-5 text-left transition-all ${
                      isActive
                        ? "border-amber-glow/50 bg-harvest-cream shadow-[0_8px_24px_-12px_rgba(234,88,12,0.12)]"
                        : "border-light-steel/60 bg-transparent hover:border-amber-glow/30 hover:bg-harvest-cream/30"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isActive ? "bg-amber-glow text-canvas-white" : "bg-amber-glow/10 text-amber-glow"
                      }`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <span
                        className={`font-serif text-[15px] transition-colors ${
                          isActive ? "text-amber-glow" : "text-deep-graphite"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Content Display */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChild}
              className="relative lg:col-span-3 lg:pl-4"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWork}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease }}
                  className="rounded-[var(--radius-card)] border border-light-steel/60 bg-harvest-cream/40 p-8"
                >
                  <h3 className="font-serif text-xl font-semibold text-deep-graphite">
                    {workItems[activeWork].title}
                  </h3>
                  <p className="mt-4 font-sans text-[15px] leading-relaxed text-muted-stone">
                    {workItems[activeWork].description}
                  </p>
                  <p className="mt-4 font-sans text-[15px] leading-relaxed text-muted-stone">
                    {workItems[activeWork].detail}
                  </p>
                  <Link
                    href="/company/careers"
                    className="mt-6 inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-amber-glow hover:text-[#c2410c]"
                  >
                    View open roles
                    <ArrowRight className="size-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section id="partners" className="border-b border-light-steel bg-harvest-cream/50 py-16 md:py-24">
        <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerParent}
            >
              <motion.p
                variants={staggerChild}
                className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow"
              >
                Company Information
              </motion.p>
              <motion.h2
                variants={staggerChild}
                className="mt-4 font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.02em] text-deep-graphite"
              >
                The Details
              </motion.h2>
              <motion.div
                variants={staggerChild}
                className="mt-8 space-y-4 rounded-[var(--radius-card)] border border-light-steel/60 bg-canvas-white p-6"
              >
                {[
                  { label: "Legal Name", value: companyInfo.legalName },
                  { label: "Flagship Brand", value: companyInfo.flagshipBrand },
                  { label: "Founded", value: companyInfo.founded },
                  { label: "Team", value: companyInfo.teamSize },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between border-b border-light-steel/40 pb-4 last:border-0 last:pb-0">
                    <span className="font-sans text-[14px] text-muted-stone">{item.label}</span>
                    <span className="font-sans text-[14px] font-medium text-deep-graphite">
                      {item.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerParent}
              className="flex flex-col justify-center"
            >
              <motion.div
                variants={staggerChild}
                className="rounded-[var(--radius-card)] border border-light-steel/60 bg-canvas-white p-8 shadow-[0_12px_32px_-12px_rgba(42,35,32,0.08)]"
                id="press"
              >
                <h3 className="font-serif text-xl font-semibold text-deep-graphite">
                  Press & Media
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-muted-stone">
                  We&apos;d love to hear from you. Whether you&apos;re a potential customer, partner, or
                  someone interested in joining our team.
                </p>
                <div className="mt-6 space-y-3">
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-center gap-3 font-sans text-[14px] text-amber-glow hover:text-[#c2410c]"
                  >
                    <Megaphone className="size-4" />
                    {companyInfo.email}
                  </a>
                </div>
                <Link
                  href="/company/contact"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-[var(--radius-ui)] bg-gradient-to-r from-amber-glow to-[#c2410c] px-6 py-3 font-sans text-[14px] font-semibold text-canvas-white shadow-[0_8px_24px_-8px_rgba(234,88,12,0.4)] hover:brightness-[1.05]"
                >
                  Contact Us
                  <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section id="careers" className="relative overflow-hidden bg-gradient-to-b from-harvest-cream to-canvas-white py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-glow/10 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerParent}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.div variants={staggerChild} className="mb-6 inline-flex">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-amber-glow/10">
                <Briefcase className="size-7 text-amber-glow" />
              </div>
            </motion.div>
            <motion.h2
              variants={staggerChild}
              className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.02em] text-deep-graphite"
            >
              Join Our Team
            </motion.h2>
            <motion.p
              variants={staggerChild}
              className="mt-4 font-sans text-[16px] leading-[1.6] text-muted-stone md:text-[17px]"
            >
              We&apos;re building the future of field service—and we&apos;re looking for people who want to
              help define it. Remote-friendly roles across engineering, product, and go-to-market.
            </motion.p>
            <motion.div variants={staggerChild} className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/company/careers"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-ui)] bg-gradient-to-r from-amber-glow to-[#c2410c] px-8 py-3.5 font-sans text-[15px] font-semibold text-canvas-white shadow-[0_8px_24px_-8px_rgba(234,88,12,0.4)] hover:brightness-[1.05]"
              >
                View Open Roles
                <ArrowRight className="size-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
