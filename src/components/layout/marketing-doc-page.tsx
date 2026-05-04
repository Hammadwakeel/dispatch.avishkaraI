import type { ReactNode } from "react";
import { ProductMacInteractiveHero } from "@/components/layout/product-mac-interactive-hero";
import type { DocBlock, DocPage } from "@/content/types";

type MarketingDocPageProps = {
  doc: DocPage;
  /** When true, product hero + Mac only (section cards omitted — content lives in Mac). */
  boxedSections?: boolean;
  /** Opens the Mac tab whose heading slug matches `?focus=` (see `headingToFocusParam`). */
  initialMacFocus?: string;
  /** Rendered after doc sections (e.g. related articles on blog categories). */
  afterSections?: ReactNode;
};

export function MarketingDocPage({
  doc,
  boxedSections,
  initialMacFocus,
  afterSections,
}: MarketingDocPageProps) {
  const sectionShell = "max-w-[65ch]";

  const heroCardClass = boxedSections ? "w-full" : "";

  const renderList = (b: Extract<DocBlock, { kind: "ul" }>, blockKey: string) => {
    const list = (
      <ul className="list-disc space-y-2 pl-5 font-sans text-[15px] leading-[1.55] text-link-gray md:text-[16px]">
        {b.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );

    if (b.title) {
      return (
        <div key={blockKey}>
          <p className="mb-2 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-deep-graphite">
            {b.title}
          </p>
          {list}
        </div>
      );
    }

    return <div key={blockKey}>{list}</div>;
  };

  return (
    <main
      className={
        boxedSections
          ? "flex-1 bg-canvas-white"
          : "flex-1 border-t border-light-steel bg-harvest-cream"
      }
    >
      <article
        className={
          boxedSections
            ? "mx-auto w-full max-w-[var(--page-max-width)] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:py-12"
            : "mx-auto max-w-[var(--page-max-width)] px-6 py-14 md:px-8 md:py-20"
        }
      >
        {boxedSections ? (
          <div className={heroCardClass}>
            <ProductMacInteractiveHero doc={doc} initialMacFocus={initialMacFocus} />
          </div>
        ) : (
          <div>
            {doc.eyebrow ? (
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
                {doc.eyebrow}
              </p>
            ) : null}
            <h1 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-normal leading-[1.12] tracking-[-0.04em] text-deep-graphite md:text-[44px]">
              {doc.heroTitle}
            </h1>
            <p className="mt-6 max-w-[62ch] font-sans text-[16px] leading-[1.55] text-muted-stone md:text-[17px]">
              {doc.heroSubtitle}
            </p>
          </div>
        )}

        {!boxedSections ? (
          <div className="mt-10 flex flex-col gap-14 md:mt-16 md:gap-16">
            {doc.sections.map((sec) => (
              <section key={sec.heading} className={sectionShell}>
                <h2 className="font-serif text-[22px] font-normal leading-snug tracking-[-0.02em] text-deep-graphite md:text-[26px]">
                  {sec.heading}
                </h2>
                <div className="mt-5 flex flex-col gap-5">
                  {sec.blocks.map((b, i) => {
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
                    return renderList(b, `${sec.heading}-${i}`);
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : null}

        {!boxedSections && afterSections ? (
          <div className="mt-14 w-full md:mt-16">{afterSections}</div>
        ) : null}
      </article>
    </main>
  );
}
