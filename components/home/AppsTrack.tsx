"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { apps, site } from "@/lib/site";
import { MiniPhone } from "../apps/MiniPhone";

const PIN_MIN_WIDTH = 900;

// Apps on a horizontal track. On wide screens the section pins and vertical
// scrolling drives the track sideways; on phones it is a native swipe row.
export function AppsTrack() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [index, setIndex] = useState(0);
  const lenis = useLenis();
  const total = apps.length + site.upcoming.length + 1;

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = () => Array.from(track.children) as HTMLElement[];
    let frame = 0;
    let overflow = 0;

    const pinned = () => window.innerWidth > PIN_MIN_WIDTH && !reduce.matches && overflow > 0;

    const nearestCard = () => {
      const vr = viewport.getBoundingClientRect();
      let best = 0;
      let bestDist = Infinity;
      cards().forEach((c, i) => {
        const d = Math.abs(c.getBoundingClientRect().left - vr.left);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      return best;
    };

    const measure = () => {
      overflow = Math.max(0, track.scrollWidth - viewport.clientWidth);
      section.style.height = pinned() ? `${window.innerHeight + overflow * 1.3}px` : "";
      section.classList.toggle("is-pinned", pinned());
      if (!pinned()) track.style.transform = "";
    };

    const update = () => {
      frame = 0;
      let p: number;
      if (pinned()) {
        const r = section.getBoundingClientRect();
        const max = section.offsetHeight - window.innerHeight;
        const raw = Math.min(1, Math.max(0, -r.top / max));
        // Hold the first card for a moment before the track starts moving.
        p = raw < 0.12 ? 0 : (raw - 0.12) / 0.88;
        track.style.transform = `translateX(${-p * overflow}px)`;
      } else {
        const max = viewport.scrollWidth - viewport.clientWidth;
        p = max > 0 ? viewport.scrollLeft / max : 0;
      }
      setProgress(p);
      setIndex(p >= 0.999 ? total - 1 : nearestCard());
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [total]);

  const go = (dir: 1 | -1) => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;
    const target = Math.min(total - 1, Math.max(0, index + dir));
    const card = track.children[target] as HTMLElement | undefined;
    if (!card) return;
    if (section.classList.contains("is-pinned")) {
      const overflow = track.scrollWidth - viewport.clientWidth;
      const p = Math.min(1, card.offsetLeft / overflow);
      const raw = p === 0 ? 0 : 0.12 + p * 0.88;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const y = top + raw * (section.offsetHeight - window.innerHeight);
      if (lenis) lenis.scrollTo(y);
      else window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      viewport.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} id="apps" className="apps-track" aria-labelledby="apps-title">
      <div className="apps-sticky">
        <div className="apps-header">
          <h2 id="apps-title" className="section-title">
            <b>/</b>apps that do
            <br />
            one job well.
          </h2>
          <div className="apps-controls">
            <div className="apps-progress" aria-hidden>
              <span style={{ transform: `scaleX(${Math.max(0.04, progress)})` }} />
            </div>
            <span className="apps-counter" aria-live="polite">
              {index + 1} / {total}
            </span>
            <button type="button" className="round-arrow" aria-label="Previous" onClick={() => go(-1)} disabled={index === 0}>
              ←
            </button>
            <button
              type="button"
              className="round-arrow"
              aria-label="Next"
              onClick={() => go(1)}
              disabled={index === total - 1}
            >
              →
            </button>
          </div>
        </div>

        <div ref={viewportRef} className="apps-viewport">
          <div ref={trackRef} className="apps-row">
            {apps.map((app, i) => (
              <Link
                key={app.slug}
                href={`/${app.slug}`}
                className={`project-card${i === 0 ? " featured" : ""}`}
                style={{ ["--app-accent" as string]: app.accent, ["--app-soft" as string]: app.accentSoft }}
              >
                <div className="project-thumb">
                  <MiniPhone screen={app.story[0]?.screen ?? "tasks"} className="project-phone" />
                </div>
                <div className="project-info">
                  <h3 className="project-name">
                    <b>/</b>
                    {app.name.toLowerCase()}
                  </h3>
                  <p className="project-desc">{app.tagline}</p>
                  <p className="project-role">
                    {app.status.toLowerCase()} / {app.platforms.join(" + ").toLowerCase()}
                  </p>
                </div>
              </Link>
            ))}

            {site.upcoming.map((u) => (
              <div key={u.name} className="project-card project-card--soon">
                <div className="project-thumb">
                  <span className="project-thumb-word">soon</span>
                </div>
                <div className="project-info">
                  <h3 className="project-name">
                    <b>/</b>
                    {u.name.toLowerCase()}
                  </h3>
                  <p className="project-desc">{u.note}</p>
                  <p className="project-role">in the sketchbook</p>
                </div>
              </div>
            ))}

            <a className="project-card project-card--idea" href={`mailto:${site.email}?subject=App%20idea`}>
              <div className="project-thumb">
                <span className="project-thumb-word">your idea?</span>
              </div>
              <div className="project-info">
                <h3 className="project-name">
                  <b>/</b>got an idea?
                </h3>
                <p className="project-desc">Tell us about a problem a small app could solve.</p>
                <p className="project-role">
                  get in touch <span aria-hidden>↗</span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
