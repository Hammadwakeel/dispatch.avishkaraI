import type { Metadata } from "next";
import { IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/custom-cursor";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteTitle = "Avishkar AI — AI-Native Dispatch for Critical Infrastructure";
const siteDescription =
  "Dispatch coordination from 45 minutes to 5 minutes. AI-native dispatch for ATM networks, telecom towers, and medical devices. Live with ATM manufacturers and telecom tower operators in India. Expanding across APAC.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://avishkar.ai"),
  title: {
    default: siteTitle,
    template: "%s | Avishkar AI",
  },
  description: siteDescription,
  applicationName: "Avishkar AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Avishkar AI",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-mono">
        <CustomCursor />
        <SmoothScroll>
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
