"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

// Stacking cards: each card pins near the top and the next slides over it.
// Cards underneath shrink and dim a little so the stack reads as a deck.
export function Principles() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = Array.from(list.querySelectorAll<HTMLElement>(".principle"));
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduce.matches) {
        cards.forEach((c) => {
          c.style.transform = "";
          c.style.filter = "";
        });
        return;
      }
      const vh = window.innerHeight;
      const cover = cards.map((card) => {
        const stickyTop = parseFloat(getComputedStyle(card).top) || 0;
        const top = card.getBoundingClientRect().top;
        return Math.min(1, Math.max(0, 1 - (top - stickyTop) / (vh - stickyTop)));
      });
      cards.forEach((card, i) => {
        let depth = 0;
        for (let j = i + 1; j < cards.length; j++) depth += cover[j];
        card.style.transform = `scale(${1 - 0.045 * depth})`;
        card.style.filter = depth > 0 ? `brightness(${1 - 0.1 * depth})` : "";
      });
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
    <section id="how" className="principles" aria-labelledby="how-title">
      <div className="principles-head">
        <h2 id="how-title">How I make apps</h2>
        <p>A few rules every Cree8tiv app follows.</p>
      </div>
      <div ref={listRef} className="principles-list">
        {site.principles.map((p, i) => (
          <article
            key={p.title}
            className={`principle principle--${p.tone}`}
            style={{ ["--i" as string]: i }}
          >
            <div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
