"use client";

import Link from "next/link";
import { useRef } from "react";
import { apps, site } from "@/lib/site";
import { MiniPhone } from "./MiniPhone";

// App Store-style shelf: tall cards in a row that snap as you swipe,
// with arrow buttons on wider screens.
export function AppsShelf() {
  const rowRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector<HTMLElement>(".shelf-card");
    const step = card ? card.offsetWidth + 20 : row.clientWidth * 0.8;
    row.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="shelf">
      <div className="shelf-controls">
        <button type="button" className="shelf-arrow" onClick={() => scrollBy(-1)} aria-label="Previous app">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="shelf-arrow" onClick={() => scrollBy(1)} aria-label="Next app">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div ref={rowRef} className="shelf-row">
        {apps.map((app) => (
          <article key={app.slug} className="shelf-card" style={{ ["--app-accent" as string]: app.accent }}>
            <div className="shelf-art">
              <MiniPhone screen={app.story[0]?.screen ?? "tasks"} className="shelf-phone" />
            </div>
            <div className="shelf-body">
              <span className="shelf-status">{app.status}</span>
              <h3>{app.name}</h3>
              <p>{app.summary}</p>
              <Link href={`/${app.slug}`} className="shelf-get">
                {app.appStoreUrl || app.playStoreUrl ? "Get" : "View"}
              </Link>
            </div>
          </article>
        ))}
        {site.upcoming.map((u) => (
          <article key={u.name} className="shelf-card shelf-card--soon">
            <div className="shelf-art">
              <div className="shelf-placeholder" aria-hidden />
            </div>
            <div className="shelf-body">
              <span className="shelf-status">Coming soon</span>
              <h3>{u.name}</h3>
              <p>{u.note}</p>
            </div>
          </article>
        ))}
        <article className="shelf-card shelf-card--idea">
          <div className="shelf-art">
            <p className="shelf-art-text">Your idea here</p>
          </div>
          <div className="shelf-body">
            <span className="shelf-status">Open</span>
            <h3>Got an idea?</h3>
            <p>Tell us about a problem a small app could solve.</p>
            <Link href="#contact" className="shelf-get">
              Talk to us
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
