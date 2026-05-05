import { readFile } from "node:fs/promises";
import { join } from "node:path";

type BrandDataUris = { falcon: string; lockup: string };

let cache: BrandDataUris | null = null;

/** Base64 data URIs for `@vercel/og` / ImageResponse (cached per process). */
export async function getBrandImageDataUris(): Promise<BrandDataUris> {
  if (cache) return cache;
  const root = process.cwd();
  const [falconBuf, lockupBuf] = await Promise.all([
    readFile(join(root, "public/falcon-mark.png")),
    readFile(join(root, "public/avishkar-logo-lockup.png")),
  ]);
  cache = {
    falcon: `data:image/png;base64,${falconBuf.toString("base64")}`,
    lockup: `data:image/png;base64,${lockupBuf.toString("base64")}`,
  };
  return cache;
}
