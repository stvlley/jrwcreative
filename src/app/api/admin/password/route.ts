import { NextResponse } from "next/server";
import { checkPassword, isAuthed, setPassword } from "@/lib/auth";

const MIN_LENGTH = 8;

export async function POST(request: Request) {
  // Server-side gate — never rely on the UI being hidden.
  if (!(await isAuthed())) {
    return NextResponse.json({ message: "Not authorized." }, { status: 401 });
  }

  let currentPassword = "";
  let newPassword = "";
  try {
    const body = (await request.json()) as {
      currentPassword?: string;
      newPassword?: string;
    };
    currentPassword =
      typeof body.currentPassword === "string" ? body.currentPassword : "";
    newPassword = typeof body.newPassword === "string" ? body.newPassword : "";
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (newPassword.length < MIN_LENGTH) {
    return NextResponse.json(
      { message: `New password must be at least ${MIN_LENGTH} characters.` },
      { status: 400 },
    );
  }

  // Re-verify the current password even with a valid session, so a stolen or
  // left-open session can't silently take over the account.
  let ok = false;
  try {
    ok = await checkPassword(currentPassword);
  } catch {
    return NextResponse.json(
      { message: "Admin login is not configured." },
      { status: 503 },
    );
  }
  if (!ok) {
    return NextResponse.json(
      { message: "Current password is incorrect." },
      { status: 401 },
    );
  }

  try {
    await setPassword(newPassword);
  } catch {
    return NextResponse.json(
      { message: "Could not save the new password." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Password updated. Use it the next time you sign in.",
  });
}
