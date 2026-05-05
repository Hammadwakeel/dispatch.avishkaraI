import { Inter, Playfair_Display } from "next/font/google";

/**
 * Theme guide (`theme guide/tokens.json`): MuotoWeb — substitute Inter.
 * Primary UI: body, navigation, forms, most headings.
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Theme guide: Monarch — substitute Playfair Display.
 * Display headlines at large sizes (see `--text-display` in theme guide).
 */
export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
