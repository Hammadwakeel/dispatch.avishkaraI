import { ImageResponse } from "next/og";
import { getBrandImageDataUris } from "@/lib/brand-image-assets";

const OG_SIZE = { width: 1200, height: 630 } as const;

/** Open Graph / Twitter card: falcon mark + wordmark on brand gradient. */
export async function generateBrandOgImageResponse() {
  const { falcon, lockup } = await getBrandImageDataUris();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fff8f1 0%, #ffffff 42%, #fce5d6 100%)",
          gap: 56,
          padding: 72,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={falcon}
          height={420}
          width={372}
          style={{ objectFit: "contain", flexShrink: 0 }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={lockup}
          height={140}
          width={636}
          style={{ objectFit: "contain", maxWidth: 620 }}
        />
      </div>
    ),
    { ...OG_SIZE },
  );
}
