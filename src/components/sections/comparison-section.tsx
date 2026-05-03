"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";

type CellTone = "highlight" | "ok" | "bad";

function CompareCell({
  tone,
  label,
  emphasized,
}: {
  tone: CellTone;
  label: string;
  emphasized?: boolean;
}) {
  const showCheck = tone === "highlight" || tone === "ok";
  const Icon = showCheck ? Check : X;
  const iconClass =
    tone === "highlight"
      ? "text-amber-glow"
      : tone === "ok"
        ? "text-mid-slate"
        : "text-red-600/85";

  const textClass =
    tone === "highlight"
      ? emphasized
        ? "font-semibold text-deep-graphite"
        : "font-medium text-deep-graphite"
      : tone === "ok"
        ? "text-link-gray"
        : "text-muted-stone";

  return (
    <div className="flex items-start justify-center gap-2 text-center sm:justify-start sm:text-left">
      <Icon className={`mt-0.5 size-[18px] shrink-0 ${iconClass}`} strokeWidth={2.25} aria-hidden />
      <span className={`font-mono text-[13px] leading-snug md:text-[14px] ${textClass}`}>
        {label}
      </span>
    </div>
  );
}

export function ComparisonSection() {
  const rows: {
    feature: string;
    us: { label: string; emphasized?: boolean };
    manual: { tone: CellTone; label: string };
    tms: { tone: CellTone; label: string };
    optimizer: { tone: CellTone; label: string };
  }[] = [
    {
      feature: "Decision intelligence",
      us: { label: "Advanced AI + clear rationale", emphasized: true },
      manual: { tone: "ok", label: "Basic (tribal knowledge)" },
      tms: { tone: "bad", label: "Limited visibility" },
      optimizer: { tone: "bad", label: "Opaque scores" },
    },
    {
      feature: "Human-in-the-loop control",
      us: { label: "Built-in approvals & overrides", emphasized: true },
      manual: { tone: "ok", label: "Manual only (slow)" },
      tms: { tone: "ok", label: "Mixed workflows" },
      optimizer: { tone: "bad", label: "Hands-off bias" },
    },
    {
      feature: "Exception playbooks",
      us: { label: "Guided flows & audit trail", emphasized: true },
      manual: { tone: "bad", label: "Ad hoc chaos" },
      tms: { tone: "bad", label: "Mostly reactive" },
      optimizer: { tone: "bad", label: "Limited guidance" },
    },
    {
      feature: "APIs & integrations",
      us: { label: "Comprehensive", emphasized: true },
      manual: { tone: "bad", label: "None" },
      tms: { tone: "ok", label: "Partial" },
      optimizer: { tone: "ok", label: "Technical, narrow" },
    },
    {
      feature: "Unified dispatch workspace",
      us: { label: "Complete", emphasized: true },
      manual: { tone: "bad", label: "Fragmented tools" },
      tms: { tone: "bad", label: "Partial coverage" },
      optimizer: { tone: "bad", label: "Optimization-only silo" },
    },
  ];

  return (
    <section
      className="border-t border-light-steel bg-warm-linen py-[80px] md:py-[96px]"
      aria-labelledby="comparison-heading"
    >
      <div className={containerPx}>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
            AvishkarAI delivers
          </p>
          <h2
            id="comparison-heading"
            className="font-serif mt-4 text-[28px] font-normal leading-tight tracking-tight text-deep-graphite md:text-[40px] md:leading-[1.15]"
          >
            How AvishkarAI compares
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] font-mono text-[15px] leading-[1.55] text-muted-stone md:text-[16px]">
            See why operations teams choose AI-assisted dispatch over spreadsheets,
            disconnected TMS views, and black-box optimizers alone.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease, delay: 0.06 }}
        >
          <div className="overflow-x-auto rounded-[var(--radius-card)] border border-light-steel bg-canvas-white shadow-[0_18px_48px_-28px_rgba(29,30,28,0.18)] [-webkit-overflow-scrolling:touch]">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="bg-deep-graphite px-4 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-canvas-white md:px-5 md:py-5 md:text-[12px]"
                  >
                    Capability
                  </th>
                  <th
                    scope="col"
                    className="bg-amber-glow px-4 py-4 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-canvas-white md:px-5 md:py-5 md:text-[12px]"
                  >
                    AvishkarAI
                  </th>
                  <th
                    scope="col"
                    className="bg-dark-slate px-3 py-4 text-center font-mono text-[10px] font-semibold uppercase leading-tight tracking-[0.06em] text-canvas-white sm:text-[11px] md:px-4 md:py-5 md:text-[12px]"
                  >
                    Manual dispatch &amp; spreadsheets
                  </th>
                  <th
                    scope="col"
                    className="bg-dark-slate px-3 py-4 text-center font-mono text-[10px] font-semibold uppercase leading-tight tracking-[0.06em] text-canvas-white sm:text-[11px] md:px-4 md:py-5 md:text-[12px]"
                  >
                    TMS / routing tools only
                  </th>
                  <th
                    scope="col"
                    className="bg-dark-slate px-3 py-4 text-center font-mono text-[10px] font-semibold uppercase leading-tight tracking-[0.06em] text-canvas-white sm:text-[11px] md:px-4 md:py-5 md:text-[12px]"
                  >
                    Black-box optimizer
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-warm-linen/60" : "bg-canvas-white"}
                  >
                    <th
                      scope="row"
                      className="border-t border-light-steel px-4 py-4 font-serif text-[15px] font-normal leading-snug text-deep-graphite md:px-5 md:py-5 md:text-[16px]"
                    >
                      {row.feature}
                    </th>
                    <td className="border-t border-light-steel bg-golden-wash/35 px-4 py-4 md:px-5 md:py-5">
                      <CompareCell tone="highlight" label={row.us.label} emphasized={row.us.emphasized} />
                    </td>
                    <td className="border-t border-light-steel px-3 py-4 md:px-4 md:py-5">
                      <CompareCell tone={row.manual.tone} label={row.manual.label} />
                    </td>
                    <td className="border-t border-light-steel px-3 py-4 md:px-4 md:py-5">
                      <CompareCell tone={row.tms.tone} label={row.tms.label} />
                    </td>
                    <td className="border-t border-light-steel px-3 py-4 md:px-4 md:py-5">
                      <CompareCell tone={row.optimizer.tone} label={row.optimizer.label} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto mt-12 max-w-2xl text-center md:mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease, delay: 0.08 }}
        >
          <p className="font-mono text-[15px] leading-[1.55] text-link-gray md:text-[16px]">
            Don&apos;t settle for partial coverage. AvishkarAI brings orchestration,
            suggestions, and coordinator-ready workflows together in one platform.
          </p>
          <motion.a
            href="#demo"
            className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-[var(--radius-ui)] bg-deep-graphite px-10 font-mono text-[14px] font-semibold text-canvas-white shadow-[var(--shadow-sm)] hover:brightness-[1.06]"
            style={{ transitionDuration: "var(--transition-interactive)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get a quote
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
