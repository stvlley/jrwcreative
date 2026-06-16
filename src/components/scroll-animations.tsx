"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  isAccessibilityModeEnabled,
  onAccessibilityModeChange,
} from "@/components/accessibility-toggle";

export function ScrollAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let cleanupAnimation: (() => void) | null = null;

    const clearAnimationProps = () => {
      gsap.killTweensOf([
        "[data-scroll-progress]",
        "[data-hero-copy] > *",
        "[data-hero-card]",
        "[data-float]",
        "[data-reveal]",
        "[data-reveal-left]",
        "[data-reveal-right]",
        "[data-stagger] > *",
        "[data-pop-card]",
        "[data-feature-panel]",
        "[data-detail-list] > *",
        "[data-button]",
        "[data-panel-sweep]",
      ]);

      gsap.set(
        [
          "[data-scroll-progress]",
          "[data-hero-copy] > *",
          "[data-hero-card]",
          "[data-float]",
          "[data-reveal]",
          "[data-reveal-left]",
          "[data-reveal-right]",
          "[data-stagger] > *",
          "[data-pop-card]",
          "[data-feature-panel]",
          "[data-detail-list] > *",
          "[data-button]",
          "[data-panel-sweep]",
        ],
        { clearProps: "all" },
      );
      gsap.set("[data-scroll-progress]", { scaleX: 1, transformOrigin: "left center" });
    };

    const startAnimations = () => {
      if (isAccessibilityModeEnabled()) {
        clearAnimationProps();
        return () => clearAnimationProps();
      }

      const cleanupHandlers: Array<() => void> = [];

      const context = gsap.context(() => {
        gsap.set("[data-scroll-progress]", {
          scaleX: 0,
          transformOrigin: "left center",
        });

        gsap.to("[data-scroll-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
          },
        });

        gsap.fromTo(
          "[data-hero-copy] > *",
          { autoAlpha: 0, x: -24, y: 20 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform",
          },
        );

        gsap.fromTo(
          "[data-hero-card]",
          { autoAlpha: 0, x: 28, y: 36, rotate: -1.5 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotate: 0,
            duration: 0.85,
            stagger: 0.1,
            delay: 0.12,
            ease: "power3.out",
            clearProps: "transform",
          },
        );

        gsap.to("[data-float]", {
          y: -8,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.18,
          force3D: true,
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 44 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: element,
                start: "top 82%",
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-left]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, x: -52 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: element,
                start: "top 84%",
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-right]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, x: 52 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: element,
                start: "top 84%",
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          gsap.fromTo(
            Array.from(group.children),
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: group,
                start: "top 86%",
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-late-section]").forEach((section) => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          });

          const kicker = section.querySelector("[data-load-kicker]");
          const title = section.querySelector("[data-load-title]");
          const copy = section.querySelector("[data-load-copy]");

          if (kicker) {
            timeline.fromTo(
              kicker,
              { autoAlpha: 0, x: -18 },
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.45,
                ease: "power3.out",
                clearProps: "transform,opacity,visibility",
              },
            );
          }

          if (title) {
            timeline.fromTo(
              title,
              { autoAlpha: 0, y: 34, skewY: 2 },
              {
                autoAlpha: 1,
                y: 0,
                skewY: 0,
                duration: 0.7,
                ease: "power3.out",
                clearProps: "transform,opacity,visibility",
              },
              "-=0.18",
            );
          }

          if (copy) {
            timeline.fromTo(
              copy,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
                ease: "power2.out",
                clearProps: "transform,opacity,visibility",
              },
              "-=0.22",
            );
          }
        });

        gsap.utils.toArray<HTMLElement>("[data-pop-grid]").forEach((grid) => {
          const cards = Array.from(grid.querySelectorAll("[data-pop-card]"));

          gsap.fromTo(
            cards,
            { autoAlpha: 0, y: 36, rotate: -1.6, scale: 0.96 },
            {
              autoAlpha: 1,
              y: 0,
              rotate: 0,
              scale: 1,
              duration: 0.72,
              stagger: 0.12,
              ease: "back.out(1.2)",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: grid,
                start: "top 82%",
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-feature-panel]").forEach((panel, index) => {
          const sweep = panel.querySelector("[data-panel-sweep]");
          const inner = Array.from(panel.children).filter((child) => child !== sweep);

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top 84%",
              once: true,
            },
          });

          timeline.fromTo(
            panel,
            { autoAlpha: 0, x: index % 2 === 0 ? -34 : 34, rotate: index % 2 === 0 ? -1 : 1 },
            {
              autoAlpha: 1,
              x: 0,
              rotate: 0,
              duration: 0.72,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
            },
          );

          if (sweep) {
            timeline.fromTo(
              sweep,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.5, ease: "power2.out", clearProps: "transform" },
              "-=0.38",
            );
          }

          timeline.fromTo(
            inner,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.06,
              ease: "power2.out",
              clearProps: "transform,opacity,visibility",
            },
            "-=0.28",
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-detail-list]").forEach((list) => {
          gsap.fromTo(
            Array.from(list.children),
            { autoAlpha: 0, x: 22 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.52,
              stagger: 0.1,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: list,
                start: "top 84%",
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
          const speed = element.dataset.parallax === "fast" ? -28 : -16;

          gsap.to(element, {
            y: speed,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          });
        });

        ScrollTrigger.batch("[data-card]", {
          start: "top 86%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { y: 28 },
              {
                y: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.out",
                overwrite: "auto",
                clearProps: "transform",
              },
            );
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-button]").forEach((button) => {
          const enter = () => {
            gsap.to(button, {
              y: -2,
              scale: 1.02,
              duration: 0.18,
              ease: "power2.out",
              overwrite: "auto",
            });
          };
          const leave = () => {
            gsap.to(button, {
              y: 0,
              scale: 1,
              duration: 0.18,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          button.addEventListener("mouseenter", enter);
          button.addEventListener("mouseleave", leave);
          button.addEventListener("focus", enter);
          button.addEventListener("blur", leave);

          cleanupHandlers.push(() => {
            button.removeEventListener("mouseenter", enter);
            button.removeEventListener("mouseleave", leave);
            button.removeEventListener("focus", enter);
            button.removeEventListener("blur", leave);
          });
        });
      });

      return () => {
        cleanupHandlers.forEach((cleanup) => cleanup());
        context.revert();
      };
    };

    const restartAnimations = () => {
      cleanupAnimation?.();
      cleanupAnimation = startAnimations();
    };

    restartAnimations();
    const removeModeListener = onAccessibilityModeChange(restartAnimations);

    return () => {
      removeModeListener();
      cleanupAnimation?.();
    };
  }, []);

  return null;
}
