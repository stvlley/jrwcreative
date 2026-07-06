import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { cookies } from "next/headers";

const scrypt = promisify(scryptCb);

export const SESSION_COOKIE = "jrw_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

// Lives next to content.json on the persistent volume so a password set from
// the admin UI survives redeploys. Delete this file (or the volume) to fall
// back to the ADMIN_PASSWORD env var for recovery.
const DATA_DIR = process.env.CONTENT_DIR || path.join(process.cwd(), "data");
const AUTH_PATH = path.join(DATA_DIR, "auth.json");

const SCRYPT_KEYLEN = 64;

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

async function hashPassword(password: string, salt: Buffer): Promise<Buffer> {
  return (await scrypt(password, salt, SCRYPT_KEYLEN)) as Buffer;
}

/** Read the stored password hash, or null when none has been set yet. */
async function readStoredPassword(): Promise<{ salt: Buffer; hash: Buffer } | null> {
  try {
    const raw = await fs.readFile(AUTH_PATH, "utf8");
    const parsed = JSON.parse(raw) as { salt?: string; hash?: string };
    if (typeof parsed.salt !== "string" || typeof parsed.hash !== "string") return null;
    const salt = Buffer.from(parsed.salt, "base64");
    const hash = Buffer.from(parsed.hash, "base64");
    if (!salt.length || hash.length !== SCRYPT_KEYLEN) return null;
    return { salt, hash };
  } catch {
    return null;
  }
}

/**
 * Verify the admin password (constant time). A password set from the admin UI
 * (stored hashed on the persistent volume) takes precedence; the ADMIN_PASSWORD
 * env var is the initial/recovery password used until one is set.
 */
export async function checkPassword(candidate: string): Promise<boolean> {
  const stored = await readStoredPassword();
  if (stored) {
    const candidateHash = await hashPassword(candidate, stored.salt);
    return timingSafeEqual(candidateHash, stored.hash);
  }
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD is not configured.");
  return safeEqual(candidate, expected);
}

/** Hash and persist a new admin password set from the admin UI. */
export async function setPassword(newPassword: string): Promise<void> {
  const salt = randomBytes(16);
  const hash = await hashPassword(newPassword, salt);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(
    AUTH_PATH,
    JSON.stringify(
      { salt: salt.toString("base64"), hash: hash.toString("base64") },
      null,
      2,
    ),
    { encoding: "utf8", mode: 0o600 },
  );
}

/** Server-side gate: true only when a valid session cookie is present. */
export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}
