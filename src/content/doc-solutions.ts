import type { DocPage } from "./types";

/** Critical-infrastructure solution pages — Phase 4 IA */
export const solutionDocPages: Record<string, DocPage> = {
  atm: {
    eyebrow: "Solutions",
    heroTitle: "ATM fleet dispatch & fault response",
    heroSubtitle:
      "Cash availability and kiosk uptime are non-negotiable. Avishkar AI collapses dispatch coordination from 45 minutes to 5 minutes so first-line teams, OEM partners, and vault logistics stay aligned on every incident. Live with ATM manufacturers and telecom tower operators in India.",
    sections: [
      {
        heading: "Challenges we solve",
        blocks: [
          {
            kind: "p",
            text: "ATM operators juggle monitoring alarms, cash-loading schedules, multi-vendor contracts, and audit-ready evidence. Slow triage or unclear ownership turns a minor fault into hours of downtime and regulatory exposure.",
          },
          {
            kind: "ul",
            items: [
              "Fault floods from monitoring tools without clear severity or duplicate suppression",
              "Matching the right engineer—vendor-certified, stocked, and within SLA radius",
              "Parts and cassette coordination before the truck rolls",
              "Proof packs for closure: photos, tests, timestamps, and customer sign-off",
            ],
          },
        ],
      },
      {
        heading: "How Avishkar AI fits",
        blocks: [
          {
            kind: "p",
            text: "One AI-native dispatch loop connects ingestion, assignment, parts, live updates, and compliant closure—built for how ATM networks actually run in India and APAC.",
          },
          {
            kind: "ul",
            items: [
              "Unified fault queue with SLA-aware prioritization and vendor-aware routing rules",
              "Travel- and skill-aware engineer assignment with full decision audit trails",
              "Parts orchestration tied to asset history to reduce repeat visits",
              "Closure workflows that enforce evidence before tickets leave the queue",
            ],
          },
        ],
      },
    ],
  },
  towers: {
    eyebrow: "Solutions",
    heroTitle: "Telecom tower operations & field response",
    heroSubtitle:
      "Tower faults span power, RF, structural checks, and landlord coordination—often across remote sites and rotating crews. Dispatch coordination from 45 minutes to 5 minutes; live with ATM manufacturers and telecom tower operators in India.",
    sections: [
      {
        heading: "Challenges we solve",
        blocks: [
          {
            kind: "p",
            text: "Tower maintenance means constrained access windows, certification-specific crews, long drive times, and safety documentation. Traditional ticketing tools break down when every minute off-air translates to penalties and churn.",
          },
          {
            kind: "ul",
            items: [
              "Translating NOC alarms into actionable field work orders",
              "Routing technicians with the right climb, electrical, or RF credentials",
              "Coordinating landlords, keys, and site access without endless phone tags",
              "Capturing structured proof for tower owners and internal QA",
            ],
          },
        ],
      },
      {
        heading: "How Avishkar AI fits",
        blocks: [
          {
            kind: "p",
            text: "Dispatch intelligence connects alarm context, asset records, and technician reality—skills, shifts, and geography—so the next truck roll is the right one.",
          },
          {
            kind: "ul",
            items: [
              "Severity-aware triage that merges duplicates and highlights SLA risk early",
              "Assignment recommendations that respect certifications and regional coverage",
              "Live stakeholder updates from intake through closure",
              "Vision-assisted capture for structures, cabinets, and hazard documentation where policies allow",
            ],
          },
        ],
      },
    ],
  },
  "medical-devices": {
    eyebrow: "Solutions",
    heroTitle: "Medical device & clinical uptime teams",
    heroSubtitle:
      "Imaging, diagnostics, and bedside equipment failures disrupt patient care and revenue. Avishkar AI keeps dispatch disciplined—who goes, with what parts, under which compliance rules—without sacrificing speed. Proof bar: 45 minutes → 5 minutes coordination; live with ATM manufacturers and telecom tower operators in India.",
    sections: [
      {
        heading: "Challenges we solve",
        blocks: [
          {
            kind: "p",
            text: "Clinical engineering and OEM field teams operate under strict procedures: validated workflows, controlled environments, and traceability for regulators and hospital partners.",
          },
          {
            kind: "ul",
            items: [
              "Strict dispatch rules by modality, hospital tier, and contract coverage",
              "Sterile or restricted-area access scheduling with minimal disruption",
              "Traceable service histories for audits and renewal conversations",
              "Coordinating specialty parts and loaner devices during outages",
            ],
          },
        ],
      },
      {
        heading: "How Avishkar AI fits",
        blocks: [
          {
            kind: "p",
            text: "We mirror how regulated teams work—human approvals where required, machine speed everywhere else—while preserving an evidence trail from fault to verified resolution.",
          },
          {
            kind: "ul",
            items: [
              "Rule-driven routing that respects certifications and hospital protocols",
              "Parts intelligence tied to asset BOMs and failure patterns",
              "Structured closure checklists with mandatory attachments where policies demand them",
              "Operational analytics that leadership can trust—not vanity dashboards",
            ],
          },
        ],
      },
    ],
  },
  hvac: {
    eyebrow: "Solutions",
    heroTitle: "HVAC — Critical Facilities",
    heroSubtitle:
      "Data centers, hospitals, cold chain — HVAC failure in these environments is a crisis, not an inconvenience. Avishkar treats it that way. Coming soon; same dispatch proof: 45 minutes → 5 minutes and live deployments with ATM manufacturers and telecom tower operators in India today.",
    sections: [
      {
        heading: "Coming soon",
        blocks: [
          {
            kind: "p",
            text: "Data centers, hospitals, cold chain — HVAC failure in these environments is a crisis, not an inconvenience. Avishkar treats it that way. Priority dispatch. Facility-grade SLAs.",
          },
          {
            kind: "ul",
            items: [
              "Fault ingestion from BMS / environmental alerts",
              "Engineer assignment with clearance and certification gates",
              "Parts orchestration for chillers, CRAC, and standby assets",
            ],
          },
        ],
      },
    ],
  },
};
