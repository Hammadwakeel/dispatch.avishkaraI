/** Structured page body derived from Avishkar AI website content doc. */

export type DocBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; title?: string; items: string[] }
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
  heroTitle: string;
  heroSubtitle: string;
  sections: DocSection[];
};
