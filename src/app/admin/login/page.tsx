import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { isAuthed } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAuthed()) {
    redirect("/admin");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-neutral-950 px-5 text-white">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-md bg-white text-lg font-black text-neutral-950">
            JRW
          </span>
          <span className="font-black uppercase leading-tight tracking-wide">
            TechWorks
            <br />
            <span className="font-mono text-xs text-teal-300">content admin</span>
          </span>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
