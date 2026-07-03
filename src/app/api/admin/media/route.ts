import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { saveUpload } from "@/lib/media";

export async function POST(request: Request) {
  // Server-side gate — uploads are for the authenticated owner only.
  if (!(await isAuthed())) {
    return NextResponse.json({ message: "Not authorized." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ message: "Invalid upload." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ message: "No file provided." }, { status: 400 });
  }

  try {
    const url = await saveUpload(file);
    return NextResponse.json({ ok: true, url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
