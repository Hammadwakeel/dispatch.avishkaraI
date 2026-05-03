"use client";

export function HeroLeadForm() {
  return (
    <form
      id="demo"
      className="mx-auto mt-10 flex max-w-xl flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="email" className="sr-only">
        Work email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        placeholder="Your work email"
        autoComplete="email"
        className="min-h-[52px] flex-1 rounded-[var(--radius-ui)] border border-soft-fog bg-canvas-white px-5 font-mono text-[16px] leading-[1.5] text-deep-graphite placeholder:text-text-gray focus:border-dark-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow/30 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-linen"
        style={{ transitionDuration: "var(--transition-interactive)" }}
      />
      <button
        type="submit"
        className="min-h-[52px] shrink-0 rounded-[var(--radius-ui)] bg-amber-glow px-8 font-mono text-[14px] font-semibold text-canvas-white shadow-[var(--shadow-sm)] hover:brightness-[1.03]"
        style={{ transitionDuration: "var(--transition-interactive)" }}
      >
        Book a demo
      </button>
    </form>
  );
}
