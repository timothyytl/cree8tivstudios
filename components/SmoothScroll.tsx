"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";

// Inertial scrolling for the whole page, plus a MotionConfig that makes every
// entrance animation jump straight to its end state for people who ask their
// system for reduced motion. Scroll-linked styles are handled in globals.css.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const content = <MotionConfig reducedMotion="user">{children}</MotionConfig>;
  if (reduce) return content;
  return (
    <ReactLenis root options={{ lerp: 0.11, smoothWheel: true }}>
      {content}
    </ReactLenis>
  );
}
