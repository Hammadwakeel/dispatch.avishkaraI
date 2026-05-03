"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { CorePlatformTabsSection } from "./core-platform-tabs-section";
import { HeroEmbeddedVisual } from "./hero-embedded-visual";
import { HeroLeadForm } from "./hero-lead-form";
import { IndustrySnapshotsSection } from "./industry-snapshots-section";
import { IntegrationsPartnersSection } from "./integrations-partners-section";
import { MetricsRoiSection } from "./metrics-roi-section";
import { TestimonialsCarouselSection } from "./testimonials-carousel-section";
import { TrustedMarqueeSection } from "./trusted-marquee";
import { companyLinks, pricingNavItem, productLinks, solutionLinks } from "@/config/site-navigation";

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
    <section className="relative bg-gradient-to-b from-canvas-white via-[color-mix(in_srgb,var(--color-warm-linen)_92%,var(--color-amber-glow)_8%)] to-warm-linen">
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
              AI-native field service
            </motion.p>
            <motion.h1
              variants={staggerChild}
              className="font-serif mt-8 text-balance text-[clamp(2.25rem,5.5vw,4rem)] font-normal leading-[0.94] tracking-[-0.045em] text-deep-graphite md:text-[64px]"
            >
              The AI-native field service platform that runs itself
            </motion.h1>
            <motion.p
              variants={staggerChild}
              className="mx-auto mt-10 max-w-[52ch] text-pretty font-mono text-[16px] leading-[1.5] text-muted-stone lg:mx-0 md:text-[20px] md:leading-[1.41] md:tracking-[-0.025px]"
            >
              Avishkar AI transforms reactive field service into autonomous operations.
              AI handles scheduling, dispatch, customer communication, inventory, and
              predictive maintenance—so your team focuses on the work, not the logistics.
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
            <motion.div
              variants={staggerChild}
              className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <Link
                href="#platform-features"
                className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white px-5 font-mono text-[13px] font-medium text-deep-graphite shadow-sm transition-colors hover:border-amber-glow/50 hover:bg-warm-linen/40 md:text-[14px]"
              >
                See it in action
              </Link>
              <Link
                href="/resources/roi-calculator"
                className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-ui)] border border-transparent px-5 font-mono text-[13px] font-semibold text-amber-glow underline-offset-4 hover:underline md:text-[14px]"
              >
                Calculate your ROI
              </Link>
            </motion.div>
            <motion.p
              variants={staggerChild}
              className="mt-5 font-mono text-[12px] leading-[1.5] text-muted-stone md:text-[13px]"
            >
              Human-in-the-loop by default. Prefer a walkthrough first? Use{" "}
              <em className="not-italic font-medium text-deep-graphite/90">See it in action</em>{" "}
              to jump to platform features, or open the ROI calculator anytime.
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

