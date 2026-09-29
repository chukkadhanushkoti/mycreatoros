"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import { ScrollReveal } from "@/components/marketing/scroll-reveal";

const reasons = [
  "Built specifically for creators, not generic marketers",
  "AI trained on high-performing creator content",
  "Launch a premium bio page in under 5 minutes",
  "One flat price — no hidden usage fees",
  "Dedicated support from a real creator success team",
];

const highlights = [
  { value: "12,000+", label: "Active creators" },
  { value: "98%", label: "Would recommend us" },
  { value: "4.9/5", label: "Average rating" },
];

export function WhyCreatorOS() {
  return (
    <section id="why-us" className="w-full py-24 lg:py-32 [perspective:1400px]">
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <ScrollReveal y={40}>
            <motion.div
              whileHover={{ rotateY: -4, rotateX: 2 }}
              style={{ transformPerspective: 1200 }}
              className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-orange-500 p-10 shadow-2xl dark:border-white/10"
            >
              <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3">
                {highlights.map((h) => (
                  <div key={h.label}>
                    <p className="font-sans text-3xl font-extrabold text-white">{h.value}</p>
                    <p className="mt-1 text-sm text-white/80">{h.label}</p>
                  </div>
                ))}
              </div>
              <p className="relative mt-10 max-w-sm text-white/90">
                “CreatorOS replaced four different tools for me. My content
                calendar, my bio page and my DMs finally live in one place.”
              </p>
              <p className="relative mt-4 text-sm font-semibold text-white">
                — Dummy Creator, Lifestyle & Fashion
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
              Why CreatorOS
            </span>
            <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
              Built for creators who want to grow faster.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
              We obsess over the details that actually move the needle for
              creators — speed, simplicity and revenue.
            </p>

            <ul className="mt-8 space-y-4">
              {reasons.map((reason, i) => (
                <motion.li
                  key={reason}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                  <span className="text-neutral-700 dark:text-neutral-300">{reason}</span>
                </motion.li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
