import type { DocPage } from "./types";

/** Source: docs/avishkar-ai-website-content.docx — Industries page */
export const industryDocPages: Record<string, DocPage> = {
  residential: {
    eyebrow: "Industries",
    heroTitle: "Home Services That Delight Homeowners",
    heroSubtitle:
      "AI-native field service tuned for homeowner expectations, small jobs, and repeat business.",
    sections: [
      {
        heading: "Industry challenges",
        blocks: [
          {
            kind: "ul",
            items: [
              "High expectations for communication",
              "Small jobs with complex scheduling",
              "Equipment variety and age tracking",
              "After-hours and weekend demand",
              "Acquisition and retention pressure",
            ],
          },
        ],
      },
      {
        heading: "Avishkar AI for residential",
        blocks: [
          {
            kind: "ul",
            items: [
              "Mobile-first technician experience",
              "Real-time customer updates",
              "Warranty and equipment tracking",
              "Preventive maintenance campaigns",
              "Review and referral automation",
              "Flexible scheduling options",
            ],
          },
        ],
      },
      {
        heading: "Reference metrics (playbook)",
        blocks: [
          {
            kind: "ul",
            items: [
              "38% increase in repeat bookings",
              "4.8★ average customer rating",
              "67% reduction in customer status calls",
            ],
          },
        ],
      },
    ],
  },
  commercial: {
    eyebrow: "Industries",
    heroTitle: "Enterprise Operations at Scale",
    heroSubtitle:
      "SLAs, budgets, and multi-site coordination—without losing visibility into the truck roll.",
    sections: [
      {
        heading: "Industry challenges",
        blocks: [
          {
            kind: "ul",
            items: [
              "Multi-site complexity",
              "SLA compliance tracking",
              "Vendor coordination",
              "Budget and cost control",
              "Emergency response requirements",
            ],
          },
        ],
      },
      {
        heading: "Avishkar AI for commercial",
        blocks: [
          {
            kind: "ul",
            items: [
              "Centralized multi-site dashboard",
              "Contract and SLA management",
              "Subcontractor management",
              "Budget tracking and forecasting",
              "Emergency priority routing",
              "Compliance documentation",
            ],
          },
        ],
      },
      {
        heading: "Reference metrics (playbook)",
        blocks: [
          {
            kind: "ul",
            items: [
              "89% SLA compliance rate",
              "34% reduction in coordination time",
              "₹2.4 Crore average annual savings (illustrative benchmark)",
            ],
          },
        ],
      },
    ],
  },
  industrial: {
    eyebrow: "Industries",
    heroTitle: "Heavy Industry, Intelligent Operations",
    heroSubtitle:
      "Safety, certifications, and regulatory rigor—embedded in every dispatch decision.",
    sections: [
      {
        heading: "Industry challenges",
        blocks: [
          {
            kind: "ul",
            items: [
              "Complex safety requirements",
              "Specialized equipment knowledge",
              "Regulatory compliance",
              "Union workforce management",
              "Emergency response coordination",
            ],
          },
        ],
      },
      {
        heading: "Avishkar AI for industrial",
        blocks: [
          {
            kind: "ul",
            items: [
              "Safety protocol automation",
              "Certification and license tracking",
              "Compliance documentation",
              "Union rules adherence",
              "Equipment-specific knowledge base",
              "Incident reporting and analysis",
            ],
          },
        ],
      },
      {
        heading: "Reference metrics (playbook)",
        blocks: [
          {
            kind: "ul",
            items: [
              "67% reduction in safety incidents",
              "99.1% compliance rate",
              "45% faster emergency response",
            ],
          },
        ],
      },
    ],
  },
  "government-municipal": {
    eyebrow: "Industries",
    heroTitle: "Public Sector Service Excellence",
    heroSubtitle:
      "Budget discipline, transparency, and cross-department coordination for municipal field operations.",
    sections: [
      {
        heading: "Industry challenges",
        blocks: [
          {
            kind: "ul",
            items: [
              "Budget constraints and reporting",
              "Union and workforce rules",
              "Citizen communication expectations",
              "Multi-department coordination",
              "Emergency preparedness",
            ],
          },
        ],
      },
      {
        heading: "Avishkar AI for government",
        blocks: [
          {
            kind: "ul",
            items: [
              "Grant and budget tracking",
              "Citizen service portal",
              "Department coordination",
              "Emergency response systems",
              "Compliance and audit trails",
              "Public transparency tools",
            ],
          },
        ],
      },
      {
        heading: "Reference metrics (playbook)",
        blocks: [
          {
            kind: "ul",
            items: [
              "34% improvement in response times",
              "₹1.8 Crore average cost savings (illustrative benchmark)",
              "92% citizen satisfaction rate",
            ],
          },
        ],
      },
    ],
  },
};
