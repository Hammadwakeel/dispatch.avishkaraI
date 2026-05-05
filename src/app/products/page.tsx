import type { Metadata } from "next";
import Link from "next/link";
import { productLinks, type NavLink } from "@/config/site-navigation";
import { posterDisplay } from "@/lib/poster-font";

const cardPosterSize = "text-[clamp(1rem,2.35vw,1.52rem)] leading-[0.95]";
const cardDescClass =
  "mt-3 flex-1 font-sans text-[clamp(0.88rem,1.55vw,1rem)] font-semibold leading-[1.4] text-deep-graphite md:text-[14px]";

function ProductCardHeading({ item }: { item: NavLink }) {
  const c = `${posterDisplay.className} uppercase tracking-[-0.02em]`;
  const { href } = item;
  if (href === "/products/fsm-platform") {
    return (
      <h3 className={c}>
        <span className={`block ${cardPosterSize}`}>
          <span className="text-amber-glow">AI-native</span>{" "}
          <span className="text-deep-graphite">dispatch</span>
        </span>
      </h3>
    );
  }
  if (href === "/products/vision-inspection") {
    return (
      <h3 className={c}>
        <span className={`block ${cardPosterSize}`}>
          <span className="text-amber-glow">Vision</span>{" "}
          <span className="text-deep-graphite">Inspection</span>
        </span>
      </h3>
    );
  }
  if (href === "/products/field-intelligence-suite") {
    return (
      <h3 className={c}>
        <span className={`block ${cardPosterSize}`}>
          <span className="text-amber-glow">Field</span>{" "}
          <span className="text-deep-graphite">Intelligence</span>
        </span>
        <span className={`mt-0.5 block ${cardPosterSize} text-deep-graphite md:mt-1`}>Suite</span>
      </h3>
    );
  }
  return (
    <h3 className="font-serif text-[22px] font-normal leading-snug tracking-[-0.02em] text-deep-graphite md:text-[24px]">
      {item.label}
    </h3>
  );
}

function ProductCardBlurb({ item }: { item: NavLink }) {
  const { href } = item;
  if (href === "/products/fsm-platform") {
    return (
      <p className={cardDescClass}>
        <span className="text-deep-graphite">Fault→close loop — ATM, telecom, medical. Autonomous.</span>
      </p>
    );
  }
  if (href === "/products/vision-inspection") {
    return (
      <p className={cardDescClass}>
        <span className="text-deep-graphite">Evidence &amp; compliance tied to dispatch.</span>
      </p>
    );
  }
  if (href === "/products/field-intelligence-suite") {
    return (
      <p className={cardDescClass}>
        <span className="text-deep-graphite">Engineers, tickets, assets, SLAs — one pane.</span>
      </p>
    );
  }
  if (item.description) {
    return (
      <p className="mt-4 flex-1 font-sans text-[14px] leading-[1.55] text-deep-graphite/80 md:text-[15px]">{item.description}</p>
    );
  }
  return <span className="flex-1" aria-hidden />;
}

export const metadata: Metadata = {
  title: "Products",
  description:
    "Dispatch, vision inspection, and field intelligence—one fault-to-close stack for ATM, tower, and medical programs.",
};

export default function ProductsHubPage() {
  const cards = productLinks.filter((p) => !p.emphasis);

  const cardFace =
    "group relative flex h-full min-h-[18rem] w-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/70 bg-white/25 p-5 shadow-[0_8px_40px_-12px_rgba(228,86,42,0.22),inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-xl transition-[border-color,box-shadow,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/85 hover:bg-white/32 hover:shadow-[0_14px_48px_-10px_rgba(228,86,42,0.3),inset_0_1px_0_0_rgba(255,255,255,0.95)] md:min-h-[20rem] md:p-6 lg:min-h-[22rem]";

  return (
    <main className="relative flex-1 overflow-x-visible border-t border-light-steel bg-harvest-cream">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_85%_55%_at_15%_20%,rgba(228,86,42,0.09)_0%,transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_35%,rgba(197,208,200,0.45)_0%,transparent_50%),radial-gradient(ellipse_60%_45%_at_50%_100%,rgba(212,168,75,0.08)_0%,transparent_45%)]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto max-w-[var(--page-max-width)] px-6 py-12 md:px-8 md:py-16">
        <div className="flex flex-col gap-4 md:gap-5">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
            Products
          </p>
          <h1
            className={`min-w-0 text-left ${posterDisplay.className} uppercase tracking-[-0.02em]`}
          >
            <span className="block text-[clamp(1.55rem,5.5vw,3.85rem)] leading-[0.9]">
              <span className="text-amber-glow">Dispatch,</span>{" "}
              <span className="text-deep-graphite">vision, intelligence</span>
            </span>
            <span className="mt-1 block text-[clamp(1.55rem,5.5vw,3.85rem)] leading-[0.9] text-deep-graphite md:mt-1.5">
              <span className="text-deep-graphite">One stack.</span>{" "}
              <span className="text-amber-glow">One loop.</span>
            </span>
          </h1>
          <p className="max-w-[46ch] text-left font-sans text-[clamp(0.95rem,2vw,1.28rem)] font-semibold leading-[1.4] text-deep-graphite">
            <span className="text-amber-glow">Fault to resolution</span>
            <span className="text-deep-graphite">
              {" "}
              — ATM, tower, medical. No coordinator between alarm and crew.
            </span>
          </p>
        </div>

        <h2
          className={`mt-10 text-center ${posterDisplay.className} uppercase tracking-[-0.02em] text-deep-graphite md:mt-12`}
        >
          <span className="block text-[clamp(1.05rem,2.75vw,1.85rem)] leading-[0.98]">Explore products</span>
        </h2>

        <div className="relative mt-6 lg:mt-8">
          <ul className="grid list-none grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6 lg:gap-6 lg:items-stretch">
            {cards.map((p, i) => (
              <li
                key={p.href}
                className={`flex min-h-0 ${
                  i < 3
                    ? "lg:col-span-2"
                    : `lg:col-span-2 lg:row-start-2 ${i === 3 ? "lg:col-start-2" : "lg:col-start-4"}`
                }`}
              >
                <Link href={p.href} className={cardFace}>
                  <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(155deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.18)_38%,rgba(255,255,255,0.03)_52%,transparent_56%)]" />
                  <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95)_45%,rgba(255,255,255,0.95)_55%,transparent)] opacity-90 md:inset-x-6" />

                  <span className="relative flex min-h-0 flex-1 flex-col">
                    <ProductCardHeading item={p} />
                    <ProductCardBlurb item={p} />
                    <span className="mt-auto pt-5 md:pt-6">
                      <span className="inline-flex h-11 min-w-[9.5rem] items-center justify-center gap-2 rounded-[var(--radius-ui)] border border-white/60 bg-white/35 px-5 font-sans text-[13px] font-semibold tracking-wide text-deep-graphite shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),inset_0_-2px_8px_rgba(228,86,42,0.08)] backdrop-blur-md transition-[background-color,border-color,color,box-shadow] duration-200 group-hover:border-amber-glow/50 group-hover:bg-amber-glow group-hover:text-canvas-white group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)] md:h-12 md:min-w-[10.5rem] md:text-[14px]">
                        Learn more
                        <span
                          className="text-amber-glow transition-colors duration-200 group-hover:text-canvas-white"
                          aria-hidden
                        >
                          →
                        </span>
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
