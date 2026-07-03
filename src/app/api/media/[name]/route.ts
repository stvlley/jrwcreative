import { readUpload } from "@/lib/media";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const file = await readUpload(name);
  if (!file) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(file.bytes), {
    headers: {
      "Content-Type": file.type,
      // Unique UUID names are immutable, so cache hard.
      "Cache-Control": "public, max-age=31536000, immutable",
      // Neutralize scripts if an uploaded SVG is opened directly as a document.
      "Content-Security-Policy": "default-src 'none'; sandbox",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
