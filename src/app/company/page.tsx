import type { Metadata } from "next";
import { CompanyPage } from "@/components/sections/company-page";
import { companyDocPages } from "@/content/doc-company";

const about = companyDocPages.about;

export const metadata: Metadata = {
  title: about.heroTitle,
  description: about.heroSubtitle,
  openGraph: {
    title: `${about.heroTitle} | Avishkar AI`,
    description: about.heroSubtitle,
  },
  twitter: {
    title: `${about.heroTitle} | Avishkar AI`,
    description: about.heroSubtitle,
  },
};

export default function CompanyHubPage() {
  return <CompanyPage />;
}
