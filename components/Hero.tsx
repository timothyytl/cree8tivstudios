"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { site } from "@/lib/site";
import { Mark } from "./Logo";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const LAYERS = 10;

// Opening section: headline on the left, the monogram in 3D on the right.
// The logo sways on its own, and as you scroll it turns, grows and drifts down
// toward the apps section while the headline lifts away.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const markY = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const markSpin = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const markOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.15]);

  return (
    <section ref={ref} className="hero">
      <motion.div className="hero-copy hero-scroll" style={{ y: copyY, opacity: copyOpacity }}>
        <motion.p
          className="hero-badge"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="hero-badge-dot" aria-hidden />
          {site.hero.badge}
        </motion.p>
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
      </motion.div>

      <motion.div
        className="hero-mark-scroll hero-scroll"
        aria-hidden
        style={{ y: markY, scale: markScale, rotate: markRotate, opacity: markOpacity }}
      >
        <motion.div
          className="hero-mark"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease }}
        >
          <motion.div className="live-spin hero-scroll" style={{ rotateY: markSpin }}>
            <div className="live-mark">
              {Array.from({ length: LAYERS }, (_, i) => (
                <div
                  key={i}
                  className="live-layer live-layer--side"
                  style={{ transform: `translateZ(${-(LAYERS - i) * 1.6}px)` }}
                >
                  <Mark size="100%" c="var(--mark-side)" eight="var(--mark-side-8)" />
                </div>
              ))}
              <div className="live-layer">
                <Mark size="100%" c="var(--ink)" eight="var(--accent)" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
