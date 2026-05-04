"use client";

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BookMarked,
  BookOpen,
  Briefcase,
  Building,
  Building2,
  Calculator,
  Camera,
  ChevronDown,
  ChevronRight,
  Droplets,
  Factory,
  FileText,
  Gauge,
  Handshake,
  Home,
  Landmark,
  LayoutDashboard,
  LayoutGrid,
  Mail,
  Megaphone,
  Menu,
  Newspaper,
  Phone,
  Scale,
  Siren,
  Sparkles,
  Thermometer,
  TrendingUp,
  Users,
  Video,
  Waypoints,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  headerDropdowns,
  pricingNavItem,
  type MegaMenuIconId,
  type NavDropdown,
  type NavLink,
} from "@/config/site-navigation";

const megaIconMap: Record<MegaMenuIconId, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  phone: Phone,
  camera: Camera,
  gauge: Gauge,
  waypoints: Waypoints,
  "layout-grid": LayoutGrid,
  thermometer: Thermometer,
  droplets: Droplets,
  zap: Zap,
  home: Home,
  "building-2": Building2,
  siren: Siren,
  factory: Factory,
  landmark: Landmark,
  "book-open": BookOpen,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
  "file-text": FileText,
  megaphone: Megaphone,
  "book-marked": BookMarked,
  calculator: Calculator,
  scale: Scale,
  video: Video,
  building: Building,
  users: Users,
  briefcase: Briefcase,
  handshake: Handshake,
  newspaper: Newspaper,
  mail: Mail,
};

/** `overflow-visible` so mega-menu panels are not clipped by the pill shape */
const glassSurface =
  "relative z-10 overflow-visible border border-white/70 bg-white/25 shadow-[0_10px_44px_-14px_rgba(234,88,12,0.22),inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-xl";

const barSheen = (
  <>
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(155deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.14)_40%,rgba(255,255,255,0.03)_52%,transparent_56%)]" />
    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.92)_42%,rgba(255,255,255,0.92)_58%,transparent)] opacity-90" />
  </>
);

const homeJumpLinkClass =
  "shrink-0 whitespace-nowrap rounded-[var(--radius-ui)] px-3 py-1.5 font-sans text-[14px] font-normal text-deep-graphite/90 transition-colors hover:bg-white/35 hover:text-deep-graphite md:px-3.5 md:py-2 md:text-[15px]";

