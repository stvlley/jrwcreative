"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { isAccessibilityModeEnabled } from "@/components/accessibility-toggle";

export function LoadingAnimation() {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const fallback = window.setTimeout(() => setIsMounted(false), 2800);

    if (isAccessibilityModeEnabled()) {
      const reducedMotionTimeout = window.setTimeout(() => setIsMounted(false), 0);
      return () => {
        window.clearTimeout(fallback);
        window.clearTimeout(reducedMotionTimeout);
      };
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setIsMounted(false),
      });

      timeline
        .fromTo(
          "[data-loader-mark]",
          { scale: 0.84, rotate: -8 },
          { scale: 1, rotate: 0, duration: 0.42 },
        )
        .fromTo(
          "[data-loader-line]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, stagger: 0.08 },
          "-=0.08",
        )
        .fromTo(
          "[data-loader-text]",
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.32,
            stagger: 0.06,
            clearProps: "opacity,visibility",
          },
          "-=0.45",
        )
        .to("[data-loader]", {
          yPercent: -100,
          duration: 0.7,
          ease: "expo.inOut",
          delay: 0.25,
        });
    });

    return () => {
      window.clearTimeout(fallback);
      context.revert();
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      data-loader
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-neutral-950 text-white"
      role="status"
      aria-label="Loading JRW TechWorks"
    >
      <div className="w-full max-w-sm px-8">
        <div className="flex items-center gap-4">
          <div
            data-loader-mark
            className="grid size-16 place-items-center rounded-md bg-white text-2xl font-black text-neutral-950"
          >
            JRW
          </div>
          <div className="grid gap-1">
            <div>
              <p data-loader-text className="font-black uppercase leading-none tracking-wide">
                TechWorks
              </p>
            </div>
            <div>
              <p data-loader-text className="font-mono text-sm uppercase leading-none text-teal-300">
                In-home tech
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-2" aria-hidden="true">
          <span
            data-loader-line
            className="block h-2 origin-left rounded-full bg-teal-500"
          />
          <span
            data-loader-line
            className="block h-2 origin-left rounded-full bg-rose-600"
          />
          <span
            data-loader-line
            className="block h-2 origin-left rounded-full bg-amber-400"
          />
        </div>

        <p className="mt-6 font-mono text-xs uppercase tracking-wide text-neutral-400">
          Practical tech loading in
        </p>
      </div>
    </div>
  );
}
