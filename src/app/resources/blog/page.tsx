import Link from "next/link";
import { blogCategoryLinks } from "@/config/site-navigation";

export default function BlogHubPage() {
  return (
    <main className="flex-1 border-t border-light-steel bg-canvas-white px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[var(--page-max-width)]">
        <h1 className="font-serif text-[36px] font-normal text-deep-graphite md:text-[48px]">
          Blog
        </h1>
        <p className="mt-4 max-w-[52ch] font-sans text-muted-stone md:text-[17px]">
          Long-form guides, benchmarks, and release notes from the Avishkar AI
          team.
        </p>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {blogCategoryLinks.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="block rounded-[var(--radius-card)] border border-light-steel bg-harvest-cream/70 px-5 py-4 font-sans text-[15px] text-deep-graphite transition-colors hover:border-amber-glow/40 hover:bg-harvest-cream"
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
