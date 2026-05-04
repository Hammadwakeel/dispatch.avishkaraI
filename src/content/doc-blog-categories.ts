import type { DocPage } from "./types";

/** Source: docs/avishkar-ai-website-content.docx — Blog content strategy */
export const blogCategoryDocPages: Record<string, DocPage> = {
  "industry-trends": {
    eyebrow: "Blog",
    heroTitle: "Industry insights",
    heroSubtitle:
      "Macro trends, economics of adoption, and benchmarks for AI-first service operations.",
    sections: [
      {
        heading: "Featured themes",
        blocks: [
          {
            kind: "ul",
            items: [
              "State of field service 2026: AI adoption report",
              "Why field service businesses are moving to AI-first platforms",
              "The economics of AI adoption in service operations",
            ],
          },
        ],
      },
    ],
  },
  "case-studies": {
    eyebrow: "Blog",
    heroTitle: "Case studies",
    heroSubtitle:
      "Real deployments, measured outcomes, and lessons learned from the field.",
    sections: [
      {
        heading: "Coming next",
        blocks: [
          {
            kind: "p",
            text: "Long-form case studies referenced in the master content doc (e.g., India1 ATM network uptime) will be adapted here with customer approval. Subscribe via the homepage demo flow to get notified.",
          },
        ],
      },
    ],
  },
  "product-updates": {
    eyebrow: "Blog",
    heroTitle: "Product updates",
    heroSubtitle:
      "Release notes, roadmap highlights, and integration announcements.",
    sections: [
      {
        heading: "What we publish",
        blocks: [
          {
            kind: "ul",
            items: [
              "Monthly release summaries",
              "API & integration changes",
              "Mobile app improvements",
              "AI model quality & safety updates",
            ],
          },
        ],
      },
    ],
  },
};
