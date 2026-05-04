"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Users,
  Shield,
  Truck,
  BarChart3,
  Bell,
  Globe,
  Home,
  Building2,
  Factory,
  Landmark,
  ClipboardCheck,
} from "lucide-react";
import { industryLinks } from "@/config/site-navigation";
import { industryDocPages } from "@/content/doc-industries";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  "building-2": Building2,
  factory: Factory,
  landmark: Landmark,
};

const colorVariants = [
  { color: "#e4562a", bg: "rgba(228,86,42,0.08)" },
  { color: "#d4a84b", bg: "rgba(212,168,75,0.08)" },
  { color: "#9c4a3a", bg: "rgba(156,74,58,0.08)" },
  { color: "#665e57", bg: "rgba(102,94,87,0.08)" },
];

const industries = industryLinks.map((link, i) => {
  const iconId = link.icon;
  const Icon = iconId && iconMap[iconId] ? iconMap[iconId] : Home;
  const content = industryDocPages[link.href.replace("/industries/", "")];
  return {
    slug: link.href.replace("/industries/", ""),
    label: link.label,
    href: link.href,
    icon: Icon,
    description: link.description || "",
    color: colorVariants[i % colorVariants.length].color,
  };
});

const features = [
  {
    icon: Truck,
    title: "Intelligent Dispatch",
    description:
      "AI-powered routing and scheduling that adapts to your fleet size and service area.",
  },
  {
    icon: MapPin,
    title: "Real-time Visibility",
    description:
      "Track every technician, every job, every moment with live location updates and ETAs.",
  },
  {
    icon: ClipboardCheck,
    title: "Proof of Delivery",
    description:
      "Digital documentation, signatures, and photos — automatically synced to your system.",
  },
  {
    icon: Bell,
    title: "Customer Notifications",
    description:
      "Automated SMS and email updates that keep clients informed without manual effort.",
  },
  {
    icon: Shield,
    title: "Compliance & Safety",
    description:
      "Built-in checks for certifications, licenses, and safety protocols before dispatch.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Comprehensive dashboards showing productivity, response times, and customer satisfaction.",
  },
];

const faqs = [
  {
    question: "How long does implementation typically take?",
    answer:
      "Most customers are fully operational within 4-8 weeks, depending on integration complexity. Our team handles the heavy lifting so you can focus on your business.",
  },
  {
    question: "Can Avishkar AI work with our existing software?",
    answer:
      "Yes. We offer native integrations with major ERP, CRM, and field service management systems. Custom APIs are available for unique setups.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "Dedicated implementation specialists, 24/7 technical support, and ongoing success managers ensure you're never alone in your AI journey.",
  },
  {
    question: "Is the platform scalable for growing operations?",
    answer:
      "Absolutely. Our cloud-native architecture scales seamlessly from single-location operations to multi-site enterprise deployments.",
  },
];

