"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 70,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 38%"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 22, mass: 0.6 });

  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const translateY = useTransform(progress, [0, 1], [y + delay * 60, 0]);
  const rotateX = useTransform(progress, [0, 1], [14, 0]);
  const scale = useTransform(progress, [0, 1], [0.93, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y: translateY, rotateX, scale, transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
