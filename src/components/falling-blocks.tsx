"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Matter from "matter-js";
import {
  isAccessibilityModeEnabled,
  onAccessibilityModeChange,
} from "@/components/accessibility-toggle";

const blockColors = ["#e11d48", "#0f766e", "#f59e0b", "#111111", "#2563eb"];

export function FallingBlocks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const [disableMotion, setDisableMotion] = useState(() => isAccessibilityModeEnabled());

  useEffect(() => {
    return onAccessibilityModeChange(setDisableMotion);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const pop = popRef.current;

    if (!container || !pop || disableMotion) {
      return;
    }

    const { Bodies, Body, Engine, Render, Runner, World } = Matter;
    const engine = Engine.create({ gravity: { x: 0, y: 1 } });
    const runner = Runner.create();
    const render = Render.create({
      element: container,
      engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: "transparent",
        wireframes: false,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      },
    });

    render.canvas.setAttribute("aria-hidden", "true");

    let floor: Matter.Body | null = null;
    let block: Matter.Body | null = null;
    let activeBlockColor = blockColors[0];
    let clickCount = 0;
    const cleanupHandlers: Array<() => void> = [];

    const popBlock = () => {
      if (!block) {
        return;
      }

      const { x, y } = block.position;
      World.remove(engine.world, block);
      block = null;

      gsap.killTweensOf(pop);
      gsap
        .timeline()
        .set(pop, {
          x,
          y,
          xPercent: -50,
          yPercent: -50,
          scale: 0.45,
          rotate: 0,
          autoAlpha: 1,
          backgroundColor: activeBlockColor,
        })
        .to(pop, {
          scale: 1.6,
          rotate: 18,
          duration: 0.22,
          ease: "power2.out",
        })
        .to(
          pop,
          {
            autoAlpha: 0,
            scale: 2.2,
            duration: 0.22,
            ease: "power2.in",
          },
          "-=0.08",
        );
    };

    const handleWindowClick = (event: MouseEvent) => {
      if (!block) {
        return;
      }

      const padding = 8;
      const hit =
        event.clientX >= block.bounds.min.x - padding &&
        event.clientX <= block.bounds.max.x + padding &&
        event.clientY >= block.bounds.min.y - padding &&
        event.clientY <= block.bounds.max.y + padding;

      if (!hit) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      popBlock();
    };

    const createFloor = () => {
      if (floor) {
        World.remove(engine.world, floor);
      }

      floor = Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + 22,
        window.innerWidth + 96,
        44,
        {
          isStatic: true,
          render: { visible: false },
        },
      );

      World.add(engine.world, floor);
    };

    const launch = (target: HTMLElement) => {
      const rect = target.getBoundingClientRect();
      const size = Math.max(38, Math.min(54, window.innerWidth * 0.08));
      const color = blockColors[clickCount % blockColors.length];
      const x = rect.left + rect.width / 2;
      const y = Math.max(size / 2 + 8, rect.top + rect.height / 2);

      clickCount += 1;
      activeBlockColor = color;

      if (block) {
        World.remove(engine.world, block);
      }

      block = Bodies.rectangle(x, y, size, size, {
        chamfer: { radius: 10 },
        restitution: 0.32,
        friction: 0.78,
        frictionAir: 0.006,
        angle: clickCount % 2 === 0 ? 0.12 : -0.12,
        render: {
          fillStyle: color,
          strokeStyle: "#111111",
          lineWidth: 4,
        },
      });

      World.add(engine.world, block);
      Body.setVelocity(block, { x: 0, y: 0 });
      Body.setAngularVelocity(block, clickCount % 2 === 0 ? 0.04 : -0.04);
    };

    const resize = () => {
      render.canvas.width = window.innerWidth * Math.min(window.devicePixelRatio, 2);
      render.canvas.height = window.innerHeight * Math.min(window.devicePixelRatio, 2);
      render.canvas.style.width = `${window.innerWidth}px`;
      render.canvas.style.height = `${window.innerHeight}px`;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      createFloor();
    };

    gsapButtonElements().forEach((button) => {
      const onClick = () => launch(button);
      button.addEventListener("click", onClick);
      cleanupHandlers.push(() => button.removeEventListener("click", onClick));
    });

    createFloor();
    Render.run(render);
    Runner.run(runner, engine);
    window.addEventListener("click", handleWindowClick, { capture: true });
    window.addEventListener("resize", resize);

    return () => {
      cleanupHandlers.forEach((cleanup) => cleanup());
      window.removeEventListener("click", handleWindowClick, { capture: true });
      window.removeEventListener("resize", resize);
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [disableMotion]);

  return (
    <>
      <div
        ref={containerRef}
        className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
        aria-hidden="true"
      />
      <div
        ref={popRef}
        className="pointer-events-none fixed left-0 top-0 z-40 size-12 rounded-xl border-[3px] border-neutral-950 bg-rose-600 opacity-0 shadow-[5px_5px_0_#111]"
        aria-hidden="true"
      />
    </>
  );
}

function gsapButtonElements() {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-button]"));
}
