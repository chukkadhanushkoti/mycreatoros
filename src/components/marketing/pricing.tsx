"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    tagline: "For creators just getting started",
    monthly: 0,
    yearly: 0,
    features: ["1 BioStore page", "10 AI script credits/mo", "Basic analytics", "Community support"],
    highlighted: false,
  },
  {
    name: "Pro",
    tagline: "For creators ready to scale",
    monthly: 29,
    yearly: 24,
    features: [
      "Unlimited BioStore blocks",
      "Unlimited AI script credits",
      "Advanced audience analytics",
      "Auto DM & reply automation",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    tagline: "For teams and agencies",
    monthly: 79,
    yearly: 64,
    features: [
      "Everything in Pro",
      "Multi-creator workspaces",
      "Custom domain & branding",
      "Dedicated success manager",
      "API access",
    ],
    highlighted: false,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="w-full py-24 lg:py-32 [perspective:1400px]">
      <div className="container">
        <ScrollReveal className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
            Pricing
          </span>
          <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
            Simple pricing that scales with you.
          </h2>
          <p className="mt-4 max-w-[32rem] text-lg text-neutral-600 dark:text-neutral-400">
            Start free. Upgrade when you&apos;re ready to grow. Cancel any time.
          </p>

          <div className="glass mt-8 flex items-center gap-3 rounded-full p-1.5 shadow-sm">
            <button
              onClick={() => setYearly(false)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                !yearly ? "bg-orange-500 text-white" : "text-neutral-500 dark:text-neutral-400"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                yearly ? "bg-orange-500 text-white" : "text-neutral-500 dark:text-neutral-400"
              )}
            >
              Yearly
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold",
                  yearly ? "bg-white/20 text-white" : "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                )}
              >
                -20%
              </span>
            </button>
          </div>
        </ScrollReveal>

        <div className="mx-auto mt-16 grid max-w-[70rem] items-end gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={cn(
                  "relative h-full rounded-3xl border p-8 shadow-sm transition-shadow hover:shadow-xl",
                  plan.highlighted
                    ? "border-orange-500 bg-orange-500/5 dark:border-orange-500/50"
                    : "border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-900"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-semibold text-white shadow-md">
                    Most popular
                  </span>
                )}
                <h3 className="font-sans text-xl font-bold text-neutral-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-sans text-4xl font-extrabold text-neutral-900 dark:text-white">
                    ${yearly ? plan.yearly : plan.monthly}
                  </span>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">/mo</span>
                </div>

                <Link
                  href="/login"
                  className={cn(
                    "mt-6 flex h-11 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors",
                    plan.highlighted
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "border border-neutral-200 text-neutral-900 hover:bg-neutral-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                  )}
                >
                  {plan.monthly === 0 ? "Start for free" : "Choose plan"}
                </Link>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
