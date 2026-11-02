"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Mark } from "./Logo";

const WORDS = ["Design", "Build", "Ship", "Delight"];

function Row({ outline }: { outline?: boolean }) {
  // Repeat enough times to fill wide screens while the row slides.
  const items = [...WORDS, ...WORDS, ...WORDS];
  return (
    <>
      {items.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className={outline ? "kb-word kb-word--outline" : `kb-word kb-word--${i % 4}`}>{w}</span>
          <Mark size="0.62em" className="kb-mark" />
        </Fragment>
      ))}
    </>
  );
}

// Two lines of giant type that slide in opposite directions as you scroll past.
export function KineticBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-28%", "0%"]);

  return (
    <section ref={ref} className="kinetic" aria-label="Design, build, ship, delight">
      <motion.div className="kb-row kb-scroll" style={{ x: x1 }} aria-hidden>
        <Row />
      </motion.div>
      <motion.div className="kb-row kb-scroll" style={{ x: x2 }} aria-hidden>
        <Row outline />
      </motion.div>
    </section>
  );
}
