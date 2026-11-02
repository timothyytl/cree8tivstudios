"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { site } from "@/lib/site";

type Moment = (typeof site.day)[number];

function toClock(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = Math.floor((minutes % 60) / 5) * 5;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// A pinned section: while you scroll through it, a large clock runs from
// morning to night and the copy for each part of the day crossfades in.
// With reduced motion on, globals.css lays the moments out as a plain list.
export function DayTimeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const clock = useTransform(scrollYProgress, (p) => toClock(7 * 60 + p * 15 * 60));

  return (
    <section ref={ref} className="day" aria-label="A day with our apps">
      <div className="day-sticky">
        <motion.p className="day-clock" aria-hidden>
          {clock}
        </motion.p>
        <div className="day-panels">
          {site.day.map((m, i) => (
            <MomentPanel key={m.time} moment={m} index={i} count={site.day.length} progress={scrollYProgress} />
          ))}
        </div>
        <div className="day-track" aria-hidden>
          <motion.div className="day-track-fill" style={{ scaleX: scrollYProgress }} />
          {site.day.map((m, i) => (
            <span key={m.time} className="day-tick" style={{ left: `${(i / site.day.length) * 100}%` }}>
              {m.time}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function MomentPanel({
  moment,
  index,
  count,
  progress,
}: {
  moment: Moment;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / count;
  const start = index * seg;
  const end = (index + 1) * seg;
  const fade = 0.05;

  let input: number[];
  let output: number[];
  if (count === 1) {
    input = [0, 1];
    output = [1, 1];
  } else if (index === 0) {
    input = [0, end - fade, end];
    output = [1, 1, 0];
  } else if (index === count - 1) {
    input = [start, start + fade, 1];
    output = [0, 1, 1];
  } else {
    input = [start, start + fade, end - fade, end];
    output = [0, 1, 1, 0];
  }

  const opacity = useTransform(progress, input, output);
  const y = useTransform(opacity, [0, 1], [28, 0]);

  return (
    <motion.article className="moment" style={{ opacity, y }}>
      <p className="moment-time">{moment.time}</p>
      <h2>{moment.title}</h2>
      <p>{moment.body}</p>
    </motion.article>
  );
}
