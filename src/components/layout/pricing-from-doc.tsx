"use client";

import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { ArrowRight, Calculator, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Pricing tiers from docs/avishkar-ai-website-content.docx — PRICING PAGE CONTENT */
const tiers = [
  {
    name: "Starter",
    price: "₹999",
    unit: "/ technician / month (billed annually)",
    target: "1–10 technician operations",
    includes: [
      "Core scheduling & dispatch",
      "Basic reporting dashboard",
      "Customer management",
      "Job management",
      "Mobile app (limited features)",
      "Email support",
    ],
    addons: [
      "AI Voice Agent: +₹15,000 / month",
      "Vision Inspection: +₹7,500 / month",
      "Predictive Maintenance: +₹9,999 / month",
    ],
  },
  {
    name: "Professional",
    price: "₹1,999",
    unit: "/ technician / month (billed annually)",
    target: "10–50 technician operations",
    includes: [
      "Everything in Starter",
      "AI Voice Agent (included)",
      "Vision Inspection (included)",
      "Predictive Maintenance (included)",
      "Advanced scheduling engine & route optimization",
      "Parts intelligence & customer portal",
      "API access",
      "Priority phone support",
    ],
    addons: ["Custom AI training: custom pricing", "Multi-location management: custom pricing"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "pricing",
    target: "50+ technician operations",
    includes: [
      "Everything in Professional",
      "Multi-location management",
      "Advanced analytics & BI",
      "Custom AI model training",
      "Dedicated success manager & SLA guarantees",
      "Custom integrations & on-site training",
      "White-label options",
      "24/7 priority support",
    ],
    addons: [] as string[],
  },
];

const faq = [
  {
    q: 'How is a "technician" defined?',
    a: "A technician is any field worker who uses the Avishkar AI mobile app or is scheduled through the system.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "Starter and Professional offer monthly billing (slightly higher) or annual commitment (~20% savings). Enterprise contracts are typically 1–3 years.",
  },
  {
    q: "Can I switch plans?",
    a: "Yes. Upgrades or downgrades take effect at the next billing cycle.",
  },
  {
    q: "What about implementation costs?",
    a: "Starter and Professional include self-service onboarding. Enterprise includes dedicated implementation support.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes—14-day free trial with no credit card required.",
  },
] as const;

export function PricingFromDoc() {
  const faqBaseId = useId();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="flex-1 border-t border-light-steel bg-gradient-to-b from-harvest-cream/90 via-canvas-white to-[color-mix(in_srgb,var(--color-harvest-cream)_88%,var(--color-amber-glow)_12%)]">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 py-14 md:px-8 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
            Pricing
          </p>
          <h1 className="font-serif mt-4 text-[clamp(1.85rem,4vw,2.85rem)] font-normal leading-[1.1] tracking-[-0.04em] text-deep-graphite md:text-[46px]">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 max-w-[52ch] font-sans text-[16px] leading-[1.55] text-muted-stone md:text-[17px]">
            Pay for what you need. Scale as you grow. No hidden fees.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-7">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease, delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease } }}
              className={`flex flex-col rounded-[var(--radius-card)] border px-6 py-8 md:px-7 md:py-9 ${
                t.highlighted
                  ? "border-amber-glow/50 bg-canvas-white shadow-[0_20px_56px_-24px_rgba(228,86,42,0.22),var(--shadow-lg)] ring-1 ring-amber-glow/15"
                  : "border-light-steel bg-canvas-white/90 shadow-[0_12px_40px_-28px_rgba(29,30,28,0.1)]"
              }`}
            >
              <h2 className="font-serif text-[22px] font-normal text-deep-graphite md:text-[24px]">
                {t.name}
              </h2>
              <p className="mt-3 font-sans text-[13px] uppercase tracking-[0.08em] text-muted-stone">
                {t.target}
              </p>
              <p className="mt-6 font-serif text-[36px] font-normal leading-none text-deep-graphite md:text-[40px]">
                {t.price}
                <span className="block font-sans text-[13px] font-normal normal-case leading-snug text-muted-stone">
                  {t.unit}
                </span>
              </p>
              <p className="mt-6 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-deep-graphite">
                Includes
              </p>
              <ul className="mt-3 flex-1 space-y-2.5 font-sans text-[14px] leading-[1.5] text-link-gray">
                {t.includes.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-amber-glow">✓</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              {t.addons.length > 0 ? (
                <>
                  <p className="mt-8 font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-deep-graphite">
                    Add-ons
                  </p>
                  <ul className="mt-2 space-y-2 font-sans text-[13px] leading-snug text-muted-stone">
                    {t.addons.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              <Link
                href="/#demo"
                className={`mt-8 inline-flex min-h-[48px] items-center justify-center rounded-[var(--radius-ui)] px-6 text-center font-sans text-[14px] font-semibold transition-[transform,filter] duration-200 hover:brightness-[1.02] active:scale-[0.99] ${
                  t.highlighted
                    ? "bg-amber-glow text-canvas-white shadow-[var(--shadow-sm)] hover:brightness-[1.05]"
                    : "border border-soft-fog bg-harvest-cream text-deep-graphite hover:border-dark-slate"
                }`}
              >
                Book a demo
              </Link>
            </motion.div>
          ))}
        </div>

        <section
          className="mt-20 md:mt-24"
          aria-labelledby="pricing-faq-heading"
        >
          <motion.div
            className="relative overflow-hidden rounded-[var(--radius-card)] border border-light-steel bg-canvas-white/80 p-[1px] shadow-[0_24px_64px_-32px_rgba(29,30,28,0.14)] backdrop-blur-sm md:rounded-[calc(var(--radius-card)+4px)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="rounded-[calc(var(--radius-card)-1px)] bg-[linear-gradient(145deg,rgba(255,253,251,0.98)_0%,color-mix(in_srgb,var(--color-harvest-cream)_65%,transparent)_55%,rgba(255,253,251,0.96)_100%)] p-6 md:p-10">
              <div className="flex flex-col gap-2 border-b border-light-steel/80 pb-6 md:flex-row md:items-end md:justify-between md:pb-8">
                <div>
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-glow">
                    Questions
                  </p>
                  <h2
                    id="pricing-faq-heading"
                    className="mt-2 font-serif text-[26px] font-normal tracking-[-0.03em] text-deep-graphite md:text-[32px]"
                  >
                    Pricing FAQ
                  </h2>
                </div>
                <p className="max-w-[36ch] font-sans text-[13px] leading-relaxed text-muted-stone md:text-right md:text-[14px]">
                  Straight answers on billing, technicians, trials, and switching—before you talk to sales.
                </p>
              </div>

              <LayoutGroup id={`${faqBaseId}-faq`}>
                <ul className="mt-6 flex flex-col gap-2 md:mt-8 md:gap-3">
                  {faq.map((item, i) => {
                    const open = openFaq === i;
                    const panelId = `${faqBaseId}-panel-${i}`;
                    const headerId = `${faqBaseId}-header-${i}`;
                    return (
                      <motion.li
                        key={item.q}
                        layout
                        transition={{ layout: { duration: 0.35, ease } }}
                        className={`relative overflow-hidden rounded-2xl border transition-[border-color,box-shadow,background-color] duration-300 ${
                          open
                            ? "border-amber-glow/35 bg-canvas-white shadow-[0_12px_36px_-20px_rgba(228,86,42,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]"
                            : "border-light-steel/90 bg-harvest-cream/25 hover:border-amber-glow/20 hover:bg-harvest-cream/40"
                        }`}
                      >
                        {open ? (
                          <motion.span
                            layoutId={`${faqBaseId}-accent`}
                            className="pointer-events-none absolute left-0 top-0 h-full w-[3px] rounded-l-2xl bg-amber-glow"
                            transition={{ type: "spring", stiffness: 380, damping: 34 }}
                            aria-hidden
                          />
                        ) : null}
                        <h3 className="m-0">
                          <button
                            type="button"
                            id={headerId}
                            aria-expanded={open}
                            aria-controls={panelId}
                            onClick={() => setOpenFaq(open ? null : i)}
                            className="flex w-full items-start gap-4 px-5 py-4 text-left md:gap-5 md:px-6 md:py-5"
                          >
                            <span className="flex min-w-0 flex-1 items-baseline gap-3">
                              <span
                                className={`font-sans text-[11px] font-bold tabular-nums tracking-widest md:text-[12px] ${
                                  open ? "text-amber-glow" : "text-muted-stone"
                                }`}
                                aria-hidden
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span
                                className={`min-w-0 font-serif text-[17px] font-normal leading-snug tracking-[-0.02em] md:text-[19px] ${
                                  open ? "text-deep-graphite" : "text-link-gray"
                                }`}
                              >
                                {item.q}
                              </span>
                            </span>
                            <motion.span
                              animate={{ rotate: open ? 180 : 0 }}
                              transition={{ duration: 0.28, ease }}
                              className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border ${
                                open
                                  ? "border-amber-glow/40 bg-amber-glow/10 text-amber-glow"
                                  : "border-light-steel bg-canvas-white text-muted-stone"
                              }`}
                              aria-hidden
                            >
                              <ChevronDown className="size-[18px]" strokeWidth={2} />
                            </motion.span>
                          </button>
                        </h3>

                        <AnimatePresence initial={false}>
                          {open ? (
                            <motion.div
                              id={panelId}
                              role="region"
                              aria-labelledby={headerId}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                                transition: {
                                  height: { duration: 0.38, ease },
                                  opacity: { duration: 0.22, delay: 0.06, ease },
                                },
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                  opacity: { duration: 0.15, ease },
                                  height: { duration: 0.32, ease },
                                },
                              }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-light-steel/70 px-5 pb-5 pl-[3.25rem] pr-5 pt-1 md:px-6 md:pb-6 md:pl-[3.75rem] md:pr-6">
                                <motion.p
                                  initial={{ y: 8, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -4, opacity: 0 }}
                                  transition={{ duration: 0.25, ease, delay: 0.05 }}
                                  className="max-w-[62ch] font-sans text-[14px] leading-[1.65] text-link-gray md:text-[15px]"
                                >
                                  {item.a}
                                </motion.p>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </motion.li>
                    );
                  })}
                </ul>
              </LayoutGroup>
            </div>
          </motion.div>
        </section>

        <section className="mt-16 md:mt-20" aria-labelledby="pricing-roi-heading">
          <motion.div
            className="relative overflow-hidden rounded-[var(--radius-card)] border border-light-steel bg-canvas-white/80 p-[1px] shadow-[0_24px_64px_-32px_rgba(29,30,28,0.14)] backdrop-blur-sm md:rounded-[calc(var(--radius-card)+4px)]"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="pointer-events-none absolute -right-16 -top-24 size-56 rounded-full bg-amber-glow/[0.09] blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-20 -left-12 size-48 rounded-full bg-amber-glow/[0.06] blur-3xl" aria-hidden />

            <div className="relative rounded-[calc(var(--radius-card)-1px)] bg-[linear-gradient(155deg,rgba(255,253,251,0.99)_0%,color-mix(in_srgb,var(--color-harvest-cream)_55%,transparent)_48%,rgba(255,253,251,0.97)_100%)] p-6 md:p-10">
              <div className="flex flex-col gap-6 border-b border-light-steel/80 pb-8 md:flex-row md:items-start md:justify-between md:gap-10 md:pb-10">
                <div className="min-w-0">
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease, delay: 0.05 }}
                    className="inline-flex items-center gap-2 rounded-full border border-amber-glow/25 bg-amber-glow/10 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-glow"
                  >
                    <Calculator className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
                    ROI model
                  </motion.div>
                  <motion.h2
                    id="pricing-roi-heading"
                    className="mt-4 font-serif text-[clamp(1.5rem,3.5vw,2rem)] font-normal leading-[1.15] tracking-[-0.03em] text-deep-graphite md:text-[32px]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease, delay: 0.08 }}
                  >
                    Calculate your potential savings
                  </motion.h2>
                </div>
                <motion.ul
                  className="flex shrink-0 flex-wrap gap-2 md:max-w-[20rem] md:justify-end"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
                    hidden: {},
                  }}
                >
                  {[
                    "Technicians",
                    "Jobs / tech",
                    "Dispatch min",
                    "Ticket size",
                    "First-time fix",
                    "CSAT",
                  ].map((label) => (
                    <motion.li
                      key={label}
                      variants={{
                        hidden: { opacity: 0, y: 6 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease } },
                      }}
                      className="rounded-full border border-light-steel/90 bg-canvas-white/90 px-3 py-1.5 font-sans text-[11px] font-medium text-link-gray shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] md:text-[12px]"
                    >
                      {label}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <motion.p
                className="mt-8 max-w-[68ch] font-sans text-[15px] leading-[1.65] text-muted-stone md:mt-10 md:text-[16px]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.06 }}
              >
                Inputs such as technician count, jobs per tech, dispatch minutes per job, ticket size,
                first-time fix rate, and CSAT feed an ROI model—outputs include annual time saved, revenue
                uplift, and months to payback. See the{" "}
                <Link
                  href="/resources/roi-calculator"
                  className="font-semibold text-amber-glow underline decoration-amber-glow/40 underline-offset-[5px] transition-colors hover:text-deep-graphite hover:decoration-deep-graphite/30"
                >
                  ROI calculator
                </Link>{" "}
                page for the full variable list, or book a demo for a tailored model.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-10"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease, delay: 0.12 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/resources/roi-calculator"
                    className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-[var(--radius-ui)] bg-amber-glow px-7 font-sans text-[14px] font-semibold text-canvas-white shadow-[var(--shadow-sm)] transition-[filter] hover:brightness-[1.05] sm:w-auto sm:min-w-[14rem]"
                  >
                    Open ROI calculator
                    <ArrowRight className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/#demo"
                    className="inline-flex min-h-[50px] w-full items-center justify-center rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white px-7 font-sans text-[14px] font-semibold text-deep-graphite shadow-sm transition-colors hover:border-amber-glow/35 hover:bg-harvest-cream/50 sm:w-auto"
                  >
                    Book a tailored demo
                  </Link>
                </motion.div>
              </motion.div>

              <motion.ul
                className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-light-steel/70 pt-6 font-sans text-[12px] text-muted-stone md:mt-10 md:gap-x-8 md:pt-8 md:text-[13px]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: 0.15 }}
              >
                {["Time saved", "Revenue uplift", "Months to payback"].map((out) => (
                  <li key={out} className="flex items-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-amber-glow/90" aria-hidden />
                    {out}
                  </li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