function MegaNavTile({ item, onPick }: { item: NavLink; onPick: () => void }) {
  const Icon: LucideIcon = item.icon ? megaIconMap[item.icon] : LayoutGrid;
  return (
    <Link
      href={item.href}
      onClick={onPick}
      className={`group flex flex-col gap-4 rounded-xl border border-transparent p-4 transition-[border-color,background-color,box-shadow] duration-200 hover:border-amber-glow/25 hover:bg-[color-mix(in_srgb,var(--color-canvas-white)_88%,var(--color-amber-glow)_12%)] hover:shadow-[0_12px_36px_-20px_rgba(234,88,12,0.12)] md:p-5 ${
        item.emphasis ? "bg-[color-mix(in_srgb,var(--color-canvas-white)_82%,var(--color-amber-glow)_18%)] ring-1 ring-amber-glow/25" : ""
      }`}
    >
      <Icon
        className="size-7 shrink-0 text-deep-graphite/45 stroke-[1.35] transition-colors group-hover:text-amber-glow"
        aria-hidden
      />
      <div className="min-w-0">
        <span
          className={`font-serif text-[17px] leading-snug tracking-[-0.02em] text-deep-graphite transition-colors group-hover:text-amber-glow md:text-[18px] ${
            item.emphasis ? "font-semibold" : "font-normal"
          }`}
        >
          {item.label}
        </span>
        {item.description ? (
          <p className="mt-2 font-sans text-[13px] leading-relaxed text-muted-stone md:text-[14px]">
            {item.description}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

function DesktopMegaNavDropdown({ dropdown }: { dropdown: NavDropdown }) {
  const { label, children, megaTitle, megaSubtitle, megaHref } = dropdown;
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = `nav-menu-${label.replace(/\s+/g, "-").toLowerCase()}`;

  const cancelClose = () => {
    if (closeTimer.current != null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  };

  const openNow = () => {
    cancelClose();
    setOpen(true);
  };

  const closeNow = () => {
    cancelClose();
    setOpen(false);
  };

  return (
    <div
      data-nav-dropdown
      className="relative pb-2"
      onMouseEnter={openNow}
      onFocusCapture={openNow}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (next && (e.currentTarget as HTMLElement).contains(next)) return;
        scheduleClose();
      }}
    >
      <button
        type="button"
        className={`relative flex w-full cursor-default list-none items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-ui)] px-3 py-1.5 text-left font-sans text-[14px] font-normal text-deep-graphite/90 outline-none ring-amber-glow/0 transition-[color,background-color,box-shadow] hover:bg-white/35 hover:text-deep-graphite focus-visible:ring-2 md:px-3.5 md:py-2 md:text-[15px] ${
          open ? "text-deep-graphite" : ""
        } ${open ? "after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-amber-glow" : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        onMouseLeave={scheduleClose}
      >
        {label}
        <ChevronDown
          className={`size-[1.05rem] shrink-0 opacity-70 transition-transform duration-200 md:size-4 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.nav
            key={menuId}
            id={menuId}
            aria-label={label}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-[4.5rem] z-[100] max-h-[min(calc(100vh-5.5rem),78vh)] w-[min(calc(100vw-2rem),72rem)] -translate-x-1/2 overflow-y-auto overscroll-contain rounded-2xl border border-light-steel bg-canvas-white p-8 pt-7 shadow-[0_28px_80px_-28px_rgba(29,30,28,0.22)] sm:top-[4.75rem] sm:p-9 sm:pt-8 md:top-[5rem] md:p-10 md:pt-9"
            onMouseEnter={openNow}
            onMouseLeave={scheduleClose}
          >
            <div className="mb-10 border-b border-light-steel pb-8 md:mb-12 md:pb-10">
              {megaHref ? (
                <Link
                  href={megaHref}
                  className="group inline-flex items-center gap-1.5 font-serif text-[clamp(1.25rem,2.2vw,1.75rem)] font-normal tracking-[-0.03em] text-deep-graphite transition-colors hover:text-amber-glow"
                  onClick={closeNow}
                >
                  <span>{megaTitle}</span>
                  <ChevronRight
                    className="size-5 shrink-0 opacity-80 transition-transform duration-200 group-hover:translate-x-0.5 md:size-6"
                    aria-hidden
                  />
                </Link>
              ) : (
                <p className="font-serif text-[clamp(1.25rem,2.2vw,1.75rem)] tracking-[-0.03em] text-deep-graphite">
                  {megaTitle}
                </p>
              )}
              <p className="mt-2 max-w-[52ch] font-sans text-[13px] leading-relaxed text-muted-stone md:text-[14px]">
                {megaSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
              {children.map((item) => (
                <MegaNavTile key={item.href} item={item} onPick={closeNow} />
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header id="site-header-root" className="sticky top-0 z-50 px-3 pb-2 pt-2.5 sm:px-5 md:px-8 md:pb-2.5 md:pt-3">
      <div className="relative mx-auto w-full max-w-[min(100%,92rem)] xl:max-w-[min(100%,96rem)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[3%] bottom-0 top-2 z-0 rounded-[999px] bg-[#ea580c]/32 blur-[24px] md:inset-x-[4%] md:blur-[26px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[16%] bottom-0 top-[40%] z-0 rounded-full bg-[#c2410c]/24 blur-2xl md:inset-x-[18%]"
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
                <DesktopMegaNavDropdown key={d.label} dropdown={d} />
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
                className="hidden items-center justify-center whitespace-nowrap rounded-[var(--radius-ui)] border border-white/55 bg-white/35 px-3 py-2 font-sans text-[12px] font-medium text-deep-graphite shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md transition-[border-color,background-color] hover:border-white/75 hover:bg-white/45 sm:inline-flex md:px-4 md:py-2 md:text-[13px] lg:text-[14px]"
                style={{ transitionDuration: "var(--transition-interactive)" }}
              >
                Get started
              </Link>
              <Link
                href="/#demo"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-ui)] bg-gradient-to-r from-amber-glow to-[#c2410c] px-3 py-2 font-sans text-[12px] font-semibold text-canvas-white shadow-[0_8px_24px_-8px_rgba(234,88,12,0.45)] hover:brightness-[1.05] md:px-4 md:py-2 md:text-[13px] lg:text-[14px]"
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
              className="pointer-events-none absolute inset-x-[8%] bottom-0 top-6 z-0 rounded-3xl bg-[#ea580c]/28 blur-[22px]"
            />
            <div id="mobile-nav" className={`${glassSurface} rounded-3xl`}>
              {barSheen}
              <nav className="relative flex flex-col gap-2 px-4 py-4" aria-label="Mobile primary">
                {headerDropdowns.map((d) => (
                  <details key={d.label} className="group rounded-xl border border-light-steel/60 bg-white/20">
                    <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 font-sans text-[15px] text-deep-graphite [&::-webkit-details-marker]:hidden">
                      {d.label}
                      <ChevronDown className="size-4 shrink-0 opacity-70 group-open:rotate-180" aria-hidden />
                    </summary>
                    <div className="border-t border-light-steel/50 pb-2 pt-2">
                      {d.children.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-5 py-3 font-sans text-[14px] leading-relaxed ${
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
                  className="rounded-xl px-3 py-3.5 font-sans text-[15px] text-deep-graphite hover:bg-white/35"
                  onClick={() => setMobileOpen(false)}
                >
                  {pricingNavItem.label}
                </Link>
                <div className="mt-3 flex flex-col gap-3 border-t border-light-steel/60 pt-4">
                  <Link
                    href="/company/contact"
                    className="inline-flex items-center justify-center rounded-[var(--radius-ui)] border border-white/55 bg-white/35 px-4 py-3 font-sans text-[14px] font-medium text-deep-graphite"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get started
                  </Link>
                  <Link
                    href="/#demo"
                    className="inline-flex items-center justify-center rounded-[var(--radius-ui)] bg-gradient-to-r from-amber-glow to-[#c2410c] px-4 py-3 font-sans text-[14px] font-semibold text-canvas-white shadow-[0_8px_24px_-8px_rgba(234,88,12,0.4)]"
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
