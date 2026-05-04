"use client";

export function TestimonialsCarouselSection() {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-28 border-t border-light-steel bg-canvas-white py-16 md:scroll-mt-32 md:py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
          Proof
        </p>
        <h2
          id="testimonials-heading"
          className="mt-4 font-sans text-[clamp(1.55rem,3.2vw,2.35rem)] font-semibold leading-tight text-deep-graphite"
        >
          What we have done, not what we might do
        </h2>
        <figure className="mt-8 rounded-[var(--radius-card)] border border-light-steel bg-canvas-white px-6 py-8 shadow-[0_14px_44px_-34px_rgba(29,30,28,0.16)] md:px-10 md:py-10">
          <blockquote className="font-sans text-[17px] font-medium leading-[1.65] text-deep-graphite md:text-[20px]">
            “We are live with an ATM manufacturer and a telecom tower company in India. We’re not showing you what
            we could do — we’re showing you what we’ve done.”
          </blockquote>
          <figcaption className="mt-5 font-sans text-[14px] text-muted-stone md:text-[15px]">
            Avishkar AI — founded in India, building for the world.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
