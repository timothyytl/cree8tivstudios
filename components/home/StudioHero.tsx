"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const words = site.hero.words;

// Full-screen hero: the wordmark sits bottom-left and its last word cycles.
// The whole block shrinks and fades as you scroll into the statement.
export function StudioHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"" | "exit" | "enter">("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];
    const id = window.setInterval(() => {
      setPhase("exit");
      timers.push(
        window.setTimeout(() => {
          setIndex((i) => (i + 1) % words.length);
          setPhase("enter");
          timers.push(window.setTimeout(() => setPhase(""), 320));
        }, 220),
      );
    }, 2200);
    return () => {
      window.clearInterval(id);
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(1, window.scrollY / window.innerHeight);
      wrap.style.transform = `scale(${1 - p * 0.08})`;
      wrap.style.opacity = String(Math.max(0, 1 - p * 1.4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div ref={wrapRef} className="hero-wrap">
        <p className="hero-intro">{site.hero.intro}</p>
        <div className="hero-bottom">
          <h1 id="hero-title" className="hero-wordmark" aria-label={`${site.name}: ${site.description}`}>
            <span className="hero-prefix">
              cree<span className="hero-8">8</span>tiv/
            </span>
            <span className={`hero-slot ${phase}`} aria-hidden>
              {words[index]}
            </span>
          </h1>
          <div className="hero-scroll-hint" aria-hidden>
            <span className="hero-scroll-line" />
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
