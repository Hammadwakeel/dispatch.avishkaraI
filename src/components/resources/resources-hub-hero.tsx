"use client";

import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import type { LucideIcon } from "lucide-react";
import { BookMarked, BookOpen, FileText, Megaphone, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import type { MegaMenuIconId } from "@/config/site-navigation";
import type { NavLink } from "@/config/site-navigation";
import { resourcesMegaLinks } from "@/config/site-navigation";

const HERO_JUMP_LINKS = [
  { href: "#browse-resources", label: "Resource library" },
  { href: "#resources-support-hub", label: "Docs & media hub" },
] as const;

const megaIconMap: Partial<Record<MegaMenuIconId, LucideIcon>> = {
  "book-open": BookOpen,
  "file-text": FileText,
  "book-marked": BookMarked,
  "trending-up": TrendingUp,
  megaphone: Megaphone,
};

const ORBIT_HREFS = [
  "/resources/blog",
  "/resources/blog/industry-trends",
  "/resources/blog/case-studies",
  "/resources/blog/product-updates",
  "/resources/documentation",
] as const;

/** Five orbit tiles — articles, success stories, docs, tools, events (Dispatch-style hub). */
const ORBIT_LINK_ORDER: NavLink[] = ORBIT_HREFS.map((href) => {
  const link = resourcesMegaLinks.find((l) => l.href === href);
  if (!link) throw new Error(`Missing resources mega link: ${href}`);
  return link;
});

function heroScrollProgress(lenis: Lenis, heroEl: HTMLElement): number {
  const scroll = lenis.scroll;
  const innerH = window.innerHeight;
  const top = heroEl.getBoundingClientRect().top + scroll;
  const height = heroEl.offsetHeight;
  const travel = Math.max(1, height + innerH * 0.35);
  let p = (scroll - top + innerH * 0.25) / travel;
  return Math.max(0, Math.min(1, p));
}

export function ResourcesHubHero() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);

  const sync = useCallback(
    (lenis: Lenis) => {
      const el = heroRef.current;
      if (!el || reduceMotion) return;
      progress.set(heroScrollProgress(lenis, el));
    },
    [progress, reduceMotion],
  );

  useLenis(sync, [reduceMotion]);

  const lenisInstance = useLenis();
  useEffect(() => {
    if (lenisInstance && !reduceMotion) sync(lenisInstance);
  }, [lenisInstance, reduceMotion, sync]);

  const orbitY = useTransform(progress, [0, 0.55, 1], [0, -20, -36]);
  const orbitDrift = useTransform(progress, [0, 1], [0, -5]);

  const viewBox = 200;
  const innerR = 48;
  const outerR = 76;
  const cardR = 82;

  return (
    <header
      ref={heroRef}
      className="relative overflow-hidden border-b border-light-steel/80 bg-canvas-white"
    >
      {/* Left-column geometric backdrop (soft grid / map hint) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(228,86,42,0.04) 1px, transparent 1px),
            linear-gradient(rgba(228,86,42,0.035) 1px, transparent 1px),
            radial-gradient(ellipse 75% 55% at 12% 35%, rgba(228,86,42,0.07), transparent 52%),
            radial-gradient(ellipse 50% 45% at 88% 78%, rgba(245,158,11,0.06), transparent 48%)
          `,
          backgroundSize: "28px 28px, 28px 28px, auto, auto",
        }}
      />

      <div className="relative mx-auto max-w-[var(--page-max-width)] px-6 py-14 md:px-8 md:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Copy column */}
          <div className="relative z-[1]">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-glow md:text-[12px]">
              Avishkar resources hub
            </p>
            <h1 className="mt-4 font-sans text-[clamp(1.85rem,4.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-deep-graphite md:text-[clamp(2.1rem,4vw,3.25rem)]">
              Dive into assets that speed up your{" "}
              <span className="text-amber-glow">rollout</span>
            </h1>
            <p className="mt-6 max-w-[54ch] font-sans text-[16px] leading-[1.62] text-muted-stone md:text-[17px]">
              Blog, documentation, and category digests—everything in one place to evaluate Avishkar AI and
              ship critical-infrastructure dispatch with confidence.
            </p>

            <nav
              className="mt-10 flex flex-wrap gap-2 border-t border-light-steel/70 pt-9"
              aria-label="Jump to resources on this page"
            >
              {HERO_JUMP_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full border border-deep-graphite/15 bg-white px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-deep-graphite shadow-[0_1px_0_rgba(255,255,255,0.75)] transition-colors hover:border-amber-glow/40 hover:text-amber-glow"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Orbital hub — Dispatch-style connectivity graphic */}
          <div className="relative z-[1] flex justify-center lg:justify-end">
            <motion.div
              className="relative aspect-square w-full max-w-[min(100%,440px)]"
              style={
                reduceMotion
                  ? undefined
                  : {
                      y: orbitY,
                      rotate: orbitDrift,
                    }
              }
            >
              <svg
                viewBox={`0 0 ${viewBox} ${viewBox}`}
                className="absolute inset-0 h-full w-full drop-shadow-[0_12px_48px_rgba(228,86,42,0.12)]"
                aria-hidden
              >
                <defs>
                  <radialGradient id="resourcesHubGlow" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stopColor="#e4562a" stopOpacity="0.14" />
                    <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="resourcesHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e4562a" />
                    <stop offset="100%" stopColor="#c2410c" />
                  </linearGradient>
                </defs>

                <circle cx="100" cy="100" r="92" fill="url(#resourcesHubGlow)" />

                <circle
                  cx="100"
                  cy="100"
                  r={innerR}
                  fill="none"
                  stroke="rgba(228,86,42,0.22)"
                  strokeWidth="1.25"
                  strokeDasharray="5 7"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={outerR}
                  fill="none"
                  stroke="rgba(120,113,108,0.2)"
                  strokeWidth="1.15"
                  strokeDasharray="6 8"
                />

                {/* Accent dots on orbits */}
                {[
                  [100, 100 - innerR],
                  [100 + innerR * 0.85, 100 + innerR * 0.45],
                  [100 - outerR * 0.9, 100 + outerR * 0.35],
                  [100 + outerR * 0.35, 100 - outerR * 0.88],
                ].map(([cx, cy], i) => (
                  <circle
                    key={`dot-${i}`}
                    cx={cx}
                    cy={cy}
                    r={i % 2 === 0 ? 3 : 2.5}
                    fill={i % 2 === 0 ? "#e4562a" : "#f59e0b"}
                    opacity={0.75}
                  />
                ))}

                <polygon
                  points="100,28 156,60 156,140 100,172 44,140 44,60"
                  fill="url(#resourcesHexGrad)"
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x="100"
                  y="108"
                  textAnchor="middle"
                  fill="white"
                  fontSize="30"
                  fontWeight="700"
                  fontFamily="var(--font-serif), ui-serif, Georgia, serif"
                  letterSpacing="-0.03em"
                >
                  AI
                </text>
              </svg>

              {ORBIT_LINK_ORDER.map((link, i) => {
                const angleDeg = -90 + i * (360 / ORBIT_LINK_ORDER.length);
                const rad = (angleDeg * Math.PI) / 180;
                const cx = 100 + cardR * Math.cos(rad);
                const cy = 100 + cardR * Math.sin(rad);
                const leftPct = (cx / viewBox) * 100;
                const topPct = (cy / viewBox) * 100;
                const Icon =
                  link.icon && megaIconMap[link.icon] ? megaIconMap[link.icon]! : BookOpen;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group absolute flex w-[max-content] max-w-[132px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[14px] border border-white/90 bg-white/95 px-2.5 py-2.5 text-center shadow-[0_10px_36px_-12px_rgba(228,86,42,0.35),0_2px_8px_rgba(28,28,30,0.06)] backdrop-blur-sm transition-[transform,box-shadow] hover:scale-[1.04] hover:border-amber-glow/35 hover:shadow-[0_16px_44px_-14px_rgba(228,86,42,0.42)] sm:max-w-[148px] sm:px-3 sm:py-3"
                    style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-gradient-to-br from-amber-glow/15 to-amber-glow/5 text-amber-glow transition-colors group-hover:from-amber-glow/25 group-hover:to-amber-glow/10">
                      <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.75} aria-hidden />
                    </div>
                    <span className="mt-2 line-clamp-2 font-sans text-[10px] font-semibold leading-tight text-deep-graphite sm:text-[11px]">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
