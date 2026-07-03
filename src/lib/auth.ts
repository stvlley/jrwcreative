import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "jrw_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error("SESSION_SECRET is not configured.");
  return value;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Constant-time string compare that tolerates length mismatch. */
function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** Returns a signed session token: "<expiryMs>.<hmac>". */
export function createSessionToken() {
  const expiry = String(Date.now() + SESSION_TTL_MS);
  return `${expiry}.${sign(expiry)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;

  const expiry = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  if (!safeEqual(mac, sign(expiry))) return false;

  const expiryMs = Number(expiry);
  return Number.isFinite(expiryMs) && expiryMs > Date.now();
}

/** Verify the admin password against the configured value (constant time). */
export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD is not configured.");
  return safeEqual(candidate, expected);
}

/** Server-side gate: true only when a valid session cookie is present. */
export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}
