import type { DocPage } from "./types";

/** Hub hero / facts card — keep in sync with company narrative in doc pages */
export const companyHubMeta = {
  legalName: "Anjaneya AI Technologies Pvt Ltd",
  flagshipBrand: "Avishkar AI",
  founded: "2024",
  primaryEmail: "hello@avishkar.ai",
} as const;

/** Source: docs/avishkar-ai-website-content.docx + brand context */
export const companyDocPages: Record<string, DocPage> = {
  about: {
    eyebrow: "Our Story",
    heroTitle: "We built the dispatch system critical infrastructure deserved — but never had.",
    heroSubtitle:
      "The ATM industry accepted 45-minute response times. Telecom operators assumed manual dispatch was inevitable. We looked at both and asked: what if the entire dispatch loop was run by AI? Five minutes later, we had our answer. Today dispatch coordination runs from 45 minutes to 5 minutes on the platform, and we are live with ATM manufacturers and telecom tower operators in India.",
    sections: [
      {
        heading: "The problem nobody was questioning",
        blocks: [
          {
            kind: "p",
            text: "Critical infrastructure — ATMs, towers, medical devices — goes down constantly. Every time, a human picks up the phone, finds an engineer, and dispatches manually. The industry accepted 45 minutes as the minimum response time. We didn't.",
          },
        ],
      },
      {
        heading: "The gap we found",
        blocks: [
          {
            kind: "p",
            text: "The technology to dispatch in 5 minutes already existed. The monitoring systems were already firing fault events. The engineers were already in the field. Nobody had built the AI layer connecting all of it — end to end, without a human in the middle.",
          },
        ],
      },
      {
        heading: "What we built",
        blocks: [
          {
            kind: "p",
            text: "Avishkar is an AI-native dispatch layer that sits on top of your existing monitoring stack. Fault in → engineer assigned → parts coordinated → ticket closed. Fully autonomous. Live with ATM manufacturers and tower operators in India. Expanding across APAC.",
          },
        ],
      },
      {
        heading: "The platform. Three layers.",
        blocks: [
          {
            kind: "ul",
            items: [
              "AI-Native Dispatch — The core engine. Receives fault events, assigns engineers, coordinates parts, follows up, closes tickets. End to end. No human dispatcher.",
              "Vision Inspection — Computer vision layer that detects faults from cameras and IoT sensors — before a human reports them. Triggers the dispatch loop automatically.",
              "Field Intelligence Suite — Real-time visibility into every engineer, ticket, asset, and SLA across your network. Operations teams finally have the dashboard they needed.",
            ],
          },
        ],
      },
      {
        heading: "How we operate",
        blocks: [
          {
            kind: "ul",
            items: [
              "We own the outcome — When a fault fires and an ATM goes down, our customers are losing money. We measure ourselves by dispatch time, resolution rate, and SLA compliance — not feature releases.",
              "Specificity over claims — 5 minutes. 45 minutes. Two live customers. APAC expansion. We say what we've actually done — not what we could theoretically do.",
              "Integration, not replacement — We don't ask customers to rip out their monitoring systems. We sit on top. That's how you get to deployment in weeks, not 18 months.",
              "Build for the hardest use case — Medical devices. ATM networks. Telecom towers. If it works here, it works everywhere. We chose critical infrastructure deliberately.",
              "Founders on every call — Every demo is run by a founder. Every customer gets our personal number. We don't hire account managers before we earn the right to.",
            ],
          },
        ],
      },
      {
        heading: "We're a small team building something big.",
        blocks: [
          {
            kind: "p",
            text: "We're early. We're lean. We're live with enterprise customers and expanding across APAC. If you want to build the infrastructure that keeps critical systems running worldwide — talk to us.",
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
      "No ping-pong-table narrative here. We are a small, execution-heavy team shipping production systems for high-stakes field operations.",
    sections: [
      {
        heading: "Open roles",
        blocks: [
          {
            kind: "p",
            text: "We hire when a customer need is immediate and clear. If you have built dependable systems for operations, AI, or field workflows, send your profile and proof of work to careers@avishkar.ai.",
          },
        ],
      },
      {
        heading: "What working here feels like",
        blocks: [
          {
            kind: "ul",
            items: [
              "Fast feedback loops with real operators in the field.",
              "Small teams with direct ownership from idea to deployment.",
              "High accountability for reliability, security, and customer outcomes.",
            ],
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
              "Sites or assets under coverage (ATM, tower, medical device, critical facility)",
              "Team size and current dispatch tooling",
              "Whether you want dispatch-only, vision, intelligence suite, or full stack",
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