export default function IndustriesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    metro: "",
    deliveries: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <main className="relative flex-1 overflow-x-clip bg-harvest-cream">
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_10%,rgba(228,86,42,0.08)_0%,transparent_50%),radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(197,208,200,0.3)_0%,transparent_45%)]"
        aria-hidden
      />

      {/* Hero Section */}
      <section className="relative z-[1]">
        <div className="mx-auto max-w-[var(--page-max-width)] px-6 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left: Text content */}
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
                Avishkar AI Industries
              </p>
              <h1 className="mt-4 font-serif text-[clamp(2rem,5vw,3.25rem)] font-normal leading-[1.1] tracking-[-0.04em] text-deep-graphite">
                AI-native field service for every industry
              </h1>
              <p className="mt-6 max-w-[52ch] font-sans text-[16px] leading-[1.6] text-muted-stone md:text-[17px]">
                Whether you serve homeowners, enterprise clients, or government
                agencies, Avishkar AI adapts to your workflows, compliance
                requirements, and customer expectations.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-ui)] bg-amber-glow px-7 font-mono text-[14px] font-semibold text-canvas-white shadow-[0_4px_20px_rgba(228,86,42,0.35)] transition-all hover:bg-[#d14a24] hover:shadow-[0_6px_28px_rgba(228,86,42,0.45)]"
                >
                  Talk to an Expert
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#industries"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-ui)] border-2 border-deep-graphite/20 bg-white/60 px-7 font-mono text-[14px] font-semibold text-deep-graphite backdrop-blur-sm transition-all hover:border-amber-glow/40 hover:bg-white"
                >
                  Explore Industries
                </a>
              </div>
            </div>

            {/* Right: Hexagon hub graphic */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative aspect-square w-full max-w-[420px]">
                {/* Central hexagon */}
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 w-full drop-shadow-[0_8px_32px_rgba(228,86,42,0.25)]"
                >
                  <defs>
                    <linearGradient
                      id="hexGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#e4562a" />
                      <stop offset="100%" stopColor="#9c4a3a" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="100,10 170,55 170,145 100,190 30,145 30,55"
                    fill="url(#hexGradient)"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x="100"
                    y="108"
                    textAnchor="middle"
                    fill="white"
                    fontSize="28"
                    fontWeight="bold"
                    fontFamily="var(--font-serif)"
                  >
                    AI
                  </text>
                </svg>

                {/* Industry nodes - positioned around the hexagon */}
                {industries.map((ind, i) => {
                  const variant = colorVariants[i % colorVariants.length];
                  const angle = (i * 90 - 90) * (Math.PI / 180);
                  const radius = 140;
                  const x = 100 + radius * Math.cos(angle);
                  const y = 100 + radius * Math.sin(angle);
                  const Icon = ind.icon;

                  return (
                    <motion.div
                      key={ind.slug}
                      className="absolute"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15, duration: 0.4 }}
                    >
                      <Link
                        href={ind.href}
                        className="group flex flex-col items-center"
                      >
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/60 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-transform group-hover:scale-110"
                          style={{ backgroundColor: variant.color }}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="mt-2 text-center font-mono text-[11px] font-semibold text-deep-graphite">
                          {ind.label}
                        </span>
                      </Link>
                      {/* Dashed line to center */}
                      <svg
                        className="absolute left-1/2 top-1/2 -z-10"
                        style={{
                          width: `${radius - 28}px`,
                          height: `${radius - 28}px`,
                          transform: `rotate(${-45 + i * 90}deg)`,
                          transformOrigin: "left top",
                        }}
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="100%"
                          y2="0"
                          stroke={variant.color}
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          opacity="0.5"
                        />
                      </svg>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid Section */}
      <section id="industries" className="relative z-[1] border-t border-light-steel/50 py-20 md:py-28">
        <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-[clamp(1.5rem,4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.03em] text-deep-graphite">
              Serving strong & resilient industries
            </h2>
            <p className="mx-auto mt-4 max-w-[56ch] font-sans text-[16px] leading-[1.6] text-muted-stone">
              The technology is the same. The intelligence is adapted to your
              industry&apos;s unique challenges, compliance needs, and customer
              expectations.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind) => {
              const Icon = ind.icon;
              const content = industryDocPages[ind.slug];
              const challenges = (() => {
                const section = content?.sections.find(
                  (s) => s.heading === "Industry challenges"
                );
                const block = section?.blocks[0];
                if (block && block.kind === "ul") return block.items;
                return null;
              })();

              return (
                <Link
                  key={ind.slug}
                  href={ind.href}
                  className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/70 bg-white/40 p-7 shadow-[0_8px_40px_-12px_rgba(228,86,42,0.18)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-amber-glow/30 hover:bg-white/60 hover:shadow-[0_16px_50px_-12px_rgba(228,86,42,0.25)]"
                >
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      background: `radial-gradient(circle at 0% 0%, ${ind.color} 0%, transparent 60%)`,
                    }}
                  />

                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-[var(--radius-ui)] text-white"
                    style={{ backgroundColor: ind.color }}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="font-serif text-[22px] font-normal leading-snug tracking-[-0.02em] text-deep-graphite">
                    {ind.label}
                  </h3>
                  <p className="mt-2 font-sans text-[14px] leading-relaxed text-muted-stone">
                    {ind.description}
                  </p>

                  {challenges && (
                    <ul className="mt-5 space-y-2">
                      {challenges.slice(0, 3).map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2 font-sans text-[13px] text-link-gray"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: ind.color }}
                          />
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto flex items-center gap-1 pt-5 font-mono text-[12px] font-semibold text-amber-glow transition-colors group-hover:gap-2">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-[1] border-t border-light-steel/50 py-20 md:py-28">
        <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
          <div className="mb-12 text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
              Platform Capabilities
            </p>
            <h2 className="mt-4 font-serif text-[clamp(1.5rem,4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.03em] text-deep-graphite">
              How Avishkar AI supports enterprise businesses
            </h2>
            <p className="mx-auto mt-4 max-w-[56ch] font-sans text-[16px] leading-[1.6] text-muted-stone">
              Orchestrate every field service workflow with real-time visibility,
              flexible capacity, and seamless integrations.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  className="rounded-[var(--radius-card)] border border-light-steel/50 bg-canvas-white/80 p-7 backdrop-blur-sm transition-shadow hover:shadow-[0_8px_30px_-8px_rgba(228,86,42,0.15)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-ui)] bg-amber-glow/10">
                    <Icon className="h-6 w-6 text-amber-glow" />
                  </div>
                  <h3 className="font-serif text-[20px] font-normal leading-snug tracking-[-0.01em] text-deep-graphite">
                    {feat.title}
                  </h3>
                  <p className="mt-3 font-sans text-[14px] leading-relaxed text-muted-stone">
                    {feat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-[1] border-t border-light-steel/50 py-20 md:py-28">
        <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
                FAQ
              </p>
              <h2 className="mt-4 font-serif text-[clamp(1.5rem,4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.03em] text-deep-graphite">
                Common questions about Avishkar AI
              </h2>
              <p className="mt-4 font-sans text-[16px] leading-[1.6] text-muted-stone">
                Everything you need to know to get started with AI-powered field
                service management.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-[var(--radius-card)] border border-light-steel/50 bg-canvas-white/80 overflow-hidden backdrop-blur-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-white/40"
                  >
                    <span className="pr-4 font-serif text-[17px] font-normal leading-snug text-deep-graphite">
                      {faq.question}
                    </span>
                    {openFaq === i ? (
                      <ChevronUp className="h-5 w-5 flex-shrink-0 text-amber-glow" />
                    ) : (
                      <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-stone" />
                    )}
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-light-steel/30 px-6 pb-6"
                    >
                      <p className="pt-4 font-sans text-[14px] leading-relaxed text-muted-stone">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="relative z-[1] border-t border-light-steel/50 py-20 md:py-28">
        <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left: Text content */}
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-glow">
                Talk with an Avishkar AI expert
              </p>
              <h2 className="mt-4 font-serif text-[clamp(1.5rem,4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.03em] text-deep-graphite">
                Expert advice at your fingertips
              </h2>
              <p className="mt-4 font-sans text-[16px] leading-[1.6] text-muted-stone">
                Avishkar AI is here to help businesses achieve field service
                excellence. Don&apos;t see your industry listed? Fill out our
                interest form to chat with an expert today.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-glow/10">
                    <Clock className="h-5 w-5 text-amber-glow" />
                  </div>
                  <div>
                    <p className="font-mono text-[13px] font-semibold text-deep-graphite">
                      24/7 Support
                    </p>
                    <p className="font-sans text-[13px] text-muted-stone">
                      Round-the-clock assistance for critical issues
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-glow/10">
                    <Users className="h-5 w-5 text-amber-glow" />
                  </div>
                  <div>
                    <p className="font-mono text-[13px] font-semibold text-deep-graphite">
                      Dedicated Success Team
                    </p>
                    <p className="font-sans text-[13px] text-muted-stone">
                      Your personal guide from onboarding to growth
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-glow/10">
                    <Globe className="h-5 w-5 text-amber-glow" />
                  </div>
                  <div>
                    <p className="font-mono text-[13px] font-semibold text-deep-graphite">
                      Global Reach
                    </p>
                    <p className="font-sans text-[13px] text-muted-stone">
                      Deployable across multiple regions and time zones
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="rounded-[var(--radius-card)] border border-white/70 bg-white/60 p-8 shadow-[0_20px_60px_-15px_rgba(228,86,42,0.2)] backdrop-blur-xl lg:p-10">
              <h3 className="font-serif text-[22px] font-normal leading-snug text-deep-graphite">
                Take charge of your field service operations
              </h3>
              <p className="mt-2 font-sans text-[14px] text-muted-stone">
                Fill out the form below and our team will reach out within 24
                hours.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-deep-graphite">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white/80 px-4 py-3 font-sans text-[14px] text-deep-graphite placeholder:text-subtle-gray transition-colors focus:border-amber-glow focus:outline-none focus:ring-2 focus:ring-amber-glow/20"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-deep-graphite">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white/80 px-4 py-3 font-sans text-[14px] text-deep-graphite placeholder:text-subtle-gray transition-colors focus:border-amber-glow focus:outline-none focus:ring-2 focus:ring-amber-glow/20"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-deep-graphite">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white/80 px-4 py-3 font-sans text-[14px] text-deep-graphite placeholder:text-subtle-gray transition-colors focus:border-amber-glow focus:outline-none focus:ring-2 focus:ring-amber-glow/20"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-deep-graphite">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white/80 px-4 py-3 font-sans text-[14px] text-deep-graphite placeholder:text-subtle-gray transition-colors focus:border-amber-glow focus:outline-none focus:ring-2 focus:ring-amber-glow/20"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-deep-graphite">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white/80 px-4 py-3 font-sans text-[14px] text-deep-graphite placeholder:text-subtle-gray transition-colors focus:border-amber-glow focus:outline-none focus:ring-2 focus:ring-amber-glow/20"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-deep-graphite">
                      Closest Metro *
                    </label>
                    <select
                      required
                      value={formData.metro}
                      onChange={(e) =>
                        setFormData({ ...formData, metro: e.target.value })
                      }
                      className="w-full rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white/80 px-4 py-3 font-sans text-[14px] text-deep-graphite transition-colors focus:border-amber-glow focus:outline-none focus:ring-2 focus:ring-amber-glow/20"
                    >
                      <option value="">Select metro</option>
                      <option value="delhi">Delhi NCR</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="bangalore">Bangalore</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="chennai">Chennai</option>
                      <option value="pune">Pune</option>
                      <option value="kolkata">Kolkata</option>
                      <option value="ahmedabad">Ahmedabad</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-deep-graphite">
                    Estimated Service Calls Per Week *
                  </label>
                  <select
                    required
                    value={formData.deliveries}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveries: e.target.value })
                    }
                    className="w-full rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white/80 px-4 py-3 font-sans text-[14px] text-deep-graphite transition-colors focus:border-amber-glow focus:outline-none focus:ring-2 focus:ring-amber-glow/20"
                  >
                    <option value="">Select range</option>
                    <option value="1-50">1-50 calls/week</option>
                    <option value="51-200">51-200 calls/week</option>
                    <option value="201-500">201-500 calls/week</option>
                    <option value="501-1000">501-1000 calls/week</option>
                    <option value="1000+">1000+ calls/week</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-deep-graphite">
                    How can we help? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full rounded-[var(--radius-ui)] border border-light-steel bg-canvas-white/80 px-4 py-3 font-sans text-[14px] text-deep-graphite placeholder:text-subtle-gray transition-colors focus:border-amber-glow focus:outline-none focus:ring-2 focus:ring-amber-glow/20"
                    placeholder="Tell us about your field service operations, challenges, or questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-ui)] bg-amber-glow px-8 py-4 font-mono text-[14px] font-semibold text-canvas-white shadow-[0_4px_20px_rgba(228,86,42,0.35)] transition-all hover:bg-[#d14a24] hover:shadow-[0_6px_28px_rgba(228,86,42,0.45)] sm:w-auto"
                >
                  Get In Touch Today
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 pb-12 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-amber-glow transition-colors hover:text-deep-graphite"
        >
          <span>←</span> Back to home
        </Link>
      </div>
    </main>
  );
}