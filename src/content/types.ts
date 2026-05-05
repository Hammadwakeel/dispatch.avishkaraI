/** Structured page body derived from Avishkar AI website content doc. */

/** Bullet line: plain string, or amber lead + body (uses `text-amber-glow` + body color in UI). */
export type DocListItem = string | { amber: string; graphite: string };

export type DocBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; title?: string; items: DocListItem[] }
  /** Label + mailto (optional suffix after email, e.g. support hours) — company contact doc */
  | {
      kind: "contactChannels";
      entries: Array<{ label: string; email: string; suffix?: string }>;
    };

export type DocSection = {
  heading: string;
  blocks: DocBlock[];
};

export type DocPage = {
  eyebrow?: string;
  /** Full title for metadata / OG; use with optional splits below for display. */
  heroTitle: string;
  /** Optional poster line 1: amber + graphite words (e.g. Vision | Inspection). */
  heroTitleAccent?: string;
  heroTitleRest?: string;
  /** Optional second poster line — graphite; pair with `heroTitleLine2Accent` for an amber suffix. */
  heroTitleLine2?: string;
  heroTitleLine2Accent?: string;
  heroSubtitle: string;
  /** When both set, hero shows bold amber + graphite split (metadata still uses `heroSubtitle`). */
  heroSubtitleAccent?: string;
  heroSubtitleRest?: string;
  sections: DocSection[];
};
