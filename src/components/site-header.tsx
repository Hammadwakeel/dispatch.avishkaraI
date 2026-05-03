"use client";

import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  Menu,
  MessageSquare,
  Package,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const navLinkClass =
  "flex items-center gap-2 rounded-[var(--radius-ui)] px-2 py-2 font-mono text-[16px] font-normal leading-none text-deep-graphite/85 decoration-soft-fog underline-offset-[6px] transition-colors hover:bg-white/30 hover:text-deep-graphite hover:underline";

const glassSurface =
  "relative z-10 overflow-hidden border border-white/70 bg-white/25 shadow-[0_10px_44px_-14px_rgba(250,93,0,0.26),inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-xl";

const barSheen = (
  <>
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(155deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.14)_40%,rgba(255,255,255,0.03)_52%,transparent_56%)]" />
    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.92)_42%,rgba(255,255,255,0.92)_58%,transparent)] opacity-90" />
  </>
);

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 pb-2 md:px-8 md:pb-3 md:pt-4">
      <div className="relative mx-auto w-full max-w-[var(--page-max-width)]">
        {/* Orange glow behind navbar */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[4%] bottom-0 top-3 z-0 rounded-[999px] bg-amber-glow/44 blur-[26px] md:inset-x-[6%] md:blur-[28px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[18%] bottom-0 top-[45%] z-0 rounded-full bg-amber-glow/28 blur-2xl md:inset-x-[22%]"
        />

        <motion.div
          className={`${glassSurface} rounded-full`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {barSheen}
          <div className="relative flex items-center justify-between gap-3 px-4 py-3 md:gap-4 md:px-6 md:py-3.5">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2.5 text-deep-graphite transition-opacity hover:opacity-75"
              style={{ transitionDuration: "var(--transition-interactive)" }}
            >
              <span className="flex size-9 items-center justify-center rounded-[var(--radius-ui)] border border-white/35 bg-deep-graphite/95 text-canvas-white shadow-[var(--shadow-sm),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm">
                <Sparkles className="size-[18px] text-amber-glow" strokeWidth={2} aria-hidden />
              </span>
              <span className="font-mono text-[15px] font-medium tracking-tight md:text-[16px]">
                AvishkarAI
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex lg:gap-2">
              <a href="#product" className={navLinkClass}>
                <Package className="size-4 shrink-0 text-muted-stone" aria-hidden />
                Product
              </a>
              <a href="#how-it-works" className={navLinkClass}>
                <Workflow className="size-4 shrink-0 text-muted-stone" aria-hidden />
                How it works
              </a>
              <a href="#trust" className={navLinkClass}>
                <BadgeCheck className="size-4 shrink-0 text-muted-stone" aria-hidden />
                Why us
              </a>
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <a
                href="#demo"
                className="hidden items-center gap-2 rounded-[var(--radius-ui)] border border-white/55 bg-white/35 px-4 py-2.5 font-mono text-[13px] font-medium text-deep-graphite shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md hover:border-white/75 hover:bg-white/45 sm:inline-flex md:text-[14px]"
                style={{ transitionDuration: "var(--transition-interactive)" }}
              >
                <MessageSquare className="size-4 shrink-0 text-muted-stone" aria-hidden />
                Talk to sales
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-[var(--radius-ui)] bg-amber-glow px-4 py-2.5 font-mono text-[13px] font-semibold text-canvas-white shadow-[0_4px_20px_-6px_rgba(250,93,0,0.55),var(--shadow-sm)] hover:brightness-[1.03] md:text-[14px]"
                style={{ transitionDuration: "var(--transition-interactive)" }}
              >
                <CalendarDays className="size-4 shrink-0 opacity-95" aria-hidden />
                Book a demo
              </a>

              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-[var(--radius-ui)] border border-white/55 bg-white/35 text-deep-graphite shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-md hover:bg-white/50 md:hidden"
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
          <div className="relative mt-3 md:hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[8%] bottom-0 top-6 z-0 rounded-3xl bg-amber-glow/38 blur-[22px]"
            />
            <div id="mobile-nav" className={`${glassSurface} rounded-3xl`}>
              {barSheen}
              <nav className="relative flex flex-col gap-0.5 px-4 py-3">
                <a
                  href="#product"
                  className={`${navLinkClass} rounded-xl py-3`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Package className="size-4 shrink-0 text-muted-stone" aria-hidden />
                  Product
                </a>
                <a
                  href="#how-it-works"
                  className={`${navLinkClass} rounded-xl py-3`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Workflow className="size-4 shrink-0 text-muted-stone" aria-hidden />
                  How it works
                </a>
                <a
                  href="#trust"
                  className={`${navLinkClass} rounded-xl py-3`}
                  onClick={() => setMobileOpen(false)}
                >
                  <BadgeCheck className="size-4 shrink-0 text-muted-stone" aria-hidden />
                  Why us
                </a>
                <a
                  href="#demo"
                  className={`${navLinkClass} rounded-xl py-3`}
                  onClick={() => setMobileOpen(false)}
                >
                  <MessageSquare className="size-4 shrink-0 text-muted-stone" aria-hidden />
                  Talk to sales
                </a>
              </nav>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
