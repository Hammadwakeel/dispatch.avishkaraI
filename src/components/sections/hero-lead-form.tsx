"use client";

import Link from "next/link";
import { bookDemoHref } from "@/config/site-navigation";

export function HeroLeadForm() {
  return (
    <div
      id="demo"
      className="mx-auto mt-10 flex max-w-xl flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3"
    >
      <label htmlFor="email" className="sr-only">
        Work email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Your work email"
        autoComplete="email"
        className="min-h-[52px] flex-1 rounded-[var(--radius-ui)] border border-soft-fog bg-canvas-white px-5 font-sans text-[16px] leading-[1.5] text-deep-graphite placeholder:text-text-gray focus:border-dark-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow/30 focus-visible:ring-offset-2 focus-visible:ring-offset-harvest-cream"
        style={{ transitionDuration: "var(--transition-interactive)" }}
      />
      <Link
        href={bookDemoHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-[var(--radius-ui)] bg-amber-glow px-8 font-sans text-[14px] font-semibold text-canvas-white shadow-[var(--shadow-sm)] hover:brightness-[1.03]"
        style={{ transitionDuration: "var(--transition-interactive)" }}
      >
        Book a demo
      </Link>
    </div>
  );
}
