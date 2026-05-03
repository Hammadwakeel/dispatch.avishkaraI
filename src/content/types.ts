/** Structured page body derived from Avishkar AI website content doc. */

export type DocBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; title?: string; items: string[] };

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
