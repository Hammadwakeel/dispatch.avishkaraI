import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    /** Phase 4 — retired routes → home or contact/demo flow */
    return [
      { source: "/products/ai-voice-agent", destination: "/", permanent: true },
      { source: "/products/predictive-maintenance", destination: "/", permanent: true },
      { source: "/solutions/plumbing", destination: "/", permanent: true },
      { source: "/solutions/electrical", destination: "/", permanent: true },
      { source: "/solutions/home-services", destination: "/", permanent: true },
      { source: "/solutions/commercial", destination: "/", permanent: true },
      { source: "/solutions/emergency-services", destination: "/", permanent: true },
      { source: "/resources/roi-calculator", destination: "/", permanent: true },
      { source: "/resources/comparison-guide", destination: "/", permanent: true },
      { source: "/resources/webinars", destination: "/", permanent: true },
      { source: "/pricing", destination: "/company/contact", permanent: true },
      { source: "/industries", destination: "/", permanent: true },
      { source: "/industries/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
