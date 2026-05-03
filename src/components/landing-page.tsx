"use client";

import { motion } from "framer-motion";
import { Code2, Layers, Route, SlidersHorizontal, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { HeroEmbeddedVisual } from "@/components/hero-embedded-visual";
import { HeroLeadForm } from "@/components/hero-lead-form";
import { ComparisonSection } from "@/components/comparison-section";
import { PlatformStackSection } from "@/components/platform-stack-section";
import { TrustedMarqueeSection } from "@/components/trusted-marquee";

const ease = [0.16, 1, 0.3, 1] as const;

const staggerParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";

function Hero() {
  return (
    <section className="relative bg-harvest-cream">
      <div className={`${containerPx} py-[80px] md:py-[96px]`}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="flex min-w-0 flex-col text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={staggerParent}
          >
            <motion.p
              variants={staggerChild}
              className="font-mono text-[12px] font-normal uppercase tracking-[0.14em] text-muted-stone"
            >
              Dispatch automation
            </motion.p>
            <motion.h1
              variants={staggerChild}
              className="font-serif mt-8 text-balance text-[clamp(2.25rem,5.5vw,4rem)] font-normal leading-[0.94] tracking-[-0.045em] text-deep-graphite md:text-[64px]"
            >
              Turn chaotic dispatch into calm, AI-assisted decisions.
            </motion.h1>
            <motion.p
              variants={staggerChild}
              className="mx-auto mt-10 max-w-[52ch] text-pretty font-mono text-[16px] leading-[1.5] text-muted-stone lg:mx-0 md:text-[20px] md:leading-[1.41] md:tracking-[-0.025px]"
            >
              AvishkarAI connects orders, constraints, and fleet reality—so your
              team assigns faster, recovers from exceptions cleanly, and scales
              peaks without burning out coordinators.
            </motion.p>
            <motion.div
              variants={staggerChild}
              className="mx-auto mt-10 w-full max-w-md lg:hidden"
            >
              <HeroEmbeddedVisual />
            </motion.div>
            <motion.div
              variants={staggerChild}
              className="mt-10 flex justify-center lg:mt-12 lg:justify-start"
            >
              <HeroLeadForm />
            </motion.div>
            <motion.p
              variants={staggerChild}
              className="mt-5 font-mono text-[12px] leading-[1.5] text-muted-stone md:text-[13px]"
            >
              Human-in-the-loop by default. Integrates with your TMS and comms
              stack.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative hidden min-w-0 lg:flex lg:justify-end"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease, delay: 0.28 }}
          >
            <HeroEmbeddedVisual className="max-w-[min(100%,520px)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  const cards: {
    icon: LucideIcon;
    title: string;
    body: string;
  }[] = [
    {
      icon: Layers,
      title: "Orchestration + dispatch in one place",
      body: "Others sell another dashboard or another optimizer. AvishkarAI ties constraints, fleet reality, and coordinator decisions into one calm workspace.",
    },
    {
      icon: Route,
      title: "Your lanes, your partners",
      body: "Designed around how Indian ops actually run—multi‑hub, outsourced legs, and noisy signals—without forcing you into a rigid playbook.",
    },
    {
      icon: SlidersHorizontal,
      title: "Configurable as you scale",
      body: "Tune rules by customer, region, and SLA. Flex through peaks and new markets without rewiring your entire ops model.",
    },
    {
      icon: Code2,
      title: "Built for engineering teams",
      body: "APIs, integrations, and explainable suggestions mean platform owners keep control from pilot through production.",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-light-steel bg-gradient-to-b from-harvest-cream via-canvas-white to-harvest-cream py-[80px] md:py-[96px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_42%,rgba(250,93,0,0.07)_0%,transparent_65%)]"
      />
      <div className={`relative ${containerPx}`}>
        <motion.h2
          className="text-center font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.05px] text-deep-graphite md:text-[44px] md:leading-[1.12]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease }}
        >
          Why choose AvishkarAI?
        </motion.h2>
        <motion.ul
          className="mt-14 grid auto-rows-fr gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerParent}
        >
          {cards.map(({ icon: Icon, title, body }) => (
            <motion.li
              key={title}
              variants={staggerChild}
              className="group relative flex h-full min-h-0 flex-col pt-6"
              whileHover={{ y: -4, transition: { duration: 0.22, ease } }}
            >
              {/* Orange glow behind glass card */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[8%] bottom-0 top-10 z-0 rounded-[calc(var(--radius-card)+12px)] bg-amber-glow/45 blur-[28px] transition-[opacity,transform,filter] duration-300 group-hover:bg-amber-glow/55 group-hover:opacity-100 group-hover:blur-[34px] md:inset-x-[6%]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[18%] -bottom-2 top-[55%] z-0 rounded-full bg-amber-glow/30 blur-2xl md:inset-x-[14%]"
              />

              <div className="relative z-10 flex h-full min-h-[17.75rem] flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/70 bg-white/25 px-6 py-8 text-center shadow-[0_8px_40px_-12px_rgba(250,93,0,0.22),inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-xl transition-[box-shadow,border-color] duration-300 group-hover:border-white/85 group-hover:bg-white/32 group-hover:shadow-[0_14px_48px_-10px_rgba(250,93,0,0.32),inset_0_1px_0_0_rgba(255,255,255,0.95)] sm:min-h-[18.25rem] md:px-7 md:py-9 lg:min-h-[19.25rem]">
                {/* Gloss / specular highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(155deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.18)_38%,rgba(255,255,255,0.03)_52%,transparent_56%)]" />
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95)_45%,rgba(255,255,255,0.95)_55%,transparent)] opacity-90" />

                <div className="relative mx-auto flex shrink-0 h-12 w-12 items-center justify-center rounded-[var(--radius-ui)] border border-white/60 bg-white/35 shadow-[inset_0_-2px_8px_rgba(250,93,0,0.08)] backdrop-blur-md">
                  <Icon
                    className="h-6 w-6 text-amber-glow drop-shadow-[0_1px_8px_rgba(250,93,0,0.35)]"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>

                <h3 className="relative mt-5 shrink-0 font-serif text-[21px] font-normal leading-snug tracking-[-0.02em] text-deep-graphite md:text-[22px]">
                  {title}
                </h3>
                <p className="relative mt-4 flex-1 font-mono text-[14px] leading-[1.55] text-deep-graphite/75 md:text-[15px]">
                  {body}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    {
      title: "Manual routing doesn’t scale",
      body: "Spreadsheets, radios, and tribal knowledge break down when volume spikes or drivers churn.",
    },
    {
      title: "Exceptions eat the day",
      body: "Missed windows, last‑minute changes, and rework quietly erase margin.",
    },
    {
      title: "Ops deserves an audit trail",
      body: "Decisions should be explainable—especially when AI suggests the next best assignment.",
    },
  ];
  return (
    <section className="bg-harvest-cream py-[80px]">
      <div className={containerPx}>
        <motion.h2
          className="font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.05px] text-deep-graphite md:text-[48px] md:leading-none"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease }}
        >
          Why dispatch still hurts
        </motion.h2>
        <motion.p
          className="mt-8 max-w-[52ch] font-mono text-[16px] leading-[1.5] text-muted-stone md:text-[20px] md:leading-[1.41] md:tracking-[-0.025px]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease, delay: 0.06 }}
        >
          Coordinators are heroes—but heroics aren’t an operating model.
          AvishkarAI keeps humans in control while removing repetitive glue work.
        </motion.p>
        <motion.ul
          className="mt-16 grid gap-4 md:grid-cols-3 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerParent}
        >
          {items.map((item) => (
            <motion.li
              key={item.title}
              variants={staggerChild}
              className="rounded-[var(--radius-card)] border border-soft-fog bg-canvas-white p-5 md:p-6"
              whileHover={{ y: -3, transition: { duration: 0.22 } }}
            >
              <h3 className="font-serif text-[28px] font-normal leading-[1.33] tracking-[-0.025px] text-deep-graphite">
                {item.title}
              </h3>
              <p className="mt-4 font-mono text-[16px] leading-[1.5] text-link-gray">
                {item.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function Product() {
  const features = [
    {
      title: "Live assignment suggestions",
      body: "Balanced loads, skills, SLAs, and geography—ranked with reasons your team can verify.",
      emphasized: false,
    },
    {
      title: "Exception playbooks",
      body: "Turn “what now?” into guided flows: reassign, split, escalate—without losing context.",
      emphasized: true,
    },
    {
      title: "Dispatch workspace",
      body: "One calm surface for queues, maps, and comms handoffs—fewer tabs, fewer mistakes.",
      emphasized: false,
    },
  ];
  return (
    <section id="product" className="border-t border-light-steel bg-canvas-white py-[80px]">
      <div className={containerPx}>
        <motion.h2
          className="font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.05px] text-deep-graphite md:text-[48px] md:leading-none"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease }}
        >
          Everything coordinators need—nothing extra
        </motion.h2>
        <motion.p
          className="mt-8 max-w-[52ch] font-mono text-[16px] leading-[1.5] text-muted-stone"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease, delay: 0.06 }}
        >
          Structured layouts, monospace rhythm for controls, and serif anchors
          for narrative—so dense ops stay readable through long shifts.
        </motion.p>
        <motion.ul
          className="mt-16 grid gap-4 md:grid-cols-3 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerParent}
        >
          {features.map((f) => (
            <motion.li
              key={f.title}
              variants={staggerChild}
              className={`rounded-[var(--radius-card)] p-5 md:p-6 ${
                f.emphasized
                  ? "border border-transparent bg-canvas-white shadow-[var(--shadow-lg)]"
                  : "bg-harvest-cream"
              }`}
              whileHover={{ y: -4, transition: { duration: 0.26, ease } }}
            >
              <h3 className="font-serif text-[28px] font-normal leading-[1.33] tracking-[-0.025px] text-deep-graphite">
                {f.title}
              </h3>
              <p className="mt-4 font-mono text-[16px] leading-[1.5] text-link-gray">
                {f.body}
              </p>
              <Link
                href="#demo"
                className="mt-6 inline-flex font-mono text-[14px] font-semibold text-amber-glow hover:underline"
              >
                See it in action →
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Connect sources",
      body: "Orders, constraints, fleet status, and comms—normalized into one operational picture.",
    },
    {
      step: "02",
      title: "AI proposes",
      body: "Suggestions with readable rationale; thresholds you control by lane, customer, or region.",
    },
    {
      step: "03",
      title: "Humans approve",
      body: "Dispatch confirms or edits; every action logs cleanly for review and improvement.",
    },
  ];
  return (
    <section id="how-it-works" className="bg-harvest-cream py-[80px]">
      <div className={containerPx}>
        <motion.h2
          className="font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.05px] text-deep-graphite md:text-[48px] md:leading-none"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease }}
        >
          How AvishkarAI fits your day
        </motion.h2>
        <motion.ol
          className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerParent}
        >
          {steps.map((s) => (
            <motion.li key={s.step} variants={staggerChild} className="relative">
              <span className="inline-flex min-w-[2.75rem] items-center justify-center rounded-[var(--radius-ui)] bg-amber-glow px-3 py-1 font-mono text-[12px] font-semibold tabular-nums tracking-normal text-canvas-white shadow-[var(--shadow-sm)]">
                {s.step}
              </span>
              <h3 className="mt-5 font-serif text-[28px] font-normal leading-[1.33] tracking-[-0.025px] text-deep-graphite">
                {s.title}
              </h3>
              <p className="mt-4 font-mono text-[16px] leading-[1.5] text-link-gray">
                {s.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <motion.section
      className="border-t border-light-steel bg-harvest-cream py-[80px]"
      initial={{ opacity: 0, scale: 0.99 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease }}
    >
      <div className={`${containerPx} text-center`}>
        <h2 className="font-serif text-[36px] font-normal leading-[1] tracking-[-0.05px] text-deep-graphite md:text-[48px]">
          Ready for calmer dispatch?
        </h2>
        <p className="mx-auto mt-8 max-w-[42ch] font-mono text-[16px] leading-[1.5] text-muted-stone md:text-[20px] md:leading-[1.41]">
          Tell us about your lanes and constraints—we’ll walk through a demo
          tailored to your workflow.
        </p>
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease, delay: 0.12 }}
        >
          <motion.a
            href="#demo"
            className="inline-flex min-h-[52px] items-center justify-center rounded-[var(--radius-ui)] bg-amber-glow px-10 font-mono text-[14px] font-semibold text-canvas-white shadow-[var(--shadow-sm)] hover:brightness-[1.03]"
            style={{ transitionDuration: "var(--transition-interactive)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book a demo
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Footer() {
  return (
    <motion.footer
      className="border-t border-light-steel bg-canvas-white py-10 text-deep-graphite md:py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease }}
    >
      <div className="flex flex-col items-center justify-between gap-8 px-6 font-mono text-[12px] leading-[1.5] text-muted-stone md:flex-row md:px-8 lg:mx-auto lg:max-w-[var(--page-max-width)] lg:text-[13px]">
        <span className="font-mono text-[14px] font-semibold text-deep-graphite">
          AvishkarAI
        </span>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          <a
            href="#product"
            className="text-link-gray decoration-soft-fog underline-offset-[6px] hover:text-deep-graphite hover:underline"
          >
            Product
          </a>
          <a
            href="#how-it-works"
            className="text-link-gray decoration-soft-fog underline-offset-[6px] hover:text-deep-graphite hover:underline"
          >
            How it works
          </a>
          <span className="text-subtle-gray">Security overview — coming soon</span>
        </nav>
        <p className="text-center text-muted-stone md:text-right">
          © {new Date().getFullYear()} AvishkarAI
        </p>
      </div>
    </motion.footer>
  );
}

export function LandingPage() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <TrustedMarqueeSection />
        <WhyChoose />
        <PlatformStackSection />
        <ComparisonSection />
        <Problem />
        <Product />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
