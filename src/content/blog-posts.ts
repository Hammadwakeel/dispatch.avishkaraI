import { blogCategoryLinks } from "@/config/site-navigation";
import type { DocSection } from "./types";

/** Aligns with `blogCategoryLinks` / `BLOG_SLUGS`. */
export type BlogCategorySlug =
  | "industry-trends"
  | "case-studies"
  | "product-updates";

export type BlogPost = {
  slug: string;
  category: BlogCategorySlug;
  title: string;
  excerpt: string;
  publishedAt: string;
  readMinutes: number;
  sections: DocSection[];
};

const categoryLabelBySlug = Object.fromEntries(
  blogCategoryLinks.map((l) => [l.href.replace("/resources/blog/", ""), l.label] as const),
) as Record<BlogCategorySlug, string>;

export function blogCategoryLabel(slug: string): string {
  return categoryLabelBySlug[slug as BlogCategorySlug] ?? slug;
}

const posts: BlogPost[] = [
  {
    slug: "neural-scheduling-beyond-static-rules",
    category: "industry-trends",
    title: "Neural scheduling: why learned policies beat static rules in dispatch",
    excerpt:
      "Rule engines break when traffic, skills, and job mix shift daily. Here is how continuous learning maps better to real field operations.",
    publishedAt: "2026-01-18",
    readMinutes: 7,
    sections: [
      {
        heading: "Where rule-based dispatch stalls",
        blocks: [
          {
            kind: "p",
            text: "Most dispatch stacks encode priorities as fixed weights: minimize drive time, respect skill tags, honor SLAs. That works until seasonality, weather, or a wave of emergencies reshapes the feasible set overnight. Rules do not adapt without engineering time.",
          },
          {
            kind: "p",
            text: "Neural schedulers instead consume embeddings of technicians, jobs, and constraints—then propose assignments scored against outcomes you care about (first-time fix, revenue per hour, customer promises). Retraining closes the loop as new outcomes arrive.",
          },
        ],
      },
      {
        heading: "What to validate before you trust it",
        blocks: [
          {
            kind: "ul",
            items: [
              "Hold-out evaluation against historical schedules—not averages alone.",
              "Human-on-the-loop override paths with reason codes.",
              "Drift monitors when technician turnover or territory mix changes.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "vision-qa-job-documentation",
    category: "industry-trends",
    title: "Computer vision for job-site QA without slowing technicians down",
    excerpt:
      "Photo proof should reinforce quality and compliance—not become another nightly backlog.",
    publishedAt: "2026-01-08",
    readMinutes: 6,
    sections: [
      {
        heading: "Design from the truck roll",
        blocks: [
          {
            kind: "p",
            text: "Technicians already capture photos out of habit when installs go smoothly—or when something looks wrong. Vision models add structure: consistent angles, missing-step detection, and packaging into customer-ready summaries.",
          },
          {
            kind: "p",
            text: "The win is not replacing judgment—it is scaling review. Dispatchers see flagged frames first; everything else auto-archives for audit trails.",
          },
        ],
      },
      {
        heading: "Operational checklist",
        blocks: [
          {
            kind: "ul",
            items: [
              "Define minimum viable shots per job type (before / after / serial plate).",
              "Train on your geography and fixtures—generic models miss edge cases.",
              "Pair vision outputs with voice notes so context survives handoffs.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "field-service-2026-ai-platform-shift",
    category: "industry-trends",
    title: "Field service in 2026: the shift toward AI-native platforms",
    excerpt:
      "Integration-heavy stacks made sense when AI was a bolt-on. That assumption is reversing.",
    publishedAt: "2026-01-22",
    readMinutes: 5,
    sections: [
      {
        heading: "From stitched integrations to unified intelligence",
        blocks: [
          {
            kind: "p",
            text: "Orchestrating CRM, routing, telephony, and analytics separately worked when automation was shallow. AI-native platforms collapse scheduling, voice intake, and technician workflows into one feedback loop—fewer reconciliation tasks and faster iteration.",
          },
          {
            kind: "p",
            text: "Buyers are prioritizing vendors who publish model governance, latency budgets for voice, and transparent routing rationale—not only feature parity checklists.",
          },
        ],
      },
      {
        heading: "Signals we watch",
        blocks: [
          {
            kind: "ul",
            items: [
              "Emergency volume handled without proportional headcount growth.",
              "Reduction in inbound status calls after proactive messaging ships.",
              "Time-to-book dropping on nights and weekends.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "density-labor-and-automation-india",
    category: "industry-trends",
    title: "High-density routes, mixed fleets: automation where labor is scarce",
    excerpt:
      "Indian field markets combine congested metros with thin bench depth—automation has to earn trust fast.",
    publishedAt: "2025-12-14",
    readMinutes: 6,
    sections: [
      {
        heading: "Constraints that shape adoption",
        blocks: [
          {
            kind: "p",
            text: "Mixed ownership models—company trucks, contractor partners, franchise banners—mean scheduling products must respect heterogeneous costs and permissions. Static territories fail when demand spikes cluster around festivals or weather events.",
          },
          {
            kind: "p",
            text: "Operators succeed when AI respects rupee economics: trip cost, parts carrying cost, and prepaid versus postpaid customer behaviors—not only Western SLA templates.",
          },
        ],
      },
      {
        heading: "Rollout sequencing",
        blocks: [
          {
            kind: "ul",
            items: [
              "Start with voice intake and confirmation SMS—customer-visible wins.",
              "Layer dispatch optimization once job-quality labels stabilize.",
              "Publish bilingual prompts early if Hindi–English code-switching is common.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "scaling-dispatch-playbook-anonymized",
    category: "case-studies",
    title: "Scaling dispatch without linear headcount: a multi-trade playbook",
    excerpt:
      "Composite narrative from several deployments—how one operating cadence tripled jobs per planner.",
    publishedAt: "2026-01-03",
    readMinutes: 8,
    sections: [
      {
        heading: "Baseline snapshot",
        blocks: [
          {
            kind: "p",
            text: "The operator ran HVAC and plumbing under one brand with shared intake but siloed boards. Planners manually reconciled spreadsheets nightly; emergency reroutes blew up the morning plan twice a week.",
          },
          {
            kind: "p",
            text: "They centralized intake through AI voice qualification, pushed structured jobs into one queue, and allowed the optimizer to batch geography-first while respecting certification edges.",
          },
        ],
      },
      {
        heading: "Measured outcomes (90-day window)",
        blocks: [
          {
            kind: "ul",
            items: [
              "Planner hours per 100 jobs decreased materially while backlog cleared faster.",
              "Return-trip rate dropped after parts hints aligned with job archetypes.",
              "Customer callbacks for ETA dropped when proactive SMS shipped.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "proactive-messaging-and-status-calls",
    category: "case-studies",
    title: "Cutting status-call volume with proactive customer messaging",
    excerpt:
      "When dispatch knows the plan, customers should too—before they dial.",
    publishedAt: "2025-11-20",
    readMinutes: 5,
    sections: [
      {
        heading: "The pattern",
        blocks: [
          {
            kind: "p",
            text: "Inbound queues spike between 9–11 am when homeowners guess arrival windows. Operators added milestone triggers: booked, en route (with live ETA), delayed (with reason), completed with recap link.",
          },
          {
            kind: "p",
            text: "Voice agents handed off structured summaries so SMS stayed concise—no paragraph dumps that erode trust.",
          },
        ],
      },
      {
        heading: "What changed operationally",
        blocks: [
          {
            kind: "ul",
            items: [
              "CSR teams reclaimed capacity for revenue conversations.",
              "Technicians received fewer mid-route interruptions.",
              "NPS commentary cited communication clarity more often than speed alone.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "release-notes-january-2026-voice-routing",
    category: "product-updates",
    title: "January 2026: Voice agent upgrades and smarter emergency routing",
    excerpt:
      "Faster intent classification, bilingual handoffs, and queue jumps that respect on-call rotations.",
    publishedAt: "2026-01-27",
    readMinutes: 4,
    sections: [
      {
        heading: "Voice agent",
        blocks: [
          {
            kind: "ul",
            items: [
              "Reduced median time-to-intent for emergency versus routine classification.",
              "Improved handling when callers switch languages mid-sentence.",
              "Configurable fallback to human queue with transcript attachment.",
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
              "Emergency jobs can elevate priority while respecting certification and rest policies.",
              "ETA chips pull live traffic estimates when enabled for the account.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "mobile-technician-app-winter-2026",
    category: "product-updates",
    title: "Technician mobile: offline resilience and faster photo uploads",
    excerpt:
      "Smaller payloads, clearer offline queues, and safer retries on flaky networks.",
    publishedAt: "2026-01-12",
    readMinutes: 3,
    sections: [
      {
        heading: "Highlights",
        blocks: [
          {
            kind: "ul",
            items: [
              "Compressed image pipeline preserves QA detail while reducing upload time.",
              "Offline mode queues actions with explicit sync status per job.",
              "Quick actions for common parts requests from recent catalogs.",
            ],
          },
        ],
      },
      {
        heading: "Upgrade guidance",
        blocks: [
          {
            kind: "p",
            text: "Fleet admins should pilot on a single territory before broad rollout; verify legacy Android versions on contractor devices match minimum OS targets documented in the release notes dashboard.",
          },
        ],
      },
    ],
  },
];

export const blogPostsAll: BlogPost[] = [...posts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export const blogPostsBySlug: Record<string, BlogPost> = Object.fromEntries(
  posts.map((p) => [p.slug, p]),
);

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPostsAll.filter((p) => p.category === category);
}

export function isBlogPostSlug(slug: string): boolean {
  return slug in blogPostsBySlug;
}
