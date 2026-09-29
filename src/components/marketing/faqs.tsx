"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Do I need any technical skills to use CreatorOS?",
    a: "No. CreatorOS is built for creators, not developers. Every tool — from the BioStore builder to the AI script writer — is drag-and-drop simple.",
  },
  {
    q: "Can I cancel my subscription any time?",
    a: "Yes, you can upgrade, downgrade or cancel your plan at any time from your dashboard settings. No contracts, no hidden fees.",
  },
  {
    q: "Does the AI script writer work for any niche?",
    a: "The AI is trained across a wide range of content categories including lifestyle, fashion, tech, fitness and business, and adapts to your tone over time.",
  },
  {
    q: "Can I use my own custom domain for my BioStore page?",
    a: "Yes, custom domains are available on the Pro and Business plans, along with full branding control.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The Starter plan is free forever and includes a BioStore page, limited AI credits and basic analytics.",
  },
];

export function Faqs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="w-full py-24 lg:py-32 [perspective:1400px]">
      <div className="container">
        <ScrollReveal className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
            FAQs
          </span>
          <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
            Frequently asked questions.
          </h2>
        </ScrollReveal>

        <div className="mx-auto mt-14 max-w-[44rem] divide-y divide-neutral-200 dark:divide-white/10">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <ScrollReveal key={faq.q} delay={i * 0.04} y={24}>
                <div className="py-5">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="font-sans text-base font-semibold text-neutral-900 dark:text-white">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        isOpen ? "bg-orange-500 text-white" : "glass text-neutral-600 dark:text-neutral-400"
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 pr-10 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
