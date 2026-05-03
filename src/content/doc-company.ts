import type { DocPage } from "./types";

/** Source: docs/avishkar-ai-website-content.docx + brand context */
export const companyDocPages: Record<string, DocPage> = {
  about: {
    eyebrow: "Company",
    heroTitle: "About Avishkar AI",
    heroSubtitle:
      "Avishkar AI is the flagship brand of Anjaneya AI Technologies Pvt Ltd—an AI-native field service management platform engineered for intelligence from day one, not bolted on as an afterthought.",
    sections: [
      {
        heading: "What we build",
        blocks: [
          {
            kind: "p",
            text: "We transform reactive field service into autonomous operations: scheduling, dispatch, customer communication, inventory, and predictive maintenance—so teams focus on the work, not the logistics.",
          },
          {
            kind: "p",
            text: "Reference positioning: ServiceTitan-class breadth—AI-native, autonomous, and intelligence-first.",
          },
        ],
      },
      {
        heading: "Principles",
        blocks: [
          {
            kind: "ul",
            items: [
              "Transparency in AI decisions & auditability",
              "Human-in-the-loop where it matters",
              "Security & data ownership for operators",
            ],
          },
        ],
      },
    ],
  },
  leadership: {
    eyebrow: "Company",
    heroTitle: "Leadership",
    heroSubtitle:
      "Experienced operators and builders aligning product, AI research, and customer outcomes.",
    sections: [
      {
        heading: "How we operate",
        blocks: [
          {
            kind: "p",
            text: "Leadership bios and photos will be published here. For executive briefings or board introductions, contact our partnerships desk.",
          },
        ],
      },
    ],
  },
  careers: {
    eyebrow: "Company",
    heroTitle: "Careers",
    heroSubtitle:
      "Join a team shipping production AI for technicians, dispatchers, and customers in the field.",
    sections: [
      {
        heading: "Open roles",
        blocks: [
          {
            kind: "p",
            text: "We are hiring across engineering, applied AI, product design, customer success, and sales. Send your profile and portfolio link to careers@avishkar.ai (mailbox coming online per launch checklist).",
          },
        ],
      },
    ],
  },
  partners: {
    eyebrow: "Company",
    heroTitle: "Partners",
    heroSubtitle:
      "Technology integrators, OEMs, and service networks extending Avishkar AI to new markets.",
    sections: [
      {
        heading: "Partnerships",
        blocks: [
          {
            kind: "p",
            text: "For integration partnerships, reseller programs, and OEM collaborations, email partners@avishkar.ai.",
          },
        ],
      },
    ],
  },
  press: {
    eyebrow: "Company",
    heroTitle: "Press & media",
    heroSubtitle:
      "Fact sheets, logos, and executive commentary for journalists and analysts.",
    sections: [
      {
        heading: "Media contact",
        blocks: [
          {
            kind: "p",
            text: "Press inquiries: press@avishkar.ai",
          },
        ],
      },
    ],
  },
  contact: {
    eyebrow: "Company",
    heroTitle: "Let's Build Your AI-Powered Operation",
    heroSubtitle:
      "Tell us about your business. We'll show you how AI can transform it.",
    sections: [
      {
        heading: "Contact channels",
        blocks: [
          {
            kind: "ul",
            items: [
              "General: hello@avishkar.ai",
              "Sales: sales@avishkar.ai",
              "Support: support@avishkar.ai (24/7 for Enterprise; business hours for Professional)",
              "Press: press@avishkar.ai",
              "Partners: partners@avishkar.ai",
            ],
          },
        ],
      },
      {
        heading: "What to include in your note",
        blocks: [
          {
            kind: "ul",
            items: [
              "Company name & number of technicians",
              "Industry (HVAC, plumbing, electrical, home services, commercial, other)",
              "What you want to explore: FSM platform, voice agent, vision inspection, predictive maintenance, or full platform",
              "Biggest operational challenge today",
              "Preferred demo timing: ASAP, this week, this month, or exploring",
            ],
          },
        ],
      },
      {
        heading: "Privacy",
        blocks: [
          {
            kind: "p",
            text: "We respect your privacy. Your information will never be sold or shared with third parties outside of delivering our services.",
          },
        ],
      },
    ],
  },
};
