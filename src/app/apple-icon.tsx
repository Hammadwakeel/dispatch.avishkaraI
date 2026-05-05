import { ImageResponse } from "next/og";
import { getBrandImageDataUris } from "@/lib/brand-image-assets";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const { falcon, lockup } = await getBrandImageDataUris();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff8f1",
          gap: 8,
          padding: 12,
        }}
      >
        <img
          alt=""
          src={falcon}
          height={92}
          width={82}
          style={{ objectFit: "contain", flexShrink: 0 }}
        />
        <img
          alt=""
          src={lockup}
          height={32}
          width={146}
          style={{ objectFit: "contain", maxWidth: "100%" }}
        />
      </div>
    ),
    { ...size },
  );
}
