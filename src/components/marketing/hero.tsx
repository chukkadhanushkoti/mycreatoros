"use client";

import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

const stats = [
  { label: "Creators onboard", value: "12K+" },
  { label: "Content generated", value: "2.4M" },
  { label: "Avg. revenue lift", value: "3.2x" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const sceneRotate = useTransform(scrollYProgress, [0, 1], [0, -16]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 140,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 140,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full min-h-[820px] items-center justify-center overflow-hidden bg-background py-28 [perspective:1600px] md:py-36"
    >
      {/* Plain, uniform dot texture — no gradient, no glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(120,113,108,0.22)_1px,transparent_1px)] [background-size:26px_26px] dark:opacity-100 dark:[background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]"
        aria-hidden="true"
      />

      <div className="container relative flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-orange-600 dark:text-orange-400"
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI-powered tools for modern creators
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-7 max-w-4xl font-sans text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-[4.4rem] lg:leading-[1.05] dark:text-white"
        >
          Build, grow and{" "}
          <span className="text-orange-500">monetize</span> your creator
          business.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl dark:text-neutral-400"
        >
          One powerful dashboard to script content with AI, host a premium
          bio page, understand your audience and turn followers into
          revenue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/login"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-orange-500 px-8 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2"
          >
            Get started free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/demo"
            className="glass group inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold text-neutral-900 transition-colors dark:text-white"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Watch demo
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-14 grid grid-cols-3 gap-10 border-t border-neutral-200 pt-6 dark:border-white/10"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-sans text-2xl font-bold text-neutral-900 dark:text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* 3D floating dashboard scene */}
        <motion.div
          style={{ rotateX: sceneRotate, y: sceneY, scale: sceneScale }}
          className="relative mx-auto mt-20 w-full max-w-3xl [perspective:1600px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative mx-auto max-w-md rounded-3xl border border-neutral-200 bg-background p-5 shadow-2xl dark:border-white/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-orange-500" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                    Studio overview
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">This week</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                +18.4%
              </span>
            </div>

            <div className="mt-5 flex items-end gap-2" style={{ transform: "translateZ(40px)" }}>
              {[38, 62, 44, 80, 56, 92, 70].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md bg-orange-500" style={{ height: `${h}px` }} />
              ))}
            </div>

            <div className="mt-5 space-y-3" style={{ transform: "translateZ(24px)" }}>
              {[
                { label: "AI scripts generated", value: "128" },
                { label: "BioStore clicks", value: "9,204" },
                { label: "New followers", value: "1,340" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-xl bg-neutral-100 px-3 py-2.5 dark:bg-white/5"
                >
                  <span className="text-xs text-neutral-600 dark:text-neutral-400">{row.label}</span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Floating glass badges, layered above the card in 3D space */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.7 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
              }}
              style={{ transform: "translateZ(90px)" }}
              className="glass absolute -left-12 -top-8 hidden rounded-2xl px-4 py-3 shadow-xl sm:block"
            >
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Revenue this month</p>
              <p className="font-sans text-lg font-bold text-neutral-900 dark:text-white">$18,240</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, 12, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.85 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
              }}
              style={{ transform: "translateZ(110px)" }}
              className="glass absolute -bottom-6 -right-8 hidden items-center gap-2 rounded-2xl px-4 py-3 shadow-xl sm:flex"
            >
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className="text-xs font-medium text-neutral-900 dark:text-white">
                AI script ready
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
