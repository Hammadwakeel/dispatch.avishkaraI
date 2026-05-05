"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowRight, Brain } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useRef, useState } from "react";
import { companyDocPages, companyHubMeta } from "@/content/doc-company";
import type { DocBlock, DocSection } from "@/content/types";
import { DocListItemBody, docListItemKey } from "@/lib/doc-list-item";
import { posterDisplay } from "@/lib/poster-font";

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

function ContactChannelsBlock({ block }: { block: Extract<DocBlock, { kind: "contactChannels" }> }) {
  return (
    <dl className="space-y-3 font-sans text-[15px] leading-[1.55] text-link-gray md:text-[16px]">
      {block.entries.map((e) => (
        <div key={e.email}>
          <dt className="inline font-semibold text-deep-graphite">{e.label}:</dt>{" "}
          <dd className="inline">
            <a href={`mailto:${e.email}`} className="text-amber-glow underline-offset-2 hover:underline">
              {e.email}
            </a>
            {e.suffix ? <span className="text-muted-stone"> {e.suffix}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

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
        if (b.kind === "contactChannels") {
          return <ContactChannelsBlock key={i} block={b} />;
        }
        const list = (
          <ul className="list-disc space-y-2 pl-5 font-sans text-[15px] leading-[1.55] text-link-gray md:text-[16px]">
            {b.items.map((item, j) => (
              <li key={docListItemKey(item, j)}>
                <DocListItemBody item={item} bodyClassName="text-link-gray" />
              </li>
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

const sectionPosterH2 = "text-[clamp(1.35rem,3.2vw,2.05rem)] leading-[0.95]";
const sectionPosterH3 = "text-[clamp(1.12rem,2.6vw,1.68rem)] leading-[0.95]";

function CompanySectionHeading({
  heading,
  level,
}: {
  heading: string;
  level: "h2" | "h3";
}) {
  const HeadingTag = level;
  const lineClass = level === "h2" ? sectionPosterH2 : sectionPosterH3;
  const c = `${posterDisplay.className} uppercase tracking-[-0.02em] text-deep-graphite`;

  if (heading === "The problem nobody was questioning") {
    return (
      <HeadingTag className={c}>
        <span className={`block ${lineClass}`}>
          <span className="text-amber-glow">The problem</span>{" "}
          <span className="text-deep-graphite">nobody was questioning</span>
        </span>
      </HeadingTag>
    );
  }
  if (heading === "The gap we found") {
    return (
      <HeadingTag className={c}>
        <span className={`block ${lineClass}`}>
          <span className="text-amber-glow">The gap</span>{" "}
          <span className="text-deep-graphite">we found</span>
        </span>
      </HeadingTag>
    );
  }
  if (heading === "What we built") {
    return (
      <HeadingTag className={c}>
        <span className={`block ${lineClass}`}>
          <span className="text-amber-glow">What we</span>{" "}
          <span className="text-deep-graphite">built</span>
        </span>
      </HeadingTag>
    );
  }
  if (heading === "The platform. Three layers.") {
    return (
      <HeadingTag className={c}>
        <span className={`block ${lineClass} text-amber-glow`}>The platform.</span>
        <span className={`mt-1 block ${lineClass} text-deep-graphite md:mt-1.5`}>Three layers.</span>
      </HeadingTag>
    );
  }
  if (heading === "How we operate") {
    return (
      <HeadingTag className={c}>
        <span className={`block ${lineClass}`}>
          <span className="text-amber-glow">How we</span>{" "}
          <span className="text-deep-graphite">operate</span>
        </span>
      </HeadingTag>
    );
  }
  if (heading === "We're a small team building something big.") {
    return (
      <HeadingTag className={c}>
        <span className={`block ${lineClass}`}>
          <span className="text-amber-glow">We&apos;re a small team</span>{" "}
          <span className="text-deep-graphite">building something big.</span>
        </span>
      </HeadingTag>
    );
  }
  if (heading === "Contact channels") {
    return (
      <HeadingTag className={c}>
        <span className={`block ${lineClass}`}>
          <span className="text-amber-glow">Contact</span>{" "}
          <span className="text-deep-graphite">channels</span>
        </span>
      </HeadingTag>
    );
  }
  if (heading === "What to include in your note") {
    return (
      <HeadingTag className={c}>
        <span className={`block ${lineClass}`}>
          <span className="text-amber-glow">What to include</span>{" "}
          <span className="text-deep-graphite">in your note</span>
        </span>
      </HeadingTag>
    );
  }
  if (heading === "Privacy") {
    return (
      <HeadingTag className={c}>
        <span className={`block ${lineClass} text-amber-glow`}>Privacy</span>
      </HeadingTag>
    );
  }

  const fallback =
    level === "h2"
      ? "font-serif text-[22px] font-normal leading-snug tracking-[-0.02em] text-deep-graphite md:text-[26px]"
      : "font-serif text-lg font-normal leading-snug tracking-[-0.02em] text-deep-graphite md:text-xl";

  return (
    <HeadingTag className={fallback}>{heading}</HeadingTag>
  );
}

function DocSectionColumn({
  section,
  headingLevel,
}: {
  section: DocSection;
  headingLevel: "h2" | "h3";
}) {
  return (
    <section>
      <CompanySectionHeading heading={section.heading} level={headingLevel} />
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
            <h2
              className={`mt-3 min-w-0 text-left ${posterDisplay.className} uppercase tracking-[-0.02em] text-deep-graphite`}
            >
              {contact.heroTitleAccent && contact.heroTitleRest ? (
                <span className="block text-[clamp(1.35rem,3vw,2rem)] leading-[0.95]">
                  <span className="text-amber-glow">{contact.heroTitleAccent}</span>{" "}
                  <span className="text-deep-graphite">{contact.heroTitleRest}</span>
                </span>
              ) : (
                <span className="block text-[clamp(1.35rem,3vw,2rem)] leading-[0.95]">{contact.heroTitle}</span>
              )}
            </h2>
            <div className="mt-4 max-w-[52ch]">
              {contact.heroSubtitleAccent && contact.heroSubtitleRest ? (
                <p className="font-sans text-[clamp(1.05rem,2.4vw,1.55rem)] font-bold leading-[1.45] text-deep-graphite md:text-[clamp(1.08rem,2.2vw,1.5rem)]">
                  <span className="text-amber-glow">{contact.heroSubtitleAccent}</span>
                  <span className="text-deep-graphite">{contact.heroSubtitleRest}</span>
                </p>
              ) : (
                <p className="font-sans text-[15px] leading-[1.55] text-muted-stone md:text-[16px]">
                  {contact.heroSubtitle}
                </p>
              )}
            </div>
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
              <h1
                className={`mt-4 min-w-0 text-left ${posterDisplay.className} uppercase tracking-[-0.02em] text-deep-graphite`}
              >
                {about.heroTitleAccent && about.heroTitleRest ? (
                  <>
                    <span className="block whitespace-nowrap text-[clamp(1.85rem,5vw,3.25rem)] leading-[0.92]">
                      <span className="text-amber-glow">{about.heroTitleAccent}</span>{" "}
                      <span className="text-deep-graphite">{about.heroTitleRest}</span>
                    </span>
                    {about.heroTitleLine2 ? (
                      <span className="mt-1 block text-[clamp(1.85rem,5vw,3.25rem)] leading-[0.92] text-deep-graphite md:mt-1.5">
                        {about.heroTitleLine2Accent ? (
                          <>
                            <span className="text-deep-graphite">{about.heroTitleLine2}</span>{" "}
                            <span className="text-amber-glow">{about.heroTitleLine2Accent}</span>
                          </>
                        ) : (
                          about.heroTitleLine2
                        )}
                      </span>
                    ) : null}
                  </>
                ) : (
                  <span className="block text-[clamp(1.85rem,5vw,3.25rem)] leading-[0.92]">{about.heroTitle}</span>
                )}
              </h1>
              <div className="mt-6 max-w-[58ch]">
                {about.heroSubtitleAccent && about.heroSubtitleRest ? (
                  <p className="font-sans text-[clamp(1.05rem,2.4vw,1.65rem)] font-bold leading-[1.45] text-deep-graphite md:text-[clamp(1.08rem,2.2vw,1.55rem)]">
                    <span className="text-amber-glow">{about.heroSubtitleAccent}</span>
                    <span className="text-deep-graphite">{about.heroSubtitleRest}</span>
                  </p>
                ) : (
                  <p className="font-sans text-[16px] leading-[1.6] text-muted-stone md:text-[17px]">{about.heroSubtitle}</p>
                )}
              </div>
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
                      <span className="font-semibold text-amber-glow">~45→~5 min</span> coordination · India (ATM, towers) ·{" "}
                      <span className="text-deep-graphite">APAC next</span>
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
