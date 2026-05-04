import type { DocPage } from "./types";

/** Source: update/avishkar_complete_copy_replacement.md.pdf — Products + FSM platform */
export const productDocPages: Record<string, DocPage> = {
  "fsm-platform": {
    eyebrow: "AI-Native Dispatch Platform",
    heroTitle: "The dispatch system your engineers wish they had.",
    heroSubtitle:
      "Avishkar replaces manual dispatch with a fully autonomous AI loop — from fault detection to ticket closure. No human dispatcher required. No missed SLAs. No phone tag. Dispatch coordination from 45 minutes to 5 minutes. Live with ATM manufacturers and telecom tower operators in India.",
    sections: [
      {
        heading: "Fault Ingestion",
        blocks: [
          {
            kind: "ul",
            items: [
              "Receives fault events from any monitoring system via API",
              "Reads fault code, asset ID, location, and severity instantly",
              "Classifies ticket by type, priority, and required resource",
              "No human triage. No queue. Zero delay.",
            ],
          },
        ],
      },
      {
        heading: "Engineer Assignment",
        blocks: [
          {
            kind: "ul",
            items: [
              "Scans field engineer network in real time",
              "Matches by: location, skill certification, availability, current workload",
              "Assignment confirmed in seconds",
              "Engineer receives full fault context on mobile instantly",
            ],
          },
        ],
      },
      {
        heading: "Parts Orchestration",
        blocks: [
          {
            kind: "ul",
            items: [
              "Checks parts inventory against fault requirements automatically",
              "Reserves or orders required components before engineer departs",
              "Coordinates delivery to site or engineer location",
              "Zero parts-related return visits",
            ],
          },
        ],
      },
      {
        heading: "Real-Time Follow-Up & Escalation",
        blocks: [
          {
            kind: "ul",
            items: [
              "Tracks every open ticket against SLA clock",
              "Follows up with engineer automatically if delayed",
              "Engineers escalate directly back to AI via mobile",
              "Escalation routed to right person with full context, instantly",
            ],
          },
        ],
      },
      {
        heading: "Ticket Closure & Compliance",
        blocks: [
          {
            kind: "ul",
            items: [
              "Auto-closes ticket when fix confirmed by engineer",
              "Logs resolution code, parts used, time-to-fix",
              "Updates CRM and reporting dashboards automatically",
              "Generates compliance documentation for every service event",
            ],
          },
        ],
      },
      {
        heading: "Analytics",
        blocks: [
          {
            kind: "ul",
            items: [
              "Every engineer, every ticket, every asset — live",
              "SLA risk flagged before breach",
              "Resolution times, first-fix rates, and engineer performance tracked automatically",
              "Operations managers finally have the dashboard they needed",
            ],
          },
        ],
      },
      {
        heading: "The old way. And ours.",
        blocks: [
          {
            kind: "ul",
            title: "The Old Way",
            items: [
              "Fault fires → human picks ticket",
              "Manual call to find engineer",
              "Parts checked manually",
              "Follow-up via phone calls",
              "Engineer calls dispatcher to escalate",
              "Ticket closed manually",
              "Average response: 45 minutes",
            ],
          },
          {
            kind: "ul",
            title: "Avishkar",
            items: [
              "Fault fires → AI picks ticket instantly",
              "AI assigns nearest qualified engineer in seconds",
              "AI checks + pre-orders parts automatically",
              "AI follows up with engineer in real time",
              "Engineer talks directly to AI",
              "Ticket auto-closes on fix confirmation",
              "Average response: 5 minutes",
            ],
          },
        ],
      },
    ],
  },
  "vision-inspection": {
    eyebrow: "Products",
    heroTitle: "Vision Inspection",
    heroSubtitle:
      "Computer vision for critical infrastructure evidence — fault documentation and compliance closure for ATM, telecom, and medical-device workflows. Live with ATM manufacturers and telecom tower operators in India; dispatch coordination from 45 minutes to 5 minutes when paired with Avishkar Dispatch.",
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
  "field-intelligence-suite": {
    eyebrow: "Products",
    heroTitle: "Field Intelligence Suite",
    heroSubtitle:
      "Real-time visibility into every engineer, ticket, asset, and SLA across ATM, tower, and medical-device networks. Same proof bar as the rest of Avishkar: 45 minutes → 5 minutes coordination; live with ATM manufacturers and telecom tower operators in India.",
    sections: [
      {
        heading: "Route optimization",
        blocks: [
          {
            kind: "ul",
            items: [
              "Dynamic routing based on traffic, job priority & technician skills",
              "Multi-stop optimization across territories",
              "Real-time rerouting when emergencies arise",
            ],
          },
        ],
      },
      {
        heading: "Parts intelligence",
        blocks: [
          {
            kind: "ul",
            items: [
              "Predictive parts stocking by job type & geography",
              "Van inventory optimization",
              "Vendor coordination & emergency sourcing",
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
              "Technician scorecards & utilization",
              "Revenue per truck & margin insights",
              "Customer satisfaction correlation",
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
              "₹12,500 / month",
              "Included in Enterprise; optional add-on for Professional",
            ],
          },
        ],
      },
    ],
  },
};
