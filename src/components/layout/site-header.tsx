"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { headerDropdowns, pricingNavItem, type NavLink } from "@/config/site-navigation";

/** `overflow-visible` so mega-menu panels are not clipped by the pill shape */
const glassSurface =
  "relative z-10 overflow-visible border border-white/70 bg-white/25 shadow-[0_10px_44px_-14px_rgba(228,86,42,0.26),inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-xl";

const barSheen = (
  <>
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(155deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.14)_40%,rgba(255,255,255,0.03)_52%,transparent_56%)]" />
    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.92)_42%,rgba(255,255,255,0.92)_58%,transparent)] opacity-90" />
  </>
);

const dropdownPanelClass =
  "absolute left-0 top-full z-[100] mt-1.5 min-w-[17.5rem] max-h-[min(70vh,24rem)] overflow-y-auto rounded-[var(--radius-card)] border border-light-steel bg-canvas-white py-2 shadow-[0_18px_40px_-12px_rgba(29,30,28,0.18)]";

const homeJumpLinkClass =
  "shrink-0 whitespace-nowrap rounded-[var(--radius-ui)] px-3 py-1.5 font-mono text-[14px] font-normal text-deep-graphite/90 transition-colors hover:bg-white/35 hover:text-deep-graphite md:px-3.5 md:py-2 md:text-[15px]";

const dropdownLinkClass = (emphasis?: boolean) =>
  `block px-4 py-2.5 text-left font-mono text-[14px] leading-snug transition-colors hover:bg-warm-linen md:px-5 md:py-2.5 ${
    emphasis ? "font-semibold text-amber-glow" : "text-link-gray hover:text-deep-graphite"
  }`;

