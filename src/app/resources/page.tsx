import type { Metadata } from "next";
import { ResourcesHubDestinationTabs } from "@/components/resources/resources-hub-destination-tabs";
import { ResourcesHubExplorer } from "@/components/resources/resources-hub-explorer";
import { ResourcesHubHero } from "@/components/resources/resources-hub-hero";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Documentation, blog, and rollout guidance for AI-native critical infrastructure dispatch — benchmarks, case studies, and product updates.",
};

export default function ResourcesHubPage() {
  return (
    <main className="flex-1 border-t border-light-steel bg-canvas-white">
      <ResourcesHubHero />
      <ResourcesHubExplorer />
      <ResourcesHubDestinationTabs />
    </main>
  );
}
