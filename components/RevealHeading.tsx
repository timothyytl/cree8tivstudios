"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

// A heading whose words rise out of a mask one after another as it scrolls into view.
export function RevealHeading({ text, id, className }: { text: string; id?: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.55"] });
  const words = text.split(" ");

  return (
    <h2 ref={ref} id={id} className={`reveal ${className ?? ""}`} aria-label={text}>
      {words.map((w, i) => (
        <Word key={`${w}-${i}`} progress={scrollYProgress} index={i} count={words.length}>
          {w}
        </Word>
      ))}
    </h2>
  );
}

function Word({
  children,
  progress,
  index,
  count,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  count: number;
}) {
  const start = (index / count) * 0.6;
  const end = start + 0.4;
  const y = useTransform(progress, [start, end], ["110%", "0%"]);
  const rotate = useTransform(progress, [start, end], [6, 0]);
  return (
    <>
      <span className="reveal-mask" aria-hidden>
        <motion.span className="reveal-word" style={{ y, rotate }}>
          {children}
        </motion.span>
      </span>{" "}
    </>
  );
}
