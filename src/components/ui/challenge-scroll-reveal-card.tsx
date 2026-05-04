"use client";

import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

type ChallengeScrollRevealCardProps = {
  /** 0-based index for stagger bands */
  index: number;
  total: number;
  /** 0–1 progress from Lenis-driven scroll */
  scrollProgress: MotionValue<number>;
  children: ReactNode;
  className?: string;
  /** Fixed horizontal overshoot (px). If omitted, scales gently with viewport width. */
  slidePx?: number;
};

/**
 * Scroll-synced reveal: enters from the right with opacity 0, slides into place and fades in.
 * Uses a spring on scroll progress so motion stays fluid alongside Lenis smoothing.
 */
export function ChallengeScrollRevealCard({
  index,
  total,
  scrollProgress,
  children,
  className,
  slidePx: slidePxProp,
}: ChallengeScrollRevealCardProps) {
  const prefersReduced = useReducedMotion();
  const [slidePx, setSlidePx] = useState(slidePxProp ?? 76);

  useEffect(() => {
    if (slidePxProp != null) {
      setSlidePx(slidePxProp);
      return;
    }
    const measure = () => {
      const w = window.visualViewport?.width ?? window.innerWidth;
      setSlidePx(Math.round(Math.min(104, Math.max(52, w * 0.09))));
    };
    measure();
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, [slidePxProp]);

  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 82,
    damping: 36,
    mass: 0.92,
  });

  const band = 0.34;
  const gap = Math.max(0.13, (1 - band * 0.35) / Math.max(1, total));
  const start = Math.min(1 - band * 0.22, index * gap);
  const end = Math.min(1, start + band);
  const fadeEnd = Math.min(end, start + band * 0.4);

  const x = useTransform(smoothProgress, [start, end], [slidePx, 0]);
  const opacity = useTransform(smoothProgress, [start, fadeEnd], [0, 1]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className ?? undefined} style={{ x, opacity }}>
      {children}
    </motion.div>
  );
}
