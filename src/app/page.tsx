import type { Metadata } from "next";
import { LandingPage } from "@/components/sections/landing-page";

export const metadata: Metadata = {
  title: {
    absolute: "Avishkar AI — AI-Native Dispatch for Critical Infrastructure",
  },
  description:
    "AI-native dispatch for ATM networks, telecom towers, and medical devices. Fault to closed loop in under 5 minutes — live with ATM manufacturers and tower operators across India.",
  openGraph: {
    title: "Avishkar AI — AI-Native Dispatch for Critical Infrastructure",
    description:
      "Critical infrastructure fails in seconds; Avishkar closes the dispatch loop in under 5 minutes. Live in India today.",
  },
  twitter: {
    title: "Avishkar AI — AI-Native Dispatch for Critical Infrastructure",
    description:
      "Fault to engineer assigned in under 5 minutes. Live with ATM manufacturers and tower operators across India.",
  },
};

export default function Home() {
  return <LandingPage />;
}
