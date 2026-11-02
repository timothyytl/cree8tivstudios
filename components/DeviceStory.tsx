"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import type { AppEntry } from "@/lib/site";
import { PhoneScreen } from "./PhoneScreens";

// Pinned section for an app page: the phone turns to face you, then its
// screen changes as each feature line lights up. Reduced motion: a plain list.
export function DeviceStory({ app }: { app: AppEntry }) {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const count = app.story.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = p < 0.2 ? 0 : Math.min(count - 1, Math.floor(((p - 0.2) / 0.8) * count));
    setStep((s) => (s === next ? s : next));
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.2], [16, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.2], [-28, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.2], [5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.86, 1]);

  return (
    <section
      ref={ref}
      className="story"
      style={{ ["--app-accent" as string]: app.accent, ["--app-soft" as string]: app.accentSoft, ["--steps" as string]: count }}
      aria-label={`What ${app.name} does`}
    >
      <div className="story-sticky">
        <ol className="story-steps">
          {app.story.map((s, i) => (
            <li key={s.title} className={i === step ? "story-step on" : "story-step"}>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="story-phone-wrap" aria-hidden>
          <motion.div className="story-phone" style={{ rotateX, rotateY, rotateZ, scale }}>
            <div className="story-notch" />
            {app.story.map((s, i) => (
              <div key={s.title} className={i === step ? "story-screen on" : "story-screen"}>
                <PhoneScreen kind={s.screen} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
