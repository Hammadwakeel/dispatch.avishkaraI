import { generateBrandOgImageResponse } from "@/lib/generate-brand-og-image";

export const runtime = "nodejs";
export const alt = "Avishkar AI — falcon mark and wordmark";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return generateBrandOgImageResponse();
}
