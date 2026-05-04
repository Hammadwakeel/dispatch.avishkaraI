"use client";

import Image from "next/image";
import Link from "next/link";
import { companyLinks, pricingNavItem, productLinks, solutionLinks } from "@/config/site-navigation";

const footerResourceLinks: { label: string; href: string }[] = [
  { label: "Blog", href: "/resources/blog" },
  { label: "Documentation", href: "/resources/documentation" },
  { label: "API docs", href: "/resources/documentation" },
  { label: "ROI calculator", href: "/resources/roi-calculator" },
  { label: "Comparison guide", href: "/resources/comparison-guide" },
  { label: "Webinars & events", href: "/resources/webinars" },
  { label: "Case studies", href: "/resources/blog/case-studies" },
];

export function SiteFooter() {
  const productCol = productLinks.filter((l) => !l.emphasis);

  return (
    <footer id="footer" className="border-t border-light-steel bg-gradient-to-b from-canvas-white to-harvest-cream/50 py-12 text-deep-graphite md:py-16">
      {/* Full-width inner container */}
      <div className="flex flex-col gap-10 px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Top section - Brand & Social */}
        <div className="grid gap-10 lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4 lg:flex lg:flex-col lg:items-start">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo-avishkar.svg"
                alt="Avishkar AI"
                width={120}
                height={28}
                className="h-7 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-[32ch] font-sans text-[14px] leading-relaxed text-muted-stone">
              Flagship brand of Anjaneya AI Technologies Pvt Ltd—AI-native field service management for operators worldwide.
            </p>
            <p className="mt-4 font-sans text-[13px] text-link-gray">
              <a href="mailto:hello@avishkar.ai" className="text-amber-glow hover:underline">
                hello@avishkar.ai
              </a>
            </p>
            <div className="mt-5 flex flex-wrap gap-5 font-sans text-[13px] text-muted-stone">
              <a href="https://www.linkedin.com" className="hover:text-amber-glow" rel="noreferrer" aria-label="LinkedIn">
                LinkedIn
              </a>
              <span className="text-light-steel">•</span>
              <a href="https://twitter.com" className="hover:text-amber-glow" rel="noreferrer" aria-label="X / Twitter">
                X / Twitter
              </a>
              <span className="text-light-steel">•</span>
              <a href="https://www.youtube.com" className="hover:text-amber-glow" rel="noreferrer" aria-label="YouTube">
                YouTube
              </a>
              <span className="text-light-steel">•</span>
              <a href="https://www.facebook.com" className="hover:text-amber-glow" rel="noreferrer" aria-label="Facebook">
                Facebook
              </a>
            </div>
          </div>

          {/* Link columns - equal width, full width */}
          <div className="lg:col-span-8 lg:grid lg:grid-cols-4 lg:gap-6">
            <nav aria-label="Footer products">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-glow">
                Products
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 font-sans text-[13px]">
                {productCol.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-link-gray hover:text-amber-glow transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-1">
                  <Link href="/products" className="font-medium text-amber-glow hover:underline">
                    View all →
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Footer solutions">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-glow">
                Solutions
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 font-sans text-[13px]">
                {solutionLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-link-gray hover:text-amber-glow transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer resources">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-glow">
                Resources
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 font-sans text-[13px]">
                {footerResourceLinks.map((l) => (
                  <li key={`${l.label}-${l.href}`}>
                    <Link href={l.href} className="text-link-gray hover:text-amber-glow transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer company">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-glow">
                Company
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 font-sans text-[13px]">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-link-gray hover:text-amber-glow transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={pricingNavItem.href} className="text-link-gray hover:text-amber-glow transition-colors">
                    {pricingNavItem.label}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom section - Copyright & Legal */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-light-steel/60 pt-8 sm:flex-row">
          <p className="font-sans text-[12px] text-muted-stone">
            © {new Date().getFullYear()} Avishkar AI. All rights reserved. A product of Anjaneya AI Technologies Pvt Ltd.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 font-sans text-[12px] text-muted-stone">
            <Link href="/privacy" className="hover:text-amber-glow transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-amber-glow transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-amber-glow transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}