import type { DocPage } from "./types";

/** Source: docs/avishkar-ai-website-content.docx — Products page + product sections */
export const productDocPages: Record<string, DocPage> = {
  "fsm-platform": {
    eyebrow: "Products",
    heroTitle: "The AI-native field service platform core",
    heroSubtitle:
      "The flagship Avishkar AI FSM layer—scheduling, dispatch, customer and job management, inventory, and analytics—built for operators who want intelligence-first automation, not another passive system of record.",
    sections: [
      {
        heading: "Scheduling engine",
        blocks: [
          {
            kind: "ul",
            items: [
              "Neural network–powered scheduling",
              "47+ variables considered simultaneously",
              "Real-time optimization & multi-day planning",
              "Skill-based matching & travel-time intelligence",
              "Overtime prevention",
            ],
          },
        ],
      },
      {
        heading: "Dispatch board",
        blocks: [
          {
            kind: "ul",
            items: [
              "Real-time job visualization",
              "Drag-and-drop manual override",
              "Tech status monitoring & conflict detection",
              "Auto-conflict resolution",
              "Historical performance view",
            ],
          },
        ],
      },
      {
        heading: "Customer & job management",
        blocks: [
          {
            kind: "ul",
            title: "Customer management",
            items: [
              "Complete customer profiles & property / equipment database",
              "Service history, invoices & payment history",
              "Communication log, preference learning, lifetime value tracking",
            ],
          },
          {
            kind: "ul",
            title: "Job management",
            items: [
              "Custom job types & pricing, multi-line invoices",
              "Quote generation, e-signatures, photo documentation",
              "Notes & task lists",
            ],
          },
        ],
      },
      {
        heading: "Reporting & analytics",
        blocks: [
          {
            kind: "ul",
            items: [
              "Real-time dashboards & custom report builder",
              "Scheduled report delivery, KPI & goal tracking",
              "Trend analysis & AI-generated insights",
            ],
          },
        ],
      },
      {
        heading: "Pricing (indicative)",
        blocks: [
          {
            kind: "ul",
            items: [
              "Starter: ₹999 / technician / month",
              "Professional: ₹1,999 / technician / month",
              "Enterprise: custom pricing",
            ],
          },
        ],
      },
    ],
  },
  "ai-voice-agent": {
    eyebrow: "Products",
    heroTitle: "Your AI Receptionist That Books Jobs",
    heroSubtitle:
      "Never miss a call. AI answers, understands, qualifies, and books—24/7, 365 days a year.",
    sections: [
      {
        heading: "Conversation intelligence",
        blocks: [
          {
            kind: "ul",
            items: [
              "Natural language understanding & intent classification",
              "Entity extraction (address, phone, job type)",
              "Context across multi-turn dialogue",
            ],
          },
        ],
      },
      {
        heading: "Booking automation",
        blocks: [
          {
            kind: "ul",
            items: [
              "Real-time availability & slot selection",
              "Customer confirmation, calendar sync, reminder automation",
            ],
          },
        ],
      },
      {
        heading: "Call handling & CRM",
        blocks: [
          {
            kind: "ul",
            items: [
              "Inbound answering, outbound campaigns, after-hours coverage",
              "Emergency routing & human transfer when needed",
              "Call recording & transcription",
              "Automatic customer create/update, activity logging, lead scoring",
            ],
          },
        ],
      },
      {
        heading: "Impact (reference metrics)",
        blocks: [
          {
            kind: "ul",
            items: [
              "68% of calls handled end-to-end by AI",
              "12% increase in booking rate",
              "~45s average handling time · 99.2% answer rate",
            ],
          },
        ],
      },
      {
        heading: "Pricing (indicative)",
        blocks: [
          {
            kind: "ul",
            items: [
              "Included in Professional & Enterprise plans",
              "Add-on for Starter: ₹15,000 / month",
            ],
          },
        ],
      },
    ],
  },
  "vision-inspection": {
    eyebrow: "Products",
    heroTitle: "Photo Intelligence for Field Service",
    heroSubtitle:
      "Transform photos into actionable data—documentation, compliance, and quality assurance powered by AI.",
    sections: [
      {
        heading: "Before / after documentation",
        blocks: [
          {
            kind: "ul",
            items: [
              "Required photo capture enforcement",
              "Auto timestamp & geolocation, cloud storage per job",
              "Side-by-side comparison view",
            ],
          },
        ],
      },
      {
        heading: "Damage detection & compliance",
        blocks: [
          {
            kind: "ul",
            items: [
              "AI damage identification (crack, corrosion, wear, missing parts)",
              "Safety hazard alerts",
              "Code & permit documentation, insurance-ready proof",
            ],
          },
        ],
      },
      {
        heading: "Quality assurance",
        blocks: [
          {
            kind: "ul",
            items: [
              "Work verification & standard compliance",
              "Warranty documentation & dispute support",
            ],
          },
        ],
      },
      {
        heading: "Pricing (indicative)",
        blocks: [
          {
            kind: "ul",
            items: [
              "₹7,500 / month (unlimited photos)",
              "Included in Professional & Enterprise",
            ],
          },
        ],
      },
    ],
  },
  "predictive-maintenance": {
    eyebrow: "Products",
    heroTitle: "Equipment Intelligence That Prevents Failures",
    heroSubtitle:
      "AI analyzes equipment data to predict failures before they happen—turning reactive customers into proactive service contracts.",
    sections: [
      {
        heading: "Equipment profiling",
        blocks: [
          {
            kind: "ul",
            items: [
              "Equipment database with specs",
              "Installation & warranty tracking",
              "Service history association & age-based deterioration modeling",
            ],
          },
        ],
      },
      {
        heading: "Health scoring & predictive alerts",
        blocks: [
          {
            kind: "ul",
            items: [
              "Real-time health score & degradation trends",
              "Failure probability & risk stratification",
              "Automatic failure prediction, customer notification",
              "Service scheduling automation & parts pre-positioning",
            ],
          },
        ],
      },
      {
        heading: "Service opportunities",
        blocks: [
          {
            kind: "ul",
            items: [
              "Maintenance-due identification & upsell detection",
              "Contract utilization alerts & churn risk indicators",
            ],
          },
        ],
      },
      {
        heading: "Reference ROI (from playbook)",
        blocks: [
          {
            kind: "ul",
            items: [
              "23% increase in service agreement revenue",
              "34% reduction in emergency call-outs",
              "3.2× customer retention improvement (illustrative benchmarks)",
            ],
          },
        ],
      },
      {
        heading: "Pricing (indicative)",
        blocks: [
          {
            kind: "ul",
            items: [
              "Included in Professional & Enterprise",
              "Add-on for Starter: ₹9,999 / month",
            ],
          },
        ],
      },
    ],
  },
  "field-intelligence-suite": {
    eyebrow: "Products",
    heroTitle: "AI That Makes Every Tech Smarter",
    heroSubtitle:
      "Route optimization, parts intelligence, pricing guidance, and performance feedback—built for the truck roll.",
    sections: [
      {
        heading: "Route optimization",
        blocks: [
          {
            kind: "ul",
            items: [
              "Real-time traffic integration",
              "Multi-stop optimization & time-window management",
              "Fuel-efficient routing",
            ],
          },
        ],
      },
      {
        heading: "Parts & pricing intelligence",
        blocks: [
          {
            kind: "ul",
            items: [
              "Job-based parts suggestions, van inventory, low-stock alerts",
              "Market-rate recommendations, margin tracking, discount guidelines",
              "Upsell prompts",
            ],
          },
        ],
      },
      {
        heading: "Performance analytics",
        blocks: [
          {
            kind: "ul",
            items: [
              "Real-time technician performance",
              "Skill gap identification & coaching opportunities",
              "Incentive tracking",
            ],
          },
        ],
      },
      {
        heading: "Pricing (indicative)",
        blocks: [
          {
            kind: "ul",
            items: ["Included in Professional & Enterprise plans"],
          },
        ],
      },
    ],
  },
};
