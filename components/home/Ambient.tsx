"use client";

import { useEffect, useRef } from "react";

// Kept in step with the .reveal-ready rules in studio.css.
const REVEAL = [
  ".home .how-head",
  ".home .testi-left",
  ".home .testi-right",
  ".home .how-card-inner",
  ".home .about-art",
  ".home .about-copy",
  ".home .footer-hello",
  ".home .footer-cols",
].join(",");

// Two small homepage effects: a soft brand-coloured glow that follows the pointer
// (mouse only), and sections that ease in the first time they scroll into view.
export function Ambient() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const root = document.documentElement;
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
    );
    document.querySelectorAll(REVEAL).forEach((s) => io.observe(s));

    const glow = glowRef.current;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      if (!glow) return;
      glow.style.opacity = "1";
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const onLeave = () => glow && (glow.style.opacity = "0");
    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    return () => {
      io.disconnect();
      root.classList.remove("reveal-ready");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden />;
}
