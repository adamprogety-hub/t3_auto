"use client";

import { useEffect, useRef } from "react";

export interface MarqueeItem {
  src: string;
  title: string;
  subtitle: string;
}

interface ParabolicMarqueeProps {
  items: MarqueeItem[];
  className?: string;
  maxSag?: number; // Maximum parabolic deflection down in pixels
  radius?: number; // Influence radius around cursor in pixels
  maxRotate?: number; // Maximum tangential tilt angle in degrees
  maxScale?: number; // Maximum lens scale at the apex
}

export function ParabolicMarquee({
  items,
  className = "",
  maxSag = 36,
  radius = 360,
  maxRotate = 5.5,
  maxScale = 1.08,
}: ParabolicMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Physics state
  const targetMouseX = useRef(0);
  const smoothMouseX = useRef(0);
  const targetStrength = useRef(0);
  const currentStrength = useRef(0);
  const isHovering = useRef(false);
  const animFrameId = useRef<number | null>(null);

  // Duplicate items for infinite seamless scroll
  const fullItems = [...items, ...items];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX.current = e.clientX - rect.left;
      targetStrength.current = 1;
      isHovering.current = true;
      startLoop();
    };

    const onPointerEnter = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX.current = e.clientX - rect.left;
      smoothMouseX.current = targetMouseX.current;
      targetStrength.current = 1;
      isHovering.current = true;
      startLoop();
    };

    const onPointerLeave = () => {
      targetStrength.current = 0;
      isHovering.current = false;
      // Loop continues until currentStrength relaxes to 0
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerenter", onPointerEnter, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    function tick() {
      // Smooth lerp mouse position and spring strength
      smoothMouseX.current += (targetMouseX.current - smoothMouseX.current) * 0.12;
      currentStrength.current += (targetStrength.current - currentStrength.current) * 0.08;

      const strength = currentStrength.current;
      const rect = container?.getBoundingClientRect();

      if (!rect) {
        animFrameId.current = requestAnimationFrame(tick);
        return;
      }

      const activeMouseX = smoothMouseX.current;

      // If strength is negligible and mouse left, reset and stop loop to save CPU
      if (strength < 0.001 && !isHovering.current) {
        currentStrength.current = 0;
        cardsRef.current.forEach((card) => {
          if (card && card.style.transform) {
            card.style.transform = "";
            card.style.boxShadow = "";
            card.style.zIndex = "";
          }
        });
        animFrameId.current = null;
        return;
      }

      // Compute parabolic lens deflection for each visible card
      const cards = cardsRef.current;
      const total = cards.length;

      for (let i = 0; i < total; i++) {
        const card = cards[i];
        if (!card) continue;

        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
        const dx = cardCenterX - activeMouseX;
        const absDist = Math.abs(dx);

        if (absDist < radius) {
          // Normalized -1 to +1
          const t = dx / radius;
          // Smooth cosine bell curve (1 at center, 0 at boundary)
          const bell = Math.cos(t * Math.PI * 0.5);
          
          // Parabolic downward deflection
          const sagY = bell * maxSag * strength;
          
          // Tangential tilt along slope of the curve
          const tiltDeg = -Math.sin(t * Math.PI * 0.5) * maxRotate * strength;
          
          // Optical lens magnification
          const scale = 1 + bell * (maxScale - 1) * strength;

          card.style.transform = `translate3d(0, ${sagY.toFixed(1)}px, 0) rotate(${tiltDeg.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
          card.style.boxShadow = `0 ${(4 + sagY * 0.35).toFixed(1)}px ${(12 + sagY * 0.7).toFixed(1)}px rgba(0, 0, 0, ${(0.1 + bell * 0.15).toFixed(2)})`;
          card.style.zIndex = `${Math.round(10 + bell * 20)}`;
        } else if (card.style.transform) {
          card.style.transform = "";
          card.style.boxShadow = "";
          card.style.zIndex = "";
        }
      }

      animFrameId.current = requestAnimationFrame(tick);
    }

    function startLoop() {
      if (!animFrameId.current) {
        animFrameId.current = requestAnimationFrame(tick);
      }
    }

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
    };
  }, [maxSag, radius, maxRotate, maxScale]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-x-clip py-5 -my-5 select-none ${className}`}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={trackRef}
        className="animate-marquee flex gap-2 w-max"
        style={{ willChange: "transform" }}
      >
        {fullItems.map((item, idx) => (
          <a
            key={idx}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            href="#projects"
            className="relative shrink-0 h-28 md:h-36 w-44 md:w-56 overflow-hidden bg-carbon block rounded-[4px] border border-white/5 transition-shadow duration-150"
            style={{ willChange: "transform" }}
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover filter brightness-[0.96] contrast-[1.04] select-none pointer-events-none"
              loading="lazy"
              draggable={false}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
