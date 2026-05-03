"use client";

import Image from "next/image";

/**
 * Hero illustration from `/public/hero-home.jpeg` (export from design).
 * Keeps Harvest surfaces: cream bleed, soft border, elevated golden shadow.
 */
export function HeroEmbeddedVisual({ className }: { className?: string }) {
  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-soft-fog bg-warm-linen shadow-[var(--shadow-lg)]">
        <Image
          src="/hero-home.jpeg"
          alt="AvishkarAI dispatch workspace: live routes, next assignment, stops, and fleet map."
          width={2400}
          height={1800}
          priority
          sizes="(min-width: 1024px) min(520px, 42vw), min(100vw - 2rem, 440px)"
          className="h-auto w-full object-contain object-center"
          draggable={false}
        />
      </div>
    </div>
  );
}
