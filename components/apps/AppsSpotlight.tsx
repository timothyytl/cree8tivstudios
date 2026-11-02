"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { apps, site } from "@/lib/site";
import { MiniPhone } from "./MiniPhone";

type Item =
  | { kind: "app"; key: string; title: string; line: string; app: (typeof apps)[number] }
  | { kind: "soon"; key: string; title: string; line: string }
  | { kind: "idea"; key: string; title: string; line: string };

// Spotlight: a list of apps on the left; the selected one fills a large
// preview panel on the right.
export function AppsSpotlight() {
  const items: Item[] = [
    ...apps.map((app) => ({ kind: "app" as const, key: app.slug, title: app.name, line: app.summary, app })),
    ...site.upcoming.map((u) => ({ kind: "soon" as const, key: u.name, title: u.name, line: "Coming soon" })),
    { kind: "idea" as const, key: "idea", title: "Got an idea?", line: "Tell us what to build next" },
  ];
  const [active, setActive] = useState(items[0].key);
  const current = items.find((i) => i.key === active) ?? items[0];

  return (
    <div className="spot">
      <div className="spot-list" role="tablist" aria-label="Apps">
        {items.map((it) => (
          <button
            key={it.key}
            type="button"
            role="tab"
            aria-selected={it.key === active}
            className={it.key === active ? "spot-item on" : "spot-item"}
            onClick={() => setActive(it.key)}
            onMouseEnter={() => setActive(it.key)}
            style={it.kind === "app" ? { ["--app-accent" as string]: it.app.accent } : undefined}
          >
            <span className={`spot-dot spot-dot--${it.kind}`} aria-hidden />
            <span className="spot-text">
              <strong>{it.title}</strong>
              <span>{it.line}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="spot-stage" role="tabpanel" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            className={`spot-panel spot-panel--${current.kind}`}
            style={current.kind === "app" ? { ["--app-accent" as string]: current.app.accent } : undefined}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {current.kind === "app" && (
              <>
                <div className="spot-copy">
                  <span className="pill pill--light">{current.app.status}</span>
                  <h3>{current.app.name}</h3>
                  <p>{current.app.tagline}</p>
                  <Link href={`/${current.app.slug}`} className="bento-link">
                    Explore {current.app.name}
                  </Link>
                </div>
                <MiniPhone screen={current.app.story[0]?.screen ?? "tasks"} className="spot-phone" />
              </>
            )}
            {current.kind === "soon" && (
              <div className="spot-copy">
                <span className="pill">Coming soon</span>
                <h3>{current.title}</h3>
                <p>{site.upcoming.find((u) => u.name === current.title)?.note}</p>
              </div>
            )}
            {current.kind === "idea" && (
              <div className="spot-copy">
                <h3>Got an idea?</h3>
                <p>Tell us about a problem a small app could solve.</p>
                <Link href="#contact" className="bento-link">
                  Get in touch
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
