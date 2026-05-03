"use client";

import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;

const staggerParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const listStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0 },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const containerPx = "mx-auto w-full max-w-[var(--page-max-width)] px-6 md:px-8";

const PLATFORM_IMAGE_SRC = "/image(1).jpeg";

export function PlatformStackSection() {
  const bullets = [
    {
      title: "Integrations & orchestration",
      body: "Normalize orders, TMS signals, and comms into one live picture—so coordinators aren’t switching tabs to answer “what’s true right now?”",
    },
    {
      title: "Logistics & fulfillment",
      body: "Suggestions that respect hubs, SLAs, skills, and geography—built for Indian density, outsourcing, and noisy exception streams.",
    },
    {
      title: "Data, visibility & control",
      body: "Explainable rationale, clean audit trails, and APIs that platform teams can wire into releases without losing governance.",
    },
  ];

  return (
    <section
      className="relative overflow-hidden border-t border-light-steel bg-canvas-white py-[80px] md:py-[96px]"
      aria-labelledby="platform-stack-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_85%_45%,rgba(228,86,42,0.07)_0%,transparent_60%)]"
      />
      <div className={`relative ${containerPx}`}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            className="order-2 flex min-w-0 flex-col lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerParent}
          >
            <motion.p
              variants={staggerChild}
              className="font-mono text-[12px] font-normal uppercase tracking-[0.14em] text-muted-stone"
            >
              Platform depth
            </motion.p>
            <motion.h2
              id="platform-stack-heading"
              variants={staggerChild}
              className="font-serif mt-6 text-balance text-[clamp(1.75rem,4vw,2.75rem)] font-normal leading-[1.12] tracking-[-0.04em] text-deep-graphite"
            >
              More than routing—AvishkarAI is the engine behind modern dispatch
            </motion.h2>
            <motion.p
              variants={staggerChild}
              className="mt-8 max-w-[52ch] font-mono text-[16px] leading-[1.55] text-muted-stone md:text-[17px] md:leading-[1.5]"
            >
              From integrations through fulfillment and visibility—one stack your
              ops and engineering teams can align on, without bolting together five
              brittle tools.
            </motion.p>

            <motion.ul
              className="mt-10 flex flex-col gap-6"
              variants={listStagger}
            >
              {bullets.map((item) => (
                <motion.li
                  key={item.title}
                  variants={staggerChild}
                  className="flex gap-4"
                >
                  <span className="mt-0.5 flex shrink-0">
                    <CircleCheck
                      className="size-6 text-amber-glow"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </span>
                  <div>
                    <p className="font-serif text-[19px] font-normal leading-snug tracking-[-0.02em] text-deep-graphite md:text-[20px]">
                      {item.title}
                    </p>
                    <p className="mt-2 font-mono text-[14px] leading-[1.55] text-link-gray md:text-[15px]">
                      {item.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={staggerChild} className="mt-10">
              <motion.a
                href="#demo"
                className="inline-flex min-h-[52px] items-center justify-center rounded-[var(--radius-ui)] bg-deep-graphite px-8 font-mono text-[14px] font-semibold text-canvas-white shadow-[var(--shadow-sm)] hover:brightness-[1.06]"
                style={{ transitionDuration: "var(--transition-interactive)" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get a quote
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative order-1 min-w-0 lg:order-2"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease, delay: 0.08 }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-[6%] right-[6%] top-[14%] z-0 aspect-[2772/4096] rounded-[calc(var(--radius-card)+8px)] bg-amber-glow/38 blur-[36px] md:left-[8%] md:right-[8%] md:blur-[42px]"
            />
            <div className="relative z-10 mx-auto max-w-[min(100%,420px)] lg:max-w-none">
              <Image
                src={PLATFORM_IMAGE_SRC}
                alt="Layered platform diagram: integrations, logistics, fulfillment, data and visibility, and customization unified under a central hub."
                width={2772}
                height={4096}
                className="h-auto w-full rounded-[var(--radius-card)] shadow-[0_24px_64px_-28px_rgba(29,30,28,0.22)]"
                sizes="(max-width: 1024px) min(100vw, 420px), 50vw"
                priority={false}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
