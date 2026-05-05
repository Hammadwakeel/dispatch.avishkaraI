import type { DocPage } from "./types";

/** Critical-infrastructure solution pages — Phase 4 IA */
export const solutionDocPages: Record<string, DocPage> = {
  atm: {
    eyebrow: "Solutions",
    heroTitle: "ATM fleet dispatch & fault response",
    heroTitleAccent: "ATM fleet",
    heroTitleRest: "dispatch & fault response",
    heroSubtitle:
      "Cash & kiosk uptime — ~45→~5 min coordination. India — ATM OEMs & telecom towers.",
    heroSubtitleAccent: "~45→~5 min coordination.",
    heroSubtitleRest: " Cash & uptime — field, OEM, vault aligned. India production.",
    sections: [
      {
        heading: "Challenges we solve",
        blocks: [
          {
            kind: "p",
            text: "Alarms, cash cycles, multi-vendor contracts, and audit packs—slow triage turns small faults into downtime and exposure.",
          },
          {
            kind: "ul",
            items: [
              { amber: "Alarm floods", graphite: " — severity & dedupe unclear." },
              { amber: "Right engineer", graphite: " — certified, stocked, in SLA radius." },
              { amber: "Parts / cassette", graphite: " — before the truck rolls." },
              { amber: "Proof packs", graphite: " — photos, tests, sign-off." },
            ],
          },
        ],
      },
      {
        heading: "How Avishkar AI fits",
        blocks: [
          {
            kind: "p",
            text: "One AI-native loop—ingest, assign, parts, live updates, compliant closure—for how ATM networks run in India & APAC.",
          },
          {
            kind: "ul",
            items: [
              { amber: "Unified queue", graphite: " — SLA + vendor-aware routing." },
              { amber: "Skill-aware assign", graphite: " — travel + audit trail." },
              { amber: "Parts orchestration", graphite: " — tied to asset history." },
              { amber: "Closure", graphite: " — evidence before tickets leave." },
            ],
          },
        ],
      },
    ],
  },
  towers: {
    eyebrow: "Solutions",
    heroTitle: "Telecom tower operations & field response",
    heroTitleAccent: "Telecom tower",
    heroTitleRest: "operations & field response",
    heroSubtitle:
      "Power, RF, structure, landlords — remote sites & rotating crews. ~45→~5 min coordination. India towers.",
    heroSubtitleAccent: "~45→~5 min coordination.",
    heroSubtitleRest: " Cert crews, access, proof — India deployments.",
    sections: [
      {
        heading: "Challenges we solve",
        blocks: [
          {
            kind: "p",
            text: "Constrained access, certified climbs, drive time, safety docs—generic ticketing breaks when every off-air minute costs.",
          },
          {
            kind: "ul",
            items: [
              { amber: "NOC → work order", graphite: " — actionable context." },
              { amber: "Credentials", graphite: " — climb, electrical, RF." },
              { amber: "Landlords & keys", graphite: " — fewer phone loops." },
              { amber: "Proof", graphite: " — tower QA & owners." },
            ],
          },
        ],
      },
      {
        heading: "How Avishkar AI fits",
        blocks: [
          {
            kind: "p",
            text: "Alarm context + asset records + crew reality—skills, shifts, geography—so the next roll is the right one.",
          },
          {
            kind: "ul",
            items: [
              { amber: "Severity triage", graphite: " — dedupe + SLA risk early." },
              { amber: "Assignment", graphite: " — certs + regional coverage." },
              { amber: "Live updates", graphite: " — intake → close." },
              { amber: "Vision capture", graphite: " — structures & hazards where allowed." },
            ],
          },
        ],
      },
    ],
  },
  "medical-devices": {
    eyebrow: "Solutions",
    heroTitle: "Medical device & clinical uptime teams",
    heroTitleAccent: "Medical device",
    heroTitleRest: "& clinical uptime teams",
    heroSubtitle:
      "Imaging & bedside failures disrupt care. Dispatch under compliance—who goes, which parts, which rules. ~45→~5 min. India proof bar.",
    heroSubtitleAccent: "Compliance-first dispatch.",
    heroSubtitleRest: " Speed without losing traceability. India.",
    sections: [
      {
        heading: "Challenges we solve",
        blocks: [
          {
            kind: "p",
            text: "Clinical engineering works under strict modality rules, access windows, and regulator-ready traceability.",
          },
          {
            kind: "ul",
            items: [
              { amber: "Dispatch rules", graphite: " — modality, tier, contract." },
              { amber: "Restricted access", graphite: " — sterile / ICU windows." },
              { amber: "Traceability", graphite: " — audits & renewals." },
              { amber: "Parts / loaners", graphite: " — during outages." },
            ],
          },
        ],
      },
      {
        heading: "How Avishkar AI fits",
        blocks: [
          {
            kind: "p",
            text: "Human gates where required, machine speed elsewhere—evidence from fault to verified resolution.",
          },
          {
            kind: "ul",
            items: [
              { amber: "Rule routing", graphite: " — certs + hospital protocols." },
              { amber: "Parts intel", graphite: " — BOMs & failure patterns." },
              { amber: "Closure", graphite: " — mandatory attachments when policy says so." },
              { amber: "Analytics", graphite: " — ops leadership can trust." },
            ],
          },
        ],
      },
    ],
  },
  hvac: {
    eyebrow: "Solutions",
    heroTitle: "HVAC — Critical Facilities",
    heroTitleAccent: "HVAC",
    heroTitleRest: "— Critical Facilities",
    heroSubtitle:
      "DC, hospital, cold chain—HVAC failure is crisis. Priority dispatch (roadmap). Same ~45→~5 min proof family; India live today on ATM & towers.",
    heroSubtitleAccent: "Priority facility dispatch.",
    heroSubtitleRest: " Coming soon — same stack. India ATM & tower live.",
    sections: [
      {
        heading: "Coming soon",
        blocks: [
          {
            kind: "p",
            text: "BMS-driven intake, cleared engineers, parts for chillers / CRAC / standby—facility-grade SLAs.",
          },
          {
            kind: "ul",
            items: [
              { amber: "BMS ingest", graphite: " — environmental alerts." },
              { amber: "Assignment", graphite: " — clearance + certification gates." },
              { amber: "Parts", graphite: " — chillers, CRAC, standby assets." },
            ],
          },
        ],
      },
    ],
  },
};
