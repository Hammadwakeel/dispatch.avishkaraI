"use client";

import { motion } from "framer-motion";

const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";

/** CDN slugs verified against https://cdn.simpleicons.org (200 + brand hex). */
const brands = [
  { id: "tata", slug: "tata", hex: "486AA4" },
  { id: "jio", slug: "jio", hex: "0A2885" },
  { id: "infosys", slug: "infosys", hex: "007CC3" },
  { id: "mahindra", slug: "mahindra", hex: "DD052B" },
  { id: "zomato", slug: "zomato", hex: "E23744" },
  { id: "bigbasket", slug: "bigbasket", hex: "84C225" },
  { id: "swiggy", slug: "swiggy", hex: "FC8019" },
  { id: "paytm", slug: "paytm", hex: "20336B" },
  { id: "phonepe", slug: "phonepe", hex: "5F259F" },
  { id: "dunzo", slug: "dunzo", hex: "ED553B" },
] as const;

const MARQUEE_DURATION_SEC = 22;

function BrandMark({ slug, hex }: { slug: string; hex: string }) {
  const src = `https://cdn.simpleicons.org/${slug}/${hex}?viewbox=auto`;

  return (
    <div
      className="flex h-12 min-w-[6.5rem] shrink-0 items-center justify-center px-4 sm:min-w-[7.5rem] sm:px-5"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={128}
        height={32}
        className="max-h-8 w-auto max-w-[7.25rem] object-contain object-center opacity-[0.88] grayscale contrast-[0.92] transition-[filter,opacity,transform] duration-200 hover:scale-[1.04] hover:opacity-100 hover:grayscale-0 sm:max-h-9 sm:max-w-[8rem]"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function TrustedMarqueeSection() {
  const loop = [...brands, ...brands];

  return (
    <section
      id="trust"
      className="border-y border-light-steel bg-canvas-white py-[72px] md:py-[88px]"
      aria-label="Partner and customer brand marks"
    >
      <div className={containerPx}>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow md:text-[12px]">
            Trusted operations teams
          </p>
          <h2 className="font-serif mt-4 text-[28px] font-normal leading-tight tracking-tight text-deep-graphite md:text-[40px] md:leading-[1.15]">
            Built for Indian logistics scale
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] font-mono text-[15px] leading-[1.55] text-muted-stone md:text-[16px]">
            From nationwide retailers to hyperlocal delivery—teams use AvishkarAI
            to keep dispatch calm when volumes spike and exceptions pile up.
          </p>
        </motion.div>

        <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] md:mt-16">
          <motion.div
            className="flex w-max items-center gap-2 md:gap-4"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: MARQUEE_DURATION_SEC,
                ease: "linear",
              },
            }}
          >
            {loop.map((brand, i) => (
              <div
                key={`${brand.id}-${i}`}
                className="flex shrink-0 items-center rounded-[var(--radius-card)] border border-light-steel bg-harvest-cream/40 px-1 py-1 md:border-soft-fog md:bg-harvest-cream/60"
              >
                <BrandMark slug={brand.slug} hex={brand.hex} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
