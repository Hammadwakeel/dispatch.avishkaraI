import type { DocPage } from "@/content/types";
import { type NavLink } from "@/config/site-navigation";
import { IndustryIPhoneHero } from "./industry-iphone-hero";

type IndustryMarketingPageProps = {
  doc: DocPage;
  slug: string;
  navItem: NavLink;
  initialFocus?: string;
};

export function IndustryMarketingPage({
  doc,
  slug,
  initialFocus,
}: IndustryMarketingPageProps) {
  return (
    <main className="relative flex-1 overflow-x-clip border-t border-light-steel bg-canvas-white">
      <IndustryIPhoneHero
        doc={doc}
        slug={slug}
        initialFocus={initialFocus}
      />
    </main>
  );
}