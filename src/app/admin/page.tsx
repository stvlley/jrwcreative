import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminEditor } from "@/components/admin-editor";
import { isAuthed } from "@/lib/auth";
import { contentStorePath, getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Content admin",
  robots: { index: false, follow: false },
};

// Reads the session cookie — must run per request.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthed())) {
    redirect("/admin/login");
  }

  const content = await getContent();

  return (
    <main className="min-h-screen bg-[#f7f2ea] text-neutral-950">
      <AdminEditor initial={content} storePath={contentStorePath()} />
    </main>
  );
}
