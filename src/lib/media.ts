import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

// Uploaded images live next to content.json on the persistent volume, so they
// survive redeploys just like the copy does.
const DATA_DIR = process.env.CONTENT_DIR || path.join(process.cwd(), "data");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export function mediaContentType(name: string): string | undefined {
  return CONTENT_TYPES[path.extname(name).toLowerCase()];
}

/** Validate + store an uploaded image. Returns the URL to reference it by. */
export async function saveUpload(file: File): Promise<string> {
  const ext = path.extname(file.name).toLowerCase();
  if (!CONTENT_TYPES[ext]) {
    throw new Error("Unsupported image type. Use PNG, JPG, WEBP, GIF, or SVG.");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length === 0) throw new Error("The file is empty.");
  if (bytes.length > MAX_BYTES) throw new Error("Image is too large (max 5 MB).");

  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const name = `${randomUUID()}${ext}`;
  await fs.writeFile(path.join(UPLOADS_DIR, name), bytes);
  return `/api/media/${name}`;
}

/** Read a stored image by name, guarding against path traversal. */
export async function readUpload(
  name: string,
): Promise<{ bytes: Buffer; type: string } | null> {
  const base = path.basename(name);
  const type = mediaContentType(base);
  // Reject anything that isn't a bare, known-extension filename.
  if (!type || base !== name) return null;

  try {
    const bytes = await fs.readFile(path.join(UPLOADS_DIR, base));
    return { bytes, type };
  } catch {
    return null;
  }
}
