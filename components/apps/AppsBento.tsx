"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { apps, site } from "@/lib/site";
import { MiniPhone } from "./MiniPhone";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const reveal = (i: number) => ({
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay: i * 0.08, ease },
});

// Bento grid: one large card per app, smaller cards for what's next.
export function AppsBento() {
  const [featured, ...others] = apps;
  const featureRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: featureRef, offset: ["start end", "center center"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [18, -6]);
  return (
    <div className="bento">
      {featured && (
        <motion.div
          ref={featureRef}
          {...reveal(0)}
          className="bento-card bento-feature"
          style={{ ["--app-accent" as string]: featured.accent }}
        >
          <div className="bento-feature-copy">
            <span className="pill pill--light">{featured.status}</span>
            <h3>{featured.name}</h3>
            <p>{featured.tagline}</p>
            <Link href={`/${featured.slug}`} className="bento-link">
              Explore {featured.name}
            </Link>
          </div>
          <motion.div className="bento-phone kb-scroll" style={{ y: phoneY, rotate: phoneRotate }}>
            <MiniPhone screen={featured.story[0]?.screen ?? "tasks"} />
          </motion.div>
        </motion.div>
      )}

      {others.map((app, i) => (
        <motion.div
          key={app.slug}
          {...reveal(i + 1)}
          className="bento-card bento-app"
          style={{ ["--app-accent" as string]: app.accent }}
        >
          <span className="pill pill--light">{app.status}</span>
          <h3>{app.name}</h3>
          <p>{app.summary}</p>
          <Link href={`/${app.slug}`} className="bento-link">
            Explore {app.name}
          </Link>
        </motion.div>
      ))}

      {site.upcoming.map((u, i) => (
        <motion.div key={u.name} {...reveal(others.length + i + 1)} className="bento-card bento-soon">
          <span className="pill">Coming soon</span>
          <h3>{u.name}</h3>
          <p>{u.note}</p>
        </motion.div>
      ))}

      <motion.div {...reveal(others.length + site.upcoming.length + 1)} className="bento-card bento-vivid">
        <p className="bento-big">iOS + Android</p>
        <p>Native feel on every phone, with your data synced when you want it.</p>
      </motion.div>

      <motion.div {...reveal(others.length + site.upcoming.length + 2)} className="bento-card bento-accent">
        <h3>Got an idea?</h3>
        <p>Tell us about a problem a small app could solve.</p>
        <Link href="#contact" className="bento-link">
          Get in touch
        </Link>
      </motion.div>
    </div>
  );
}
