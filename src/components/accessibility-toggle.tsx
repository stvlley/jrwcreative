"use client";

import { useEffect, useState } from "react";
import { Accessibility } from "lucide-react";

const STORAGE_KEY = "jrw-accessibility-mode";
const MODE_EVENT = "jrw-accessibility-mode-change";

export function isAccessibilityModeEnabled() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.localStorage.getItem(STORAGE_KEY) === "true" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function setAccessibilityMode(enabled: boolean) {
  document.documentElement.dataset.accessibilityMode = String(enabled);
  window.localStorage.setItem(STORAGE_KEY, String(enabled));
  window.dispatchEvent(new CustomEvent(MODE_EVENT, { detail: { enabled } }));
}

export function onAccessibilityModeChange(callback: (enabled: boolean) => void) {
  const handler = (event: Event) => {
    callback(Boolean((event as CustomEvent<{ enabled: boolean }>).detail?.enabled));
  };

  window.addEventListener(MODE_EVENT, handler);

  return () => window.removeEventListener(MODE_EVENT, handler);
}

export function AccessibilityToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMode = () => {
      const value = isAccessibilityModeEnabled();
      setAccessibilityMode(value);
      setEnabled(value);
    };

    syncMode();
    motionPreference.addEventListener("change", syncMode);

    return () => motionPreference.removeEventListener("change", syncMode);
  }, []);

  const toggleMode = () => {
    const nextValue = !enabled;
    setEnabled(nextValue);
    setAccessibilityMode(nextValue);
  };

  return (
    <button
      type="button"
      aria-pressed={enabled}
      aria-label={
        enabled
          ? "Switch to full animation version"
          : "Switch to accessibility friendly version"
      }
      title={
        enabled
          ? "Switch to full animation version"
          : "Switch to accessibility friendly version"
      }
      className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-neutral-950 bg-white px-3 text-sm font-black uppercase tracking-wide text-neutral-950 transition hover:bg-amber-100 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-teal-700"
      onClick={toggleMode}
    >
      <Accessibility aria-hidden="true" size={18} />
      <span className="hidden sm:inline">{enabled ? "Full motion" : "Accessible"}</span>
    </button>
  );
}
