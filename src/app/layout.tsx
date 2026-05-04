import type { Metadata } from "next";
import { IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
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

export const metadata: Metadata = {
  title: "Avishkar AI — AI-native field service management",
  description:
    "Avishkar AI (Anjaneya AI Technologies) transforms field service into autonomous operations: AI scheduling, dispatch, voice, customer comms, inventory, and predictive maintenance—so your team focuses on the work, not the logistics.",
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
        <SmoothScroll>
          <SiteHeader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
