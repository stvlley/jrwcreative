"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/site";

type Status =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved"; message: string }
  | { kind: "error"; message: string };

export function AdminEditor({
  initial,
  storePath,
}: {
  initial: SiteContent;
  storePath: string;
}) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function update(mutator: (draft: SiteContent) => void) {
    setContent((prev) => {
      const next = structuredClone(prev);
      mutator(next);
      return next;
    });
    setStatus({ kind: "idle" });
  }

  async function save() {
    setStatus({ kind: "saving" });
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        setStatus({ kind: "error", message: data.message ?? "Save failed." });
        return;
      }
      setStatus({ kind: "saved", message: data.message ?? "Saved." });
    } catch {
      setStatus({ kind: "error", message: "Network error. Please try again." });
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-300 pb-6">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wide">JRW TechWorks — content</h1>
          <p className="mt-1 text-sm text-neutral-600">Edit the site copy, then save to publish.</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-md border border-neutral-400 px-3 py-2 text-sm font-bold uppercase tracking-wide text-neutral-700 transition hover:bg-neutral-100"
        >
          Log out
        </button>
      </header>

      <p className="mb-6 rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-600">
        Saved to <code className="font-mono text-neutral-900">{storePath}</code>. Make sure a
        persistent volume is mounted there, or edits are lost when the app redeploys.
      </p>

      <div className="space-y-10">
        <Section title="Hero">
          <Text label="Location badge" value={content.hero.badge} onChange={(v) => update((d) => { d.hero.badge = v; })} />
          <Area label="Headline" value={content.hero.headline} onChange={(v) => update((d) => { d.hero.headline = v; })} />
          <Area label="Subhead" value={content.hero.subhead} onChange={(v) => update((d) => { d.hero.subhead = v; })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Text label="Primary button label" value={content.hero.primaryCta.label} onChange={(v) => update((d) => { d.hero.primaryCta.label = v; })} />
            <Text label="Primary button link" value={content.hero.primaryCta.href} onChange={(v) => update((d) => { d.hero.primaryCta.href = v; })} />
            <Text label="Secondary button label" value={content.hero.secondaryCta.label} onChange={(v) => update((d) => { d.hero.secondaryCta.label = v; })} />
            <Text label="Secondary button link" value={content.hero.secondaryCta.href} onChange={(v) => update((d) => { d.hero.secondaryCta.href = v; })} />
          </div>
          <Text label="Corner note" value={content.hero.cornerNote} onChange={(v) => update((d) => { d.hero.cornerNote = v; })} />
          {content.hero.captions.map((cap, i) => (
            <div key={i} className="grid gap-4 rounded-md border border-neutral-200 p-4 sm:grid-cols-2">
              <Text label={`Caption ${i + 1} kicker`} value={cap.kicker} onChange={(v) => update((d) => { d.hero.captions[i].kicker = v; })} />
              <Text label={`Caption ${i + 1} text`} value={cap.text} onChange={(v) => update((d) => { d.hero.captions[i].text = v; })} />
            </div>
          ))}
        </Section>

        <Section title="Proof signals (marquee chips)">
          {content.proofSignals.map((sig, i) => (
            <Text key={i} label={`Signal ${i + 1}`} value={sig} onChange={(v) => update((d) => { d.proofSignals[i] = v; })} />
          ))}
        </Section>

        <Section title="Intro">
          <Text label="Eyebrow" value={content.intro.eyebrow} onChange={(v) => update((d) => { d.intro.eyebrow = v; })} />
          <Area label="Title" value={content.intro.title} onChange={(v) => update((d) => { d.intro.title = v; })} />
          {content.intro.cards.map((card, i) => (
            <div key={i} className="space-y-4 rounded-md border border-neutral-200 p-4">
              <Text label={`Card ${i + 1} title`} value={card.title} onChange={(v) => update((d) => { d.intro.cards[i].title = v; })} />
              <Area label={`Card ${i + 1} text`} value={card.text} onChange={(v) => update((d) => { d.intro.cards[i].text = v; })} />
            </div>
          ))}
        </Section>

        <Section title="Approach">
          <Text label="Eyebrow" value={content.approach.eyebrow} onChange={(v) => update((d) => { d.approach.eyebrow = v; })} />
          <Area label="Title" value={content.approach.title} onChange={(v) => update((d) => { d.approach.title = v; })} />
          {content.approach.details.map((detail, i) => (
            <Text key={i} label={`Detail ${i + 1}`} value={detail} onChange={(v) => update((d) => { d.approach.details[i] = v; })} />
          ))}
        </Section>

        <Section title="Consulting">
          <Text label="Eyebrow" value={content.consulting.eyebrow} onChange={(v) => update((d) => { d.consulting.eyebrow = v; })} />
          <Area label="Title" value={content.consulting.title} onChange={(v) => update((d) => { d.consulting.title = v; })} />
          <Area label="Intro" value={content.consulting.intro} onChange={(v) => update((d) => { d.consulting.intro = v; })} />
          {content.consulting.services.map((svc, i) => (
            <div key={svc.key} className="space-y-4 rounded-md border border-neutral-200 p-4">
              <Text label={`Service ${i + 1} title`} value={svc.title} onChange={(v) => update((d) => { d.consulting.services[i].title = v; })} />
              <Area label={`Service ${i + 1} text`} value={svc.text} onChange={(v) => update((d) => { d.consulting.services[i].text = v; })} />
            </div>
          ))}
        </Section>

        <Section title="Why-us proof">
          <Text label="Eyebrow" value={content.proof.eyebrow} onChange={(v) => update((d) => { d.proof.eyebrow = v; })} />
          <Area label="Title" value={content.proof.title} onChange={(v) => update((d) => { d.proof.title = v; })} />
          <Area label="Intro" value={content.proof.intro} onChange={(v) => update((d) => { d.proof.intro = v; })} />
          <Text label="Photo note (amber tag)" value={content.proof.note} onChange={(v) => update((d) => { d.proof.note = v; })} />
          {content.proof.points.map((point, i) => (
            <Text key={i} label={`Point ${i + 1}`} value={point} onChange={(v) => update((d) => { d.proof.points[i] = v; })} />
          ))}
        </Section>

        <Section title="Feature spotlights">
          {content.spotlights.items.map((item, i) => (
            <div key={item.key} className="space-y-4 rounded-md border border-neutral-200 p-4">
              <Text label={`Spotlight ${i + 1} eyebrow`} value={item.eyebrow} onChange={(v) => update((d) => { d.spotlights.items[i].eyebrow = v; })} />
              <Text label={`Spotlight ${i + 1} title`} value={item.title} onChange={(v) => update((d) => { d.spotlights.items[i].title = v; })} />
              <Area label={`Spotlight ${i + 1} body`} value={item.body} onChange={(v) => update((d) => { d.spotlights.items[i].body = v; })} />
              <Text label={`Spotlight ${i + 1} footer line`} value={item.foot} onChange={(v) => update((d) => { d.spotlights.items[i].foot = v; })} />
            </div>
          ))}
        </Section>

        <Section title="Closing CTA band">
          <Text label="Eyebrow" value={content.cta.eyebrow} onChange={(v) => update((d) => { d.cta.eyebrow = v; })} />
          <Area label="Title" value={content.cta.title} onChange={(v) => update((d) => { d.cta.title = v; })} />
          <Area label="Body" value={content.cta.body} onChange={(v) => update((d) => { d.cta.body = v; })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Text label="Button label" value={content.cta.button.label} onChange={(v) => update((d) => { d.cta.button.label = v; })} />
            <Text label="Button link" value={content.cta.button.href} onChange={(v) => update((d) => { d.cta.button.href = v; })} />
          </div>
        </Section>

        <Section title="FAQ">
          <Text label="Eyebrow" value={content.faq.eyebrow} onChange={(v) => update((d) => { d.faq.eyebrow = v; })} />
          <Area label="Title" value={content.faq.title} onChange={(v) => update((d) => { d.faq.title = v; })} />
          <Area label="Intro" value={content.faq.intro} onChange={(v) => update((d) => { d.faq.intro = v; })} />
          {content.faq.items.map((item, i) => (
            <div key={i} className="space-y-4 rounded-md border border-neutral-200 p-4">
              <Text label={`Question ${i + 1}`} value={item.question} onChange={(v) => update((d) => { d.faq.items[i].question = v; })} />
              <Area label={`Answer ${i + 1}`} value={item.answer} onChange={(v) => update((d) => { d.faq.items[i].answer = v; })} />
            </div>
          ))}
        </Section>

        <Section title="Contact">
          <Text label="Eyebrow" value={content.contact.eyebrow} onChange={(v) => update((d) => { d.contact.eyebrow = v; })} />
          <Area label="Title" value={content.contact.title} onChange={(v) => update((d) => { d.contact.title = v; })} />
          <Area label="Intro" value={content.contact.intro} onChange={(v) => update((d) => { d.contact.intro = v; })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Text label="Email" value={content.contact.email} onChange={(v) => update((d) => { d.contact.email = v; })} />
            <Text label="Phone (display)" value={content.contact.phone} onChange={(v) => update((d) => { d.contact.phone = v; })} />
            <Text label="Phone (dial, e.g. +16402487074)" value={content.contact.phoneHref} onChange={(v) => update((d) => { d.contact.phoneHref = v; })} />
          </div>
          <Area label="Local focus line" value={content.contact.localFocus} onChange={(v) => update((d) => { d.contact.localFocus = v; })} />
          <Area label="Availability note" value={content.contact.availabilityNote} onChange={(v) => update((d) => { d.contact.availabilityNote = v; })} />
        </Section>

        <Section title="Footer">
          <Text label="Legal / copyright line" value={content.footer.legalLine} onChange={(v) => update((d) => { d.footer.legalLine = v; })} />
        </Section>
      </div>

      <div className="sticky bottom-0 mt-10 flex flex-wrap items-center gap-4 border-t border-neutral-300 bg-white/95 py-4 backdrop-blur">
        <button
          type="button"
          onClick={save}
          disabled={status.kind === "saving"}
          className="rounded-md bg-neutral-950 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-500"
        >
          {status.kind === "saving" ? "Saving…" : "Save & publish"}
        </button>
        {status.kind === "saved" && (
          <span className="text-sm font-semibold text-emerald-700">{status.message}</span>
        )}
        {status.kind === "error" && (
          <span className="text-sm font-semibold text-red-700">{status.message}</span>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-black uppercase tracking-widest text-teal-700">{title}</h2>
      {children}
    </section>
  );
}

function Text({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-neutral-900">
      {label}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-base font-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:ring-4 focus:ring-amber-200"
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-neutral-900">
      {label}
      <textarea
        value={value}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-20 rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:ring-4 focus:ring-amber-200"
      />
    </label>
  );
}
