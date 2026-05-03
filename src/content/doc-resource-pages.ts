import type { DocPage } from "./types";

/** Source: docs/avishkar-ai-website-content.docx — Resources sections */
export const documentationDocPage: DocPage = {
  eyebrow: "Resources",
  heroTitle: "Documentation hub",
  heroSubtitle:
    "Guides for admins, dispatchers, technicians, and developers integrating Avishkar AI.",
  sections: [
    {
      heading: "Getting started",
      blocks: [
        {
          kind: "ul",
          items: [
            "Quick start guide",
            "Account setup",
            "Importing data",
            "User management",
          ],
        },
      ],
    },
    {
      heading: "Scheduling & dispatch",
      blocks: [
        {
          kind: "ul",
          items: [
            "Creating jobs",
            "Managing schedules",
            "Dispatch board guide",
            "Route optimization",
          ],
        },
      ],
    },
    {
      heading: "Mobile app & integrations",
      blocks: [
        {
          kind: "ul",
          title: "Mobile app",
          items: [
            "Tech installation guide",
            "Using the job card",
            "Photo documentation",
            "Offline mode",
          ],
        },
        {
          kind: "ul",
          title: "Integrations",
          items: [
            "QuickBooks, Salesforce, Stripe",
            "API documentation & webhooks",
          ],
        },
      ],
    },
  ],
};

export const roiCalculatorDocPage: DocPage = {
  eyebrow: "Resources",
  heroTitle: "Calculate your ROI",
  heroSubtitle:
    "See how much time, money, and revenue Avishkar AI can impact for your business.",
  sections: [
    {
      heading: "Calculator inputs (from playbook)",
      blocks: [
        {
          kind: "ul",
          items: [
            "Number of technicians",
            "Jobs per technician per month",
            "Average dispatch time per job (minutes)",
            "Average ticket size (₹)",
            "Current first-time fix rate (%)",
            "Average customer satisfaction score",
          ],
        },
      ],
    },
    {
      heading: "Outputs",
      blocks: [
        {
          kind: "ul",
          items: [
            "Annual dispatch time saved",
            "Revenue from improved first-time fix rate",
            "Revenue uplift from AI bookings",
            "Total annual impact & months to ROI",
          ],
        },
      ],
    },
    {
      heading: "Interactive calculator",
      blocks: [
        {
          kind: "p",
          text: "A guided calculator UI will ship in a follow-up iteration. Until then, book a demo and we will model ROI with your live operational inputs.",
        },
      ],
    },
  ],
};

export const comparisonGuideDocPage: DocPage = {
  eyebrow: "Resources",
  heroTitle: "Avishkar AI vs. the competition",
  heroSubtitle:
    "Transparent criteria for evaluating AI-native field service platforms.",
  sections: [
    {
      heading: "Comparison criteria",
      blocks: [
        {
          kind: "ul",
          items: [
            "AI-powered scheduling",
            "Voice AI capabilities",
            "Photo inspection AI",
            "Predictive maintenance",
            "Mobile experience",
            "Ease of use",
            "Pricing transparency",
            "Implementation time",
          ],
        },
      ],
    },
    {
      heading: "Competitors covered in the master brief",
      blocks: [
        {
          kind: "ul",
          items: [
            "ServiceTitan",
            "Housecall Pro",
            "Additional regional leaders (see sales deck)",
          ],
        },
      ],
    },
  ],
};

export const webinarsDocPage: DocPage = {
  eyebrow: "Resources",
  heroTitle: "Webinars & events",
  heroSubtitle:
      "Live sessions on AI dispatch, voice automation, and rollout best practices.",
  sections: [
    {
      heading: "Upcoming programming",
      blocks: [
        {
          kind: "p",
          text: "Event calendar and registration links will appear here. Enterprise customers receive private executive briefings and on-site workshops.",
        },
      ],
    },
  ],
};
