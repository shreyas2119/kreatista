import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

const FREEIMAGE_API = "https://freeimage.host/api/1/upload";
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (file.size > MAX_SIZE) return NextResponse.json({ error: "Max 10MB" }, { status: 400 });

  const apiKey = process.env.FREEIMAGE_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Image hosting not configured" }, { status: 500 });

  // Read buffer and verify magic bytes
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);
  const isImage = (
    (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) || // JPEG
    (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) || // PNG
    (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) || // GIF
    (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46)    // WEBP
  );
  if (!isImage) return NextResponse.json({ error: "Only image files allowed" }, { status: 400 });

  const base64 = bytes.toString("base64");

  const body = new URLSearchParams();
  body.append("key", apiKey);
  body.append("action", "upload");
  body.append("source", base64);
  body.append("format", "json");

  const res = await fetch(FREEIMAGE_API, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const json = await res.json();

  if (!res.ok || json.status_code !== 200) {
    console.error("FreeImage upload error:", json);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  return NextResponse.json({
    url: json.image?.url,
    display_url: json.image?.display_url,
    thumb: json.image?.thumb?.url,
  });
}
