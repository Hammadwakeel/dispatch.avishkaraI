"use client";

import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { type ReactNode } from "react";

export type ScrollRevealDropCardProps = {
  /** Stagger band: 0-based index among siblings */
  index: number;
  total: number;
  /** 0–1 scroll progress (e.g. from Lenis) while the parent section travels through the viewport */
  scrollProgress: MotionValue<number>;
  children: ReactNode;
  className?: string;
  /** Vertical offset above rest (px). Card “drops” down into layout. */
  dropFromPx?: number;
  /** Minimum opacity before reveal */
  initialOpacity?: number;
};

/**
 * Scroll-driven card: starts slightly above final position, low opacity, then eases down and fades in.
 * Progress is smoothed with a spring so motion stays natural alongside Lenis smooth scrolling.
 */
export function ScrollRevealDropCard({
  index,
  total,
  scrollProgress,
  children,
  className,
  dropFromPx = 36,
  initialOpacity = 0.14,
}: ScrollRevealDropCardProps) {
  const prefersReduced = useReducedMotion();

  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 76,
    damping: 32,
    mass: 0.98,
  });

  const band = 0.32;
  const gap = Math.max(0.14, (1 - band * 0.35) / Math.max(1, total));
  const start = Math.min(1 - band * 0.2, index * gap);
  const end = Math.min(1, start + band);
  const fadeEnd = Math.min(end, start + band * 0.4);

  const y = useTransform(smoothProgress, [start, end], [-dropFromPx, 0]);
  const opacity = useTransform(smoothProgress, [start, fadeEnd], [initialOpacity, 1]);

  if (prefersReduced) {
    return <article className={className}>{children}</article>;
  }

  return (
    <motion.article className={className} style={{ y, opacity }}>
      {children}
    </motion.article>
  );
}
