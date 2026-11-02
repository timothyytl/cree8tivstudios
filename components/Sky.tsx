"use client";

import { motion, useScroll, useTransform } from "motion/react";

// The page is one day. As you scroll, the sky moves from dawn to night
// and the sun travels along an arc and sets just before the footer.
export function Sky() {
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55, 0.8, 0.95],
    ["#E7DDF2", "#D3E7EF", "#D6EBF2", "#EBC3D2", "#0F1430"],
  );

  // Arc: rises from lower left, peaks mid-page, sets lower right.
  const x = useTransform(scrollYProgress, (p) => `${6 + 84 * Math.min(p / 0.9, 1)}vw`);
  const y = useTransform(scrollYProgress, (p) => {
    const t = Math.min(p / 0.9, 1);
    return `${82 - 66 * Math.sin(Math.PI * t)}vh`;
  });
  const sunColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.65, 0.88],
    ["#FFB774", "#FFD25E", "#FFD25E", "#FF9F7E"],
  );
  const sunOpacity = useTransform(scrollYProgress, [0, 0.86, 0.93], [1, 1, 0]);

  return (
    <motion.div aria-hidden className="sky" style={{ backgroundColor }}>
      <motion.div
        className="sun"
        style={{ x, y, backgroundColor: sunColor, opacity: sunOpacity }}
      />
    </motion.div>
  );
}
