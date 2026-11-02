"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { apps, site } from "@/lib/site";
import { PhoneMock } from "./PhoneMock";

// On wide screens the section pins and vertical scrolling slides the cards
// sideways. On phones (and with reduced motion) it's a plain vertical list;
// globals.css decides which via media queries, this just measures the distance.
export function AppGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distance = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const measure = () => {
      const track = trackRef.current;
      distance.current = track && mq.matches ? Math.max(0, track.scrollWidth - window.innerWidth) : 0;
    };
    measure();
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    // Fonts change card widths slightly once they load.
    document.fonts?.ready.then(measure);
    return () => {
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * distance.current);

  return (
    <section id="apps" ref={sectionRef} className="gallery" aria-labelledby="apps-title">
      <div className="gallery-sticky">
        <motion.div ref={trackRef} className="gallery-track" style={{ x }}>
          <div className="gallery-intro">
            <h2 id="apps-title">On the bench</h2>
            <p>
              What {site.name} is building right now. Each app gets a privacy policy and support page the day it
              ships.
            </p>
          </div>

          {apps.map((app) => (
            <article
              key={app.slug}
              className="app-card"
              style={{ ["--accent" as string]: app.accent, ["--accent-ink" as string]: app.accentInk }}
            >
              <PhoneMock app={app} />
              <div className="app-card-body">
                <p className="app-status">{app.status}</p>
                <h3>
                  {app.name}
                  {app.workingTitle && <span className="app-wt"> (working title)</span>}
                </h3>
                <p>{app.summary}</p>
                <p className="app-platforms">{app.platforms.join(" and ")}</p>
                <div className="app-links">
                  {app.appStoreUrl && <a href={app.appStoreUrl}>App Store</a>}
                  {app.playStoreUrl && <a href={app.playStoreUrl}>Google Play</a>}
                  <Link href={`/${app.slug}/support`}>Support</Link>
                  <Link href={`/${app.slug}/privacy`}>Privacy</Link>
                </div>
              </div>
            </article>
          ))}

          <article className="app-card app-card--next">
            <div className="app-card-body">
              <h3>The next one</h3>
              <p>Have a problem a small, focused app could solve? I read every email.</p>
              <div className="app-links">
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
