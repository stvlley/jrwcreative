import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { normalizeContent, saveContent } from "@/lib/content";

export async function POST(request: Request) {
  // Server-side gate — never rely on the UI being hidden.
  if (!(await isAuthed())) {
    return NextResponse.json({ message: "Not authorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON." }, { status: 400 });
  }

  const content = normalizeContent(body);

  try {
    await saveContent(content);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save content.";
    return NextResponse.json({ message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "Saved. The site is updated." });
}
