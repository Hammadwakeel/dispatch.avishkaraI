import type { DocPage } from "./types";

/** Source: docs/avishkar-ai-website-content.docx — Solutions pages */
export const solutionDocPages: Record<string, DocPage> = {
  hvac: {
    eyebrow: "Solutions",
    heroTitle: "AI-Powered HVAC Operations",
    heroSubtitle:
      "From seasonal surges to refrigerant compliance—let AI handle complexity while your team focuses on the work.",
    sections: [
      {
        heading: "Challenges we solve",
        blocks: [
          {
            kind: "p",
            text: "Residential and light-commercial HVAC businesses balance seasonal peaks, skilled labor, and long-term maintenance agreements—often with the same trucks and technicians year-round. Avishkar AI targets the operational friction that shows up in dispatch boards, compliance logs, and contract renewals.",
          },
          {
            kind: "ul",
            items: [
              "Seasonal demand spikes overwhelming dispatch",
              "Technician expertise vs. job matching errors",
              "Refrigerant tracking & compliance complexity",
              "Maintenance contract underutilization",
              "Equipment failure driving emergency scrambles",
            ],
          },
        ],
      },
      {
        heading: "AI capabilities for HVAC",
        blocks: [
          {
            kind: "p",
            text: "Our models combine job history, equipment context, and voice interactions so scheduling, parts, and customer communication stay aligned—from tune-ups and replacements to after-hours emergencies.",
          },
          {
            kind: "ul",
            title: "Predictive service",
            items: [
              "Analyze equipment age, usage, historical failures",
              "Alert customers before breakdowns",
              "Convert reactive demand into proactive revenue",
            ],
          },
          {
            kind: "ul",
            title: "Smart scheduling & voice booking",
            items: [
              "Match skills, factor traffic, weather & job duration",
              "AI answers after-hours calls, books & qualifies emergency vs. routine",
            ],
          },
          {
            kind: "ul",
            title: "Parts intelligence & contract health",
            items: [
              "Predict parts by job type & equipment; reduce return trips",
              "Track agreement utilization & automate renewal outreach",
            ],
          },
        ],
      },
    ],
  },
  plumbing: {
    eyebrow: "Solutions",
    heroTitle: "Smarter Plumbing Operations",
    heroSubtitle:
      "From emergency prioritization to drain cleaning efficiency—handle more jobs, faster.",
    sections: [
      {
        heading: "Challenges we solve",
        blocks: [
          {
            kind: "p",
            text: "Plumbing crews constantly trade off emergencies against booked work, variable job durations, and parts availability. These dynamics show up as callbacks, idle drive time, and frustrated customers when dispatch cannot reprioritize fast enough.",
          },
          {
            kind: "ul",
            items: [
              "Emergency calls disrupting planned schedules",
              "Drain & sewer jobs with variable duration",
              "Rare fixture parts hard to predict",
              "Water heater installs & permits",
              "Commercial plumbing coordination",
            ],
          },
        ],
      },
      {
        heading: "AI capabilities for plumbing",
        blocks: [
          {
            kind: "p",
            text: "Avishkar AI classifies inbound intent, forecasts realistic job lengths, and keeps technicians equipped with context—photos, specs, and permit status—before they arrive on site.",
          },
          {
            kind: "ul",
            items: [
              "Emergency intelligence: prioritize, route closest tech, proactive customer updates",
              "Job-type prediction: realistic buffers, long-job flags",
              "Fixture database: photos & specs on site",
              "Permit tracking & commercial multi-trade coordination",
            ],
          },
        ],
      },
    ],
  },
  electrical: {
    eyebrow: "Solutions",
    heroTitle: "Intelligent Electrical Services",
    heroSubtitle:
      "From panel upgrades to code compliance—keep operations safe, efficient, and profitable.",
    sections: [
      {
        heading: "Challenges we solve",
        blocks: [
          {
            kind: "p",
            text: "Electrical contractors carry heavy documentation, licensing, and safety obligations on every truck roll. Missed permits, unclear load documentation, or expired certifications directly translate into rework, fines, and liability exposure.",
          },
          {
            kind: "ul",
            items: [
              "Code compliance documentation burden",
              "Panel capacity & load analysis complexity",
              "Licensing & certification tracking",
              "Safety incidents & liability",
              "Permit-heavy job coordination",
            ],
          },
        ],
      },
      {
        heading: "AI capabilities for electrical",
        blocks: [
          {
            kind: "p",
            text: "Vision-assisted capture, structured checklists, and automated routing rules help your team prove work was done to code and that the right technician—still certified for the task—is assigned every time.",
          },
          {
            kind: "ul",
            items: [
              "Code compliance engine: proof photos, permit paperwork",
              "Panel intelligence: documentation & upgrade recommendations",
              "Certification tracking with expiration alerts & job matching",
              "Safety checklists & incident documentation",
            ],
          },
        ],
      },
    ],
  },
  "home-services": {
    eyebrow: "Solutions",
    heroTitle: "Complete Home Services Platform",
    heroSubtitle:
      "HVAC, plumbing, electrical, appliance repair—one platform to manage it all.",
    sections: [
      {
        heading: "Multi-trade features",
        blocks: [
          {
            kind: "p",
            text: "When homeowners trust you with more than one trade, disconnected systems become the bottleneck. Avishkar AI keeps a single customer record, one schedule of truth, and shared equipment history so cross-sell and follow-up feel intentional—not improvised.",
          },
          {
            kind: "ul",
            title: "Unified customer view",
            items: [
              "All services & history in one profile",
              "Cross-sell opportunities & lifetime value tracking",
            ],
          },
          {
            kind: "ul",
            title: "Scheduling & home history",
            items: [
              "Coordinate multiple trades & follow-ups automatically",
              "Equipment, repairs, warranties & preventive maintenance in one place",
            ],
          },
          {
            kind: "ul",
            title: "Home inspection integration",
            items: [
              "Connect inspection reports, flag issues, generate quotes from findings",
            ],
          },
        ],
      },
    ],
  },
  commercial: {
    eyebrow: "Solutions",
    heroTitle: "Enterprise Field Operations at Scale",
    heroSubtitle:
      "Multi-site management, SLA compliance, vendor coordination—built for commercial complexity.",
    sections: [
      {
        heading: "Commercial-specific capabilities",
        blocks: [
          {
            kind: "p",
            text: "Facility and commercial programs demand visibility across locations, vendors, and budgets. Avishkar AI aligns dispatch decisions with SLAs, spend controls, and subcontractor performance so enterprise accounts stay auditable and profitable.",
          },
          {
            kind: "ul",
            items: [
              "Central dashboard, site-specific scheduling, cross-location deployment",
              "SLA definition, real-time compliance tracking, breach-risk alerts",
              "Subcontractor management & vendor performance",
              "Budget vs. actual, project profitability, client billing integration",
            ],
          },
        ],
      },
    ],
  },
  "emergency-services": {
    eyebrow: "Solutions",
    heroTitle: "24/7 AI Emergency Response",
    heroSubtitle: "Never miss an emergency. Always respond faster.",
    sections: [
      {
        heading: "Emergency capabilities",
        blocks: [
          {
            kind: "p",
            text: "After-hours volume is unpredictable, but customer expectations are not. AI-first intake captures every call, triages severity, and mobilizes the nearest qualified resource—while preserving human escalation paths when situations demand it.",
          },
          {
            kind: "ul",
            items: [
              "AI answers emergency calls 24/7, classifies urgency, routes nearest tech",
              "Emergency jobs jump the queue with on-call alerts & live ETA",
              "After-hours coverage with human backup for true emergencies",
              "Custom workflows, insurer notification, liability documentation",
            ],
          },
        ],
      },
    ],
  },
};
