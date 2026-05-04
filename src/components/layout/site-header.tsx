"use client";

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BookMarked,
  BookOpen,
  Building,
  Camera,
  ChevronDown,
  ChevronRight,
  Factory,
  FileText,
  Gauge,
  Landmark,
  LayoutDashboard,
  LayoutGrid,
  Mail,
  Megaphone,
  Menu,
  Thermometer,
  TrendingUp,
  Waypoints,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  headerDropdowns,
  type MegaMenuIconId,
  type NavDropdown,
  type NavLink,
} from "@/config/site-navigation";

const megaIconMap: Record<MegaMenuIconId, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  camera: Camera,
  gauge: Gauge,
  waypoints: Waypoints,
  "layout-grid": LayoutGrid,
  factory: Factory,
  landmark: Landmark,
  thermometer: Thermometer,
  "book-open": BookOpen,
  "trending-up": TrendingUp,
  "file-text": FileText,
  megaphone: Megaphone,
  "book-marked": BookMarked,
  building: Building,
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

function MegaNavTile({ item, onPick }: { item: NavLink; onPick: () => void }) {
  const Icon: LucideIcon = item.icon ? megaIconMap[item.icon] : LayoutGrid;
  return (
    <Link
      href={item.href}
      onClick={onPick}
      className={`group flex flex-row items-start gap-2.5 rounded-xl border border-transparent p-3 transition-[border-color,background-color,box-shadow] duration-200 hover:border-amber-glow/35 hover:bg-[color-mix(in_srgb,var(--color-canvas-white)_85%,var(--color-amber-glow)_15%)] hover:shadow-[0_8px_28px_-16px_rgba(234,88,12,0.18)] md:gap-3 md:p-3.5 ${
        item.emphasis ? "bg-[color-mix(in_srgb,var(--color-canvas-white)_78%,var(--color-amber-glow)_22%)] ring-1 ring-amber-glow/30" : ""
      }`}
    >
      <Icon
        className="mt-0.5 size-6 shrink-0 text-amber-glow stroke-[1.5] transition-colors group-hover:text-[#c2410c] md:size-7"
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <span
          className={`font-serif text-[16px] leading-snug tracking-[-0.02em] text-deep-graphite transition-colors group-hover:text-amber-glow md:text-[17px] ${
            item.emphasis ? "font-semibold text-amber-glow group-hover:text-[#c2410c]" : "font-normal"
          }`}
        >
          {item.label}
        </span>
        {item.description ? (
          <p className="mt-1 font-sans text-[12px] leading-snug text-muted-stone md:text-[13px] md:leading-relaxed">
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
      className="relative pb-1"
      onMouseEnter={openNow}
      onFocusCapture={openNow}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (next && (e.currentTarget as HTMLElement).contains(next)) return;
        scheduleClose();
      }}
    >
      {megaHref ? (
        <Link
          href={megaHref}
          className={`relative flex w-full cursor-default list-none items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-ui)] px-3 py-1.5 font-sans text-[14px] font-medium text-deep-graphite/90 outline-none ring-amber-glow/0 transition-[color,background-color,box-shadow] hover:bg-white/35 hover:text-amber-glow md:px-3.5 md:py-2 md:text-[15px] ${
            open ? "text-amber-glow" : ""
          } ${open ? "after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-amber-glow" : ""}`}
          onMouseEnter={openNow}
          onMouseLeave={scheduleClose}
        >
          {label}
          <ChevronDown
            className={`size-4 shrink-0 text-amber-glow opacity-95 transition-transform duration-200 md:size-[1.05rem] ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </Link>
      ) : (
        <button
          type="button"
          className={`relative flex w-full cursor-default list-none items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-ui)] px-3 py-1.5 text-left font-sans text-[14px] font-medium text-deep-graphite/90 outline-none ring-amber-glow/0 transition-[color,background-color,box-shadow] hover:bg-white/35 hover:text-amber-glow focus-visible:ring-2 md:px-3.5 md:py-2 md:text-[15px] ${
            open ? "text-amber-glow" : ""
          } ${open ? "after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-amber-glow" : ""}`}
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
          onMouseLeave={scheduleClose}
        >
          {label}
          <ChevronDown
            className={`size-4 shrink-0 text-amber-glow opacity-95 transition-transform duration-200 md:size-[1.05rem] ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      )}

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
            className="fixed left-1/2 top-[5rem] z-[100] max-h-[min(calc(100vh-6rem),78vh)] w-[min(calc(100vw-2rem),72rem)] -translate-x-1/2 overflow-y-auto overscroll-contain rounded-2xl border border-light-steel bg-canvas-white p-6 pt-5 shadow-[0_28px_80px_-28px_rgba(29,30,28,0.22)] sm:top-[5.25rem] sm:p-7 sm:pt-6 md:top-[5.5rem] md:p-8 md:pt-7"
            onMouseEnter={openNow}
            onMouseLeave={scheduleClose}
          >
            <div className="mb-5 border-b border-amber-glow/15 pb-5 md:mb-6 md:pb-6">
              {megaHref ? (
                <Link
                  href={megaHref}
                  className="group inline-flex items-center gap-2 font-serif text-[clamp(1.2rem,2.1vw,1.65rem)] font-normal tracking-[-0.03em] text-amber-glow transition-colors hover:text-[#c2410c]"
                  onClick={closeNow}
                >
                  <span>{megaTitle}</span>
                  <ChevronRight
                    className="size-5 shrink-0 text-amber-glow transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#c2410c] md:size-6"
                    aria-hidden
                  />
                </Link>
              ) : (
                <p className="font-serif text-[clamp(1.2rem,2.1vw,1.65rem)] tracking-[-0.03em] text-amber-glow">
                  {megaTitle}
                </p>
              )}
              <p className="mt-2 max-w-[52ch] font-sans text-[13px] leading-relaxed text-muted-stone md:text-[14px]">
                {megaSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 sm:gap-y-5 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-5">
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
    <header id="site-header-root" className="sticky top-0 z-50 px-3 pb-2 pt-3 sm:px-5 md:px-8 md:pb-2.5 md:pt-3.5">
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
          <div className="relative flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-2.5 sm:gap-x-4 sm:px-5 sm:py-3 md:gap-x-6 md:gap-y-2 md:px-8 md:py-3 lg:gap-x-8 lg:px-10 xl:px-12">
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
                className="h-7 w-auto sm:h-8 md:h-8"
              />
            </Link>

            <nav
              className="hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-2 gap-y-1.5 md:flex md:gap-x-3 lg:gap-x-4 xl:gap-x-5"
              aria-label="Primary"
            >
              {headerDropdowns.map((d) => (
                <DesktopMegaNavDropdown key={d.label} dropdown={d} />
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-2 md:gap-3">
              <Link
                href="/#demo"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-ui)] bg-gradient-to-r from-amber-glow to-[#c2410c] px-4 py-2 font-sans text-[13px] font-semibold text-canvas-white shadow-[0_8px_24px_-8px_rgba(234,88,12,0.45)] hover:brightness-[1.05] md:px-5 md:py-2.5 md:text-[14px] lg:text-[15px]"
                style={{ transitionDuration: "var(--transition-interactive)" }}
              >
                Book Demo
              </Link>

              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-[var(--radius-ui)] border border-white/55 bg-white/35 text-amber-glow shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-md hover:bg-white/50 md:hidden"
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
                    <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-sans text-[15px] font-medium text-deep-graphite [&::-webkit-details-marker]:hidden">
                      {d.label}
                      <ChevronDown
                        className="size-4 shrink-0 text-amber-glow opacity-95 group-open:rotate-180"
                        aria-hidden
                      />
                    </summary>
                    <div className="border-t border-amber-glow/10 pb-2 pt-2">
                      {d.children.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-5 py-2.5 font-sans text-[14px] leading-relaxed transition-colors hover:text-amber-glow ${
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
                <div className="mt-3 flex flex-col gap-3 border-t border-light-steel/60 pt-4">
                  <Link
                    href="/#demo"
                    className="inline-flex items-center justify-center rounded-[var(--radius-ui)] bg-gradient-to-r from-amber-glow to-[#c2410c] px-4 py-3 font-sans text-[14px] font-semibold text-canvas-white shadow-[0_8px_24px_-8px_rgba(234,88,12,0.4)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Book Demo
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
