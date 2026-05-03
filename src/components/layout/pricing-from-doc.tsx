import Link from "next/link";

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
    addons: [
      "Custom AI training: custom pricing",
      "Multi-location management: custom pricing",
    ],
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
];

export function PricingFromDoc() {
  return (
    <main className="flex-1 border-t border-light-steel bg-warm-linen">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 py-14 md:px-8 md:py-20">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
          Pricing
        </p>
        <h1 className="font-serif mt-4 text-[clamp(1.85rem,4vw,2.85rem)] font-normal leading-[1.1] tracking-[-0.04em] text-deep-graphite md:text-[46px]">
          Simple, transparent pricing
        </h1>
        <p className="mt-6 max-w-[52ch] font-mono text-[16px] leading-[1.55] text-muted-stone md:text-[17px]">
          Pay for what you need. Scale as you grow. No hidden fees.
        </p>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-7">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col rounded-[var(--radius-card)] border px-6 py-8 md:px-7 md:py-9 ${
                t.highlighted
                  ? "border-amber-glow/50 bg-canvas-white shadow-[var(--shadow-lg)]"
                  : "border-light-steel bg-canvas-white"
              }`}
            >
              <h2 className="font-serif text-[22px] font-normal text-deep-graphite md:text-[24px]">
                {t.name}
              </h2>
              <p className="mt-3 font-mono text-[13px] uppercase tracking-[0.08em] text-muted-stone">
                {t.target}
              </p>
              <p className="mt-6 font-serif text-[36px] font-normal leading-none text-deep-graphite md:text-[40px]">
                {t.price}
                <span className="block font-mono text-[13px] font-normal normal-case leading-snug text-muted-stone">
                  {t.unit}
                </span>
              </p>
              <p className="mt-6 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-deep-graphite">
                Includes
              </p>
              <ul className="mt-3 flex-1 space-y-2.5 font-mono text-[14px] leading-[1.5] text-link-gray">
                {t.includes.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-amber-glow">✓</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              {t.addons.length > 0 ? (
                <>
                  <p className="mt-8 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-deep-graphite">
                    Add-ons
                  </p>
                  <ul className="mt-2 space-y-2 font-mono text-[13px] leading-snug text-muted-stone">
                    {t.addons.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              <Link
                href="/#demo"
                className={`mt-8 inline-flex min-h-[48px] items-center justify-center rounded-[var(--radius-ui)] px-6 text-center font-mono text-[14px] font-semibold ${
                  t.highlighted
                    ? "bg-amber-glow text-canvas-white shadow-[var(--shadow-sm)] hover:brightness-[1.03]"
                    : "border border-soft-fog bg-warm-linen text-deep-graphite hover:border-dark-slate"
                }`}
              >
                Book a demo
              </Link>
            </div>
          ))}
        </div>

        <section className="mt-20 border-t border-light-steel pt-14 md:mt-24 md:pt-16">
          <h2 className="font-serif text-[26px] font-normal text-deep-graphite md:text-[30px]">
            Pricing FAQ
          </h2>
          <dl className="mt-8 space-y-8">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="font-mono text-[14px] font-semibold text-deep-graphite">
                  {item.q}
                </dt>
                <dd className="mt-2 font-mono text-[15px] leading-[1.55] text-link-gray">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16 rounded-[var(--radius-card)] border border-light-steel bg-canvas-white px-6 py-8 md:px-8">
          <h2 className="font-serif text-[22px] font-normal text-deep-graphite">
            Calculate your potential savings
          </h2>
          <p className="mt-4 font-mono text-[15px] leading-[1.55] text-muted-stone">
            Inputs such as technician count, jobs per tech, dispatch minutes per job,
            ticket size, first-time fix rate, and CSAT feed an ROI model—outputs include
            annual time saved, revenue uplift, and months to payback. See the{" "}
            <Link href="/resources/roi-calculator" className="font-semibold text-amber-glow underline">
              ROI calculator
            </Link>{" "}
            page for the full variable list, or book a demo for a tailored model.
          </p>
        </section>

        <Link
          href="/"
          className="mt-14 inline-block font-mono text-[14px] font-semibold text-amber-glow underline decoration-soft-fog underline-offset-[6px] hover:text-deep-graphite"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
