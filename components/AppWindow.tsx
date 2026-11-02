"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { apps } from "@/lib/site";

// Pinned section: a small rounded window grows until it fills the screen,
// revealing a tile for each app. With reduced motion it is simply open.
export function AppWindow() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const clipPath = useTransform(scrollYProgress, (p) => {
    const t = 1 - Math.pow(1 - Math.min(p / 0.65, 1), 3);
    const top = 30 * (1 - t);
    const side = 20 * (1 - t);
    const bottom = 8 * (1 - t);
    const r = 32 * (1 - t);
    return `inset(${top}% ${side}% ${bottom}% ${side}% round ${r}px)`;
  });
  const headOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  return (
    <section id="apps" ref={ref} className="appwin" aria-labelledby="apps-title">
      <div className="appwin-sticky">
        <motion.div className="appwin-head" style={{ opacity: headOpacity }}>
          <h2 id="apps-title">On the bench</h2>
          <p>Every app gets its own page, privacy policy and support.</p>
        </motion.div>

        <motion.div className="appwin-window" style={{ clipPath }}>
          <div className="appwin-scene">
            {apps.map((app) => (
              <Link
                key={app.slug}
                href={`/${app.slug}`}
                className="app-tile"
                style={{ ["--tile" as string]: app.accent }}
              >
                <span className="app-tile-status">{app.status}</span>
                <span className="app-tile-name">{app.name}</span>
                <span className="app-tile-summary">{app.summary}</span>
                <span className="app-tile-more">View {app.name}</span>
              </Link>
            ))}
            <div className="app-tile app-tile--quiet">
              <span className="app-tile-status">Coming soon</span>
              <span className="app-tile-name">App two</span>
              <span className="app-tile-summary">Already sketched. More when it is ready.</span>
            </div>
            <Link href="#contact" className="app-tile app-tile--accent">
              <span className="app-tile-status">Open</span>
              <span className="app-tile-name">Your idea?</span>
              <span className="app-tile-summary">Have a problem a small app could solve? Tell me.</span>
              <span className="app-tile-more">Get in touch</span>
            </Link>
          </div>
          <motion.p className="appwin-caption" style={{ opacity: captionOpacity }}>
            iOS and Android. Built and supported by one developer.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