function Problem() {
  const items = [
    {
      id: "dispatch",
      title: "The dispatch chaos",
      body: "Manual scheduling creates conflicts, missed windows, and wasted drive time—technicians lose 2–3 hours daily to poor routing. Average Indian field businesses lose ₹35+ lakh/year to dispatch inefficiency.",
    },
    {
      id: "communication",
      title: "The communication gap",
      body: "Customers wait for updates, miss appointments, and call constantly. About 40% of inbound calls are status updates AI can handle—68% of Indian customers rate field service experiences as frustrating.",
    },
    {
      id: "knowledge",
      title: "The knowledge leak",
      body: "Best practices live in technicians’ heads, not systems—inconsistent quality and repeated mistakes follow. 73% of field service knowledge walks out the door when people leave.",
    },
    {
      id: "inventory",
      title: "The inventory blind spot",
      body: "Parts gaps cause return trips and delays; return trips average about ₹8,000 per occurrence in India. 23% of scheduled jobs need a revisit because of parts issues.",
    },
  ] as const;

  const [active, setActive] = useState(0);
  const activeItem = items[active];

  return (
    <section
      id="pain"
      className="scroll-mt-28 bg-warm-linen py-[80px] md:scroll-mt-32 md:py-[96px]"
      aria-labelledby="problem-heading"
    >
      <div className={containerPx}>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="min-w-0">
            <motion.h2
              id="problem-heading"
              className="font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.05px] text-deep-graphite md:text-[48px] md:leading-none"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease }}
            >
              Field service is broken. Here&apos;s why.
            </motion.h2>
            <motion.p
              className="mt-8 max-w-[52ch] font-mono text-[16px] leading-[1.5] text-muted-stone md:text-[20px] md:leading-[1.41] md:tracking-[-0.025px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease, delay: 0.06 }}
            >
              Avishkar AI is built for intelligence-first operations: autonomous scheduling,
              voice, customer comms, and inventory—so coordinators stop firefighting and start
              steering outcomes.
            </motion.p>

            <div
              className="mt-12 flex flex-col gap-2 border-t border-light-steel pt-10"
              role="tablist"
              aria-label="Field service challenges"
            >
              {items.map((item, i) => {
                const selected = i === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="problem-mac-screen"
                    id={`problem-tab-${item.id}`}
                    className={`group text-left transition-colors duration-200 ${
                      selected
                        ? "border-l-[3px] border-amber-glow pl-5"
                        : "border-l-[3px] border-transparent pl-5 hover:border-soft-fog"
                    }`}
                    onClick={() => setActive(i)}
                  >
                    <span
                      className={`block font-serif text-[22px] font-normal leading-snug tracking-[-0.025px] transition-colors md:text-[26px] md:leading-[1.25] ${
                        selected
                          ? "text-deep-graphite"
                          : "text-link-gray group-hover:text-deep-graphite"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="mt-1 block font-mono text-[12px] font-normal uppercase tracking-[0.12em] text-muted-stone">
                      {selected ? "On screen" : "Show in preview"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-[540px] lg:mx-0 lg:max-w-none lg:justify-self-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease, delay: 0.08 }}
          >
            <div
              className="relative rounded-[1.35rem] bg-gradient-to-b from-[#d8d6d3] via-[#b9b7b4] to-[#9c9a97] p-[11px] shadow-[0_28px_56px_-24px_rgba(29,30,28,0.35),0_12px_24px_-16px_rgba(29,30,28,0.2),inset_0_1px_0_rgba(255,255,255,0.55)] ring-1 ring-black/10"
              aria-label="Preview window"
            >
              <div className="overflow-hidden rounded-[1.05rem] bg-[#2a2a2a] p-2 shadow-[inset_0_2px_8px_rgba(0,0,0,0.45)]">
                <div className="grid h-9 grid-cols-[3.25rem_1fr_3.25rem] items-center rounded-t-lg bg-[#3d3d3d] px-3">
                  <span className="flex justify-start gap-1.5" aria-hidden>
                    <span className="size-2.5 rounded-full bg-[#ff5f57] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.25)]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)]" />
                    <span className="size-2.5 rounded-full bg-[#28c840] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)]" />
                  </span>
                  <span className="truncate text-center font-mono text-[11px] font-medium text-white/75">
                    Operations preview
                  </span>
                  <span aria-hidden className="block" />
                </div>
                <div
                  id="problem-mac-screen"
                  role="tabpanel"
                  aria-labelledby={`problem-tab-${activeItem.id}`}
                  className="relative min-h-[220px] rounded-b-lg rounded-t-none border border-t-0 border-light-steel bg-canvas-white px-5 py-6 shadow-inner sm:min-h-[260px] md:min-h-[280px] md:px-7 md:py-8"
                >
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-glow">
                    {activeItem.title}
                  </p>
                  <div className="relative mt-4 min-h-[8.5rem] md:min-h-[9.5rem]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeItem.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease }}
                        className="absolute inset-0"
                      >
                        <p className="font-mono text-[15px] leading-[1.6] text-link-gray md:text-[16px] md:leading-[1.55]">
                          {activeItem.body}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-3 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-deep-graphite/10"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Connect your business",
      body: "Import customers, jobs, technicians, and inventory; integrate accounting, CRM, and ERP; configure workflows and train AI on your business rules.",
    },
    {
      step: "02",
      title: "AI learns your operations",
      body: "Historical patterns, technician capabilities, customer preferences, and optimization opportunities become your unique operational model.",
    },
    {
      step: "03",
      title: "AI takes over the routine",
      body: "Scheduling runs automatically, calls get answered instantly, dispatch optimizes in real time, customers get proactive updates, and inventory stays intelligent.",
    },
    {
      step: "04",
      title: "Continuous improvement",
      body: "Every outcome is measured, improvements are identified and tested, wins are reported, and the system evolves as you grow.",
    },
  ];
  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 bg-warm-linen py-[80px] md:scroll-mt-32"
    >
      <div className={containerPx}>
        <motion.h2
          className="font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.05px] text-deep-graphite md:text-[48px] md:leading-none"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease }}
        >
          From chaos to clarity in four steps
        </motion.h2>
        <motion.ol
          className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
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
  const trust = [
    "No credit card required",
    "Setup in 1 day",
    "Cancel anytime",
    "SOC 2 compliant",
    "99.9% uptime SLA",
  ] as const;

  return (
    <motion.section
      className="relative border-t border-light-steel bg-gradient-to-b from-warm-linen to-[color-mix(in_srgb,var(--color-warm-linen)_78%,var(--color-amber-glow)_22%)] py-[80px]"
      initial={{ opacity: 0, scale: 0.99 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease }}
    >
      <span
        id="pricing"
        className="pointer-events-none absolute left-0 top-0 block h-px w-px scroll-mt-28"
        aria-hidden
      />
      <div className={`${containerPx} text-center`}>
        <h2 className="font-serif text-[36px] font-normal leading-[1] tracking-[-0.05px] text-deep-graphite md:text-[48px]">
          Ready to run your business on AI?
        </h2>
        <p className="mx-auto mt-8 max-w-[48ch] font-mono text-[16px] leading-[1.5] text-muted-stone md:text-[20px] md:leading-[1.41]">
          Join 500+ service businesses already on Avishkar AI. See how AI-native field
          service management can transform your operations, increase revenue, and make
          everyone—your team and your customers—happier.
        </p>
        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-[12px] text-muted-stone md:text-[13px]">
          {trust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-amber-glow/90" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
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
            Book your demo
          </motion.a>
          <Link
            href="/company/contact"
            className="inline-flex min-h-[52px] items-center justify-center rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white px-8 font-mono text-[14px] font-semibold text-deep-graphite shadow-sm transition-colors hover:border-amber-glow/40"
          >
            Start free trial
          </Link>
          <Link
            href="/resources/roi-calculator"
            className="inline-flex min-h-[52px] items-center justify-center font-mono text-[14px] font-semibold text-amber-glow underline-offset-4 hover:underline"
          >
            ROI calculator
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

const footerResourceLinks: { label: string; href: string }[] = [
  { label: "Blog", href: "/resources/blog" },
  { label: "Documentation", href: "/resources/documentation" },
  { label: "API docs", href: "/resources/documentation" },
  { label: "ROI calculator", href: "/resources/roi-calculator" },
  { label: "Comparison guide", href: "/resources/comparison-guide" },
  { label: "Webinars & events", href: "/resources/webinars" },
  { label: "Case studies", href: "/resources/blog/case-studies" },
];

const footerLegal: { label: string }[] = [
  { label: "Privacy Policy" },
  { label: "Terms of Service" },
  { label: "Cookie Policy" },
  { label: "GDPR compliance" },
  { label: "Security" },
];

function Footer() {
  const productCol = productLinks.filter((l) => !l.emphasis);

  return (
    <motion.footer
      id="footer"
      className="border-t border-light-steel bg-canvas-white py-12 text-deep-graphite md:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease }}
    >
      <div className={`${containerPx} grid gap-12 lg:grid-cols-12 lg:gap-10`}>
        <div className="lg:col-span-3">
          <p className="font-mono text-[15px] font-semibold text-deep-graphite">Avishkar AI</p>
          <p className="mt-3 max-w-[32ch] font-mono text-[13px] leading-relaxed text-muted-stone">
            Flagship brand of Anjaneya AI Technologies Pvt Ltd—AI-native field service
            management.
          </p>
          <p className="mt-4 font-mono text-[13px] text-link-gray">
            <a href="mailto:hello@avishkar.ai" className="text-amber-glow hover:underline">
              hello@avishkar.ai
            </a>
          </p>
          <div className="mt-5 flex flex-wrap gap-4 font-mono text-[12px] text-muted-stone">
            <a href="https://www.linkedin.com" className="hover:text-deep-graphite" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://twitter.com" className="hover:text-deep-graphite" rel="noreferrer">
              X / Twitter
            </a>
            <a href="https://www.youtube.com" className="hover:text-deep-graphite" rel="noreferrer">
              YouTube
            </a>
            <a href="https://www.facebook.com" className="hover:text-deep-graphite" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>

        <nav className="lg:col-span-2" aria-label="Footer products">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-stone">
            Products
          </p>
          <ul className="mt-4 flex flex-col gap-2.5 font-mono text-[13px]">
            {productCol.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-link-gray hover:text-amber-glow hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="font-medium text-amber-glow hover:underline">
                View all products →
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="lg:col-span-2" aria-label="Footer solutions">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-stone">
            Solutions
          </p>
          <ul className="mt-4 flex flex-col gap-2.5 font-mono text-[13px]">
            {solutionLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-link-gray hover:text-amber-glow hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-2" aria-label="Footer resources">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-stone">
            Resources
          </p>
          <ul className="mt-4 flex flex-col gap-2.5 font-mono text-[13px]">
            {footerResourceLinks.map((l) => (
              <li key={`${l.label}-${l.href}`}>
                <Link href={l.href} className="text-link-gray hover:text-amber-glow hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-2" aria-label="Footer company">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-stone">
            Company
          </p>
          <ul className="mt-4 flex flex-col gap-2.5 font-mono text-[13px]">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-link-gray hover:text-amber-glow hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={pricingNavItem.href} className="text-link-gray hover:text-amber-glow hover:underline">
                {pricingNavItem.label}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-stone">
            Newsletter
          </p>
          <p className="mt-2 font-serif text-[18px] text-deep-graphite">Get AI insights for field service</p>
          <form
            className="mt-4 flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="footer-email" className="sr-only">
              Email
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              placeholder="Email address"
              className="min-h-[44px] flex-1 rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white px-4 font-mono text-[13px] text-deep-graphite placeholder:text-text-gray"
            />
            <button
              type="submit"
              className="min-h-[44px] shrink-0 rounded-[var(--radius-ui)] bg-amber-glow px-5 font-mono text-[13px] font-semibold text-canvas-white hover:brightness-[1.03]"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-8 border-t border-light-steel pt-6">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-stone">
              Legal
            </p>
            <ul className="mt-3 flex flex-col gap-2 font-mono text-[12px] text-muted-stone">
              {footerLegal.map((l) => (
                <li key={l.label}>
                  <span className="cursor-default">{l.label} — coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[var(--page-max-width)] border-t border-light-steel px-6 pt-8 text-center font-mono text-[12px] text-muted-stone md:px-8 md:text-[13px]">
        <p>
          © {new Date().getFullYear()} Avishkar AI. All rights reserved. A product of Anjaneya AI Technologies Pvt
          Ltd.
        </p>
        <p className="mt-3">
          <a href="#platform-features" className="text-link-gray hover:text-deep-graphite hover:underline">
            Platform features
          </a>
          <span className="mx-2 text-light-steel" aria-hidden>
            ·
          </span>
          <a href="#how-it-works" className="text-link-gray hover:text-deep-graphite hover:underline">
            How it works
          </a>
          <span className="mx-2 text-light-steel" aria-hidden>
            ·
          </span>
          <a href="#pain" className="text-link-gray hover:text-deep-graphite hover:underline">
            Problem we solve
          </a>
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
        <Problem />
        <CorePlatformTabsSection />
        <HowItWorks />
        <IndustrySnapshotsSection />
        <MetricsRoiSection />
        <TestimonialsCarouselSection />
        <IntegrationsPartnersSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
