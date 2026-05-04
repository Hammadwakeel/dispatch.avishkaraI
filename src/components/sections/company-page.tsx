"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowRight, Brain } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useRef, useState } from "react";
import { companyDocPages, companyHubMeta } from "@/content/doc-company";
import type { DocBlock, DocSection } from "@/content/types";

const ease = [0.16, 1, 0.3, 1] as const;

const containerClass =
  "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

/** Scroll distance multiplier for sticky story (per card). */
const SVH_PER_CARD = 72;

function DocBlocks({ blocks }: { blocks: DocBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((b, i) => {
        if (b.kind === "p") {
          return (
            <p
              key={i}
              className="font-sans text-[15px] leading-[1.6] text-link-gray md:text-[16px]"
            >
              {b.text}
            </p>
          );
        }
        const list = (
          <ul className="list-disc space-y-2 pl-5 font-sans text-[15px] leading-[1.55] text-link-gray md:text-[16px]">
            {b.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
        if (b.title) {
          return (
            <div key={i}>
              <p className="mb-2 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-deep-graphite">
                {b.title}
              </p>
              {list}
            </div>
          );
        }
        return <div key={i}>{list}</div>;
      })}
    </div>
  );
}

function DocSectionColumn({
  section,
  headingLevel,
}: {
  section: DocSection;
  headingLevel: "h2" | "h3";
}) {
  const HeadingTag = headingLevel;
  const headingClass =
    headingLevel === "h2"
      ? "font-serif text-[22px] font-normal leading-snug tracking-[-0.02em] text-deep-graphite md:text-[26px]"
      : "font-serif text-lg font-normal leading-snug tracking-[-0.02em] text-deep-graphite md:text-xl";

  return (
    <section>
      <HeadingTag className={headingClass}>{section.heading}</HeadingTag>
      <div className="mt-5">
        <DocBlocks blocks={section.blocks} />
      </div>
    </section>
  );
}

type StoryCard = {
  id: string;
  anchorId?: string;
  render: () => ReactNode;
};

function CompanyStickyStory({ cards }: { cards: StoryCard[] }) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const n = cards.length;
  const [revealed, setRevealed] = useState(reduceMotion ? n : 1);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduceMotion) return;
    const next = Math.min(n, Math.max(1, Math.ceil(p * n)));
    setRevealed((prev) => Math.max(prev, next));
  });

  const trackMinHeight = `${Math.max(n, 1) * SVH_PER_CARD}svh`;

  if (reduceMotion) {
    return (
      <section className="border-b border-light-steel bg-gradient-to-b from-harvest-cream/35 via-canvas-white to-canvas-white py-16 md:py-24">
        <div className={`${containerClass} mx-auto flex max-w-3xl flex-col gap-10`}>
          {cards.map((c) => (
            <div key={c.id} id={c.anchorId}>
              {c.render()}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-light-steel bg-gradient-to-b from-harvest-cream/35 via-canvas-white to-harvest-cream/25">
      <div ref={trackRef} className="relative w-full" style={{ minHeight: trackMinHeight }}>
        <div className="sticky top-20 z-[1] flex min-h-[calc(100svh-5.5rem)] flex-col md:top-24 md:min-h-[calc(100svh-6rem)] lg:top-28 lg:min-h-[calc(100svh-7rem)]">
          <div className={`${containerClass} flex flex-1 flex-col pb-10 pt-10 md:pb-14 md:pt-14`}>
            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-start gap-5 md:gap-6">
              {cards.slice(0, revealed).map((c) => (
                <motion.div
                  key={c.id}
                  id={c.anchorId}
                  initial={{ opacity: 0, x: 96 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, ease }}
                  className="scroll-mt-28"
                >
                  {c.render()}
                </motion.div>
              ))}
            </div>

            <div className="mx-auto mt-8 flex justify-center gap-2 pb-4 md:mt-10">
              {cards.map((c, i) => (
                <div
                  key={c.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i < revealed ? "w-6 bg-amber-glow" : "w-1.5 bg-light-steel"
                  }`}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CompanyPage() {
  const about = companyDocPages.about;
  const contact = companyDocPages.contact;

  const storyCards: StoryCard[] = useMemo(
    () => [
      ...about.sections.slice(0, 5).map((section, i) => ({
        id: `about-arc-${i}`,
        render: () => <DocSectionColumn section={section} headingLevel="h2" />,
      })),
      {
        id: "about-life",
        render: () => (
          <div>
            <DocSectionColumn section={about.sections[5]} headingLevel="h2" />
            <Link
              href="/company/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-[var(--radius-ui)] bg-gradient-to-r from-amber-glow to-[#c2410c] px-6 py-3 font-sans text-[14px] font-semibold text-canvas-white shadow-[0_8px_24px_-8px_rgba(234,88,12,0.4)] hover:brightness-[1.05]"
            >
              Get in Touch
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </Link>
          </div>
        ),
      },
      {
        id: "hub-contact",
        anchorId: "contact",
        render: () => (
          <div className="rounded-[var(--radius-card)] border border-light-steel/60 bg-canvas-white p-7 shadow-[0_12px_32px_-12px_rgba(42,35,32,0.06)] md:p-8">
            {contact.eyebrow ? (
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
                {contact.eyebrow}
              </p>
            ) : null}
            <h2 className="mt-3 font-serif text-[clamp(1.35rem,3vw,1.85rem)] font-normal leading-[1.15] tracking-[-0.02em] text-deep-graphite">
              {contact.heroTitle}
            </h2>
            <p className="mt-4 font-sans text-[15px] leading-[1.55] text-muted-stone md:text-[16px]">
              {contact.heroSubtitle}
            </p>
            <div className="mt-8 grid gap-10 border-t border-light-steel/50 pt-8 lg:grid-cols-2 lg:gap-12">
              {contact.sections.slice(0, 2).map((sec) => (
                <DocSectionColumn key={sec.heading} section={sec} headingLevel="h3" />
              ))}
            </div>
            {contact.sections[2] ? (
              <div className="mt-10 border-t border-light-steel/50 pt-10">
                <DocSectionColumn section={contact.sections[2]} headingLevel="h3" />
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-4 border-t border-light-steel/40 pt-8">
              <a
                href={`mailto:${companyHubMeta.primaryEmail}`}
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-ui)] border border-light-steel bg-harvest-cream/70 px-6 py-3 font-sans text-[14px] font-medium text-deep-graphite hover:border-amber-glow/40"
              >
                Email {companyHubMeta.primaryEmail}
              </a>
              <Link
                href="/company/contact"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-ui)] bg-gradient-to-r from-amber-glow to-[#c2410c] px-6 py-3 font-sans text-[14px] font-semibold text-canvas-white shadow-[0_8px_24px_-8px_rgba(234,88,12,0.4)] hover:brightness-[1.05]"
              >
                Contact page
                <ArrowRight className="size-4 shrink-0" aria-hidden />
              </Link>
            </div>
          </div>
        ),
      },
    ],
    [about, contact],
  );

  return (
    <main className="flex-1 overflow-x-clip border-t border-light-steel">
      {/* Hero — copy from `about` doc */}
      <section
        id="about"
        className="relative scroll-mt-24 overflow-hidden border-b border-light-steel bg-canvas-white pb-16 pt-20 md:scroll-mt-28 md:pb-24 md:pt-28"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-[min(600px,90vw)] w-[min(600px,90vw)] max-w-none -translate-y-1/2 translate-x-1/4 rounded-full bg-[#e4562a]/8 blur-[120px] md:translate-x-1/3" />
          <div className="absolute left-1/4 top-1/2 h-[min(400px,70vw)] w-[min(400px,70vw)] -translate-y-1/2 rounded-full bg-[#d4a84b]/10 blur-[80px]" />
        </div>

        <div className={`relative z-10 ${containerClass}`}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerParent}
            className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-14 xl:gap-16"
          >
            <motion.div variants={staggerChild} className="flex flex-col justify-center">
              {about.eyebrow ? (
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
                  {about.eyebrow}
                </p>
              ) : null}
              <h1 className="mt-4 font-serif text-[clamp(2rem,5vw,3.25rem)] font-normal leading-[1.1] tracking-[-0.03em] text-deep-graphite">
                {about.heroTitle}
              </h1>
              <p className="mt-6 max-w-[58ch] font-sans text-[16px] leading-[1.6] text-muted-stone md:text-[17px]">
                {about.heroSubtitle}
              </p>
              <div className="mt-10 flex flex-wrap justify-start gap-4">
                <Link
                  href="/company/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-ui)] bg-gradient-to-r from-amber-glow to-[#c2410c] px-6 py-3 font-sans text-[14px] font-semibold text-canvas-white shadow-[0_8px_24px_-8px_rgba(234,88,12,0.4)] hover:brightness-[1.05]"
                >
                  Get in Touch
                  <ArrowRight className="size-4 shrink-0" aria-hidden />
                </Link>
                <Link
                  href="/#demo"
                  className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-ui)] border border-light-steel bg-harvest-cream/70 px-6 py-3 font-sans text-[14px] font-medium text-deep-graphite hover:border-amber-glow/40"
                >
                  Book a Demo
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={staggerChild}
              className="flex items-center justify-center lg:justify-end"
            >
              <div className="relative aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-harvest-cream to-warm-linen shadow-[0_28px_60px_-20px_rgba(42,35,32,0.15)]">
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <div className="text-center">
                    <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-amber-glow/10">
                      <Brain className="size-10 text-amber-glow" aria-hidden />
                    </div>
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-glow">
                      {companyHubMeta.flagshipBrand}
                    </p>
                    <p className="mt-3 font-serif text-xl font-semibold text-deep-graphite">
                      Founded {companyHubMeta.founded}
                    </p>
                    <p className="mt-2 font-sans text-[15px] text-muted-stone">
                      {companyHubMeta.legalName}
                    </p>
                    <p className="mx-auto mt-4 max-w-[34ch] font-sans text-[13px] leading-relaxed text-muted-stone">
                      45 minutes → 5 minutes dispatch coordination. Live with ATM manufacturers and telecom tower operators in India.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute -bottom-4 -right-4 size-32 rounded-full bg-amber-glow/5 blur-2xl" />
                <div className="pointer-events-none absolute -left-4 -top-4 size-24 rounded-full bg-[#d4a84b]/10 blur-2xl" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CompanyStickyStory cards={storyCards} />
    </main>
  );
}
