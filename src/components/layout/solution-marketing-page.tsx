import type { DocPage } from "@/content/types";
import { type NavLink } from "@/config/site-navigation";
import { SolutionMacInteractiveHero } from "./solution-mac-interactive-hero";

type SolutionMarketingPageProps = {
  doc: DocPage;
  slug: string;
  navItem: NavLink;
  /** Opens the Mac tab whose heading slug matches `?focus=` */
  initialMacFocus?: string;
};

export function SolutionMarketingPage({
  doc,
  slug,
  initialMacFocus,
}: SolutionMarketingPageProps) {
  return (
    <main className="relative flex-1 overflow-x-clip border-t border-light-steel bg-canvas-white">
      <article className="mx-auto w-full max-w-[var(--page-max-width)] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:py-12">
        <SolutionMacInteractiveHero
          doc={doc}
          slug={slug}
          initialMacFocus={initialMacFocus}
        />
      </article>
    </main>
  );
}