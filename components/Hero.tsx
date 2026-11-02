"use client";

import { motion } from "motion/react";
import { site } from "@/lib/site";
import { Mark } from "./Logo";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const LAYERS = 10;

// Opening section: headline on the left, the monogram in slow 3D on the right.
// The 3D is stacked flat copies of the mark pushed back in space; CSS does the sway.
export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          {site.hero.title}
        </motion.h1>
        <motion.p
          className="hero-intro"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          {site.hero.intro}
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <a className="button" href="#apps">
            See the apps
          </a>
          <a className="button button--ghost" href="#contact">
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero-mark"
        aria-hidden
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.1, ease }}
      >
        <div className="live-mark">
          {Array.from({ length: LAYERS }, (_, i) => (
            <div key={i} className="live-layer live-layer--side" style={{ transform: `translateZ(${-(LAYERS - i) * 1.6}px)` }}>
              <Mark size="100%" c="var(--mark-side)" eight="var(--mark-side-8)" />
            </div>
          ))}
          <div className="live-layer">
            <Mark size="100%" c="var(--ink)" eight="var(--accent)" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