function DesktopDropdown({ label, links }: { label: string; links: NavLink[] }) {
  return (
    <details
      data-nav-dropdown
      className="group relative"
      onToggle={(e) => {
        const el = e.currentTarget;
        if (!el.open) return;
        el.parentElement
          ?.querySelectorAll("details[data-nav-dropdown]")
          .forEach((d) => {
            if (d !== el) (d as HTMLDetailsElement).open = false;
          });
      }}
    >
      <summary className="flex cursor-pointer list-none items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-ui)] px-3 py-1.5 font-mono text-[14px] font-normal text-deep-graphite/90 outline-none ring-amber-glow/0 transition-[color,background-color,box-shadow] hover:bg-white/35 hover:text-deep-graphite focus-visible:ring-2 md:px-3.5 md:py-2 md:text-[15px] [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown
          className="size-[1.05rem] shrink-0 opacity-70 transition-transform group-open:rotate-180 md:size-4"
          aria-hidden
        />
      </summary>
      <div className={dropdownPanelClass} role="menu" aria-label={label}>
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            className={dropdownLinkClass(item.emphasis)}
            onClick={(e) => {
              const d = (e.currentTarget as HTMLElement).closest("details");
              if (d) (d as HTMLDetailsElement).open = false;
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header id="site-header-root" className="sticky top-0 z-50 px-3 pb-2 pt-2.5 sm:px-5 md:px-8 md:pb-2.5 md:pt-3">
      <div className="relative mx-auto w-full max-w-[min(100%,92rem)] xl:max-w-[min(100%,96rem)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[3%] bottom-0 top-2 z-0 rounded-[999px] bg-amber-glow/44 blur-[24px] md:inset-x-[4%] md:blur-[26px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[16%] bottom-0 top-[40%] z-0 rounded-full bg-amber-glow/28 blur-2xl md:inset-x-[18%]"
        />

        <motion.div
          className={`${glassSurface} rounded-[999px]`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {barSheen}
          <div className="relative flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-3 py-2 sm:gap-x-5 sm:px-5 sm:py-2 md:gap-x-6 md:gap-y-2 md:px-8 md:py-2.5 lg:gap-x-8 lg:px-10 xl:px-12">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2.5 text-deep-graphite transition-opacity hover:opacity-85"
              style={{ transitionDuration: "var(--transition-interactive)" }}
            >
              <Image
                src="/logo-avishkar.svg"
                alt="Avishkar AI"
                width={132}
                height={32}
                priority
                className="h-6 w-auto sm:h-7 md:h-7"
              />
            </Link>

            <nav
              className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-2 gap-y-1.5 md:flex md:gap-x-3 lg:gap-x-4 xl:gap-x-5"
              aria-label="Primary"
            >
              {headerDropdowns.map((d) => (
                <DesktopDropdown key={d.label} label={d.label} links={d.children} />
              ))}
              <span
                className="hidden h-5 w-px shrink-0 bg-light-steel/80 sm:block md:mx-1 lg:mx-1.5"
                aria-hidden
              />
              <Link href={pricingNavItem.href} className={homeJumpLinkClass}>
                {pricingNavItem.label}
              </Link>
            </nav>

            <div className="flex shrink-0 items-center gap-2 md:gap-3">
              <Link
                href="/company/contact"
                className="hidden items-center justify-center whitespace-nowrap rounded-[var(--radius-ui)] border border-white/55 bg-white/35 px-3 py-2 font-mono text-[12px] font-medium text-deep-graphite shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md transition-[border-color,background-color] hover:border-white/75 hover:bg-white/45 sm:inline-flex md:px-4 md:py-2 md:text-[13px] lg:text-[14px]"
                style={{ transitionDuration: "var(--transition-interactive)" }}
              >
                Get started
              </Link>
              <Link
                href="/#demo"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-ui)] bg-gradient-to-r from-blue-600 to-blue-900 px-3 py-2 font-mono text-[12px] font-semibold text-white shadow-[0_6px_20px_-6px_rgba(37,99,235,0.55)] hover:brightness-[1.05] md:px-4 md:py-2 md:text-[13px] lg:text-[14px]"
                style={{ transitionDuration: "var(--transition-interactive)" }}
              >
                Book demo
              </Link>

              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-[var(--radius-ui)] border border-white/55 bg-white/35 text-deep-graphite shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-md hover:bg-white/50 md:hidden"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((o) => !o)}
                style={{ transitionDuration: "var(--transition-interactive)" }}
              >
                {mobileOpen ? (
                  <X className="size-5" strokeWidth={2} />
                ) : (
                  <Menu className="size-5" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {mobileOpen ? (
          <div className="relative mt-3 max-h-[min(78vh,32rem)] overflow-y-auto md:hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[8%] bottom-0 top-6 z-0 rounded-3xl bg-amber-glow/38 blur-[22px]"
            />
            <div id="mobile-nav" className={`${glassSurface} rounded-3xl`}>
              {barSheen}
              <nav className="relative flex flex-col gap-2 px-4 py-4" aria-label="Mobile primary">
                {headerDropdowns.map((d) => (
                  <details key={d.label} className="group rounded-xl border border-light-steel/60 bg-white/20">
                    <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 font-mono text-[15px] text-deep-graphite [&::-webkit-details-marker]:hidden">
                      {d.label}
                      <ChevronDown className="size-4 shrink-0 opacity-70 group-open:rotate-180" aria-hidden />
                    </summary>
                    <div className="border-t border-light-steel/50 pb-2 pt-2">
                      {d.children.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-5 py-3 font-mono text-[14px] leading-relaxed ${
                            item.emphasis ? "font-semibold text-amber-glow" : "text-link-gray"
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ))}
                <Link
                  href={pricingNavItem.href}
                  className="rounded-xl px-3 py-3.5 font-mono text-[15px] text-deep-graphite hover:bg-white/35"
                  onClick={() => setMobileOpen(false)}
                >
                  {pricingNavItem.label}
                </Link>
                <div className="mt-3 flex flex-col gap-3 border-t border-light-steel/60 pt-4">
                  <Link
                    href="/company/contact"
                    className="inline-flex items-center justify-center rounded-[var(--radius-ui)] border border-white/55 bg-white/35 px-4 py-3 font-mono text-[14px] font-medium text-deep-graphite"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get started
                  </Link>
                  <Link
                    href="/#demo"
                    className="inline-flex items-center justify-center rounded-[var(--radius-ui)] bg-gradient-to-r from-blue-600 to-blue-900 px-4 py-3 font-mono text-[14px] font-semibold text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    Book demo
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
