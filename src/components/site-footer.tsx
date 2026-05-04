import Image from "next/image";
import Link from "next/link";
import { Anton } from "next/font/google";
import type { ReactNode } from "react";
import { blogCategoryLinks, companyLinks, productLinks, solutionLinks } from "@/config/site-navigation";

const footerCtaDisplay = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const footerResourceLinks: { label: string; href: string }[] = [
  { label: "Resources hub", href: "/resources" },
  { label: "Blog", href: "/resources/blog" },
  { label: "Documentation", href: "/resources/documentation" },
  { label: "API docs", href: "/resources/documentation" },
];

function FooterColumn({
  title,
  children,
  ariaLabel,
}: {
  title: string;
  children: ReactNode;
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel} className="min-w-0">
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-glow">{title}</p>
      <ul className="mt-5 flex flex-col gap-3 font-sans text-[14px] font-medium leading-snug text-white/90">{children}</ul>
    </nav>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-amber-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-glow">
        {children}
      </Link>
    </li>
  );
}

export function SiteFooter() {
  const productCol = productLinks.filter((l) => !l.emphasis);

  return (
    <footer id="footer" className="border-t border-white/10 bg-black text-white">
      {/* CTA band — headline + primary / outline buttons */}
      <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 pb-12 pt-14 md:px-8 md:pb-14 md:pt-16">
        <h2
          className={`${footerCtaDisplay.className} max-w-[min(100%,48rem)] text-left font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white`}
        >
          <span className="block text-[clamp(2.15rem,6vw,4rem)]">
            Get advanced tools to run{" "}
            <span className="text-amber-glow">critical-infrastructure</span> dispatch
          </span>
        </h2>
        <p className="mt-6 max-w-[56ch] font-sans text-[clamp(1.1rem,2.35vw,1.35rem)] font-bold leading-[1.5] text-white/92 md:mt-8">
          Fault to engineer in minutes — on your monitoring stack. Book a founder-led walkthrough or explore the platform.
        </p>
        <div className="mt-9 flex flex-wrap gap-3 md:gap-4">
          <Link
            href="/company/contact"
            className="inline-flex min-h-[48px] min-w-[10rem] items-center justify-center rounded-lg bg-amber-glow px-6 font-sans text-[14px] font-semibold text-black shadow-[var(--shadow-sm)] transition-[filter] hover:brightness-110"
          >
            Book a Demo
          </Link>
          <Link
            href="/products/fsm-platform"
            className="inline-flex min-h-[48px] min-w-[10rem] items-center justify-center rounded-lg border border-white/35 bg-transparent px-6 font-sans text-[14px] font-semibold text-white transition-colors hover:border-amber-glow hover:bg-white/5 hover:text-amber-glow"
          >
            AI-Native Dispatch
          </Link>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" aria-hidden />

      {/* Four-column nav */}
      <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 py-12 md:px-8 md:py-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 md:gap-x-10 lg:gap-x-14">
          <FooterColumn title="Company" ariaLabel="Footer company">
            {companyLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
            <FooterLink href="/company">Company overview</FooterLink>
          </FooterColumn>

          <FooterColumn title="Product" ariaLabel="Footer products">
            <FooterLink href="/products">Platform overview</FooterLink>
            {productCol.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Solutions" ariaLabel="Footer solutions">
            <FooterLink href="/solutions">Solutions overview</FooterLink>
            {solutionLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Resources" ariaLabel="Footer resources">
            {footerResourceLinks.map((l) => (
              <FooterLink key={`${l.label}-${l.href}`} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
            {blogCategoryLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" aria-hidden />

      {/* Bottom promo row — spaced uppercase CTAs */}
      <div className="mx-auto flex w-full max-w-[var(--page-max-width)] flex-wrap items-center gap-x-10 gap-y-4 px-6 py-8 md:gap-x-14 md:px-8">
        <Link
          href="/company/contact"
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:text-amber-glow"
        >
          Book a demo
        </Link>
        <Link
          href="/#demo"
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:text-amber-glow"
        >
          See homepage demo
        </Link>
        <a
          href="mailto:hello@avishkar.ai"
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:text-amber-glow"
        >
          Email hello@avishkar.ai
        </a>
      </div>

      <div className="border-t border-white/10 bg-black">
        <div className="mx-auto flex w-full max-w-[var(--page-max-width)] flex-col gap-8 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-flex w-fit items-center gap-2.5">
              <Image
                src="/logo-avishkar.svg"
                alt="Avishkar AI"
                width={120}
                height={28}
                className="h-7 w-auto brightness-0 invert"
              />
            </Link>
            <p className="max-w-[36ch] font-sans text-[13px] leading-relaxed text-white/75">
              AI-native dispatch for critical infrastructure — ATMs, towers, and medical devices.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:items-end">
            <div className="flex flex-wrap gap-5 font-sans text-[12px] text-white/85">
              <a href="https://www.linkedin.com" className="transition-colors hover:text-amber-glow" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://twitter.com" className="transition-colors hover:text-amber-glow" rel="noreferrer">
                X / Twitter
              </a>
              <a href="https://www.youtube.com" className="transition-colors hover:text-amber-glow" rel="noreferrer">
                YouTube
              </a>
            </div>
            <div className="flex flex-wrap gap-6 font-sans text-[12px] text-white/85">
              <Link href="/privacy" className="transition-colors hover:text-amber-glow">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-amber-glow">
                Terms of Service
              </Link>
              <Link href="/cookies" className="transition-colors hover:text-amber-glow">
                Cookie Policy
              </Link>
            </div>
            <p className="font-sans text-[11px] text-white/55">
              © {new Date().getFullYear()} Avishkar AI · Anjaneya AI Technologies Pvt Ltd
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
