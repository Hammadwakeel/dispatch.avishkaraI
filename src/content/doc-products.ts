import type { DocPage } from "./types";

/** Products — keep bullets short; UI renders in Mac preview + hub cards */
export const productDocPages: Record<string, DocPage> = {
  "fsm-platform": {
    eyebrow: "AI-native dispatch",
    heroTitle: "Dispatch engineers actually want.",
    heroSubtitle: "~45→~5 min. No dispatcher. ATM & telecom, India.",
    sections: [
      {
        heading: "Fault Ingestion",
        blocks: [
          {
            kind: "ul",
            items: [
              { amber: "API ingest", graphite: " — any monitoring feed." },
              { amber: "Classify", graphite: " asset, severity, geo." },
              { amber: "Zero queue", graphite: " — instant ticket." },
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
              { amber: "Live roster", graphite: " — availability & load." },
              { amber: "Match", graphite: " geo, certs, skills." },
              { amber: "Mobile context", graphite: " before roll." },
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
              { amber: "Fit to BOM", graphite: " from fault." },
              { amber: "Reserve", graphite: " before departure." },
              { amber: "Deliver", graphite: " to site or tech." },
            ],
          },
        ],
      },
      {
        heading: "Follow-up & escalation",
        blocks: [
          {
            kind: "ul",
            items: [
              { amber: "SLA clock", graphite: " on open tickets." },
              { amber: "Auto-nudge", graphite: " when jobs slip." },
              { amber: "Engineer ↔ AI", graphite: " on mobile." },
            ],
          },
        ],
      },
      {
        heading: "Closure & compliance",
        blocks: [
          {
            kind: "ul",
            items: [
              { amber: "Close", graphite: " on confirmed fix." },
              { amber: "Sync", graphite: " CRM & reporting." },
              { amber: "Compliance pack", graphite: " per event." },
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
              { amber: "Live grid", graphite: " — crew, tickets, assets." },
              { amber: "SLA risk", graphite: " before breach." },
              { amber: "Metrics", graphite: " — resolution, first-fix." },
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
              { amber: "Manual triage", graphite: " per fault." },
              { amber: "Phone trees", graphite: " for crew & parts." },
              { amber: "~45 min", graphite: " typical coord." },
            ],
          },
          {
            kind: "ul",
            title: "Avishkar",
            items: [
              { amber: "AI ingest", graphite: " — instant queue." },
              { amber: "Auto assign + parts", graphite: " in seconds." },
              { amber: "~5 min", graphite: " target." },
            ],
          },
        ],
      },
    ],
  },
  "vision-inspection": {
    eyebrow: "Products",
    heroTitle: "Vision Inspection",
    heroTitleAccent: "Vision",
    heroTitleRest: "Inspection",
    heroSubtitle: "Field evidence with Dispatch. India.",
    heroSubtitleAccent: "Evidence & compliance.",
    heroSubtitleRest: " Same stack. India.",
    sections: [
      {
        heading: "Before / after documentation",
        blocks: [
          {
            kind: "ul",
            items: [
              { amber: "Required photo sets", graphite: " per job." },
              { amber: "Stamp & geo", graphite: " — cloud sync." },
              { amber: "Compare", graphite: " before/after in one view." },
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
              { amber: "Damage tags", graphite: " — crack, wear, corrosion." },
              { amber: "Hazard alerts", graphite: " on unsafe conditions." },
              { amber: "Audit-ready", graphite: " for insurers." },
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
              { amber: "Work verification", graphite: " vs standards." },
              { amber: "Warranty trail", graphite: " for disputes." },
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
              { amber: "₹7,500 / mo", graphite: " — unlimited photos." },
              { amber: "Bundled", graphite: " Pro & Enterprise." },
            ],
          },
        ],
      },
    ],
  },
  "field-intelligence-suite": {
    eyebrow: "Products",
    heroTitle: "Field Intelligence Suite",
    heroTitleAccent: "Field",
    heroTitleRest: "Intelligence",
    heroTitleLine2: "Suite",
    heroSubtitle: "Crew, tickets, assets, SLAs — one pane. India.",
    heroSubtitleAccent: "Live ops.",
    heroSubtitleRest: " ATM, tower, medical. India.",
    sections: [
      {
        heading: "Route optimization",
        blocks: [
          {
            kind: "ul",
            items: [
              { amber: "Dynamic routes", graphite: " — traffic, priority." },
              { amber: "Multi-stop", graphite: " territories." },
              { amber: "Reroute", graphite: " on emergencies." },
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
              { amber: "Stock signals", graphite: " by job & region." },
              { amber: "Van levels", graphite: " optimized." },
              { amber: "Vendor pull", graphite: " urgent parts." },
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
              { amber: "Technician scorecards", graphite: " & utilization." },
              { amber: "Truck economics", graphite: " — margin view." },
              { amber: "CSAT", graphite: " tied to outcomes." },
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
              { amber: "₹12,500 / mo", graphite: " standalone." },
              { amber: "Enterprise bundle", graphite: " optional add-on." },
            ],
          },
        ],
      },
    ],
  },
};
