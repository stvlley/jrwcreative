"use client";

import { useState } from "react";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.href = "/admin";
        return;
      }
      const data = (await res.json()) as { message?: string };
      setError(data.message ?? "Login failed.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <label className="grid gap-1.5 text-sm font-semibold">
        Password
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-12 rounded-md border border-white/20 bg-white/10 px-3 text-base text-white outline-none transition focus:border-white focus:ring-4 focus:ring-white/20"
        />
      </label>
      {error && <p className="text-sm font-semibold text-rose-400">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="h-12 rounded-md bg-white text-sm font-black uppercase tracking-wide text-neutral-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
