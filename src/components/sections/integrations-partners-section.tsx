"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";

const categories: { title: string; items: string[] }[] = [
  {
    title: "Accounting",
    items: ["QuickBooks", "Xero", "Sage", "Wave"],
  },
  {
    title: "CRM",
    items: ["Salesforce", "HubSpot", "Zoho", "Microsoft Dynamics"],
  },
  {
    title: "Payment processing",
    items: ["Stripe", "Square", "PayPal", "Chase"],
  },
  {
    title: "Communication",
    items: ["Twilio", "RingCentral", "Zoom"],
  },
  {
    title: "Field equipment",
    items: ["HVAC manufacturers", "IoT sensors", "Fleet tracking"],
  },
  {
    title: "Marketing",
    items: ["Google Ads", "Facebook", "Mailchimp", "HubSpot Marketing"],
  },
];

export function IntegrationsPartnersSection() {
  return (
    <section
      className="border-t border-light-steel bg-canvas-white py-[80px] md:py-[96px]"
      aria-labelledby="integrations-heading"
    >
      <div className={containerPx}>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
            Integration partners
          </p>
          <h2
            id="integrations-heading"
            className="mt-4 font-serif text-[32px] font-normal leading-[1.13] tracking-[-0.04em] text-deep-graphite md:text-[44px]"
          >
            Works with what you have
          </h2>
        </motion.div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {categories.map((cat, i) => (
            <motion.li
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease, delay: i * 0.04 }}
              className="rounded-[var(--radius-card)] border border-light-steel bg-warm-linen/20 p-6 md:p-7"
            >
              <h3 className="font-serif text-[18px] font-normal text-deep-graphite md:text-[19px]">
                {cat.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {cat.items.map((item) => (
                  <li key={item} className="font-mono text-[13px] text-link-gray md:text-[14px]">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>

        <motion.p
          className="mx-auto mt-10 max-w-2xl text-center font-mono text-[14px] font-semibold leading-relaxed text-amber-glow md:mt-12 md:text-[15px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease, delay: 0.1 }}
        >
          MagicPlug integration—connect anything in minutes
        </motion.p>
      </div>
    </section>
  );
}
