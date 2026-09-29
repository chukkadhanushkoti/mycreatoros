"use client";

import { BarChart3, MessageCircle, Sparkles, Wand2 } from "lucide-react";
import { motion } from "framer-motion";

import { ScrollReveal } from "@/components/marketing/scroll-reveal";

const items = [
  {
    icon: Wand2,
    title: "AI Script Writer",
    desc: "Turn a single idea into scroll-stopping scripts, hooks and captions in seconds.",
  },
  {
    icon: Sparkles,
    title: "Premium BioStore",
    desc: "A beautifully animated link-in-bio page that turns visitors into customers.",
  },
  {
    icon: BarChart3,
    title: "Audience Analytics",
    desc: "Real-time insight into who follows you, what they love and when they engage.",
  },
  {
    icon: MessageCircle,
    title: "Auto DM & Replies",
    desc: "Automatically reply to comments and DMs with your links, offers and drops.",
  },
];

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="w-full py-24 lg:py-32 [perspective:1400px]">
      <div className="container">
        <ScrollReveal className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
            What CreatorOS does
          </span>
          <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
            One dashboard. Every tool you need.
          </h2>
          <p className="mt-4 max-w-[36rem] text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            From your first script to your first sale — CreatorOS gives you
            the full toolkit to run a creator business, without the ten
            different apps.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-16 grid max-w-[70rem] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8, rotateX: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformPerspective: 800 }}
                className="group h-full rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl dark:border-white/10 dark:bg-neutral-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 shadow-[0_8px_20px_-6px_rgba(249,115,22,0.6)]">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-5 font-sans text-lg font-bold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {item.desc}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
