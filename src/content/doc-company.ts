import type { DocPage } from "./types";

/** Hub hero / facts card — keep in sync with company narrative in doc pages */
export const companyHubMeta = {
  legalName: "Anjaneya AI Technologies Pvt Ltd",
  flagshipBrand: "Avishkar AI",
  founded: "2024",
  primaryEmail: "hello@avishkar.ai",
} as const;

/** Source: docs/avishkar-ai-website-content.docx + brand context */
export const companyDocPages: Record<string, DocPage> = {
  about: {
    eyebrow: "Our Story",
    heroTitle: "Built for infrastructure that cannot fail.",
    heroTitleAccent: "Built",
    heroTitleRest: "for infrastructure",
    heroTitleLine2: "that",
    heroTitleLine2Accent: "cannot fail.",
    heroSubtitle:
      "45 minutes was the norm; we cut coordination to ~5. Monitors and crews existed—no AI closed the loop. India; USA and APAC next.",
    heroSubtitleAccent: "~5 min coordination.",
    heroSubtitleRest: " No dispatcher in the loop. Live today; scaling APAC.",
    sections: [
      {
        heading: "The problem nobody was questioning",
        blocks: [
          {
            kind: "p",
            text: "When ATMs, towers, or medical gear fail, someone still phones around and dispatches by hand. The industry accepted 45 minutes. We didn’t.",
          },
        ],
      },
      {
        heading: "The gap we found",
        blocks: [
          {
            kind: "p",
            text: "Fault signals and field crews already existed. Missing: an AI layer wiring monitors → dispatch → close—no human coordinator.",
          },
        ],
      },
      {
        heading: "What we built",
        blocks: [
          {
            kind: "p",
            text: "A layer on your stack: fault → assign → parts → close. Autonomous. India—ATM OEMs & towers; USA and APAC next.",
          },
        ],
      },
      {
        heading: "The platform. Three layers.",
        blocks: [
          {
            kind: "ul",
            items: [
              {
                amber: "AI-Native Dispatch",
                graphite: " — fault → close; no human dispatcher.",
              },
              {
                amber: "Vision Inspection",
                graphite: " — CV on cameras/IoT; triggers dispatch before anyone calls.",
              },
              {
                amber: "Field Intelligence Suite",
                graphite: " — engineers, tickets, assets, SLAs—one live view.",
              },
            ],
          },
        ],
      },
      {
        heading: "How we operate",
        blocks: [
          {
            kind: "ul",
            items: [
              {
                amber: "We own the outcome",
                graphite: " — speed, resolution, SLA—not release cadence.",
              },
              {
                amber: "Specificity",
                graphite: " — numbers and shipped work, not slideware.",
              },
              {
                amber: "Integrate, don’t replace",
                graphite: " — sit on your monitors; weeks, not 18 months.",
              },
              {
                amber: "Hardest first",
                graphite: " — medical, ATM, tower. Proof transfers.",
              },
              {
                amber: "Founders on calls",
                graphite: " — direct line; no account-manager theater.",
              },
            ],
          },
        ],
      },
      {
        heading: "We're a small team building something big.",
        blocks: [
          {
            kind: "p",
            text: "Lean team, live customers, APAC growth. Building critical-ops infrastructure—get in touch.",
          },
        ],
      },
    ],
  },
  leadership: {
    eyebrow: "Company",
    heroTitle: "Leadership",
    heroSubtitle: "Operators aligning product, AI, and customer outcomes.",
    sections: [
      {
        heading: "How we operate",
        blocks: [
          {
            kind: "p",
            text: "Bios coming soon. For executive briefings, email partners@avishkar.ai.",
          },
        ],
      },
    ],
  },
  careers: {
    eyebrow: "Company",
    heroTitle: "Careers",
    heroSubtitle: "Small team, production systems, field stakes.",
    sections: [
      {
        heading: "Open roles",
        blocks: [
          {
            kind: "p",
            text: "We hire on clear need—systems, AI, field. careers@avishkar.ai + proof of work.",
          },
        ],
      },
      {
        heading: "What working here feels like",
        blocks: [
          {
            kind: "ul",
            items: [
              { amber: "Fast loops", graphite: " — operators in the field." },
              { amber: "Small teams", graphite: " — ship end to end." },
              { amber: "High bar", graphite: " — reliability, security, outcomes." },
            ],
          },
        ],
      },
    ],
  },
  partners: {
    eyebrow: "Company",
    heroTitle: "Partners",
    heroSubtitle: "OEMs, integrators, service networks.",
    sections: [
      {
        heading: "Partnerships",
        blocks: [
          {
            kind: "p",
            text: "Integration, reseller, OEM—partners@avishkar.ai.",
          },
        ],
      },
    ],
  },
  press: {
    eyebrow: "Company",
    heroTitle: "Press & media",
    heroSubtitle: "Logos, facts, commentary.",
    sections: [
      {
        heading: "Media contact",
        blocks: [
          {
            kind: "p",
            text: "press@avishkar.ai",
          },
        ],
      },
    ],
  },
  contact: {
    eyebrow: "Company",
    heroTitle: "Let's Build Your AI-Powered Operation",
    heroTitleAccent: "Let's Build",
    heroTitleRest: "Your AI-Powered Operation",
    heroSubtitle: "Coverage, stack, timeline—we recommend dispatch, vision, or full stack.",
    heroSubtitleAccent: "What you run.",
    heroSubtitleRest: " We map stack + demo.",
    sections: [
      {
        heading: "Contact channels",
        blocks: [
          {
            kind: "contactChannels",
            entries: [
              { label: "General", email: "hello@avishkar.ai" },
              { label: "Sales", email: "sales@avishkar.ai" },
              {
                label: "Support",
                email: "support@avishkar.ai",
                suffix: "(24/7 Enterprise; business hours Professional)",
              },
              { label: "Press", email: "press@avishkar.ai" },
              { label: "Partners", email: "partners@avishkar.ai" },
            ],
          },
        ],
      },
      {
        heading: "What to include in your note",
        blocks: [
          {
            kind: "ul",
            items: [
              { amber: "Coverage", graphite: " — assets & geography." },
              { amber: "Team & tools", graphite: " — size + dispatch stack." },
              { amber: "Scope", graphite: " — dispatch, vision, intelligence, or full." },
              { amber: "Pain", graphite: " — top ops bottleneck." },
              { amber: "Timing", graphite: " — ASAP → exploring." },
            ],
          },
        ],
      },
      {
        heading: "Privacy",
        blocks: [
          {
            kind: "p",
            text: "Not for sale—only what delivering the service requires.",
          },
        ],
      },
    ],
  },
};
