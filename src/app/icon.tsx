import { ImageResponse } from "next/og";
import { getBrandImageDataUris } from "@/lib/brand-image-assets";

export const runtime = "nodejs";
export const size = { width: 256, height: 256 };
export const contentType = "image/png";

export default async function Icon() {
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
          gap: 10,
          padding: 18,
        }}
      >
        <img
          alt=""
          src={falcon}
          height={132}
          width={117}
          style={{ objectFit: "contain", flexShrink: 0 }}
        />
        <img
          alt=""
          src={lockup}
          height={44}
          width={200}
          style={{ objectFit: "contain", maxWidth: "100%" }}
        />
      </div>
    ),
    { ...size },
  );
}
