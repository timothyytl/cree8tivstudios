"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

const FACTS = ["iOS + Android", "offline first", "private by default", "no ads, ever"];

// A tall section with a pinned panel. As you scroll through it, each line of the
// statement brightens in turn, then the facts row fades in.
export function Statement() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const lines = Array.from(section.querySelectorAll<HTMLElement>(".statement-line"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduce.matches) {
        section.style.setProperty("--facts", "1");
        lines.forEach((l) => l.style.setProperty("--lit", "1"));
        return;
      }
      const r = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / travel));
      const span = 0.8 / lines.length;
      lines.forEach((l, i) => {
        l.style.setProperty("--lit", String(Math.min(1, Math.max(0, (p - i * span) / span))));
      });
      section.style.setProperty("--facts", String(Math.min(1, Math.max(0, (p - 0.8) / 0.12))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} className="statement" aria-label="What we make">
      <div className="statement-sticky">
        <p className="statement-text">
          {site.statement.map((line) => (
            <span key={line.text} className={`statement-line statement-line--${line.weight}`}>
              {line.weight === "slash" && <b>/</b>}
              {line.text}
            </span>
          ))}
        </p>
        <ul className="statement-facts">
          {FACTS.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
