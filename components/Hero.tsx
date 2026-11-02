"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { site } from "@/lib/site";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// The page's one orchestrated load moment: the headline rises line by line
// out of a mask, then the intro fades in. On scroll the block drifts up and away.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const { lines, intro } = site.hero;

  return (
    <section ref={ref} className="hero">
      <motion.div className="hero-inner" style={{ y, opacity }}>
        <h1 className="hero-title" aria-label={lines.join(" ")}>
          {lines.map((line, i) => (
            <span className="line-mask" key={line} aria-hidden>
              <motion.span
                className="line"
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.13, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="hero-intro"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease }}
        >
          {intro}
        </motion.p>
      </motion.div>
      <motion.p
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        Scroll to move the sun
      </motion.p>
    </section>
  );
}
