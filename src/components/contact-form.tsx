"use client";

import { Send } from "lucide-react";
import { useState } from "react";

type FormState =
  | { status: "idle"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialState: FormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setState(initialState);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState({
          status: "error",
          message: data.message ?? "Something went wrong. Please try again.",
        });
        return;
      }

      form.reset();
      setState({
        status: "success",
        message: data.message ?? "Thanks. We will follow up soon.",
      });
    } catch {
      setState({
        status: "error",
        message: "The form could not send right now. Please email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
        <label className="grid gap-2 text-sm font-semibold text-neutral-900">
          Inquiry type
          <select
            name="inquiryType"
            required
            className="h-12 rounded-md border border-neutral-300 bg-white px-3 text-base font-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:ring-4 focus:ring-amber-200"
            defaultValue=""
          >
            <option value="" disabled>
              Choose one
            </option>
            <option>Free tech consultation</option>
            <option>3D print quote</option>
            <option>Event or workshop list</option>
            <option>Upgraded retro hardware</option>
            <option>Future makerspace</option>
            <option>Other</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-neutral-900">
        Project file or link (optional)
        <input
          name="projectLink"
          type="url"
          inputMode="url"
          placeholder="For 3D print files, references, or project notes"
          className="h-12 rounded-md border border-neutral-300 bg-white px-3 text-base font-normal text-neutral-950 outline-none transition placeholder:text-neutral-500 focus:border-neutral-950 focus:ring-4 focus:ring-amber-200"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-neutral-900">
        Message
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us what you want to build, fix, host, print, or learn."
          className="min-h-36 rounded-md border border-neutral-300 bg-white px-3 py-3 text-base font-normal text-neutral-950 outline-none transition placeholder:text-neutral-500 focus:border-neutral-950 focus:ring-4 focus:ring-amber-200"
        />
      </label>

      {state.message ? (
        <p
          className={`rounded-md px-4 py-3 text-sm font-medium ${
            state.status === "success"
              ? "bg-emerald-50 text-emerald-900"
              : "bg-red-50 text-red-900"
          }`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        data-button
        disabled={isSubmitting}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-amber-300 disabled:cursor-not-allowed disabled:bg-neutral-500"
      >
        <Send aria-hidden="true" size={18} />
        {isSubmitting ? "Sending" : "Request a free consultation / quote"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-neutral-900">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="h-12 rounded-md border border-neutral-300 bg-white px-3 text-base font-normal text-neutral-950 outline-none transition focus:border-neutral-950 focus:ring-4 focus:ring-amber-200"
      />
    </label>
  );
}
